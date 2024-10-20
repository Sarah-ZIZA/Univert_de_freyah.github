document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game-board");
    const restartButton = document.getElementById("restart-button");
    const victoryGifContainer = document.getElementById("victory-gif");
    let flippedCards = [];
    let matchedCards = [];
    let lockBoard = false;
    let cardsArray = [];

    const ring = () => {
        const audio = new Audio();
        audio.src = "images/goodresult.mp3";
        audio.play();
    };

    // Fonction pour afficher le GIF
    const gifs = () => {
        const gif = document.createElement("img");
        gif.src = "images/victoire.gif";
        gif.alt = "Victoire!";
        victoryGifContainer.innerHTML = ""; // Vide le conteneur avant d'ajouter le GIF
        victoryGifContainer.appendChild(gif);
    };

    // Charger le JSON
    function getCardsArray() {
        return fetch("cardsArray.json")
            .then((response) => response.json())
            .then((data) => {
                cardsArray = data; // Mettez à jour cardsArray avec les données JSON
                createBoard(); // Créez le plateau de jeu après avoir chargé les données
            })
            .catch((error) =>
                console.error("Erreur lors du chargement des cartes:", error)
            );
    }

    function createBoard() {
        gameBoard.style.display = "grid"; // S'assurer que le plateau de jeu est visible
        gameBoard.innerHTML = "";
        flippedCards = [];
        matchedCards = [];
        lockBoard = false; // Réinitialiser lockBoard lors du redémarrage
        cardsArray.sort(() => 0.5 - Math.random());
        cardsArray.forEach((card) => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card");
            cardElement.dataset.name = card.name;
            cardElement.dataset.id = card.id;

            const cardFront = document.createElement("div");
            cardFront.classList.add("card-front");
            const cardBack = document.createElement("div");
            cardBack.classList.add("card-back");
            cardBack.style.backgroundImage = `url(${card.img})`;

            cardElement.appendChild(cardFront);
            cardElement.appendChild(cardBack);
            cardElement.addEventListener("click", flipCard);
            gameBoard.appendChild(cardElement);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this.classList.contains("flipped")) return;
        if (matchedCards.includes(this)) return;

        this.classList.add("flipped");
        flippedCards.push(this);

        if (flippedCards.length === 4) {
            checkForMatch();
        }
    }

    function checkForMatch() {
        lockBoard = true;
        const [firstCard, secondCard, thirdCard, fourthCard] = flippedCards;
        const isMatch =
            firstCard.dataset.name === secondCard.dataset.name &&
            secondCard.dataset.name === thirdCard.dataset.name &&
            thirdCard.dataset.name === fourthCard.dataset.name;

        if (isMatch) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        flippedCards.forEach((card) => {
            card.removeEventListener("click", flipCard);
            matchedCards.push(card);
        });
        resetBoard();

        if (matchedCards.length === cardsArray.length) {
            gifs(); // Affiche le GIF de victoire
            ring(); // Joue l'audio
            lockBoard = true; // Empêche de retourner d'autres cartes

            // Changer la couleur de fond du corps
            document.body.style.backgroundColor = "whitesmoke"; // Mettre le fond en blanc

            // Masquer le plateau de jeu
            gameBoard.style.display = "none"; // Masquer complètement le plateau de jeu
            // Afficher le message de victoire
            const victoryMessage = document.getElementById("victory-message");
            victoryMessage.style.display = "block"; // Affiche le message
        }
    }

    function unflipCards() {
        setTimeout(() => {
            flippedCards.forEach((card) => card.classList.remove("flipped"));
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        flippedCards = [];
        lockBoard = false;
    }

    restartButton.addEventListener("click", () => {
        console.log("Le bouton de redémarrage a été cliqué."); // Message de débogage
        victoryGifContainer.innerHTML = ""; // Vide le conteneur GIF
        gameBoard.style.display = "grid"; // Afficher le plateau de jeu
        document.body.style.backgroundColor = ""; // Réinitialiser la couleur de fond
        const victoryMessage = document.getElementById("victory-message");
        victoryMessage.style.display = "none";
        createBoard();
    });

    // Charger les cartes et créer le plateau de jeu
    getCardsArray();
});