// Fonction pour afficher une section et masquer les autres
function showSection(category) {
  // Masquer toutes les sections
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
  });

  // Afficher la section correspondante à la catégorie
  const sectionToShow = document.querySelector(`#${category}`);
  if (sectionToShow) {
    sectionToShow.classList.add("active");
  }
}

// Charger les produits depuis le fichier JSON
fetch("produitFille.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erreur lors du chargement du fichier JSON");
    }
    return response.json(); // Convertir la réponse en objet JSON
  })
  .then((produits) => {
    // Appeler une fonction pour afficher les produits par catégorie
    afficherProduitsParCategorie(produits);
  })
  .catch((error) => {
    console.error("Erreur:", error);
  });

// Fonction pour afficher les produits dans chaque catégorie
function afficherProduitsParCategorie(produits) {
  // Catégories disponibles
  const categories = ["vetement", "accessoire"];

  categories.forEach((category) => {
    // Trouver la section correspondante
    const section = document.querySelector(`#${category} .produit-list`);
    section.innerHTML = ""; // Effacer le contenu précédent

    // Filtrer les produits par catégorie
    const produitsCategorie = produits.filter(
      (produit) => produit.category === category
    );

    // Ajouter les produits à la section
    produitsCategorie.forEach((produit) => {
      // Générer les ronds colorés pour les couleurs disponibles
      const couleurs = produit.color.split(",").map((color) => color.trim());
      const couleursHTML = couleurs
        .map(
          (color) => `
                <span class="color-circle" style="background-color: ${color};"></span>
              `
        )
        .join("");
      const produitHTML = `
          <div class="produit">
            <img src="${produit.image}" alt="${produit.alt}">
            <p>${produit.desc}</p>
            <p>Prix: ${produit.price}</p>
           <div class="couleurs">${couleursHTML}</div>
          </div>
        `;
      section.innerHTML += produitHTML;
    });
  });
}

// Afficher par défaut la section "vetement"
document.addEventListener("DOMContentLoaded", () => {
  showSection("vetement"); // Affiche par défaut la section des vêtements
});
