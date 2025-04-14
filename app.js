const leaders = [
    'Aristotle.png',
    'Bilkis.png',
    'Caesar.png',
    'Cleopatra.png',
    'Hammurabi.png'
];

const playDeck = [
    '0.png', '1.png', '2.png', '3.png', '4.png',
    '5.png', '6.png', '7.png', '8.png', '9.png',
    '10.png', '11.png'
];

let currentLeader = null;
let currentDeck = [];
let drawnCards = 0;

function preloadImages() {
    const images = [...leaders, ...playDeck];
    images.forEach(image => {
        const img = new Image();
        img.src = `images/Deck/${image}`;
    });
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function newGame() {
    currentLeader = shuffle(leaders)[0];
    currentDeck = shuffle([...playDeck]);
    drawnCards = 0;
    document.getElementById('leaderCard').src = 'images/Leaders/LeaderCardBack.png';
    document.getElementById('playDeckCard').src = 'images/Deck/DeckCardBack.png';
    document.getElementById('playDeckInfo').textContent = `Cards Drawn: ${drawnCards}`;
    document.getElementById('lastDrawnCard').src = 'images/Deck/DeckCardBack.png';
    document.getElementById('lastDrawnCard').classList.add('opacity-0');
    document.getElementById('reshuffleBtn').disabled = true;
    document.getElementById('reshuffleBtn').classList.replace('bg-blue-500', 'bg-gray-400');
}

document.getElementById('newGameBtn').addEventListener('click', newGame);

document.getElementById('leaderCard').addEventListener('click', () => {
    document.getElementById('leaderCard').src = `images/Leaders/${currentLeader}`;
});

document.getElementById('playDeckCard').addEventListener('click', () => {
    if (currentDeck.length > 0) {
        const card = currentDeck.shift();
        document.getElementById('lastDrawnCard').src = `images/Deck/${card}`;
        document.getElementById('lastDrawnCard').classList.remove('opacity-0');
        drawnCards++;
        document.getElementById('playDeckInfo').textContent = `Cards Drawn: ${drawnCards}`;
        if (currentDeck.length === 0) {
            document.getElementById('reshuffleBtn').disabled = false;
            document.getElementById('reshuffleBtn').classList.replace('bg-gray-400', 'bg-blue-500');
        }
    }
});

document.getElementById('reshuffleBtn').addEventListener('click', () => {
    currentDeck = shuffle([...playDeck]);
    drawnCards = 0;
    document.getElementById('playDeckInfo').textContent = `Cards Drawn: ${drawnCards}`;
    document.getElementById('lastDrawnCard').src = 'images/Deck/DeckCardBack.png';
    document.getElementById('lastDrawnCard').classList.add('opacity-0');
    document.getElementById('reshuffleBtn').disabled = true;
    document.getElementById('reshuffleBtn').classList.replace('bg-blue-500', 'bg-gray-400');
});

preloadImages();
newGame();
