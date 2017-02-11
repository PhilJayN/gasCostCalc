//Dependencies: jQuery
// -------------------------------------------------------------------------
var main = function() {
    "use strict";
    var diffInCentsPositive;
    var cashOrCreditStr;

    var displayMsg = {
        $calcResultEl: $(".calculationResultContainer"),
        $finalMsgEl: $("<p>"),
        currencyUnitStr: undefined,
        cents: undefined,

        amtSaved: function() {
            //IMPORTANT: To keep results consistent, msg shown to users will favor any form of payment that is LESS!
            var msgArray = ['You will pay ', this.cents, this.currencyUnitStr, ' less if you use ', cashOrCreditStr];
            if (this.cents > 0) {
                this.$finalMsgEl.css("color", "black");
                this.$calcResultEl.append(this.$finalMsgEl.text(msgArray.join("")));
            } else {
                this.$finalMsgEl.css("color", "black");
                this.$calcResultEl.append(this.$finalMsgEl.text("At this point, you will pay the same amount using cash or credit."));
            }
        },
        formIncomplete: function() {
            this.$calcResultEl.append(this.$finalMsgEl.text("Please complete form for calculations to auto start."));
            this.$finalMsgEl.css("color", "tomato");
        },
        clearFinalMsg: function() {
            this.$finalMsgEl.text("");
        },
        pluralize: function() {
          if (diffInCentsPositive <= 1) {
              this.currencyUnitStr = " cent";
              this.cents = diffInCentsPositive;
          } else if (diffInCentsPositive <= 99) {
              this.currencyUnitStr = " cents";
              this.cents = diffInCentsPositive;
          } else if (diffInCentsPositive === 100) {
              this.currencyUnitStr = " dollar";
              this.cents = diffInCentsPositive / 100;
          } else if (diffInCentsPositive >= 101) {
              this.currencyUnitStr = " dollars";
              this.cents = diffInCentsPositive / 100;
          }
        }
    };

    var currentVal;
    var $errorMsgEl = $("#errorMsgEl");
    var errorMsg = {
        outOfRange: function() {
            return 'Number entered: ' + currentVal + ' is out of range. Valid numbers are .1 - 40 ';
        },
        negNumInvalid: function() {
            return 'Negative numbers not valid';
        },
        clear: function() {
            $errorMsgEl.text('');
        },
        maxLimit: function() {
          return 'Max limit reached';
        }
    };

    function checkInput() {
        var mainFormEls = document.getElementById("mainForm").elements;
        var formLength = mainFormEls.length;
        for (var i = 0; i < formLength; i++) {
            currentVal = parseFloat(mainFormEls[i].value);
            if (currentVal > 40 || currentVal === 0) {
                $errorMsgEl.text(errorMsg.outOfRange());
                displayMsg.clearFinalMsg();
            }
            //prevent user from typing negative #:
            //do NOT auto clear when input field is 0. User will be annoyed.
            else if (currentVal < 0) {
                mainFormEls[i].value = '';
                $errorMsgEl.text(errorMsg.negNumInvalid());
                displayMsg.clearFinalMsg();
        }
      }
    }

    var elementVal;
    var $inputFieldsEl = $(".formFields li input");
    $inputFieldsEl.toArray().forEach(function(inputElement) {
        $(inputElement).on("keydown", function() {
            elementVal = inputElement.value;
        });
        $(inputElement).on("input", function() {
            errorMsg.clear();
            var cashPriceEl = document.getElementById("cashPrice");
            var creditPriceEl = document.getElementById("creditPrice");
            var bankDiscountEl = document.getElementById("bankDiscount");
            var gallonsEl = document.getElementById("gallonsNeeded");

            var totalCostInCash = parseFloat(gallonsEl.value) * parseFloat(cashPriceEl.value);
            var totalCostInCredit = parseFloat(gallonsEl.value) * parseFloat(creditPriceEl.value);
            var totalCostInCreditWDiscount = totalCostInCredit - totalCostInCredit * bankDiscountEl.value / 100; //result should be less than totalCostInCredit due to discount
            //leave rounding until the VERY last step!
            var differenceInCents = ((totalCostInCreditWDiscount - totalCostInCash) * 100).toFixed(0); //rounds your .14540000000000042 to nearest cent, so you get .15, which is .15 of a dollar...
            //if totalCostInCreditWDiscount result is GREATER than totalCostInCash, you are paying more by using credit! Paying by cash saves more $$!
            cashOrCreditStr = (totalCostInCreditWDiscount > totalCostInCash) ? "cash." : "credit card.";
            //differenceInCents will sometimes give a NEGATIVE #, ex: when totalCostInCreditWDiscount(3.23)-totalCostInCash(4.73)
            //Therefore change to positive value, to prevent user confusion:
            diffInCentsPositive = Math.abs(differenceInCents);

            displayMsg.pluralize();

            var resultTable = {
                $cashEl: $("#cashTableData"),
                $creditEl: $("#creditTableData"),
                $creditWDiscEl: $("#creditDiscTableData"),

                addToTable: function() {
                    this.$cashEl.text(totalCostInCash.toFixed(2));
                    this.$creditEl.text(totalCostInCredit.toFixed(2));
                    this.$creditWDiscEl.text(totalCostInCreditWDiscount.toFixed(2));
                },

                clearTable: function() {
                    this.$cashEl.text("");
                    this.$creditEl.text("");
                    this.$creditWDiscEl.text("");
                }
            };

            if (inputElement.value === "") {
                inputElement.style.border = "1px solid tomato";
                displayMsg.formIncomplete();
                resultTable.clearTable();
                errorMsg.clear();
            } else {
                inputElement.style.border = "1px solid #ccc";
            }
            //display final msg and table results ONLY if all elements NOT empty
            if (cashPriceEl.value !== "" && creditPriceEl.value !== "" && bankDiscountEl.value !== "" && gallonsEl.value !== "") {
                resultTable.addToTable();
                displayMsg.amtSaved();
            }
            checkInput();
        });
    });
};
$(document).ready(main);


// if (currentVal.toString().length > 3) {
//   $errorMsgEl.text(errorMsg.maxLimit());
// }
