//Dependencies: jQuery
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// Main function
// ------------------------------------------------------------------------
var main = function() {
    "use strict";
    var priceArray = [];
    var tableDataArray = [];
    var resultHeader = "";
    var differenceInCents;
    var differenceInCentsPositive;
    var cashOrCreditString;
    var monentaryUnitString;
    var monentaryConversion;

    var $calculateButtonEl = $(".calculateBtn");
    var calculationResultContainerEl = $(".calculationResultContainer");
    var conclusionElement = $("<p>");
    var headerEl = $("<h3>");
    var finalMsgEl = $("<p>");
    var inputFields = $(".formFields li input");
    console.log('test jQuery ', inputFields);

    //get IDs of elements, and values they hold to use for calculations, //returns str, NOT a #
    var cashPrice = document.getElementById("cashPrice").value;
    var creditPrice = document.getElementById("creditPrice").value;
    var bankDiscount = document.getElementById("bankDiscount").value;
    var gallons = document.getElementById("gallonsNeeded").value;
    // var testVal = document.getElementById("gallonsNeeded").value;


    //calculations:
    var totalCostInCash = parseFloat(gallons) * parseFloat(cashPrice);
    var totalCostInCredit = parseFloat(gallons) * parseFloat(creditPrice);
    var totalCostInCreditWDiscount = totalCostInCredit - totalCostInCredit * bankDiscount / 100; //should be less than totalCostInCredit due to discount
    // differenceInCents = ((totalCostInCreditWDiscount - totalCostInCash).toFixed(2)) * 100; //rounds your .14540000000000042 to nearest cent, so you get .15, which is .15 of a dollar...
    //leave rounding till the VERY last step, otherwise JavaScript will give you more decimals
    differenceInCents = ((totalCostInCreditWDiscount - totalCostInCash) * 100).toFixed(0); //rounds your .14540000000000042 to nearest cent, so you get .15, which is .15 of a dollar...

    //differenceInCents will sometimes give a NEGATIVE #, ex: when totalCostInCreditWDiscount(3.23)-totalCostInCash(4.73) = neg!
    //if totalCostInCreditWDiscount is GREATER than totalCostInCash, this means that you are paying more
    //money to use CC. iow, use cash! cash saves you more $$!
    cashOrCreditString = (totalCostInCreditWDiscount > totalCostInCash) ? "cash." : "credit card.";

    //ALWAYS change to positive value, allow you to show in user msg. makes so sense to show user neg. amt.
    differenceInCentsPositive = Math.abs(differenceInCents);
    console.log('totalCostInCash', totalCostInCash);
    console.log('totalCostInCredit', totalCostInCredit);
    console.log('totalCostInCreditWDiscount', totalCostInCreditWDiscount);
    console.log('differenceInCents', differenceInCents);
    console.log('type differenceInCents', typeof differenceInCents);
    console.log('differenceInCentsPositive', differenceInCentsPositive);

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
    } //end of pluralOrNot fxn-------------------
    pluralOrNot();

    function checkForm(form) {
        if (cashPrice === "") {
            alert("Error: Input is empty!");
            // form.inputfield.focus();
            return false;
        }
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
    } //end of checkForm fxn-------------------


    function finalMsgForUser() {
        var msgArray = ['You can save ', monentaryConversion, monentaryUnitString, ' by using ', cashOrCreditString];
        console.log('msgArray', msgArray);
        var msgArrayJoined = msgArray.join("");
        //what does this do:
        if (cashPrice === creditPrice && bankDiscount === 0) {
            calculationResultContainerEl.append(finalMsgEl.text("Cash and credit price is the same, while bank discount is 0. It is the same price!"));
        } else {
            calculationResultContainerEl.append(finalMsgEl.text(msgArrayJoined));
        }
    }

    var horzLineBreak;
    function calculateResult() {
        //create the result string ONLY if it's empty (first time)
        //because we do NOT want the result header created everytime...
        if (resultHeader === "") {
            console.log('resultHeader is empty, so creating header...');
            resultHeader = resultHeader + "Result";
            // calculationResultContainer.append("<h4>Result</h4>");
            calculationResultContainerEl.append(headerEl);
            headerEl.text(resultHeader);
        }
        // console.log('checkForm result', checkForm(cashPrice));
        checkForm(cashPrice);
        // createTableDynamically();
        // var table = $("table");

        //ONLY create a horzLineBreak if it doesn't exist.Important to declare horzLineBreak var...
        //OUTSIDE this fxn. this way it doesn't reset itself when fxn is called repeatedly
        console.log('horzLineBreak', horzLineBreak === undefined);
        if (horzLineBreak === undefined) {
          horzLineBreak = $("<hr>");
          calculationResultContainerEl.append(horzLineBreak);
        }
        //don't delete:
        // console.log('typeof', typeof +cashPrice);
        // console.log('cp', typeof +cashPrice);
        // console.log('true or false', +cashPrice === -2.63);
        finalMsgForUser();

        //makes result container visible. First, capture element:
        var capturedElement = document.getElementById("showMe");
        //then, show visibility:
        capturedElement.style.visibility = "visible";
    }

    inputFields.toArray().forEach(function(element) {
        console.log('element', element);
        console.log('jQuery element', $(element));
        $(element).on("change", function() {
            console.log('change');
            calculateResult();
        });
    });


}; ///end of main function:
$(document).ready(main);
///end of document ready function



/////---------------------NOTES--------------------------------////
////Final verdict: Maybe put this in an organized table, pros and cons,
//people prob dont like to read long P!.  Typically, for most gas stations
//in the South Bay area, cash prices are around ten cents less for many reasons.
//One reason is to encourage people to get inside to buy snacks and spend more.
//But hot Cheetos aside, you can save some money by paying with cash.
//However, it depends on how much you value your time.
//Of course, paying by cash requires you to walk inside,
//and possibly wait a while to pay, whereas credit card is usualy quicker and more convienient.

//ERROR:
//user puts 234235.234. and it will still work wtf
//can put neg num
//pressing calcuate > 1 time will not keep result history, and won't show final conclusion msg.


//Test
// if more than 99 cents, then it should convert to dollars


//MORE FEATURES:
//reset button to reset all input values to 0. will show: "Reset all input fields to default value. Continue?"
  //also needs to have "never show me this popup ever again. if neverAnnoyMeAgain === true, then popup never comes up
  //when pressing reset"
//toggle clear results container!
//button that clears all calculation, right now refresh is the way.
//click to see how much money you can save over the month, years, by saviing only a few cents now.
//put gals in table
//change input fields to look like gas station electronic #
//if input field empty, or error, focus on box and change color.


//FEATURES - FUTURE if time:
//automatically calculate by using slides instead of pressing calc button.
//do you like math prompt? if yes, show them calculation
//kickback points consideration, or other rewards, optional choice for users.


//challenges i had to think about:
//keeping calcuations to only pennies makes calculations consistent,
//so that i can convert more effectively to dollars. ex: keep differenceInCents consistent by storing only cents
//then i coiuld convert .3254534534 ` to dollars. `












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
//     //the variable 'table' is a huge long string of html and text. The 2 lines of code below appends this
//     //into the calculationResultContainerEl
//     calculationResultContainerEl.append(table);
//     calculationResultContainerEl.append(conclusionElement);
// }









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
//         // var showMe = document.getElementsByClassName("calculationResultContainer");
//
//         //makes result container visible. First, capture element:
//         var capturedElement = document.getElementById("showMe");
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
