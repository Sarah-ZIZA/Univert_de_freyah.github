showSection("Home");

// Sélectionner le bouton
const backToTopButton = document.getElementById("backToTop");

// Afficher le bouton uniquement lorsqu'on défile vers le bas
window.onscroll = function () {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
};

// Remonter en haut de la page lors du clic
backToTopButton.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Défilement fluide
  });
};

// Charger dynamiquement le fichier JSON
// Charger dynamiquement le fichier JSON
fetch("elements.json")
  .then((response) => {
    if (!response.ok) throw new Error("Erreur lors du chargement du JSON");
    return response.json();
  })
  .then((data) => {
    const pagePhoto = document.getElementById("pagephoto");
    const pageVideo = document.getElementById("pagevideo");

    // Parcourir les données JSON
    data.forEach((item) => {
      if (item.type === "photo") {
        const img = document.createElement("img");
        img.src = item.element;
        img.alt = "Photo";
        img.style.width = "400px";
        img.style.margin = "5px";
        pagePhoto.appendChild(img);
      } else if (item.type === "video") {
        const video = document.createElement("video");
        video.src = item.element;
        video.controls = true;
        video.style.width = "400px";
        video.style.margin = "5px";
        pageVideo.appendChild(video);
      }
    });

    // Afficher les sections si elles contiennent des éléments
    if (pagePhoto.children.length > 0) {
      pagePhoto.style.display = "block";
    }
    if (pageVideo.children.length > 0) {
      pageVideo.style.display = "block";
    }
  })
  .catch((error) => {
    console.error("Erreur lors du chargement du JSON :", error);
    document.getElementById("pagephoto").innerText =
      "Erreur lors du chargement des photos.";
  });

//section photo et video
// Cacher toutes les sections sauf la section cliquée
function showSection(sectionId) {
  const sections = document.querySelectorAll("main section");
  sections.forEach((section) => {
    if (section.id === sectionId) {
      section.classList.remove("hidden"); // Montre la section cliquée
    } else {
      section.classList.add("hidden"); // Cache les autres sections
    }
  });
}

// Ajout des événements sur les liens du menu
document.querySelectorAll(".nav ul li a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du lien
    const targetSection = link.getAttribute("href").substring(1); // Extrait l'id de la section cible
    showSection(targetSection);
  });
});

// Initialisation : cacher toutes les sections
showSection(""); // Pas de section affichée au chargement
