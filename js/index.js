$(document).ready(function() {

  var current = "";
  var operators = ["+", "-", "*", "x", "/", "%"]

  document.getElementById('calc-body').addEventListener('click', numCalc, false);

  function numCalc(event) {
    
    //if user clicks operator following another operator, replace first with the second clicked
    if (operators.indexOf(current[current.length-2] !== -1)) {
      if (event.target.classList.contains("op")) {
        var y = $(event.target).text();
        current = current.replace(current[current.length-2], y);
      } 
    }

    if (event.target.classList.contains("num")) {
      current += $(event.target).text();
    }

    if (event.target.id === "btnx") {
      current += " x ";
    }

    if (event.target.id === "btn/") {
      current += " / ";
    }

    if (event.target.id === "btn+") {
      current += " + ";
    }

    if (event.target.id === "btn-") {
      current += " - ";
    }

    if (event.target.id === "btnClear") {
      current = "";
      $("#equation").html(".");
    }
    
    if (event.target.id === "btnDeci") {
      current += ".";
    }

    if (event.target.id === "btn=") {
      $("#equation").html(current);
      current = current.replace(/x/g,"*");
      current = eval(current).toString();
      console.log(current);
    }
    
        if (event.target.id === "btnBack") {
      if (current[current.length - 1] === " ") {
        current = current.slice(0, current.length - 3);
      } else if (current[current.length-1] !== " ") {
        current = current.slice(0, current.length - 1)
      }
    }

    $("#display").val(current);
  }
});