let players = [];
let matches = [];
let results = {};

function generateMatches() {
    const playersInput = document.getElementById('players').value;
    players = playersInput.split(',').map(player => player.trim());
    if (players.length !== 5) {
        alert("Wprowadź dokładnie 5 graczy.");
        return;
    }

    // Przypisanie graczy do liter A, B, C, D, E
    const [A, B, C, D, E] = players;

    // Na sztywno przypisane mecze w podanej kolejności
    matches = [
        [A, B, C, D],   // Mecz 1: A, B vs C, D
        [A, C, B, D],   // Mecz 2: A, C vs B, D
        [A, D, B, C],   // Mecz 3: A, D vs B, C
        [A, B, C, E],   // Mecz 4: A, B vs C, E
        [B, C, D, E],   // Mecz 5: B, C vs D, E
        [A, B, D, E],   // Mecz 6: A, B vs D, E
        [A, C, B, E],   // Mecz 7: A, C vs B, E
        [A, D, B, E],   // Mecz 8: A, D vs B, E
        [A, E, B, C],   // Mecz 9: A, E vs B, C
        [B, D, C, E],   // Mecz 10: B, D vs C, E
        [A, C, D, E],   // Mecz 11: A, C vs D, E
        [A, D, C, E],   // Mecz 12: A, D vs C, E
        [A, E, B, D],   // Mecz 13: A, E vs B, D
        [A, E, C, D],   // Mecz 14: A, E vs C, D
        [B, E, C, D]    // Mecz 15: B, E vs C, D
    ];

    displayMatches();
}

function displayMatches() {
    const matchesList = document.getElementById('matches-list');
    matchesList.innerHTML = '';
    matches.forEach((match, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            Mecz ${index + 1}: ${match[0]}, ${match[1]} vs ${match[2]}, ${match[3]}
            <input type="text" class="score-input" id="score-${index}-0" placeholder="wynik">
            <input type="text" class="score-input" id="score-${index}-1" placeholder="wynik">
        `;
        matchesList.appendChild(li);
    });

    document.getElementById('matches-section').style.display = 'block';
}

function showResults() {
    results = {};
    players.forEach(player => {
        results[player] = 0;
    });

    matches.forEach((match, index) => {
        const score0 = document.getElementById(`score-${index}-0`).value;
        const score1 = document.getElementById(`score-${index}-1`).value;

        if (score0 && score1) {
            const points0 = parseInt(score0, 10);
            const points1 = parseInt(score1, 10);

            if (points0 + points1 === 24) {
                // Przydziel punkty do graczy
                results[match[0]] += points0;
                results[match[1]] += points0;
                results[match[2]] += points1;
                results[match[3]] += points1;
            } else {
                alert(`Suma punktów w meczu ${match.join(', ')} nie wynosi 24.`);
            }
        }
    });

    displayResults();
}

function displayResults() {
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = '';

    const sortedResults = Object.entries(results).sort((a, b) => b[1] - a[1]);

    sortedResults.forEach(([player, points]) => {
        const li = document.createElement('li');
        li.textContent = `${player}: ${points} punktów`;
        resultsList.appendChild(li);
    });

    document.getElementById('results-section').style.display = 'block';
}