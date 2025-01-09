document.addEventListener("DOMContentLoaded", () => {
  const numberCart = document.querySelector(".number-Cart");
  const audioPlayer = document.querySelector("#audioPlayer");
  const btn1 = document.querySelector(".btn1");
  const btn2 = document.querySelector(".btn2");
  const response = document.querySelector("body");
  const mainImage = document.querySelector("#mainImage");

  const modal = document.getElementById("modal-next-step"); // Modal
  const confirmNext = document.getElementById("confirm-next"); // Bouton "Oui"
  const cancelNext = document.getElementById("cancel-next"); // Bouton "Non"

  let chiffresData = []; // Tableau pour stocker les données des chiffres
  let currentIndex = 0; // Index de l'image actuellement affichée

  // Fonction pour récupérer les données de "chiffres.json"
  function getChiffres() {
    return fetch("../json/chiffres.json")
      .then((response) => response.json())
      .then((data) => {
        chiffresData = data; // Stocker les données dans le tableau
        return data;
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des chiffres : ", error);
      });
  }

  // Fonction pour afficher l'image actuelle
  function showCurrentImage() {
    if (chiffresData.length > 0) {
      const imageToShow = chiffresData[currentIndex]; // Obtenir l'image actuelle
      mainImage.src = `../images/${imageToShow.image}.png`; // Met à jour la source de l'image affichée
      mainImage.alt = `Image ${imageToShow.id}`; // Met à jour l'attribut alt
      audioPlayer.src = imageToShow.sound; //mettre a jour le son
    }
  }

  // Charger et afficher les chiffres
  getChiffres().then((chiffres) => {
    showCurrentImage(); // Afficher l'image initiale
  });

  // Fonction pour afficher le modal
  function showModal() {
    modal.style.display = "flex";
  }

  // Fonction pour cacher le modal
  function hideModal() {
    modal.style.display = "none";
  }

  //---------------------------------------------------------------------
  // Événement de clic sur le bouton de son
  const soundLink = document.querySelector("#soundLink");
  soundLink.addEventListener("click", () => {
    audioPlayer.play(); // Joue le son
    console.log(soundLink);
  });

  // ------------------------Buttons clicks-------------------------------------
  btn1.addEventListener("click", () => {
    // Afficher l'image précédente
    if (currentIndex > 0) {
      currentIndex--; // Décrementer l'index
      showCurrentImage(); // Afficher l'image actuelle
    }
  });

  btn2.addEventListener("click", () => {
    // Afficher l'image suivante
    if (currentIndex < chiffresData.length - 1) {
      currentIndex++; // Incrémenter l'index
      showCurrentImage(); // Afficher l'image actuelle
    } else {
      // Si l'utilisateur a parcouru toutes les images, afficher le modal
      showModal();
    }
  });
  // ------------------- Modal Button Events -------------------
  confirmNext.addEventListener("click", () => {
    window.location.href = "../pages/mois.html";
    // hideModal();
    console.log("Passage à l'étape suivante !");
    // Ajouter votre logique pour passer à l'étape suivante ici
  });

  cancelNext.addEventListener("click", () => {
    hideModal();
    console.log("L'utilisateur reste sur cette étape.");
  });
});
