
  var clickCount = 0;
  function calcButtonClickCounter () {
    clickCount ++;
  }


  function calculateButtonPressed () {
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

    console.log('totalCreditWDiscount $:', totalCreditWDiscount);

    console.log ('totalCredit', totalCredit);



    //use jQuery to create elements and put in calculation results:
    // var cash = $("<p>").text('Cost of using cash: $' + totalCash);
    // var credit = $("<p>").text('Cost of using credit with bank discount: $' + totalCreditWDiscount);
    var $totalCash = $("<td>").text(totalCash);
    var $totalCredit =  $("<td>").text(totalCredit);
    var $totalCreditWDiscount = $("<td>").text(totalCreditWDiscount);
    $("#cashTr").append($totalCash);
    $("#creditTr").append($totalCredit);
    $("#creditAndDiscountTr").append($totalCreditWDiscount);
    $("#diffTr").append(difference);

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



  }


  ////Final verdict: Maybe put this in an organized table, pros and cons, people prob dont like to read long P!.  Typically, for most gas stations in the South Bay area, cash prices are around ten cents less for many reasons. One reason is to encourage people to get inside to buy snacks and spend more. But hot Cheetos aside, you can save some money by paying with cash. However, it depends on how much you value your time. Of course, paying by cash requires you to walk inside, and possibly wait a while to pay, whereas credit card is usualy quicker and more convienient.

  //error w/ code:

  // RESULT log: if more than 99 cents, then it should convert to dollars
  //clicking submit will keep creating calc result element.
  //parseInt or float or gallons
  //make sure when user click calc button, that
  //xtra feature: do you like math prompt? if yes, show them these: go far, and convert cents to a tenth of a penny. ex: .07234 is 7 cents, but that's a little more than 7 cents. so 7.23 cents, is actually 7 cents AND 23 hundreth of a penny.

  //add more features at end of app:
  //kickback points consideration, or other rewards.
  // var hi = 3;
  // console.log (hi);
