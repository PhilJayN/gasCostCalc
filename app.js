//Dependencies: jQuery
// -------------------------------------------------------------------------
var main = function() {
    "use strict";
    var differenceInCents;
    var differenceInCentsPositive;
    var cashOrCreditString;
    var monentaryUnitString;
    var monentaryConversion;

    var cashPriceEl, creditPriceEl, bankDiscountEl, gallonsEl;
    var totalCostInCash, totalCostInCredit, totalCostInCreditWDiscount;

    //append these to the DOM, otherwise they will dangle
    var $calcResultEl = $(".calculationResultContainer");
    var $errorMsgEl = $("#errorMsgEl");
    var $finalMsgEl = $("<p>");
    var $inputFieldsEl = $(".formFields li input");
    var $cashEl = $("#cashTableData");
    var $creditEl = $("#creditTableData");
    var $creditWDiscEl = $("#creditDiscTableData");

    function pluralOrNot() {
        if (differenceInCentsPositive <= 1) {
            monentaryUnitString = " cent";
            monentaryConversion = differenceInCentsPositive;
        } else if (differenceInCentsPositive <= 99) {
            monentaryUnitString = " cents";
            monentaryConversion = differenceInCentsPositive;
        } else if (differenceInCentsPositive === 100) {
            monentaryUnitString = " dollar";
            monentaryConversion = differenceInCentsPositive / 100;
        } else if (differenceInCentsPositive >= 101) {
            monentaryUnitString = " dollars";
            monentaryConversion = differenceInCentsPositive / 100;
        }
    }

    function amtSavedFinalMsg() {
        //IMPORTANT: to keep it consistent, msg will favor any form of payment that cost LESS!!
        var msgArray = ['You will pay ', monentaryConversion, monentaryUnitString, ' less from your total bill if you use ', cashOrCreditString];
        console.log('msgArray', msgArray);
        var msgArrayJoined = msgArray.join("");
        if (monentaryConversion > 0) {
            $finalMsgEl.css("color", "black");
            $calcResultEl.append($finalMsgEl.text(msgArrayJoined));
        } else {
            $finalMsgEl.css("color", "black");
            $calcResultEl.append($finalMsgEl.text("At this point, you will pay the same amount using cash or credit."));
            //this happens when cash, cred are around .03 cents each, and bank discount is super high.
        }
    }

    function pleaseCheckFieldMsg() {
        $calcResultEl.append($finalMsgEl.text("Please complete form for calculations to auto start."));
        $finalMsgEl.css("color", "tomato");
    }

    function showResultContainer() {
        //First, capture element:
        var capturedElement = document.getElementById("resultContainerDiv");
        //then make visible:
        capturedElement.style.visibility = "visible";
    }

    function hideResultContainer() {
        var capturedElement = document.getElementById("resultContainerDiv");
        capturedElement.style.visibility = "hidden";
    }

    function clearErrorMsg() {
        $errorMsgEl.text('');
    }

    function limitInput() {
        var mainFormEls = document.getElementById("mainForm").elements;
        var oldValue = [];
        console.log('limit inpu mainFormEls', mainFormEls[0].value);
        for (var i = 0; i < mainFormEls.length; i++) {
            var currentVal = parseFloat(mainFormEls[i].value);
            console.log('currentVal', currentVal);
            if (currentVal > 40) {
                $errorMsgEl.text('Number entered: ' + currentVal + ' is out of range. Valid numbers are .1 - 40 ');
            }

            if (parseFloat(mainFormEls[i].value) > 40) {
                mainFormEls[i].value = elementVal;
                $finalMsgEl.text("");
            }
            //prevent user typing negative #:
            else if (parseFloat(mainFormEls[i].value) < 0) {
                mainFormEls[i].value = '';
                $errorMsgEl.text("Negative numbers not valid");
                $finalMsgEl.text("");
            } else if (parseFloat(mainFormEls[i].value) === 0) {
                $errorMsgEl.text('Number entered: ' + currentVal + ' is out of range. Valid numbers are .1 - 40 ');
                $finalMsgEl.text("");
            }
        }
    }

    var elementVal;

    $inputFieldsEl.toArray().forEach(function(element) {
        $(element).on("keydown", function() {
            elementVal = element.value;
        });
        $(element).on("input", function() {
            clearErrorMsg();
            //Note: if using .value on these, they return str, NOT a #!!
            cashPriceEl = document.getElementById("cashPrice");
            creditPriceEl = document.getElementById("creditPrice");
            bankDiscountEl = document.getElementById("bankDiscount");
            gallonsEl = document.getElementById("gallonsNeeded");

            totalCostInCash = parseFloat(gallonsEl.value) * parseFloat(cashPriceEl.value);
            totalCostInCredit = parseFloat(gallonsEl.value) * parseFloat(creditPriceEl.value);
            totalCostInCreditWDiscount = totalCostInCredit - totalCostInCredit * bankDiscountEl.value / 100; //should be less than totalCostInCredit due to discount
            //leave rounding till the VERY last step, otherwise JavaScript will give you more decimals
            differenceInCents = ((totalCostInCreditWDiscount - totalCostInCash) * 100).toFixed(0); //rounds your .14540000000000042 to nearest cent, so you get .15, which is .15 of a dollar...
            //differenceInCents will sometimes give a NEGATIVE #, ex: when totalCostInCreditWDiscount(3.23)-totalCostInCash(4.73) = neg!
            //if totalCostInCreditWDiscount is GREATER than totalCostInCash, this means that you are paying more
            //money to use CC. iow, use cash! cash saves you more $$!
            cashOrCreditString = (totalCostInCreditWDiscount > totalCostInCash) ? "cash." : "credit card.";
            //ALWAYS change to positive value, allow you to show in user msg. makes so sense to show user negative amount:
            differenceInCentsPositive = Math.abs(differenceInCents);

            pluralOrNot();

            function dangerBorderAll() {
                var mainFormEls = document.getElementById("mainForm").elements;
                for (var i = 0; i < mainFormEls.length; i++) {
                    mainFormEls[i].style.border = "thin solid tomato";
                }
            }

            function clearBorder() {
                var mainFormEls = document.getElementById("mainForm").elements;
                for (var i = 0; i < mainFormEls.length; i++) {
                    mainFormEls[i].style.border = "thin solid yellow";
                }
            }

            function insertValIntoTable() {
                $cashEl.text(totalCostInCash.toFixed(2));
                $creditEl.text(totalCostInCredit.toFixed(2));
                $creditWDiscEl.text(totalCostInCreditWDiscount.toFixed(2));
            }

            function clearTable() {
                $cashEl.text("");
                $creditEl.text("");
                $creditWDiscEl.text("");
            }

            if (cashPriceEl.value === "") {
                cashPriceEl.style.border = "1px solid tomato";
                pleaseCheckFieldMsg();
                clearTable();
                clearErrorMsg();
            } else {
                cashPriceEl.style.border = "1px solid #ccc";
            }
            if (creditPriceEl.value === "") {
                creditPriceEl.style.border = "1px solid tomato";
                pleaseCheckFieldMsg();
                clearTable();
                clearErrorMsg();
            } else {
                creditPriceEl.style.border = "1px solid #ccc";
            }
            if (bankDiscountEl.value === "") {
                bankDiscountEl.style.border = "1px solid tomato";
                pleaseCheckFieldMsg();
                clearTable();
                clearErrorMsg();
            } else {
                bankDiscountEl.style.border = "1px solid #ccc";
            }
            if (gallonsEl.value === "") {
                gallonsEl.style.border = "1px solid tomato";
                pleaseCheckFieldMsg();
                clearTable();
                clearErrorMsg();

            } else {
                gallonsEl.style.border = "1px solid #ccc";
            }

            if (cashPriceEl.value !== "" && creditPriceEl.value !== "" && bankDiscountEl.value !== "" && gallonsEl.value !== "") {
                $cashEl.text(totalCostInCash.toFixed(2));
                $creditEl.text(totalCostInCredit.toFixed(2));
                $creditWDiscEl.text(totalCostInCreditWDiscount.toFixed(2));
                amtSavedFinalMsg();
            }
            limitInput();
        });
    });
}; ///end of main function:
$(document).ready(main);

 // if bankDiscount and gallons 0, no error comes up.
//DONE user puts 234235.234. and it will still work wtf

//USER input restriction:
//entered val must only have 2 decimals to the right. 2.545 dollars? wtf.
//limit user from typing in a bunch of long numbers. html attribute maxlength doesn't prevent people from typing.
//when you increase gallons, the cost doesn't increase at same rate. it should though, right?
