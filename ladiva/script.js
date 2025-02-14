document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM entièrement chargé et analysé");
  showSection("Home");

  // Sélectionner le bouton
  const backToTopButton = document.getElementById("backToTop");
  // Afficher le bouton uniquement lorsqu'on défile vers le bas
  window.onscroll = function () {
    console.log("Scroll détecté :", document.documentElement.scrollTop);
    if (document.documentElement.scrollTop > 200) {
      console.log("Afficher le bouton");
      backToTopButton.style.display = "block";
    } else {
      console.log("Masquer le bouton");
      backToTopButton.style.display = "none";
    }
  };

  // Remonter en haut de la page lors du clic
  backToTopButton.onclick = function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  fetch("elements.json")
    .then((response) => {
      if (!response.ok) throw new Error("Erreur lors du chargement du JSON");
      return response.json();
    })
    .then((data) => {
      const pagePhoto = document.getElementById("pagephoto");
      const pageVideo = document.getElementById("pagevideo");
      const gridWrapper = document.querySelector("#pageshooting .grid-wrapper");
      const modal = document.getElementById("imageModal");
      const modalImg = document.getElementById("modalImage");

      // Parcourir les données JSON
      data.forEach((item) => {
        if (item.type === "photo") {
          const img = document.createElement("img");
          img.src = item.element;
          img.classList.add("clickable"); // Correctement ajouter la classe
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
        } else if (item.type === "shooting") {
          const div = document.createElement("div");
          const img = document.createElement("img");
          img.src = item.element;
          img.alt = "shooting";
          img.classList.add("clickable");

          // Ajouter la classe de mise en page (wide, tall, big, etc.)
          if (item.layout === "wide") {
            div.classList.add("wide");
          } else if (item.layout === "tall") {
            div.classList.add("tall");
          } else if (item.layout === "big") {
            div.classList.add("big");
          }

          div.appendChild(img);
          gridWrapper.appendChild(div);
        }
      });

      // Sélectionner à nouveau les images une fois qu'elles sont ajoutées au DOM
      const images = document.querySelectorAll(".clickable");

      images.forEach((img) => {
        img.addEventListener("click", () => {
          modal.style.display = "flex"; // Afficher le modal
          modalImg.src = img.src; // Mettre l'image cliquée dans le modal
        });
      });

      modalImg.addEventListener("click", () => {
        modal.style.display = "none"; // Fermer le modal lorsque l'image est cliquée
      });

      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.style.display = "none"; // Fermer le modal si on clique en dehors de l'image
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
});
