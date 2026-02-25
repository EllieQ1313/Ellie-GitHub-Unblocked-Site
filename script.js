// Load games from JSON and display them
async function loadGames() {
    try {
        const response = await fetch('games.json');
        const games = await response.json();
        const container = document.getElementById('games-container');
        
        games.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';
            gameCard.innerHTML = `
                <h3>${game.name}</h3>
                <button onclick="playGame('${game.url}', '${game.name}')">Play Game</button>
            `;
            container.appendChild(gameCard);
        });
    } catch (error) {
        console.error('Error loading games:', error);
        document.getElementById('games-container').innerHTML = '<p>Error loading games. Please check your games.json file.</p>';
    }
}

// Play game in modal
function playGame(url, gameName) {
    const modal = document.getElementById('gameModal');
    const iframe = document.getElementById('gameIframe');
    
    if (!modal) {
        createModal();
    }
    
    const modal2 = document.getElementById('gameModal');
    const iframe2 = document.getElementById('gameIframe');
    
    iframe2.src = url;
    modal2.style.display = 'block';
}

// Create modal if it doesn't exist
function createModal() {
    const modal = document.createElement('div');
    modal.id = 'gameModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn" onclick="closeGame()">&times;</span>
            <iframe id="gameIframe" class="game-iframe"></iframe>
        </div>
    `;
    document.body.appendChild(modal);
}

// Close game modal
function closeGame() {
    const modal = document.getElementById('gameModal');
    if (modal) {
        modal.style.display = 'none';
        document.getElementById('gameIframe').src = '';
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('gameModal');
    if (event.target === modal) {
        modal.style.display = 'none';
        document.getElementById('gameIframe').src = '';
    }
}

// Load games when page loads
window.addEventListener('load', loadGames);