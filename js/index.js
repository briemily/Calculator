//enter number; select op btn; if second op clicked, remove first selection; use selected; enter second number; evaluate

//to do: running total (everytime an op is clicked, evaluate current equation); icon messing up back btn?; percent of a single number

$(document).ready(function() {

  var numArr = [];
  var eqArr = [];
  var eqDisp = "";
  var result = "";

  document.getElementById('calc-body').addEventListener('click', numCalc, false);

  function numCalc(event) {

    //number button
    //if op selected and num clicked
    if ($(":button").hasClass("opSelected") && event.target.classList.contains("num") || event.target.classList.contains("deci")) {
      eqArr.push(numArr.join("").toString());
      eqArr.push($(".opSelected").text());
      $(":button").removeClass("opSelected");
      numArr = [];
      numArr.push($(event.target).text());
    } else if (!$(":button").hasClass("opSelected") && event.target.classList.contains("num")) {
      numArr.push($(event.target).text());
    }

    //decimal button
    if (event.target.id === "btnDeci" && numArr.indexOf(".") == -1) {
      numArr.push(".");
    }

    //operator button
    if ($(event.target).hasClass("op") && $(event.target).hasClass("opSelected")) {
      $(event.target).removeClass("opSelected");
    } else if ($(event.target).hasClass("op")) {
      //if op selected and second op clicked, remove first
      $(":button").removeClass("opSelected");
      $(event.target).addClass("opSelected");
    }

    //negative/positive button
    if (event.target.id === "negPosBtn" && numArr[0] !== "-") {
      numArr.unshift("-");
    } else if (event.target.id === "negPosBtn" && numArr[0] === "-") {
      numArr.shift();
    }

    //back button
    if (event.target.id === "btnBack") {
      numArr.pop();
    }

    //clear button
    if (event.target.id === "btnClear") {
      eqDisp = "";
      eqArr = [];
      numArr = [];
      $("#equation").css("color", "#DAD6D6");
      $("#equation").html(".");
      $(":button").removeClass("opSelected");
    }

    eqDisp = numArr.join("").toString();

    //equals button
    if (event.target.id === "btn=") {
      eqArr.push(numArr.join("").toString());
      $("#equation").html(eqArr.join(" ").toString() + " =");
      $("#equation").css("color", "#5B5959");

      //replace "x" with "*" for evaluating 
      for (i = 0; i < eqArr.length; i++) {
        if (eqArr[i] === "x") {
          eqArr.splice(i, 1, "*");
        }
      }

      //replace "%" with "/ 100 *" for evaluating
      for (j = 0; j < eqArr.length; j++) {
        if (eqArr[j] === "%") {
          eqArr.splice(j, 1, "/ 100 *");
        }
      }
      
      //add parentheses around negative numbers
      for (k=0; k < eqArr.length; k++) {
        if (Number(eqArr[k]) < 0) {
          eqArr[k] = "\(" + eqArr[k] + "\)";
        }
      }

      result = parseFloat(eval(eqArr.join("").toString()).toFixed(8)).toString();
      eqDisp = result;
      eqArr = [];
      numArr = [];
    }

    if (result !== "" && $(event.target).hasClass("num")) {
      $("#equation").html("Ans = " + result);
      result = "";
    }

    if (result !== "" && $(event.target).hasClass("op")) {
      numArr.push(result);
      eqDisp = numArr.join("").toString();
      $("#equation").html("Ans = " + result);
    }

    $("#display").val(eqDisp);

  }
});