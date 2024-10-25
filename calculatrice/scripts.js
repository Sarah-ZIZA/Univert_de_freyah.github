document.addEventListener("DOMContentLoaded", () => {
  const btnclear = document.querySelector(".btnAC");
  const btnless = document.querySelector(".btn-");
  const btnpercent = document.querySelector(".btnperc");
  const btndivide = document.querySelector(".btndiv");
  const btnseven = document.querySelector(".btn7");
  const btneight = document.querySelector(".btn8");
  const btnnine = document.querySelector(".btn9");
  const btnmultiply = document.querySelector(".btnmult");
  const btnfour = document.querySelector(".btn4");
  const btnfive = document.querySelector(".btn5");
  const btnsix = document.querySelector(".btn6");
  const btnles = document.querySelector(".btnles");
  const btnone = document.querySelector(".btn1");
  const btntwo = document.querySelector(".btn2");
  const btnthree = document.querySelector(".btn3");
  const btnplus = document.querySelector(".btnplus");
  const btnzero = document.querySelector(".btnzero");
  const btncomma = document.querySelector(".btncomma");
  const btnequals = document.querySelector(".btnequals");

  let windowsvue = document.querySelector(".vue");
  let firstValue = "";
  let secondValue = "";
  let operator = null;
  let resetScreen = false;

  // Fonction pour afficher les valeurs
  function appendNumber(number) {
    if (resetScreen) {
      windowsvue.textContent = "";
      resetScreen = false;
    }
    windowsvue.textContent += number;
  }

  //-----------------Opérateurs numériques---------------------//
  btnseven.addEventListener("click", () => appendNumber("7"));
  btneight.addEventListener("click", () => appendNumber("8"));
  btnnine.addEventListener("click", () => appendNumber("9"));
  btnfour.addEventListener("click", () => appendNumber("4"));
  btnfive.addEventListener("click", () => appendNumber("5"));
  btnsix.addEventListener("click", () => appendNumber("6"));
  btnone.addEventListener("click", () => appendNumber("1"));
  btntwo.addEventListener("click", () => appendNumber("2"));
  btnthree.addEventListener("click", () => appendNumber("3"));
  btnzero.addEventListener("click", () => appendNumber("0"));
  btncomma.addEventListener("click", () => {
    if (!windowsvue.textContent.includes(".")) {
      windowsvue.textContent += ".";
    }
  });

  //-----------------Opérateurs d'opération-------------------//
  function setOperator(op) {
    if (operator !== null) calculate();
    firstValue = windowsvue.textContent;
    operator = op;
    resetScreen = true;
  }

  btnclear.addEventListener("click", () => {
    windowsvue.textContent = "";
    firstValue = "";
    secondValue = "";
    operator = null;
  });

  btnless.addEventListener("click", () => appendNumber("-"));
  btnpercent.addEventListener("click", () => {
    // Avant d'assigner l'opérateur, enregistrez la valeur actuelle de l'affichage
    firstValue = windowsvue.textContent;
    setOperator("%"); // Définir l'opérateur pourcentage
  });
  btndivide.addEventListener("click", () => setOperator("/"));
  btnles.addEventListener("click", () => setOperator("-"));
  btnmultiply.addEventListener("click", () => setOperator("*"));
  btnplus.addEventListener("click", () => setOperator("+"));

  // Bouton "=" pour exécuter l'opération
  btnequals.addEventListener("click", calculate);

  //-------------------Fonction de calcul---------------------//
  function calculate() {
    secondValue = windowsvue.textContent; // Obtenir la valeur actuelle affichée
    let result;

    // Calculer selon l'opérateur
    if (operator === "+") {
      result = parseFloat(firstValue) + parseFloat(secondValue);
    } else if (operator === "-") {
      result = parseFloat(firstValue) - parseFloat(secondValue);
    } else if (operator === "*") {
      result = parseFloat(firstValue) * parseFloat(secondValue);
    } else if (operator === "/") {
      result = parseFloat(firstValue) / parseFloat(secondValue);
    } else if (operator === "%") {
      if (firstValue) {
        result = parseFloat(firstValue) / 100;
      } else {
        result = (parseFloat(firstValue) * parseFloat(secondValue)) / 100;
      }
    }

    windowsvue.textContent = result; // Afficher le résultat
    operator = null; // Réinitialiser l'opérateur
  }
});
