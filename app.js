//Dependencies: jQuery
// -------------------------------------------------------------------------
var main = function() {
    "use strict";
    var differenceInCents;
    var differenceInCentsPositive;
    var cashOrCreditString;
    var monentaryUnitString;
    var monentaryConversion;

    var cashPrice, creditPrice, bankDiscount, gallons;
    var cashPriceEl, creditPriceEl, bankDiscountEl, gallonsEl;
    var totalCostInCash, totalCostInCredit, totalCostInCreditWDiscount;

    //append these to the DOM, otherwise they will dangle
    var calculationResultContainerEl = $(".calculationResultContainer");
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
            calculationResultContainerEl.append($finalMsgEl.text(msgArrayJoined));
        } else {
            $finalMsgEl.css("color", "black");
            calculationResultContainerEl.append($finalMsgEl.text("At this point, you will pay the same amount using cash or credit."));
            //this happens when cash, cred are around .03 cents each, and bank discount is super high.
        }
    }

    function pleaseCheckFieldMsg() {
        calculationResultContainerEl.append($finalMsgEl.text("Please complete form for calculations to auto start."));
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
                $errorMsgEl.text("Negative numbers not valid")
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

            console.log('before input val', elementVal);

        });
        // console.log('element valueee arr', elementVal);

        //use jQuery to get a reference to the element in array...
        //code below will apply function to every element.
        //similar to how you capture element like this:   var headerEl = $("<h3>");
        $(element).on("input", function() {
            clearErrorMsg();

            //put these variables here so that the values changes everytime input fields change.
            //get IDs of elements, and values they hold to use for calculations, //returns str, NOT a #
            cashPrice = document.getElementById("cashPrice").value;
            creditPrice = document.getElementById("creditPrice").value;
            bankDiscount = document.getElementById("bankDiscount").value;
            gallons = document.getElementById("gallonsNeeded").value;

            cashPriceEl = document.getElementById("cashPrice");
            creditPriceEl = document.getElementById("creditPrice");
            bankDiscountEl = document.getElementById("bankDiscount");
            gallonsEl = document.getElementById("gallonsNeeded");
            //don't delete:
            // console.log('typeof', typeof +cashPrice);
            // console.log('cp', typeof +cashPrice);
            // console.log('true or false', +cashPrice === -2.63);
            // console.log('element', element.value);
            // console.log('element', element.value === "");

            //calculate total, simply the total of cash (cashPrice * gallons), and total Credit (creditPrice * gallons):
            totalCostInCash = parseFloat(gallons) * parseFloat(cashPrice);
            totalCostInCredit = parseFloat(gallons) * parseFloat(creditPrice);
            totalCostInCreditWDiscount = totalCostInCredit - totalCostInCredit * bankDiscount / 100; //should be less than totalCostInCredit due to discount
            //leave rounding till the VERY last step, otherwise JavaScript will give you more decimals
            differenceInCents = ((totalCostInCreditWDiscount - totalCostInCash) * 100).toFixed(0); //rounds your .14540000000000042 to nearest cent, so you get .15, which is .15 of a dollar...
            //differenceInCents will sometimes give a NEGATIVE #, ex: when totalCostInCreditWDiscount(3.23)-totalCostInCash(4.73) = neg!
            //if totalCostInCreditWDiscount is GREATER than totalCostInCash, this means that you are paying more
            //money to use CC. iow, use cash! cash saves you more $$!
            cashOrCreditString = (totalCostInCreditWDiscount > totalCostInCash) ? "cash." : "credit card.";
            //ALWAYS change to positive value, allow you to show in user msg. makes so sense to show user neg. amt.
            differenceInCentsPositive = Math.abs(differenceInCents);

            pluralOrNot();

            function dangerBorderAll() {
                var mainFormEls = document.getElementById("mainForm").elements;
                // console.log('forms', mainFormEls.length);
                // console.log('forms el', mainFormEls[2].value);
                for (var i = 0; i < mainFormEls.length; i++) {
                    console.log('iterate els:', mainFormEls[i]);

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

            if (cashPrice === "") {
                cashPriceEl.style.border = "1px solid tomato";
                pleaseCheckFieldMsg();
                clearTable();
                clearErrorMsg();
            } else {
                cashPriceEl.style.border = "1px solid #ccc";
            }
            if (creditPrice === "") {
                creditPriceEl.style.border = "1px solid tomato";
                pleaseCheckFieldMsg();
                clearTable();
                clearErrorMsg();
            } else {
                creditPriceEl.style.border = "1px solid #ccc";
            }
            if (bankDiscount === "") {
                bankDiscountEl.style.border = "1px solid tomato";
                pleaseCheckFieldMsg();
                clearTable();
                clearErrorMsg();
            } else {
                bankDiscountEl.style.border = "1px solid #ccc";
            }
            if (gallons === "") {
                gallonsEl.style.border = "1px solid tomato";
                pleaseCheckFieldMsg();
                clearTable();
                clearErrorMsg();

            } else {
                gallonsEl.style.border = "1px solid #ccc";
            }

            if (cashPrice !== "" && creditPrice !== "" && bankDiscount !== "" && gallons !== "") {
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
///end of document ready function





/////---------------------NOTES--------------------------------////
///meeet q:
//modular design.

// NOTE: final production:
//fix html input steps, min, etc...

//DONE:
//DONE //prevent this! or messes up your calc! if bankDiscount and gallons 0, it says "you can save 0 cents"
//DONE //whenever station price is empty, result will display NaN. just set when the input field is NaN, set result to empty string.
//DONE if more than 99 cents, then it should convert to dollars
//DONE user puts 234235.234. and it will still work wtf
//if input field empty, or error, focus on box and change color.



//USER input restriction:
//entered val must only have 2 decimals to the right. 2.545 dollars? wtf.
//limit user from typing in a bunch of long numbers. html attribute maxlength doesn't prevent people from typing.
//when you increase gallons, the cost doesn't increase at same rate. it should though, right?


//MORE FEATURES:
//either css change color of word "cash or credit" in finalMsg, because it's hard for user to see changes
//..occur when it's alwaysgreen. maybe little icons or pics.
//reset button to reset all input values to default, will show: "Reset all input fields to default value. Continue?"
//also needs to have "never show me this popup ever again. if neverAnnoyMeAgain === true, then popup never comes up
//when pressing reset"
//click to see how much money you can save over the month, years, by saviing only a few cents now.
//area to put common bank discounts for various banks: chase 1-5%, boa, discover, etc... maybe a
//...dropbox menu for these banks.


//FEATURES - FUTURE if time:
//restrict input value len. user can still tgype in 2.3434235345. not really needed but nice.
//change input fields to look like gas station electronic #
//if bankDiscount input is > 15%, do a description box that says "no bank in existence will give customers more than 15% CB"
//automatically calculate by using slides instead of pressing calc button.
//do you like math prompt? if yes, show them calculation


//challenges i had to think about:
//keeping calcuations to only pennies makes calculations consistent,
//so that i can convert more effectively to dollars. ex: keep differenceInCents consistent by storing only cents
//then i coiuld convert .3254534534 ` to dollars.
//form validation, code hard to keep track, of input fields.
