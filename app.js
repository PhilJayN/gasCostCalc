//Dependencies: jQuery
// -------------------------------------------------------------------------
var main = function() {
    "use strict";
    var diffInCentsPositive;
    var cashOrCreditStr;

    var msg = {
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
        },
        $errorMsgEl: $("#errorMsgEl"),
        outOfRange: function() {
            return 'Number entered is out of range. Valid numbers are .1 - 40 ';
        },
        negNumInvalid: function() {
            return 'Negative numbers not valid';
        },
        clear: function() {
            this.$errorMsgEl.text('');
        },
    };

    var checkInput = function() {
        var currentVal;
        var mainFormEls = document.getElementById("mainForm").elements;
        var formLength = mainFormEls.length;
        for (var i = 0; i < formLength; i++) {
            currentVal = parseFloat(mainFormEls[i].value);
            if (currentVal > 40 || currentVal === 0) {
              mainFormEls[i].style.border = "1px solid tomato";
                msg.$errorMsgEl.text(msg.outOfRange());
                msg.clearFinalMsg();
                
                $cashEl.text("");
                $creditEl.text("");
                $creditWDiscEl.text("");
            }
            //prevent user from typing negative #:
            //do NOT auto clear when input field is 0. User will be annoyed.
            else if (currentVal < 0) {
                mainFormEls[i].value = '';
                msg.$errorMsgEl.text(msg.negNumInvalid());
                msg.clearFinalMsg();
            }
        }
    };

    var $cashEl = $("#cashTableData");
    var $creditEl = $("#creditTableData");
    var $creditWDiscEl = $("#creditDiscTableData");
    var $inputFieldsEl = $(".formFields li input");
    $inputFieldsEl.toArray().forEach(function(inputElement) {
        $(inputElement).on("input", function() {
            msg.clear();
            var cashPriceEl = document.getElementById("cashPrice");
            var creditPriceEl = document.getElementById("creditPrice");
            var bankDiscountEl = document.getElementById("bankDiscount");
            var gallonsEl = document.getElementById("gallonsNeeded");

            var totalCostInCash = parseFloat(gallonsEl.value) * parseFloat(cashPriceEl.value);
            var totalCostInCredit = parseFloat(gallonsEl.value) * parseFloat(creditPriceEl.value);
            var totalCostInCreditWDiscount = totalCostInCredit - totalCostInCredit * bankDiscountEl.value / 100;
            //if totalCostInCreditWDiscount result is GREATER than totalCostInCash, you are paying more by using credit! Paying by cash saves more $!
            var differenceInCents = ((totalCostInCreditWDiscount - totalCostInCash) * 100).toFixed(0);
            cashOrCreditStr = (totalCostInCreditWDiscount > totalCostInCash) ? "cash." : "credit card.";
            //differenceInCents will sometimes give a NEGATIVE #, ex: when totalCostInCreditWDiscount(3.23)-totalCostInCash(4.73)
            //Therefore change to positive value, to prevent user confusion:
            diffInCentsPositive = Math.abs(differenceInCents);

            msg.pluralize();

            var resultTable = {

                addToTable: function() {
                    $cashEl.text(totalCostInCash.toFixed(2));
                    $creditEl.text(totalCostInCredit.toFixed(2));
                    $creditWDiscEl.text(totalCostInCreditWDiscount.toFixed(2));
                },

                clearTable: function() {
                    $cashEl.text("");
                    $creditEl.text("");
                    $creditWDiscEl.text("");
                }
            };

            if (inputElement.value === "") {
                inputElement.style.border = "1px solid tomato";
                msg.formIncomplete();
                resultTable.clearTable();
                msg.clear();
            } else {
                inputElement.style.border = "1px solid #ccc";
            }
            //display final msg and table results ONLY if all elements NOT empty
            if (cashPriceEl.value !== "" && creditPriceEl.value !== "" && bankDiscountEl.value !== "" && gallonsEl.value !== "") {
                resultTable.addToTable();
                msg.amtSaved();
            }
            checkInput();
        });
    });
};
$(document).ready(main);
