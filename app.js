//calculate button click counter
var clickCount = 0;
function calcButtonClickCounter () {
  clickCount ++;
}

var main = function () {
  "use strict";
  console.log("Document ready, js loaded.");

//all code below is inside main function://

//create click handler for calculate button element and run code when it is clicked//
  var $calculateButtonEl = $(".calculate");
  $calculateButtonEl.on("click", function(){

  var priceArray = [], tableDataArray = [];

  //run to keep track to print out num of runs to user (Run #1, run #2, etc...)
  calcButtonClickCounter();

  //get IDs of elements:
  var cashPrice = document.getElementById("cashPrice").value;
  var creditPrice = document.getElementById("creditPrice").value;
  var bankDiscount = document.getElementById("bankDiscount").value;
  var gallons = document.getElementById("gallonsNeeded").value;

  //calculations:
  var totalCash = parseInt(gallons) * parseFloat(cashPrice);
  var totalCredit = parseInt(gallons) * parseFloat(creditPrice);
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
//clicks on calculate button.
  priceArray.push(totalCash, totalCredit, totalCreditWDiscount, difference);
  console.log('price arr', priceArray);
  tableDataArray.push("Cash Price", "Credit Price", "Credit Price with Discount", "Difference");
  console.log("table data arr", tableDataArray);

////dynamically create HTML table when user clicks on calculate button:
  console.log('test b4 loop');
  var table = '';
  var rows = 4;
  var cols = 2;
  var t = 0;

var index;
// var priceArray = [], tableDataArray = [];

// price arr [2.63, 2.73, 2.7027, 0.07270000000000021]
//table data arr ["Cash Price", "Credit Price", "Credit Price with Discount", "Difference"]

console.log('len', priceArray.length);
console.log('len', tableDataArray.length);
console.log(priceArray[3]);
console.log(tableDataArray[2]);

  for (var r=0; r < rows; r++ ) {
    table += "<tr>";

      for (index = 0; index < 1; index++ ) {
        table += "<td>" + tableDataArray[t] + "</td>";
        table += "<td>" + priceArray[t]  + "</td>";
      }

      t ++;

    table += "</tr>";
  }
  $(".calculationResultContainer").append(table);


  // });


  //jQuery create element template to put in FINAL conclusion:
  var elConclusion = $("<p>");
  var conclusion = 'You can shave approximately ' + (difference*100).toFixed(2) + ' cents off your total bill by using ' ;

  //code below runs depending on whether it's cheaper to pay with cash or credit:
  if (totalCreditWDiscount < totalCash) {
    elConclusion.text(conclusion + 'credit card!');
  }
  else {
    elConclusion.text(conclusion + 'cash!');
  }
  $(".calculationResultContainer").append(elConclusion);

  //finally, after calculation done, unhide the hiddenResultTable:
  $(".hiddenResultTable").css("visibility", "visible");

  ///run #
   var runNumber = $("<p>").text("Run #" + clickCount);
     $(".calculationResultContainer").append(runNumber);
////closing of calculate button function syntax:
});

///closing of main function syntax:
};
$(document).ready(main);
///end of document ready function//



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

////Final verdict: Maybe put this in an organized table, pros and cons,
//people prob dont like to read long P!.  Typically, for most gas stations
//in the South Bay area, cash prices are around ten cents less for many reasons. One reason is to encourage people to get inside to buy snacks and spend more. But hot Cheetos aside, you can save some money by paying with cash. However, it depends on how much you value your time. Of course, paying by cash requires you to walk inside, and possibly wait a while to pay, whereas credit card is usualy quicker and more convienient.

//error w/ code:

// RESULT log: if more than 99 cents, then it should convert to dollars
//clicking submit will keep creating calc result element.
//parseInt or float or gallons
//make sure when user click calc button, that
//xtra feature: do you like math prompt? if yes, show them these: go far, and convert cents to a tenth of a penny. ex: .07234 is 7 cents, but that's a little more than 7 cents. so 7.23 cents, is actually 7 cents AND 23 hundreth of a penny.

//add more features at end of app:
//kickback points consideration, or other rewards.(maybe do a check box that user can click to incl. calc)

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


// var table = '';
// var rows = 4;
// var cols = 3;
//
// for (var r=0; r < rows; r++) {
//   table += "<tr>";
//     for (var c=0; c < cols; c++ ) {
//       table += "<td>" + c + "</td>";
//     }
//   table += "</tr>";
// }
// document.write(table);
