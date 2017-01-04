//Dependencies: jQuery
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// Main function
// ------------------------------------------------------------------------
var main = function() {
    "use strict";

    var resultHeader = "";
    var differenceInCents;
    var differenceInCentsPositive;
    var cashOrCreditString;
    var monentaryUnitString;
    var monentaryConversion;

    var cashPrice, creditPrice, bankDiscount, gallons;
    var totalCostInCash, totalCostInCredit, totalCostInCreditWDiscount;

    //make sure to append some of these to the DOM, otherwise they will dangle
    var $calculateButtonEl = $(".calculateBtn");
    var calculationResultContainerEl = $(".calculationResultContainer");
    var resultTable = $("<table>");
    var conclusionElement = $("<p>");
    var headerEl = $("<h3>");
    var finalMsgEl = $("<p>");
    var inputFields = $(".formFields li input");
    var cashEl = $("#cashTableData");
    var creditEl = $("#creditTableData");
    console.log('test jQuery ', inputFields.length);
    console.log('tester', inputFields.toArray().length);

    function createResultHeader() {
        //create the result string ONLYif it's empty (first time)
        //we do NOT want the result header created if it already exists
        if (resultHeader === "") {
            console.log('resultHeader is empty, so creating header...');
            resultHeader = resultHeader + "Result";
            // calculationResultContainer.append("<h4>Result</h4>");
            calculationResultContainerEl.append(headerEl);
            headerEl.text(resultHeader);
        }
    }

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
        var msgArray = ['You will pay ', monentaryConversion, monentaryUnitString, ' less if you use ', cashOrCreditString];
        console.log('msgArray', msgArray);
        var msgArrayJoined = msgArray.join("");
        if (monentaryConversion > 0) {
            calculationResultContainerEl.append(finalMsgEl.text(msgArrayJoined));
        } else {
            calculationResultContainerEl.append(finalMsgEl.text("Amount saved too small because there's not much difference in cash and credit price, or bank disc too high, or gallons too low a number."));
            //this happens when cash, cred are around .03 cents each, and bank discount is super high.
        }
    }

    function pleaseCheckFieldMsg() {
        calculationResultContainerEl.append(finalMsgEl.text("Please check input field"));
    }

    //you can just create HTML for this, no need for fxn:
    var horzLineBreak;

    function createHorzLineBreak() {
        //ONLY create a horzLineBreak if it doesn't exist.Important to declare horzLineBreak var...
        //OUTSIDE this fxn. this way it doesn't reset itself when fxn is called repeatedly
        // console.log('horzLineBreak', horzLineBreak === undefined);
        if (horzLineBreak === undefined) {
            horzLineBreak = $("<hr>");
            calculationResultContainerEl.append(horzLineBreak);
        }
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

    inputFields.toArray().forEach(function(element) {
        // var eachInputEl = $(element);
        console.log('element valueee', element.value);
        //use jQuery to get a reference to the element in array...
        //code below will apply function to every element.
        //similar to how you capture element like this:   var headerEl = $("<h3>");
        $(element).on("input", function() {
            createResultHeader();
            //put these variables here so that the values changes everytime input fields change.
            //get IDs of elements, and values they hold to use for calculations, //returns str, NOT a #
            cashPrice = document.getElementById("cashPrice").value;
            creditPrice = document.getElementById("creditPrice").value;
            bankDiscount = document.getElementById("bankDiscount").value;
            gallons = document.getElementById("gallonsNeeded").value;

            var cashPriceEl = document.getElementById("cashPrice");
            var creditPriceEl = document.getElementById("creditPrice");
            var bankDiscountEl = document.getElementById("bankDiscount");
            var gallonsEl = document.getElementById("gallonsNeeded");

            console.log('elementValOninput', element.value);
            console.log('cashPrice inside', cashPrice === "");

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

            // if (cashPrice === "" || creditPrice === "" || bankDiscount === "" || gallons === "") {

            // for (var i = 0; i < inputFields.length; i++) {
            //   inputFields[i].style.backgroundColor = "tomato";
            // }
            if (cashPrice === "") {
                cashEl.text('');
                // cashPriceEl.style.backgroundColor = "red";
                cashPriceEl.style.border = "thick solid red";
                pleaseCheckFieldMsg();
            } else if (creditPrice === "") {
                creditEl.text('');
                // creditPriceEl.style.border = "thick solid #0000FF";
                creditPriceEl.style.border = "thick solid red";
                pleaseCheckFieldMsg();
            } else if (bankDiscount === "") {
                bankDiscountEl.style.border = "thick solid red";
                pleaseCheckFieldMsg();
            } else if (gallons === "") {
                cashEl.text('');
                creditEl.text('');
                gallonsEl.style.border = "thick solid red";
                pleaseCheckFieldMsg();
            } else {
                cashEl.text(totalCostInCash.toFixed(2));
                creditEl.text(totalCostInCredit.toFixed(2));
                amtSavedFinalMsg();
                cashPriceEl.style.border = "none";
                creditPriceEl.style.border = "none";
                bankDiscountEl.style.border = "none";
                gallonsEl.style.border = "none";
            }

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

            pluralOrNot();
            createHorzLineBreak();
            // checkForm(cashPrice);
            // createTableDynamically();

            // resultTablePushValue();

            // console.log('checkForm result', checkForm(cashPrice));
            // amtSavedFinalMsg();
            //should call visible element very last step when all is fine and dandy:
            showResultContainer();
        });
    });
}; ///end of main function:
$(document).ready(main);
///end of document ready function





///meeet q:
//max and maxlength attribute not working, can't prevent user typing
//modular design.



/////---------------------NOTES--------------------------------////
////Final verdict: Have a button or checkbox that ask user: "All finished? click here for final discussion"
//Maybe put this in an organized table, pros and cons,
//people prob dont like to read long P!.  Typically, for most gas stations
//in the South Bay area, cash prices are around ten cents less for many reasons.
//One reason is to encourage people to get inside to buy snacks and spend more.
//But hot Cheetos aside, you can save some money by paying with cash.
//However, it depends on how much you value your time.
//Of course, paying by cash requires you to walk inside,
//and possibly wait a while to pay, whereas credit card is usualy quicker and more convienient.

//ERROR:
//prevent this! or messes up your calc! if bankDiscount and gallons 0, it says "you can save 0 cents"
///bank discoiunt can be 0, that's okay. but maybe point out that it defeats purpose of app.
//whenever station price is empty, result will display NaN. just set when the input field is NaN, set result to empty string.

//user puts 234235.234. and it will still work wtf
//can put neg num
//pressing calcuate > 1 time will not keep result history, and won't show final conclusion msg.
//limit user from typing in a bunch of long numbers. html attribute maxlength doesn't prevent people from typing.


//Test
//DONE if more than 99 cents, then it should convert to dollars
//when you increase gallons, the cost doesn't increase at same rate. it should though, right?


//MORE FEATURES:
//red border around empty str fields . just becareful, might be obtrusive and annoying.
//hide result container if all input fields empty.
//BIGGEST: prevent user entering in stupid # in input
//either css change color of word "cash or credit" in finalMsg, because it's hard for user to see changes
//..occur when it's alwaysgreen. maybe little icons or pics.
//finalMsg jumps is jerky when going from cents to dollars due to space limitation?

//reset button to reset all input values to 0. will show: "Reset all input fields to default value. Continue?"
//also needs to have "never show me this popup ever again. if neverAnnoyMeAgain === true, then popup never comes up
//when pressing reset"
//toggle clear results container!
//button that clears all calculation, right now refresh is the way.
//click to see how much money you can save over the month, years, by saviing only a few cents now.
//put gals in table
//change input fields to look like gas station electronic #
//if input field empty, or error, focus on box and change color.
//area to put common bank discounts for various banks: chase 1-5%, boa, discover, etc... maybe a
//...dropbox menu for these banks.


//USER input restriction:
//entered val must only have 2 decimals to the right. 2.545 dollars? wtf.

//FEATURES - FUTURE if time:
//if bankDiscount input is > 15%, do a description box that says "no bank in existence will give customers more than 15% CB"
//automatically calculate by using slides instead of pressing calc button.
//do you like math prompt? if yes, show them calculation
//kickback points consideration, or other rewards, optional choice for users.


//challenges i had to think about:
//keeping calcuations to only pennies makes calculations consistent,
//so that i can convert more effectively to dollars. ex: keep differenceInCents consistent by storing only cents
//then i coiuld convert .3254534534 ` to dollars. `














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
