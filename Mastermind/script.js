// Variables globales
let combinaisonSecrete = [];
let proposition = [];
let historiqueResultat = [];
let nombreEssais = 0;

const couleursDisponibles = [
  { nom: "rouge", couleur: "red" },
  { nom: "bleu", couleur: "blue" },
  { nom: "vert", couleur: "green" },
  { nom: "jaune", couleur: "yellow" },
  { nom: "noir", couleur: "black" },
  { nom: "aqua", couleur: "aqua" },
  { nom: "violet", couleur: "purple" },
  { nom: "orange", couleur: "orange" },
  { nom: "rose", couleur: "pink" },
];

const difficulties = {
  easy: { longueur: 4, colors: 6, essais: 12 },
  normal: { longueur: 4, colors: 7, essais: 10 },
  hard: { longueur: 5, colors: 8, essais: 8 },
  extreme: { longueur: 6, colors: 9, essais: 6 },
};
let remainingAttempts;

const themes = {
  default: {
    bodyColor: "linear-gradient(to bottom right, #4e54c8, #8f94fb)",
    logo: "img/Mastermind (1).png",
    backgroundImage: "img/Princesas_Disney_2024-removebg-preview.png",
    boardColor: "rgba(255, 255, 255, 0.2)",
    buttonColor: "#4e54c8", // Couleur par défaut des boutons
    buttonHoverColor: "#3a3e9f", // Couleur des boutons au survol
  },
  Héros: {
    bodyColor: "linear-gradient(to bottom right, #8B0000, #FF6347)",
    logo: "img/Mastermind(2).png",
    backgroundImage: "img/Avergers.png",
    boardColor: "rgba(255, 255, 255, 0.2)",
    buttonColor: "#C70B0BEB",
    buttonHoverColor: "#8B0000",
  },
  dark: {
    bodyColor: "linear-gradient(135deg, #1c1c3b, #1f5fd8, #f54ba2, #f9d423)",
    logo: "img/thème3.jpg",
    backgroundImage: "",
    boardColor: "rgba(255, 255, 255, 0.2)",
    buttonColor: "rgba(255, 255, 255, 0.2)",
    buttonHoverColor: "#000000A8",
  },
};

function genererCombinaisonSecrete(longueur, maxCouleur) {
  combinaisonSecrete = [];
  const couleursRestreintes = couleursDisponibles.slice(0, maxCouleur);
  for (let i = 0; i < longueur; i++) {
    const couleurAleatoire =
      couleursRestreintes[
        Math.floor(Math.random() * couleursRestreintes.length)
      ];
    combinaisonSecrete.push(couleurAleatoire.nom);
  }
  console.log("Combinaison secrète :", combinaisonSecrete);
}

function initialiserJeu(difficulty = "easy") {
  const params = difficulties[difficulty];
  genererCombinaisonSecrete(params.longueur, params.colors);
  proposition = [];
  historiqueResultat = [];
  remainingAttempts = params.essais;
  updateAttemptsDisplay();
  document.querySelector(".vue").innerHTML = "";
  afficherInputsProposition(params.longueur);
  updateColorButtons(params.colors);
}
function updateAttemptsDisplay() {
  const attemptsContainer = document.querySelector("#attempts-display");
  if (!attemptsContainer) {
    const newContainer = document.createElement("div");
    newContainer.id = "attempts-display";
    newContainer.style.margin = "10px 0";
    newContainer.style.fontSize = "16px";
    document.querySelector(".board").prepend(newContainer);
  }
  document.querySelector(
    "#attempts-display"
  ).textContent = `Tentatives restantes : ${remainingAttempts}`;
}

function afficherInputsProposition(longueur) {
  const guessSection = document.querySelector(".guess-section");
  guessSection.innerHTML =
    "<label for='proposition'>Saisissez votre proposition</label>";

  for (let i = 0; i < longueur; i++) {
    const input = document.createElement("div");
    input.className = "color-input";
    input.style.cssText =
      "width: 40px; height: 40px; border-radius: 50%; border: 1px solid #ccc; display: inline-block; margin: 5px; background-color: transparent;";
    guessSection.appendChild(input);
  }
}

function changerPage(difficulty) {
  document.getElementById("page1").style.display = "none";
  document.getElementById("page2").style.display = "block";
  initialiserJeu(difficulty);
}

function updateColorButtons(maxCouleur) {
  const colorButtonsContainer = document.getElementById("color-buttons");

  colorButtonsContainer.innerHTML = "<p>Choisissez vos couleurs</p>";
  const couleursRestreintes = couleursDisponibles.slice(0, maxCouleur);
  for (let i = 0; i < maxCouleur; i++) {
    const couleur = couleursRestreintes[i];
    const button = document.createElement("button");
    button.classList.add("color-btn");
    button.style.backgroundColor = couleur.couleur;
    button.setAttribute("data-color", couleur.nom);
    button.addEventListener("click", (e) =>
      ajouterCouleur(e.target.getAttribute("data-color"))
    );
    colorButtonsContainer.appendChild(button);
  }
}

function ajouterCouleur(couleur) {
  if (proposition.length < combinaisonSecrete.length) {
    proposition.push(couleur);
    console.log("Proposition actuelle :", proposition);
    const inputs = document.querySelectorAll(".color-input");
    inputs[proposition.length - 1].style.backgroundColor =
      couleursDisponibles.find((c) => c.nom === couleur).couleur;
  } else {
    alert("Vous avez déjà sélectionné suffisamment de couleurs.");
  }
}

function RecupererValeur() {
  if (proposition.length !== combinaisonSecrete.length) {
    alert(`Veuillez sélectionner ${combinaisonSecrete.length} couleurs.`);
    return;
  }

  remainingAttempts--;
  updateAttemptsDisplay();

  if (remainingAttempts < 0) {
    afficherMessage(
      `Vous avez perdu !<br>La combinaison était:<br> ${combinaisonSecrete.join(
        ", "
      )}`,
      false
    );
    initialiserJeu();
    return;
  }

  nombreEssais++;
  const resultat = comparerCombinaisons(proposition, combinaisonSecrete);
  historiqueResultat.push({
    proposition: [...proposition],
    bienplaces: resultat.bienplaces,
    malplaces: resultat.malplaces,
  });
  afficherHistorique();

  if (resultat.bienplaces === combinaisonSecrete.length) {
    afficherMessage(
      `Félicitations ! Vous avez gagné.`,
      true
      // `Félicitations ! Vous avez gagné en ${nombreEssais} essais.`,
      // true
    );
    initialiserJeu();
  }

  proposition = [];
  afficherInputsProposition(combinaisonSecrete.length);
}

function comparerCombinaisons(proposition, combinaisonSecrete) {
  let bienplaces = 0;
  let malplaces = 0;
  const copieCombinaison = [...combinaisonSecrete];

  proposition.forEach((couleur, index) => {
    if (couleur === copieCombinaison[index]) {
      bienplaces++;
      copieCombinaison[index] = null;
    }
  });

  proposition.forEach((couleur) => {
    if (copieCombinaison.includes(couleur)) {
      malplaces++;
      copieCombinaison[copieCombinaison.indexOf(couleur)] = null;
    }
  });

  return { bienplaces, malplaces };
}

function afficherHistorique() {
  const vue = document.querySelector(".vue");
  vue.innerHTML = "";
  historiqueResultat.forEach((tentative, index) => {
    const couleursHtml = tentative.proposition
      .map(
        (couleur) =>
          `<span style="display:inline-block; width:20px; height:20px; margin:2px; border-radius:50%; background-color:${
            couleursDisponibles.find((c) => c.nom === couleur).couleur
          }"></span>`
      )
      .join("");
    vue.innerHTML += `<p>Tentative ${index + 1} : ${couleursHtml} → ${
      tentative.bienplaces
    } bien placés, ${tentative.malplaces} mal placés.</p>`;
  });
}

function afficherMessage(message, isWin) {
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");
  modalMessage.innerHTML = `${message}<br><img src="${
    isWin ? "img/winner.gif" : "img/Game-O.gif"
  }" class="${isWin ? "Winner" : "losser"}" alt="${
    isWin ? "Gagné" : "Perdu"
  }" style="width:200px; height:auto;">`;
  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function recommencerJeu() {
  document.getElementById("page1").style.display = "block";
  document.getElementById("page2").style.display = "none";
  initialiserJeu();
}

function effacerProposition() {
  if (proposition.length > 0) {
    const removedColor = proposition.pop(); // Supprimer la dernière couleur
    console.log("Couleur supprimée :", removedColor);
    const inputs = document.querySelectorAll(".color-input");
    inputs[proposition.length].style.backgroundColor = "transparent"; // Réinitialiser la couleur du dernier input
  } else {
    alert("Aucune couleur à supprimer.");
  }
}

// Appliquer les styles du thème aux deux headers
function appliquerTheme(themeName) {
  const theme = themes[themeName];

  if (!theme) {
    console.error(`Thème "${themeName}" introuvable.`);
    return;
  }

  document.body.style.background = theme.bodyColor;

  // Mettre à jour les logos des headers
  const headers = document.querySelectorAll("header img");
  headers.forEach((logo) => {
    logo.src = theme.logo;
  });

  const board = document.querySelector(".board");
  if (board) {
    board.style.backgroundColor = theme.boardColor;
  }

  const backgroundImageElement = document.querySelector(".background-image");
  if (backgroundImageElement) {
    backgroundImageElement.style.backgroundImage = `url(${theme.backgroundImage})`;
  }

  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.style.backgroundColor = theme.buttonColor;
    button.style.color = "white";
    button.onmouseover = () => {
      button.style.backgroundColor = theme.buttonHoverColor;
    };
    button.onmouseout = () => {
      button.style.backgroundColor = theme.buttonColor;
    };
  });

  console.log(`Thème "${themeName}" appliqué.`);
}
// Fonction pour afficher les règles du jeu
function afficherRegles() {
  document.getElementById("popupRegles").style.display = "flex"; // Affiche le popup
}

// Fonction pour fermer le popup
function fermerPopup() {
  document.getElementById("popupRegles").style.display = "none"; // Cache le popup
}

// Initialiser le jeu au chargement de la page
window.onload = () => {
  initialiserJeu("easy");
  appliquerTheme("default");
};
