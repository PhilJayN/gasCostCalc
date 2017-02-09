//Dependencies: jQuery
// -------------------------------------------------------------------------
var main = function() {
    "use strict";
    var differenceInCents;
    var differenceInCentsPositive;
    var cashOrCreditStr;
    var currencyUnitStr;
    var monentaryConversion;

    var $calcResultEl = $(".calculationResultContainer");
    var $errorMsgEl = $("#errorMsgEl");
    var $finalMsgEl = $("<p>");
    var $inputFieldsEl = $(".formFields li input");
    var $cashEl = $("#cashTableData");
    var $creditEl = $("#creditTableData");
    var $creditWDiscEl = $("#creditDiscTableData");

    function pluralize() {
        if (differenceInCentsPositive <= 1) {
            currencyUnitStr = " cent";
            monentaryConversion = differenceInCentsPositive;
        } else if (differenceInCentsPositive <= 99) {
            currencyUnitStr = " cents";
            monentaryConversion = differenceInCentsPositive;
        } else if (differenceInCentsPositive === 100) {
            currencyUnitStr = " dollar";
            monentaryConversion = differenceInCentsPositive / 100;
        } else if (differenceInCentsPositive >= 101) {
            currencyUnitStr = " dollars";
            monentaryConversion = differenceInCentsPositive / 100;
        }
    }

    function amtSavedFinalMsg() {
        //IMPORTANT: to keep it consistent, msg shown on screen will favor any form of payment that cost LESS!!
        var msgArray = ['You will pay ', monentaryConversion, currencyUnitStr, ' less from your total bill if you use ', cashOrCreditStr];
        var msgArrayJoined = msgArray.join("");
        if (monentaryConversion > 0) {
            $finalMsgEl.css("color", "black");
            $calcResultEl.append($finalMsgEl.text(msgArrayJoined));
        } else {
            $finalMsgEl.css("color", "black");
            $calcResultEl.append($finalMsgEl.text("At this point, you will pay the same amount using cash or credit."));
        }
    }

    function pleaseCheckFieldMsg() {
        $calcResultEl.append($finalMsgEl.text("Please complete form for calculations to auto start."));
        $finalMsgEl.css("color", "tomato");
    }

    function clearErrorMsg() {
        $errorMsgEl.text('');
    }

    function limitInput() {
        var mainFormEls = document.getElementById("mainForm").elements;
        for (var i = 0; i < mainFormEls.length; i++) {
            var currentVal = parseFloat(mainFormEls[i].value);
            if (currentVal > 40) {
                $errorMsgEl.text('Number entered: ' + currentVal + ' is out of range. Valid numbers are .1 - 40 ');
            }
            if (parseFloat(mainFormEls[i].value) > 40) {
                mainFormEls[i].value = elementVal;
                $finalMsgEl.text("");
            }
            //prevent user from typing negative #:
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
            var cashPriceEl = document.getElementById("cashPrice");
            var creditPriceEl = document.getElementById("creditPrice");
            var bankDiscountEl = document.getElementById("bankDiscount");
            var gallonsEl = document.getElementById("gallonsNeeded");

            var totalCostInCash = parseFloat(gallonsEl.value) * parseFloat(cashPriceEl.value);
            var totalCostInCredit = parseFloat(gallonsEl.value) * parseFloat(creditPriceEl.value);
            var totalCostInCreditWDiscount = totalCostInCredit - totalCostInCredit * bankDiscountEl.value / 100; //should be less than totalCostInCredit due to discount
            //leave rounding till the VERY last step, otherwise JavaScript will give you more decimals
            differenceInCents = ((totalCostInCreditWDiscount - totalCostInCash) * 100).toFixed(0); //rounds your .14540000000000042 to nearest cent, so you get .15, which is .15 of a dollar...
            //differenceInCents will sometimes give a NEGATIVE #, ex: when totalCostInCreditWDiscount(3.23)-totalCostInCash(4.73) = neg!
            //if totalCostInCreditWDiscount is GREATER than totalCostInCash, this means that you are paying more
            //money to use CC. iow, use cash! cash saves you more $$!
            cashOrCreditStr = (totalCostInCreditWDiscount > totalCostInCash) ? "cash." : "credit card.";
            //ALWAYS change to positive value, allow you to show in user msg. makes so sense to show user negative amount:
            differenceInCentsPositive = Math.abs(differenceInCents);

            pluralize();

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

//entered val must only have 2 decimals to the right. 2.545 dollars?
//limit user from typing in a bunch of long numbers. html attribute maxlength doesn't prevent people from typing.
//when you increase gallons, the cost doesn't increase at same rate. it should though, right?
