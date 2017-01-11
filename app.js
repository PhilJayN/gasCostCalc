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

    //make sure to append some of these to the DOM, otherwise they will dangle
    var $calculateButtonEl = $(".calculateBtn");
    var calculationResultContainerEl = $(".calculationResultContainer");
    var errorMsg = $("#errorMsg");

    // var resultTable = $("<table>");
    var conclusionElement = $("<p>");
    // var headerEl = $("<h3>");
    var finalMsgEl = $("<p>");

    var inputFields = $(".formFields li input");
    var cashEl = $("#cashTableData");
    var creditEl = $("#creditTableData");
    var creditWDiscEl = $("#creditDiscTableData");

    console.log('test jQuery ', inputFields.length);
    console.log('tester', inputFields.toArray().length);

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

    function checkForm(form) {
        console.log('checkForm fxn running...');
        // validation fails if the input has negative sign
        var re = /[-]/;
        // var re = /^[0-9.]+$/;
        var foundNegVal = re.test(cashPrice);
        console.log(foundNegVal);
        if (foundNegVal === true) {
            console.log('check input, you have a negative as a value!');
            return false;
        }
        // // validation was successful
        // return true;
    }

    function amtSavedFinalMsg() {
        //IMPORTANT: to keep it consistent, msg will favor any form of payment that cost LESS!!
        // var msgArray = ['You will pay ', monentaryConversion, monentaryUnitString, ' less if you use ', cashOrCreditString];
        var msgArray = ['You will pay ', monentaryConversion, monentaryUnitString, ' less from your total bill if you use ', cashOrCreditString];
        console.log('msgArray', msgArray);
        var msgArrayJoined = msgArray.join("");
        if (monentaryConversion > 0) {
            finalMsgEl.css("color", "black");
            calculationResultContainerEl.append(finalMsgEl.text(msgArrayJoined));
        } else {
            finalMsgEl.css("color", "black");
            calculationResultContainerEl.append(finalMsgEl.text("Amount saved too small because there's not much difference in cash and credit price, or bank disc too high, or gallons too low a number."));
            //this happens when cash, cred are around .03 cents each, and bank discount is super high.
        }
    }

    function pleaseCheckFieldMsg() {
      // calculationResultContainerEl.append(finalMsgEl.text("Please complete form for calculations to start. Valid numbers: .1 - 40"));
        calculationResultContainerEl.append(finalMsgEl.text("Please complete form for calculations to auto start."));
        // console.log('calc result',calculationResultContainerEl );
        // finalMsgEl.style.color = "tomato";
        finalMsgEl.css("color", "tomato");
        // document.getElementById("myH1").style.color = "red";
    }

    function clearNaN_String() {
        console.log('clearNaNString fxn running...');
        //works:
        // calculationResultContainerEl.text("sdfsdfw");
        cashEl.text("");
        creditEl.text("");
    }

    function showResultContainer() {
        //makes result container visible. First, capture element:
        var capturedElement = document.getElementById("resultContainerDiv");
        //then make visible:
        capturedElement.style.visibility = "visible";
    }

    function hideResultContainer() {
        var capturedElement = document.getElementById("resultContainerDiv");
        capturedElement.style.visibility = "hidden";
    }



    function testFormChecker() {
        var mainFormEls = document.getElementById("mainForm").elements;
        console.log('forms', mainFormEls.length);
        for (var i = 0; i < mainFormEls.length; i++) {
            mainFormEls[i];
            // console.log('main form els', mainFormEls[i]);
            console.log('main form els value:', mainFormEls[i].value);
            console.log('main form val blank', mainFormEls[i].value === "");
            if (mainFormEls[i].value === "") {
                console.log('one of the form field is EMPTY!!');
                cashEl.text('blank!');
                cashEl.text('blank!');
            } else {
                console.log('all good!');
                // cashEl.text('else');
                // console.log('totalCostInCash', totalCostInCash);
                // cashEl.text(totalCostInCash.toFixed(2));
                // console.log('creditEl', creditEl);
                // creditEl.text(totalCostInCredit.toFixed(2));
            }
        }

    }


    //     function limitInput() {
    //         var mainFormEls = document.getElementById("mainForm").elements;
    //         // console.log('forms', mainFormEls.length);
    //         // console.log('forms el', mainFormEls[2].value);
    //         for (var i = 0; i < mainFormEls.length; i++) {
    //             // console.log('iterate els:', mainFormEls[i]);
    // if (mainFormEls[i].value.length > 4) {
    //   mainFormEls[i].value = mainFormEls[i].value.substring(0,4);
    //
    // }
    //
    //             // mainFormEls[i].style.border = "thin solid tomato";
    //         }
    //     }


    // function outOfRangeMsg() {
    //     // var msgArray = ['Number entered: ', monentaryConversion, ' Out of range.', ];
    //     // console.log('msgArray', msgArray);
    //     // var msgArrayJoined = msgArray.join("");
    //     // var msg = document.getElementById("errorMsg");
    //     // msg.textContent('out range!');
    //     errorMsg.text('out of range');
    //
    // }
    //

function clearErrorMsg() {
  errorMsg.text('');

}

    function limitInput() {
        var mainFormEls = document.getElementById("mainForm").elements;
        // console.log('forms', mainFormEls.length);
        // console.log('forms el', mainFormEls[2].value);
        var oldValue = [];
        console.log('limit inpu mainFormEls', mainFormEls[0].value);
        for (var i = 0; i < mainFormEls.length; i++) {
            // console.log('iterate els:', mainFormEls[i]);
            // oldValue = parseFloat(mainFormEls[i].value);
            // if (oldValue < .02 || oldValue > 40) {
            //     mainFormEls[i].value = oldValue;
            //
            // }
            var currentVal = parseFloat(mainFormEls[i].value);
            console.log('currentVal', currentVal);
            if (currentVal > 40) {
              errorMsg.text('Number entered: ' + currentVal + ' is out of range. Valid numbers are .1 - 40 Reverting to original number...');
              }
            // else {
            //   errorMsg.text("");
            // }

            if (parseFloat(mainFormEls[i].value) > 40) {
                mainFormEls[i].value = testArr;
                //msg to user max # reached. you wanted to enter [current num they put]. that is out of range.
            }
            //prevent user typing negative #:
            else if (parseFloat(mainFormEls[i].value) < 0) {
                mainFormEls[i].value = '';
                //msg to user max # reached. you wanted to enter [current num they put]. that is out of range.
            } else if (parseFloat(mainFormEls[i].value) === 0) {
                mainFormEls[i].value = '';5
                errorMsg.text('Number entered: ' + currentVal + ' is out of range. Valid numbers are .1 - 40 Reverting to original number...');

                //msg to user max # reached. you wanted to enter [current num they put]. that is out of range.
            }

            // mainFormEls[i].style.border = "thin solid tomato";
        }
    }


    var testArr;


    inputFields.toArray().forEach(function(element) {
        // var eachInputEl = $(element);
        $(element).on("keydown", function() {

            testArr = element.value;

            console.log('before input val', testArr);

        });
        // console.log('element valueee arr', testArr);

        //use jQuery to get a reference to the element in array...
        //code below will apply function to every element.
        //similar to how you capture element like this:   var headerEl = $("<h3>");
        $(element).on("input", function() {
          clearErrorMsg();

            // limitInput();
            // console.log('elemente!!!', element);

            //put these variables here so that the values changes everytime input fields change.
            //get IDs of elements, and values they hold to use for calculations, //returns str, NOT a #
            cashPrice = document.getElementById("cashPrice").value;
            creditPrice = document.getElementById("creditPrice").value;
            bankDiscount = document.getElementById("bankDiscount").value;
            gallons = document.getElementById("gallonsNeeded").value;

            // var cashPriceEl = document.getElementById("cashPrice");
            // var creditPriceEl = document.getElementById("creditPrice");
            // var bankDiscountEl = document.getElementById("bankDiscount");
            // var gallonsEl = document.getElementById("gallonsNeeded");

            cashPriceEl = document.getElementById("cashPrice");
            creditPriceEl = document.getElementById("creditPrice");
            bankDiscountEl = document.getElementById("bankDiscount");
            gallonsEl = document.getElementById("gallonsNeeded");

            // console.log('elementValOninput', element.value);
            // console.log('cashPrice inside', cashPrice === "");

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



            var cashInputField = {
                cashEl: document.getElementById("cashPrice"),
                valueEmpty: false,

                setEmpty: function() {
                    this.valueEmpty = true;
                },

                setFull: function() {
                    this.valueEmpty = false;
                },

                init: function() {
                        if (this.cashEl.value === "") {
                            this.setEmpty();
                        } else {
                            this.setFull();
                        }
                    }
                    // isNotEmpty = function() {
                    //   this.valueEmpty = false;
                    // }
            };
            cashInputField.init();

            console.log('testing CASH value', cashInputField.cashEl.value);

            var creditInputField = {
                creditEl: document.getElementById("creditPrice"),
                valueEmpty: false,

                setEmpty: function() {
                    this.valueEmpty = true;
                },

                setFull: function() {
                    this.valueEmpty = false;
                },

                init: function() {
                        if (this.creditEl.value === "") {
                            this.setEmpty();
                        } else {
                            this.setFull();
                        }
                    }
                    // isNotEmpty = function() {
                    //   this.valueEmpty = false;
                    // }
            };
            creditInputField.init();



            // if (cashInputField.valueEmpty === true && creditInputField === true) {
            //   cashPriceEl.style.border = "1px solid tomato";
            //   creditPriceEl.style.border = "1px solid tomato";
            //   pleaseCheckFieldMsg();
            // }


            //
            function dangerBorderAll() {
                var mainFormEls = document.getElementById("mainForm").elements;
                // console.log('forms', mainFormEls.length);
                // console.log('forms el', mainFormEls[2].value);
                for (var i = 0; i < mainFormEls.length; i++) {
                    console.log('iterate els:', mainFormEls[i]);

                    mainFormEls[i].style.border = "thin solid tomato";
                    // cashEl.text("asdjkl");
                    //                     creditEl.text("234rjk");
                    //                     creditWDiscEl.text("uio");
                }
            }

            function clearBorder() {
                var mainFormEls = document.getElementById("mainForm").elements;
                // console.log('forms', mainFormEls.length);
                // console.log('forms el', mainFormEls[2].value);
                for (var i = 0; i < mainFormEls.length; i++) {
                    mainFormEls[i].style.border = "thin solid yellow";
                    // cashEl.text("asdjkl");
                    //                     creditEl.text("234rjk");
                    //                     creditWDiscEl.text("uio");
                }
            }

            function insertValIntoTable() {
                cashEl.text(totalCostInCash.toFixed(2));
                creditEl.text(totalCostInCredit.toFixed(2));
                creditWDiscEl.text(totalCostInCreditWDiscount.toFixed(2));
            }

            function clearTable() {
                cashEl.text("");
                creditEl.text("");
                creditWDiscEl.text("");
            }

            // not needed if you use all "ifs" for 4 input fields:
            // if (cashPrice === "" && creditPrice === "" && bankDiscount === "" && gallons === "") {
            //   dangerBorderAll();
            //   pleaseCheckFieldMsg();
            //   clearTable();
            // }

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
                cashEl.text(totalCostInCash.toFixed(2));
                creditEl.text(totalCostInCredit.toFixed(2));
                creditWDiscEl.text(totalCostInCreditWDiscount.toFixed(2));
                amtSavedFinalMsg();
            }

            showResultContainer();


limitInput();
            //
            //  if (cashPrice !== "") {
            //   cashPriceEl.style.border = "1px solid blue";
            //   insertValIntoTable();
            // }

            // else if (cashPrice !=="" && creditPrice !== "" && bankDiscount !== "" && gallons !== "") {
            //   //loop thru and style all form to be not red:
            //     element.style.border = "1px solid blue";
            //                           // cashEl.text("asdjkl");
            //                           // creditEl.text("234rjk");
            //                           // creditWDiscEl.text("uio");
            //                           amtSavedFinalMsg();
            //
            //   }



            // else if (cashPrice !== "") {
            //   cashPriceEl.style.border = "1px solid blue";
            //   insertValIntoTable();
            //   amtSavedFinalMsg();
            // }
            //
            //
            // if (creditPrice === "") {
            //     creditPriceEl.style.border = "1px solid tomato";
            //     pleaseCheckFieldMsg();
            //     clearTable();
            // }
            // else if (creditPrice !== "") {
            //   creditPriceEl.style.border = "1px solid blue";
            //   insertValIntoTable();
            //   amtSavedFinalMsg();
            //
            // }
            //
            //
            //
            // if (bankDiscount === "") {
            //     bankDiscountEl.style.border = "1px solid tomato";
            //     pleaseCheckFieldMsg();
            // }
            // else {
            //   bankDiscountEl.style.border = "1px solid blue";
            // }
            // if (gallons === "") {
            //     gallonsEl.style.border = "1px solid tomato";
            //     pleaseCheckFieldMsg();
            // }
            // else {
            //   gallonsEl.style.border = "1px solid blue";
            // }
            //
            // if (cashPrice !=="" && creditPrice !== "" && bankDiscount !== "" && gallons !== "") {
            //     element.style.border = "1px solid blue";
            //                           // cashEl.text("asdjkl");
            //                           // creditEl.text("234rjk");
            //                           // creditWDiscEl.text("uio");
            //                           amtSavedFinalMsg();
            //
            //   }



            // if (cashPrice === "" && creditPrice === "" && bankDiscount === "" && gallons === "") {
            //   dangerBorderAll();
            //   pleaseCheckFieldMsg();
            // }
            // if (cashPrice === "") {
            //     cashPriceEl.style.border = "1px solid tomato";
            //     pleaseCheckFieldMsg();
            // }
            // else {
            //   cashPriceEl.style.border = "1px solid blue";
            //   amtSavedFinalMsg();
            // }
            //
            // if (creditPrice === "") {
            //     creditPriceEl.style.border = "1px solid tomato";
            //     pleaseCheckFieldMsg();
            // }
            // else {
            //   creditPriceEl.style.border = "1px solid blue";
            //   amtSavedFinalMsg();
            // }
            // if (bankDiscount === "") {
            //     bankDiscountEl.style.border = "1px solid tomato";
            //     pleaseCheckFieldMsg();
            // }
            // else {
            //   bankDiscountEl.style.border = "1px solid blue";
            //   amtSavedFinalMsg();
            // }
            // if (gallons === "") {
            //     gallonsEl.style.border = "1px solid tomato";
            //     pleaseCheckFieldMsg();
            // }
            // else {
            //   gallonsEl.style.border = "1px solid blue";
            //   amtSavedFinalMsg();
            // }

            // else if () {
            //
            // }


            // else {
            //   element.style.border = "1px solid blue";
            //
            // }
            // else if (element.value === "") {
            //   element.style.border = "1px solid tomato";
            // }

            // else if (cashInputField.valueEmpty === true || creditInputField === true) {
            //   cashPriceEl.style.border = "1px solid tomato";
            //   creditPriceEl.style.border = "1px solid tomato";
            //   pleaseCheckFieldMsg();
            // }
            // else {
            //   cashPriceEl.style.border = "1px solid blue";
            //   creditPriceEl.style.border = "1px solid blue";
            //
            //   amtSavedFinalMsg();
            // }


            // console.log('element val', element.value);
            // if (element.value === "") {
            //   // element.style.backgroundColor = "tomato";
            //   element.style.border = "1px solid red";
            //                         cashEl.text("asdjkl");
            //                         creditEl.text("234rjk");
            //                         creditWDiscEl.text("uio");
            //                         pleaseCheckFieldMsg();
            // }


            ///IN PROGRESS:
            // if (cashPrice === "" && creditPrice === "" && bankDiscount === "" && gallons === "") {
            //   element.style.border = "1px solid red";
            //   pleaseCheckFieldMsg();
            // }
            //
            // else if (cashPrice === "" || creditPrice === "" || bankDiscount === "" || gallons === "") {
            //
            //     element.style.border = "1px solid red";
            //     cashEl.text("asdjkl");
            //     creditEl.text("234rjk");
            //     creditWDiscEl.text("uio");
            //     pleaseCheckFieldMsg();
            // }
            // else {
            //   element.style.border = "1px solid blue";
            //   amtSavedFinalMsg();
            //
            // }

            //
            // else if (cashPrice === "" && creditPrice === "" && bankDiscount === "" && gallons === "") {
            //     element.style.border = "1px solid red";
            //     cashEl.text("asdjkl");
            //     creditEl.text("234rjk");
            //     creditWDiscEl.text("uio");
            //     pleaseCheckFieldMsg();
            // }
            //
            // else {
            //     element.style.border = "1px solid blue";
            //
            //     amtSavedFinalMsg();
            // }

            // if (cashPrice !=="" && creditPrice !== "" && bankDiscount !== "" && gallons !== "") {
            //     element.style.border = "1px solid blue";
            //                           // cashEl.text("asdjkl");
            //                           // creditEl.text("234rjk");
            //                           // creditWDiscEl.text("uio");
            //                           amtSavedFinalMsg();
            //
            //   }
            //



            //
            // // console.log('element val', element.value);
            // if (element.value === "") {
            //   // element.style.backgroundColor = "tomato";
            //   element.style.border = "1px solid red";
            //                         cashEl.text("asdjkl");
            //                         creditEl.text("234rjk");
            //                         creditWDiscEl.text("uio");
            //                         pleaseCheckFieldMsg();
            // }
            // else {
            //   if (cashPrice !=="" && creditPrice !== "" && bankDiscount !== "" && gallons !== "") {
            //     element.style.border = "1px solid blue";
            //                           // cashEl.text("asdjkl");
            //                           // creditEl.text("234rjk");
            //                           // creditWDiscEl.text("uio");
            //                           amtSavedFinalMsg();
            //
            //   }
            //
            //
            // }



            // if (cashPrice === "" || creditPrice === "" || bankDiscount === "" || gallons === "") {

            // for (var i = 0; i < inputFields.length; i++) {
            //   inputFields[i].style.backgroundColor = "tomato";
            // }

            //
            //
            // function setBorder(element) {
            //   cashPriceEl.style.border = "1px solid #79c822";
            // }








            //
            // function checkFormForBlank() {
            //     var mainFormEls = document.getElementById("mainForm").elements;
            //     // console.log('forms', mainFormEls.length);
            //     // console.log('forms el', mainFormEls[2].value);
            //     for (var i = 0; i < mainFormEls.length; i++) {
            //         console.log('iterate els:', mainFormEls[i]);
            //         if (mainFormEls[i].value === "") {
            //             mainFormEls[i].style.border = "thin solid tomato";
            //             // cashEl.text("asdjkl");
            //             //                     creditEl.text("234rjk");
            //             //                     creditWDiscEl.text("uio");
            //                                 pleaseCheckFieldMsg();
            //         }
            //     }
            // }
            //
            // function restoreFormFields() {
            //   var mainFormEls = document.getElementById("mainForm").elements;
            //   for (var i = 0; i < mainFormEls.length; i++) {
            //       console.log('iterate els:', mainFormEls[i]);
            //
            //                if (mainFormEls[i].value !== "") {
            //                   mainFormEls[i].style.border = "1px solid #ccc";
            //                         cashEl.text(totalCostInCash.toFixed(2));
            //                         creditEl.text(totalCostInCredit.toFixed(2));
            //                         creditWDiscEl.text(totalCostInCreditWDiscount.toFixed(2));
            //                         amtSavedFinalMsg();
            //               }
            //
            //   }
            //
            // }
            // checkFormForBlank();
            // restoreFormFields();





            // else if (mainFormEls[i].value !== "")  {
            //     mainFormEls[i].style.border = "thin solid black";
            //     amtSavedFinalMsg();
            //
            // }




            //
            //  function formValidator() {
            //      var mainFormEls = document.getElementById("mainForm").elements;
            //      console.log('forms', mainFormEls);
            //      for (var i = 0; i < mainFormEls.length; i++) {
            //          console.log('iterate els:', mainFormEls[i]);
            //          // console.log('one');
            //          // console.log('two');
            //
            //              if (mainFormEls[i] === "") {
            //                 mainFormEls[i].style.border = "1px solid tomato";
            //                       cashEl.text("asdjkl");
            //                       creditEl.text("234rjk");
            //                       creditWDiscEl.text("uio");
            //                       pleaseCheckFieldMsg();
            //             }
            //         //
            //        //   if (mainFormEls[i] !== "") {
            //        //      mainFormEls[i].style.border = "1px solid #ccc";
            //        //            cashEl.text(totalCostInCash.toFixed(2));
            //        //            creditEl.text(totalCostInCredit.toFixed(2));
            //        //            creditWDiscEl.text(totalCostInCreditWDiscount.toFixed(2));
            //        //            amtSavedFinalMsg();
            //        //  }
            //
            //      }
            //
            //  }
            //  formValidator();






            // function validateForm () {
            //   console.log('cashPriceEl should be', cashPriceEl);
            //   // cashPriceEl.style.backgroundColor = "red";
            //   if (cashPriceEl.value === "") {
            //     console.log('this lthis this', this);
            //       cashEl.text('');
            //       cashPriceEl.style.border = "thin solid tomato";
            //       pleaseCheckFieldMsg();
            //     }
            //     // else if (cashPriceEl !== ""){
            //     //       cashEl.text(totalCostInCash.toFixed(2));
            //     //       amtSavedFinalMsg();
            //     //       cashPriceEl.style.border = "1px solid #79c822";
            //     //       // creditPriceEl.style.border = "none";
            //     //       // bankDiscountEl.style.border = "none";
            //     //       // gallonsEl.style.border = "none";
            //     // }
            //
            //
            //
            //
            //     // if (creditPriceEl.value === "") {
            //
            //     //     creditEl.text('');
            //     //     creditWDiscEl.text('');
            //     //     creditPriceEl.style.border = "1px solid tomato";
            //     //     pleaseCheckFieldMsg();
            //     //   }
            //     //
            //     //
            //     //   else if (creditPriceEl !== ""){
            //     //         creditEl.text(totalCostInCredit.toFixed(2));
            //     //         creditWDiscEl.text(totalCostInCreditWDiscount.toFixed(2));
            //     //
            //     //         amtSavedFinalMsg();
            //     //         creditPriceEl.style.border = "1px solid #79c822";
            //     //         // creditPriceEl.style.border = "none";
            //     //         // bankDiscountEl.style.border = "none";
            //     //         // gallonsEl.style.border = "none";
            //     //   }
            //
            //
            //     // else if (cashPriceEl.value !== "") {
            //     //       cashEl.text(totalCostInCash.toFixed(2));
            //     //       amtSavedFinalMsg();
            //     //       cashPriceEl.style.border = "1px solid #79c822";
            //     //       // creditPriceEl.style.border = "none";
            //     //       // bankDiscountEl.style.border = "none";
            //     //       // gallonsEl.style.border = "none";
            //     // }
            //
            //
            //               // }
            //
            //   // else if (bankDiscount === "") {
            //   //     creditWDiscEl.text('');
            //   //     bankDiscountEl.style.border = "thin solid tomato";
            //   //     pleaseCheckFieldMsg();
            //   // } else if (gallons === "") {
            //   //     cashEl.text('');
            //   //     creditEl.text('');
            //   //     creditWDiscEl.text('');
            //   //     gallonsEl.style.border = "thin solid tomato";
            //   //     pleaseCheckFieldMsg();
            //   // } else {
            //   //     cashEl.text(totalCostInCash.toFixed(2));
            //   //     creditEl.text(totalCostInCredit.toFixed(2));
            //   //     creditWDiscEl.text(totalCostInCreditWDiscount.toFixed(2));
            //   //     amtSavedFinalMsg();
            //   //     // cashPriceEl.style.border = "none";
            //   //     // creditPriceEl.style.border = "none";
            //   //     // bankDiscountEl.style.border = "none";
            //   //     // gallonsEl.style.border = "none";
            //   // }
            //
            // }


            // validateForm();









            //
            // // cashPriceEl.style.backgroundColor = "red";
            // if (cashPrice === "") {
            //     cashEl.text('');
            //     cashPriceEl.style.border = "thick solid red";
            //     pleaseCheckFieldMsg();
            // } else if (creditPrice === "") {
            //     creditEl.text('');
            //     creditWDiscEl.text('');
            //     creditPriceEl.style.border = "thick solid red";
            //     pleaseCheckFieldMsg();
            // } else if (bankDiscount === "") {
            //     creditWDiscEl.text('');
            //     bankDiscountEl.style.border = "thick solid red";
            //     pleaseCheckFieldMsg();
            // } else if (gallons === "") {
            //     cashEl.text('');
            //     creditEl.text('');
            //     creditWDiscEl.text('');
            //     gallonsEl.style.border = "thick solid red";
            //     pleaseCheckFieldMsg();
            // } else {
            //     cashEl.text(totalCostInCash.toFixed(2));
            //     creditEl.text(totalCostInCredit.toFixed(2));
            //     creditWDiscEl.text(totalCostInCreditWDiscount.toFixed(2));
            //     amtSavedFinalMsg();
            //     cashPriceEl.style.border = "none";
            //     creditPriceEl.style.border = "none";
            //     bankDiscountEl.style.border = "none";
            //     gallonsEl.style.border = "none";
            // }

            // //check if input fields are empty, then result field is empty. otherwise put in the calc. results
            // if (cashPrice === "" || gallons === "") {
            //   cashEl.text('');
            // }
            // else {
            //   cashEl.text(totalCostInCash.toFixed(2));
            // }
            // //works, but using ternary operator:
            // // var cashElResult = (cashPrice === "" || gallons === "") ? cashEl.text("") : cashEl.text(totalCostInCash.toFixed(2));
            //
            // if (creditPrice === "" || gallons === "") {
            //     creditEl.text('');
            // } else {
            //     creditEl.text(totalCostInCredit.toFixed(2));
            // }
            //DO NOT delete, useful:
            // console.log('totalCostInCash', totalCostInCash);
            // console.log('totalCostInCredit', totalCostInCredit);
            // console.log('totalCostInCreditWDiscount', totalCostInCreditWDiscount);
            // console.log('differenceInCents', differenceInCents);
            // console.log('type differenceInCents', typeof differenceInCents);
            // console.log('differenceInCentsPositive', differenceInCentsPositive);

            // createHorzLineBreak();
            // checkForm(cashPrice);
            // createTableDynamically();

            // resultTablePushValue();

            // console.log('checkForm result', checkForm(cashPrice));
            // amtSavedFinalMsg();
            //should call visible element very last step when all is fine and dandy:






        });
    });
}; ///end of main function:
$(document).ready(main);
///end of document ready function





///meeet q:
//max and maxlength attribute not working, can't prevent user typing
//modular design.



/////---------------------NOTES--------------------------------////


// NOTE: final production:
//fix html input steps, min, etc...

//ERROR:
//DONE //prevent this! or messes up your calc! if bankDiscount and gallons 0, it says "you can save 0 cents"
//DONE //whenever station price is empty, result will display NaN. just set when the input field is NaN, set result to empty string.

//USER input restriction:
//entered val must only have 2 decimals to the right. 2.545 dollars? wtf.
//user puts 234235.234. and it will still work wtf
//can put neg num
//limit user from typing in a bunch of long numbers. html attribute maxlength doesn't prevent people from typing.

//Test
//DONE if more than 99 cents, then it should convert to dollars
//when you increase gallons, the cost doesn't increase at same rate. it should though, right?


//MORE FEATURES:
//change color of "please complete form to tomato."
//either css change color of word "cash or credit" in finalMsg, because it's hard for user to see changes
//..occur when it's alwaysgreen. maybe little icons or pics.
//reset button to reset all input values to 0. will show: "Reset all input fields to default value. Continue?"
//also needs to have "never show me this popup ever again. if neverAnnoyMeAgain === true, then popup never comes up
//when pressing reset"

//click to see how much money you can save over the month, years, by saviing only a few cents now.
//if input field empty, or error, focus on box and change color.
//area to put common bank discounts for various banks: chase 1-5%, boa, discover, etc... maybe a
//...dropbox menu for these banks.


//FEATURES - FUTURE if time:
//change input fields to look like gas station electronic #
//if bankDiscount input is > 15%, do a description box that says "no bank in existence will give customers more than 15% CB"
//automatically calculate by using slides instead of pressing calc button.
//do you like math prompt? if yes, show them calculation


//challenges i had to think about:
//keeping calcuations to only pennies makes calculations consistent,
//so that i can convert more effectively to dollars. ex: keep differenceInCents consistent by storing only cents
//then i coiuld convert .3254534534 ` to dollars.
//form validation, code hard to keep track, of input fields.




//123
//


// console.log('eachInputEl', eachInputEl.value);

// for (var i = 0; i < eachInputEl.length; i++) {
//   console.log('element loop', eachInputEl[i].value);
//
//
//               if (eachInputEl.value === "") {
//                 console.log('found empty element');
//                   cashEl.text('');
//                 }
//               if (element.value !== "") {
//                 // console.log('type of', typeof totalCostInCash);
//                 // cashEl.text(totalCostInCash);
//                 // creditEl.text(totalCostInCredit);
//               }
// }
// console.log('jQuery element', $(element));

// //you can just create HTML for this, no need for fxn:
// var horzLineBreak;
// function createHorzLineBreak() {
//     //ONLY create a horzLineBreak if it doesn't exist.Important to declare horzLineBreak var...
//     //OUTSIDE this fxn. this way it doesn't reset itself when fxn is called repeatedly
//     // console.log('horzLineBreak', horzLineBreak === undefined);
//     if (horzLineBreak === undefined) {
//         horzLineBreak = $("<hr>");
//         calculationResultContainerEl.append(horzLineBreak);
//     }
// }

//
// function createResultHeader() {
//     //create the result string ONLYif it's empty (first time)
//     //we do NOT want the result header created if it already exists
//     if (resultHeader === "") {
//         console.log('resultHeader is empty, so creating header...');
//         resultHeader = resultHeader + "Result";
//         // calculationResultContainer.append("<h4>Result</h4>");
//         calculationResultContainerEl.append(headerEl);
//         headerEl.text(resultHeader);
//     }
// }


// function resultTablePushValue() {
//     // var creditEl = document.getElementById("creditTotalPush");
//     // creditEl.textContent(totalCostInCash);
//     // console.log('credit test', credit.textContent);
//     // console.log('teddy', totalCostInCash);
//     cashEl.text('hi there');
//
// }
//

// function formChecker() {
//     var mainFormEls = document.getElementById("mainForm").elements;
//     console.log('forms', mainFormEls);
//     // console.log('forms', mainFormEls.length);
//     for (var i = 0; i < mainFormEls.length; i++) {
//         mainFormEls[i];
//         // console.log('main form els', mainFormEls[i]);
//         console.log('main form els value:', mainFormEls[i].value);
//         console.log('main form val blank', mainFormEls[i].value === "");
//         if (mainFormEls[i].value === "") {
//             console.log('one of the form field is EMPTY!!');
//             cashEl.text('blank!');
//             cashEl.text('blank!');
//         } else {
//             // cashEl.text('else');
//             // console.log('totalCostInCash', totalCostInCash);
//             // cashEl.text(totalCostInCash.toFixed(2));
//             // console.log('creditEl', creditEl);
//             // creditEl.text(totalCostInCredit.toFixed(2));
//         }
//     }
// }




//
// var inputFieldsStatus = {
//     "cashFieldEmpty": "",
//     "creditFieldEmpty": "",
//     "bankDiscountFieldEmpty": "",
//     "gallonsFieldEmpty": "",
//     "allFieldsEmpty": ""
// };


// function checkForm(form) {
//     console.log('checkForm fxn running...');
//     if (cashPrice === "") {
//         alert("Error: Input is empty!");
//         // form.inputfield.focus();
//         return false;
//     }
//     // validation fails if the input has negative sign
//     var re = /[-]/;
//     // var re = /^[0-9.]+$/;
//     var foundNegVal = re.test(cashPrice);
//     console.log(foundNegVal);
//     if (foundNegVal === true) {
//         console.log('check input, you have a negative as a value!');
//         return false;
//     }
//     // // validation was successful
//     // return true;
// }

// var msgArray = ['You can save ', monentaryConversion, monentaryUnitString, ' by using ', cashOrCreditString];
// var msgArray = ['It will be ', monentaryConversion, monentaryUnitString, ' less if you pay using ', cashOrCreditString];
//It will be 2.72 dollars less if you pay using cash.
//You will pay 2.72 dollars less if you use cash.


//
// function createTableDynamically() {
//   //the purpose of this table is so that individual calculation results(cashPrice, creditPrice),
//   //will populate in the table automatically without having to target them using ids.
//     ///careful, you need to reset both arrays or else it will keep adding data to it when user
//     ///clicks on calculate button.
//     priceArray.push(totalCostInCash, totalCostInCredit, totalCostInCreditWDiscount, differenceInCents);
//     tableDataArray.push("Total Cash", "Total Credit", "Total Credit with Discount.", "Difference");
//     ////dynamically create HTML table when user clicks on calculate button:
//     var table = '';
//     var rows = 4;
//     var cols = 2;
//     var arrayIndex = 0;
//     //outside loop creates the rows (4 rows total)
//     for (var r = 0; r < rows; r++) {
//         table += "<tr>";
//         //inside loop creates the table data (2 td created every inner loop run)
//         for (var tdCreator = 0; tdCreator < 1; tdCreator++) {
//             table += "<td>" + tableDataArray[arrayIndex] + "</td>";
//             table += "<td>" + priceArray[arrayIndex] + "</td>";
//         }
//         //when inner loop exits, arrayIndex incremented. this way we can iterate through
//         //the arrays
//         arrayIndex++;
//         table += "</tr>";
//     }
//     //the variable 'table' is a huge long string of html and text. The code below appends this
//     //into the calculationResultContainerEl (a div)
//     calculationResultContainerEl.append(table);
//     // calculationResultContainerEl.append(conclusionElement);
// }
//
//



//
// /////---------------------------ORIGINAL CALC BUTTON CALCULATE---------------------------////
//     //create click handler for calculate button element and run code when it is clicked//
//     // console.log('calc el', $calculateButtonEl);
//     $calculateButtonEl.on("click", function() {
//         //create the result string ONLY if it's empty (first time)
//         //because we do NOT want the result header created everytime user clicks calculateBtn:
//         if (resultHeader === "") {
//             console.log('resultHeader is empty, so creating header...');
//             resultHeader = resultHeader + "Calculation Result";
//             // calculationResultContainer.append("<h4>Result</h4>");
//             calculationResultContainerEl.append(headerEl);
//             headerEl.text(resultHeader);
//         }
//
//         calculationResultContainerEl.append(runNumber);
//         calcButtonClickCounter();
//         //don't delete:
//         // console.log('typeof', typeof +cashPrice);
//         // console.log('cp', typeof +cashPrice);
//         // console.log('true or false', +cashPrice === -2.63);
//         function checkForm(form) {
//             if (cashPrice === "") {
//                 alert("Error: Input is empty!");
//                 // form.inputfield.focus();
//                 return false;
//             }
//             // validation fails if the input has negative sign
//             var re = /[-]/;
//             // var re = /^[0-9.]+$/;
//             var foundNegVal = re.test(cashPrice);
//             console.log(foundNegVal);
//             if (foundNegVal === true) {
//                 console.log('check input, you have a negative as a value!');
//                 return false;
//             }
//             // // validation was successful
//             // return true;
//         }
//         /////------------end of checkForm fxn----------////
//         checkForm(cashPrice);
//         console.log('checkForm result', checkForm(cashPrice));
//         // if (cashPrice ==="" || creditPrice ==="" || bankDiscount==="" || gallons ==="") {
//         //   alert('Please do not leave input fields blank!!'); //change this to a description box, looks bette
//         //   return false;
//         // }
//
//         //push calculation result and table data title into arrays:
//         ///careful, you need to reset both arrays or else it will keep adding data to it when user
//         ///clicks on calculate button.
//         priceArray.push(totalCostInCash, totalCostInCredit, totalCostInCreditWDiscount, differenceInCents);
//         tableDataArray.push("Total Cash", "Total Credit", "Total Credit with Discount.", "Difference");
//
//         ////dynamically create HTML table when user clicks on calculate button:
//         var table = '';
//         var rows = 4;
//         var cols = 2;
//         var arrayIndex = 0;
//         // price arr [2.63, 2.73, 2.7027, 0.07270000000000021]
//         //table data arr ["Cash Price", "Credit Price", "Credit Price with Discount", "Difference"]
//         // console.log('len', priceArray.length);
//         // console.log('len', tableDataArray.length);
//         // console.log(priceArray[3]);
//         // console.log(tableDataArray[2]);
//
//         //outside loop creates the rows (4 rows total)
//         for (var r = 0; r < rows; r++) {
//             table += "<tr>";
//             //inside loop creates the table data (2 td created every inner loop run)
//             for (var tdCreator = 0; tdCreator < 1; tdCreator++) {
//                 table += "<td>" + tableDataArray[arrayIndex] + "</td>";
//                 table += "<td>" + priceArray[arrayIndex] + "</td>";
//             }
//             //when inner loop exits, arrayIndex incremented. this way we can iterate through
//             //the arrays
//             arrayIndex++;
//             table += "</tr>";
//         }
//         calculationResultContainerEl.append(table);
//         calculationResultContainerEl.append(conclusionElement);
//
//         var msgArray = ['You can save ', monentaryConversion, monentaryUnitString, ' by using ', cashOrCreditString];
//         console.log('msgArray', msgArray);
//         var msgArrayJoined = msgArray.join("");
//         if (cashPrice === creditPrice && bankDiscount === 0) {
//             calculationResultContainerEl.append(finalMsgEl.text("Cash and credit price is the same, while bank discount is 0. It is the same price!"));
//         } else {
//             calculationResultContainerEl.append(finalMsgEl.text(msgArrayJoined));
//         }
//
//         //create horizontal line break at the end:
//         var horzLineBreak = $("<hr>");
//         calculationResultContainerEl.append(horzLineBreak);
//         // calculationResultContainerEl.style.visibility = "visible";
//         // var resultContainerDiv = document.getElementsByClassName("calculationResultContainer");
//
//         //makes result container visible. First, capture element:
//         var capturedElement = document.getElementById("resultContainerDiv");
//         //then, show visibility:
//         capturedElement.style.visibility = "visible";
//         ///closing of calculate button function:
//     });
//     /////---------------------------ORIGINAL CALC BUTTON CALCULATE END---------------------------////






// for (var i = 0; i < inputFields.length; i++) {
//   inputFields[i].style.backgroundColor = "tomato";
// }


//     var cashPriceEl = document.getElementById("cashPrice");
//     var creditPriceEl = document.getElementById("creditPrice");
//     var bankDiscountEl = document.getElementById("bankDiscount");
//     var gallonsEl = document.getElementById("gallonsNeeded");
//
// cashPriceEl.onchange = function () {
//   calculate();
// };
//
// creditPriceEl.onchange = function () {
//   calculate();
// };
//
// bankDiscountEl.onchange = function () {
//   calculate();
// };
//
// gallonsEl.onchange = function () {
//   calculate();
// };




//use querySelectorAll and push elements into arr. it works, but lokos ugly.
//     function testFxn () {
//       console.log('dfsgsdfg!');
//     }
//     var inputFieldsArr = [];
//     for (var i = 0; i < inputFields.length; i++) {
//       inputFieldsArr.push(inputFields[i]);
//       }
//       console.log('inputFieldsArr', inputFieldsArr[0]);
// inputFieldsArr[0].onchange = function () {
//   calculate();
// };

// inputFields.on("click", function() {
//   console.log('238947+!');
// });


// // checks for plurality:
// if (isPlural === true) {
//    monentaryUnitString = (differenceInCentsPositive >= 101) ? " cents": " dollars";
// }
// // NOT plural:
// else {
//   //  monentaryUnitString = (differenceInCentsPositive >= 100) ? " cent":" dollar";
//     monentaryUnitString = (differenceInCentsPositive >= 100) ? " cent":" dollar";
//    convertToDollar = differenceInCentsPositive / 100; //changes those cents to dollars.
//    //have to convert that differenceInCentsPositive to dollars by diving by 100. so 200cents/100 = 2 dollars
// }



//
// //jQuery create element template to put in FINAL conclusion:
// var elConclusion = $("<p>");
// var amtSaved = (difference * 100).toFixed(2);
// var cents = 'cents';
// var dollars = 'dollars';
// var conclusionMsg = 'You can shave approximately ' + 'hi' + 'centOrDollars' + ' off your total bill by using ';
//
// console.log(conclusionMsg);
// function conclusionMsg(amtSaved) {
//     if (amtSaved < 100) {
//         elConclusion.text('You can shave approximately ' + amtSaved + ' cents off your total bill by using ');
//     } else {
//         elConclusion.text('You can shave approximately ' + amtSaved + ' dollars off your total bill by using ');
//     }
// }
// // elConclusion.text('You can shave approximately ' + amtSaved + dollarorCents +  off your total bill by using ' + cash + credit );
//
//
//
// //code below runs depending on whether it's cheaper to pay with cash or credit:
// if (totalCreditWDiscount < totalCash) {
//     finalMsg(amtSaved);
// }
// calculationResultContainerEl.append(elConclusion);
// //   elConclusion.text(conclusionMsg + 'credit card!');
// // }
// // else {
// //   elConclusion.text(conclusionMsg + 'cash!');
// // }


//use jQuery to create elements and put in calculation results:
// var $totalCash = $("<td>").text(totalCash);
// var $totalCredit =  $("<td>").text(totalCredit);
// var $totalCreditWDiscount = $("<td>").text(totalCreditWDiscount);
// $("#cashTr").append($totalCash);
// $("#creditTr").append($totalCredit);
// $("#creditAndDiscountTr").append($totalCreditWDiscount);
// $("#diffTr").append(difference);
//
// //

// ///testing table creation template
// function createResultTable () {
//   //first, create elements:
//   $(".calculationResultContainer").append("<table></table>");
//     // var $table = $(".calculationResultContainer").children(); ///this holds a jQuery obj. (<table> element is created, but dangling)
//     //   var $row1 = $table.append( $("<tr><td>A</td><td>B</td></tr>") );
//     //   var $row2 = $table.append( $("<tr><td>Testdata</td></tr>") );
//     //   var $row3 = $table.append( .63$("<tr></tr>") );
//       // var $row4 = $table.append( $("<tr><p>jasdklf</p></tr>") );
//     // $row4.append("<td></td>").text(testData);
//     // $row1.text('hi');
//   //   var $tHeader = $("<th>").text("table header");
//   //   var $tableData = $("<td>").text("test");
//   //
//   // //second, target those newly created elements, and append other elements to it:
//   //   $("table").append($row);
//   //   $("tr").append($tableData);
//   //   $("tr").append($tHeader);
//
//   //finally, target calculationResultContainer div and append everything to it:
//     // $(".calculationResultContainer").append($table);
//
// }


// //create new dangling table and tr element
// var $newTable = $("<table>");
// var tr1 = $("<tr>");
// var tr2 = $("<tr>");
// var tr3 = $("<tr>");
// var tr4 = $("<tr>");
//
// //append table rows to table element.
// $newTable.append(tr1);
// $newTable.append(tr2);
// $newTable.append(tr3);
// $newTable.append(tr4);
// ///so far, $newTable looks like: <table> <tr></tr> </table>
//
// //create new dangling table data element
// var td1 = $("<td>");
// var td2 = $("<td>");
// var td3 = $("<td>");
// var td4 = $("<td>");
//
// //append table data element to rows
// tr1.append(td1);
// tr1.append(td2);
// tr1.append(td3);
// tr1.append(td4);
//
//
// td1.text('td1 text!');
// td2.text('td2 text!');
// td1.text('td3 text!');
// td2.text('td4 text!');
//
// $("#resultTable").append($newUl);
