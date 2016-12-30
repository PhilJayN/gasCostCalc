//Dependencies: jQuery
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// Main function
// ------------------------------------------------------------------------
var main = function() {
    "use strict";
    var clickCount = 1;
    var priceArray = [];
    var tableDataArray = [];
    var resultHeader = "";
    var difference;
    var differenceInCents;
    var differenceInCentsPositive;
    var cashOrCreditString;
    var monentaryUnitString;
    var testMe = "hello there!";
    var monentaryConversion;

    var $calculateButtonEl = $(".calculateBtn");
    var calculationResultContainerEl = $(".calculationResultContainer");
    //jQuery create element template to put in FINAL conclusion:
    var conclusionElement = $("<p>");
    var headerEl = $("<h3>");
    //run # to show user (Run #1, run #2, etc...)
    var runNumber = $("<p>").text("Run " + clickCount);
    var finalMsgEl =$("<p>");

    //get IDs of elements, and values they hold to use for calculations:
    var cashPrice = document.getElementById("cashPrice").value;
    var creditPrice = document.getElementById("creditPrice").value; //returns str, NOT a #
    var bankDiscount = document.getElementById("bankDiscount").value;
    var gallons = document.getElementById("gallonsNeeded").value;

    //calculations:
    var totalCostInCash = parseFloat(gallons) * parseFloat(cashPrice);
    var totalCostInCredit = parseFloat(gallons) * parseFloat(creditPrice);
    var totalCostInCreditWDiscount = totalCostInCredit - totalCostInCredit * bankDiscount / 100; //should be less than totalCostInCredit due to discount
    // difference = (totalCostInCreditWDiscount - totalCostInCash); //not last step in calculation yet....
    // amtSaved = parseFloat( (difference * 100).toFixed(2) ); //last step in calc, now rounding...cents in string form, then parsedFloat to get number
    differenceInCents = ( (totalCostInCreditWDiscount - totalCostInCash).toFixed(2) ) * 100; //rounds your .14540000000000042 to nearest cent, so you get .15, which is .15 of a dollar...
    // differenceRounded = parseFloat(difference * 100); //multiply .15 * 100 to get your cents, (15);

    //differenceInCents will sometimes give a NEGATIVE #, ex: when totalCostInCreditWDiscount(3.23)-totalCostInCash(4.73) = neg!
    //if totalCostInCreditWDiscount is GREATER than totalCostInCash, this means that you are paying more
    //money to use CC. iow, use cash! cash saves you more $$!
    cashOrCreditString = (totalCostInCreditWDiscount > totalCostInCash) ? "cash.":"credit.";

    //ALWAYS change to positive value, allow you to show in user msg. makes so sense to show user neg. amt.
    differenceInCentsPositive = Math.abs(differenceInCents);
    console.log('type differenceInCents', typeof differenceInCents);

    console.log('totalCostInCash', totalCostInCash);
    console.log('totalCostInCredit', totalCostInCredit);
    console.log('totalCostInCreditWDiscount',  totalCostInCreditWDiscount);

      console.log('difference', difference);
    console.log('differenceInCentsPositive', differenceInCentsPositive);
    // console.log('test', differenceInCentsPositive >= 101);
    // console.log('difference NOT rounded yet', difference);

    function conclusionMsg () {
      // var isPlural;
      // // var sString = "s";
      // var convertToDollar;

      //assign plurality:
      // if (differenceInCentsPositive > 1) {
      //   isPlural = true;
      // }
      // else {
      //   isPlural = false;
      // }

      if (differenceInCentsPositive <= 1) {
        monentaryUnitString = " cent";
        monentaryConversion = differenceInCentsPositive;
      }
      else if (differenceInCentsPositive <= 99) {
        monentaryUnitString = " cents";
        monentaryConversion = differenceInCentsPositive;
      }
      else if (differenceInCentsPositive === 100) {
          monentaryUnitString = " dollar";
          monentaryConversion = differenceInCentsPositive / 100;

      }
      else if (differenceInCentsPositive >= 101) {
        monentaryUnitString = " dollars";
        monentaryConversion = differenceInCentsPositive / 100;
      }
      // console.log('monentaryUnitString final after fxn running', monentaryUnitString);

    } //end of conclusionMsg fxn

      //substracting larger value from smaller result in negative, therefore use absolute value:
      //if totalCostInCreditWDiscount is less than totalCostInCash, it means using CC is cheaper...
      // if (totalCostInCreditWDiscount < totalCostInCash) {
      //   finalDifference = Math.abs(difference);
      //   //then give msg that you can save amtOfMoney paying w/ CC
      //   // conclusionElement.text('You can shave approximately ' +  finalDifference + ' cents off your total bill by using credit card! ');
      // } else {
      //   finalDifference = difference;
      //   //otherwise msg will say you can save amtOfMoney paying with CASH
      //   // conclusionElement.text('You can shave approximately ' + finalDifference + ' dollars off your total bill by using cash! ');
      // }

      conclusionMsg();

      var msgArray = ['You can save approximately ', monentaryConversion, monentaryUnitString, ' by using ', cashOrCreditString];
      // var msgArray = ['You can save  approximately ', monentaryUnitString, 'by using '];
      // console.log('monentaryUnitString', monentaryUnitString);
      console.log('msgArray', msgArray);
      var msgArrayJoined = msgArray.join("");
      console.log(msgArray.join(""));
      if (cashPrice === creditPrice && bankDiscount === 0) {
        calculationResultContainerEl.append(finalMsgEl.text("Cash and credit price is the same, while bank discount is 0. It is the same price!"));
      }
      else {
        calculationResultContainerEl.append(finalMsgEl.text(msgArrayJoined));
    }

    //code below runs depending on whether it's cheaper to pay with cash or credit:

    //     if (amtSaved < 100) {
    //       // console.log('amtSaved: ',  parseFloat(amtSaved));
    //         // console.log('conclusionElement holds:', conclusionElement);
    //
    //     } else {
    //     }
    // }


    function calcButtonClickCounter() {
      clickCount++;
    }

    //create click handler for calculate button element and run code when it is clicked//
    // console.log('calc el', $calculateButtonEl);
    $calculateButtonEl.on("click", function() {
        //create the result string ONLY if it's empty (first time)
        //because we do NOT want the result header created everytime user clicks calculateBtn:
        if (resultHeader === "") {
            console.log('resultHeader is empty, so creating header...');
            resultHeader = resultHeader + "Result";
            // calculationResultContainer.append("<h4>Result</h4>");
            calculationResultContainerEl.append(headerEl);
            headerEl.text(resultHeader);
        }

        calculationResultContainerEl.append(runNumber);
        calcButtonClickCounter();
        //don't delete:
        // console.log('typeof', typeof +cashPrice);
        // console.log('cp', typeof +cashPrice);
        // console.log('true or false', +cashPrice === -2.63);

        //test validation:
        //capture form id:
        function checkForm(form) {
            // validation fails if the input is blank
            // if(+cashPrice === -2.63 )  {
            //   console.log("both are equal");
            //   // cashPrice.focus();
            //   // form.inputfield.focus();
            //   return false;
            // }
            if (cashPrice === "") {
                alert("Error: Input is empty!");
                // cashPrice.focus();
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
        }
        /////------------end of checkForm fxn----------////
        checkForm(cashPrice);
        console.log('checkForm result', checkForm(cashPrice));
        // if (cashPrice ==="" || creditPrice ==="" || bankDiscount==="" || gallons ==="") {
        //   alert('Please do not leave input fields blank!!'); //change this to a description box, looks bette
        //   return false;
        // }

        //push calculation result and table data title into arrays:
        ///careful, you need to reset both arrays or else it will keep adding data to it when user
        ///clicks on calculate button.
        priceArray.push(totalCostInCash, totalCostInCredit, totalCostInCreditWDiscount, difference);
        tableDataArray.push("Cash Price", "Credit Price", "Credit Price with Discount", "Difference");

        //dynamically create a container to hold results

        ////dynamically create HTML table when user clicks on calculate button:
        var table = '';
        var rows = 4;
        var cols = 2;
        var arrayIndex = 0;
        // price arr [2.63, 2.73, 2.7027, 0.07270000000000021]
        //table data arr ["Cash Price", "Credit Price", "Credit Price with Discount", "Difference"]
        // console.log('len', priceArray.length);
        // console.log('len', tableDataArray.length);
        // console.log(priceArray[3]);
        // console.log(tableDataArray[2]);

        //dynamically create html table:
        //outside loop creates the rows (4 rows total)
        for (var r = 0; r < rows; r++) {
            table += "<tr>";
            //inside loop creates the table data (2 td created every inner loop run)
            for (var tdCreator = 0; tdCreator < 1; tdCreator++) {
                table += "<td>" + tableDataArray[arrayIndex] + "</td>";
                table += "<td>" + priceArray[arrayIndex] + "</td>";
            }
            //when inner loop exits, arrayIndex incremented. this way we can iterate through
            //the arrays
            arrayIndex++;
            table += "</tr>";
        }
        calculationResultContainerEl.append(table);

        calculationResultContainerEl.append(conclusionElement);

        //create horizontal line break after every run:
        var horzLineBreak = $("<hr>");
        calculationResultContainerEl.append(horzLineBreak);
        // calculationResultContainerEl.style.visibility = "visible";
        // var showMe = document.getElementsByClassName("calculationResultContainer");

        //makes result container visible:
        //first, capture element:
        var capturedElement = document.getElementById("showMe");
        //then, show visibility:
        capturedElement.style.visibility = "visible";

    ///closing of calculate button function:
    });
    ///closing of main function:
};
$(document).ready(main);
///end of document ready function




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


//MORE FEATURES:
//toggle clear results container!
//one click to clear all calculation results.
//button that clears all calculation, right now refresh is the way.
//click to see how much money you can save over the month, years, by saviing only a few cents now.
//take care of preventing user errors!
// RESULT log: if more than 99 cents, then it should convert to dollars
//put gals in table
//change input fields to look like gas station electronic #


//FEATURES - FUTURE if time:
//do you like math prompt? if yes, show them calculation
//go far, and convert cents to a tenth of a penny. ex: .07234 is 7 cents, but that's a little more than 7 cents. so 7.23 cents, is actually 7 cents AND 23 hundreth of a penny.
//kickback points consideration, or other rewards, optional choice for users.


//challenges i had to think about:
//keeping calcuations to only pennies makes calculations consistent,
//so that i can convert more effectively to dollars. ex: keep differenceInCents consistent by storing only cents
//then i coiuld convert .3254534534 ` to dollars. `


























































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
