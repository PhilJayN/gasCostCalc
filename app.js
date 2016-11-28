//Dependencies: jQuery
// -------------------------------------------------------------------------
//Calculate button click counter
// -------------------------------------------------------------------------

// -------------------------------------------------------------------------
// Main function
// ------------------------------------------------------------------------
var main = function () {
  "use strict";

  var clickCount = 1;
  function calcButtonClickCounter () {
    clickCount ++;
  }

  //create click handler for calculate button element and run code when it is clicked//
  var $calculateButtonEl = $(".calculate");
  console.log('calc el', $calculateButtonEl);
  $calculateButtonEl.on("click", function(){

  //run # to show user (Run #1, run #2, etc...)
  var runNumber = $("<p>").text("Run #" + clickCount);
  $(".calculationResultContainer").append(runNumber);
  calcButtonClickCounter();

  var priceArray = [];
  var tableDataArray = [];

  //get IDs of elements, and values they hold to use for calculations:
  var cashPrice = document.getElementById("cashPrice").value;
  var creditPrice = document.getElementById("creditPrice").value; //returns str, NOT a #
  var bankDiscount = document.getElementById("bankDiscount").value;
  var gallons = document.getElementById("gallonsNeeded").value;
  //don't delete:
// console.log('typeof', typeof +cashPrice);
// console.log('cp', typeof +cashPrice);
// console.log('true or false', +cashPrice === -2.63);

  //test validation:
  //capture form id:
  function checkForm(form){
    // validation fails if the input is blank

    // if(+cashPrice === -2.63 )  {
    //   console.log("both are equal");
    //   // cashPrice.focus();
    //   // form.inputfield.focus();
    //   return false;
    // }

    if(cashPrice === "") {
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

  checkForm(cashPrice);
  console.log('checkForm result', checkForm(cashPrice));

  //
  // if (cashPrice ==="" || creditPrice ==="" || bankDiscount==="" || gallons ==="") {
  //   alert('Please do not leave input fields blank!!'); //change this to a description box, looks bette
  //   return false;
  // }
//
//   $("p").on("click", function(){
//     console.log('clicked');
//     alert("The paragraph was clicked.");
// });

//     $("#creditPrice").keypress(function(){
// console.log('keys pressed!');
//     });

  //calculations:
  var totalCash = parseFloat(gallons) * parseFloat(cashPrice);
  var totalCredit = parseFloat(gallons) * parseFloat(creditPrice);
  var totalCreditWDiscount = totalCredit - totalCredit * bankDiscount / 100;
  var difference;

  //substracting larger value from smaller result in negative, therefore use absolute value:
  if (totalCreditWDiscount < cashPrice) {
    difference = Math.abs(totalCreditWDiscount - totalCash);
  }
  else {
    difference = totalCreditWDiscount - totalCash;
  }

  //push calculation result and table data title into arrays:
  ///careful, you need to reset both arrays or else it will keep adding data to it when user
  ///clicks on calculate button.
  priceArray.push(totalCash, totalCredit, totalCreditWDiscount, difference);
  tableDataArray.push("Cash Price", "Credit Price", "Credit Price with Discount", "Difference");

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
  for (var r=0; r < rows; r++ ) {
    table += "<tr>";
      //inside loop creates the table data (2 td created every inner loop run)
      for (var tdCreator = 0; tdCreator < 1; tdCreator++ ) {
        table += "<td>" + tableDataArray[arrayIndex] + "</td>";
        table += "<td>" + priceArray[arrayIndex]  + "</td>";
      }
      //when inner loop exits, arrayIndex incremented. this way we can iterate through
      //the arrays
      arrayIndex ++;

    table += "</tr>";
  }
  $(".calculationResultContainer").append(table);

  //jQuery create element template to put in FINAL conclusion:
  var elConclusion = $("<p>");
  var amtSaved = (difference*100).toFixed(2);
  var cents = 'cents';
  var dollars = 'dollars';
  var conclusionMsg = 'You can shave approximately ' + 'hi' + 'centOrDollars' + ' off your total bill by using ' ;

  function finalMsg (amtSaved) {
    if (amtSaved < 100) {
      elConclusion.text('You can shave approximately ' + amtSaved + ' cents off your total bill by using ' );
    }
    else {
      elConclusion.text('You can shave approximately ' + amtSaved + ' dollars off your total bill by using ' );
    }
  }
// elConclusion.text('You can shave approximately ' + amtSaved + dollarorCents +  off your total bill by using ' + cash + credit );


  //code below runs depending on whether it's cheaper to pay with cash or credit:
  if (totalCreditWDiscount < totalCash) {
    finalMsg(amtSaved);
    }
    $(".calculationResultContainer").append(elConclusion);
  //   elConclusion.text(conclusionMsg + 'credit card!');
  // }
  // else {
  //   elConclusion.text(conclusionMsg + 'cash!');
  // }

  ////closing of calculate button function syntax:
});

///closing of main function syntax:
};
$(document).ready(main);
console.log("Document ready, js loaded!!.");
///end of document ready function//

console.log('linux!');


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
//one click to clear all calculation results.
//button that clears all calculation, right now refresh is the way.
//click to see how much money you can save over the month, years, by saviing only a few cents now.
//take care of preventing user errors!
// RESULT log: if more than 99 cents, then it should convert to dollars
//put gals in table


//FEATURES - FUTURE if time:
//do you like math prompt? if yes, show them calculation
//go far, and convert cents to a tenth of a penny. ex: .07234 is 7 cents, but that's a little more than 7 cents. so 7.23 cents, is actually 7 cents AND 23 hundreth of a penny.
//kickback points consideration, or other rewards, optional choice for users.














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
//     //   var $row3 = $table.append( $("<tr></tr>") );
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
