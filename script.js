let players = [];
let matches = [];
let results = {};

function generateMatches() {
    // Pobieranie nazw graczy z pola tekstowego
    const playersInput = document.getElementById('players').value;
    const playersArray = playersInput.split(',').map(name => name.trim()).filter(name => name !== '');

    // Walidacja: dokładnie 5 unikalnych nazw
    if (playersArray.length !== 5 || new Set(playersArray).size !== 5) {
        alert('Proszę wpisać dokładnie 5 unikalnych nazw graczy oddzielonych przecinkami.');
        return;
    }

    players = playersArray;

    // Lista meczów w Twoim określonym porządku
    matches = [
        [[0, 1], [2, 3]],  // Mecz 1: Kuba & Paweł vs. Wojtek & Roman
        [[2, 3], [1, 4]],  // Mecz 2: Wojtek & Roman vs. Paweł & Suchy
        [[0, 1], [4, 3]],  // Mecz 3: Kuba & Paweł vs. Suchy & Roman
        [[2, 4], [0, 1]],  // Mecz 4: Wojtek & Suchy vs. Kuba & Paweł
        [[0, 2], [4, 3]],  // Mecz 5: Kuba & Wojtek vs. Suchy & Roman
        [[0, 3], [2, 1]],  // Mecz 6: Kuba & Roman vs. Wojtek & Paweł
        [[2, 1], [4, 3]],  // Mecz 7: Wojtek & Paweł vs. Suchy & Roman
        [[0, 4], [1, 3]],  // Mecz 8: Kuba & Suchy vs. Paweł & Roman
        [[2, 1], [0, 4]],  // Mecz 9: Wojtek & Paweł vs. Kuba & Suchy
        [[0, 3], [2, 4]],  // Mecz 10: Kuba & Roman vs. Wojtek & Suchy
        [[0, 2], [1, 3]],  // Mecz 11: Kuba & Wojtek vs. Paweł & Roman
        [[1, 3], [2, 4]],  // Mecz 12: Paweł & Roman vs. Wojtek & Suchy
        [[0, 3], [1, 4]],  // Mecz 13: Kuba & Roman vs. Paweł & Suchy
        [[1, 4], [0, 2]],  // Mecz 14: Paweł & Suchy vs. Kuba & Wojtek
        [[0, 4], [2, 3]]   // Mecz 15: Kuba & Suchy vs. Wojtek & Roman
    ];

    // Wyświetlanie listy meczów w formie tabeli
    const matchList = document.getElementById('match-list');
    matchList.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Nr</th>
                    <th>Para 1</th>
                    <th>vs</th>
                    <th>Para 2</th>
                    <th>Wynik</th>
                    <th>Siedzi</th>
                </tr>
            </thead>
            <tbody>
                ${matches.map((match, index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${players[match[0][0]]} & ${players[match[0][1]]}</td>
                        <td>vs</td>
                        <td>${players[match[1][0]]} & ${players[match[1][1]]}</td>
                        <td>
                            <input type="number" min="0" max="24" id="match-${index}-team1"> : 
                            <input type="number" min="0" max="24" id="match-${index}-team2">
                        </td>
                        <td>${players.find((player, playerIndex) => ![...match[0], ...match[1]].includes(playerIndex))}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    document.getElementById('matches').style.display = 'block';
}

function generateResults() {
    results = {};
    players.forEach((player, index) => {
        results[index] = 0; // Inicjalizacja wyników dla każdego gracza
    });

    // Zbieranie wyników z pól input
    matches.forEach((match, index) => {
        const score1 = parseInt(document.getElementById(`match-${index}-team1`).value, 10);
        const score2 = parseInt(document.getElementById(`match-${index}-team2`).value, 10);

        if (!isNaN(score1) && !isNaN(score2) && score1 + score2 === 24) {
            // Przydzielanie punktów graczom
            results[match[0][0]] += score1; // Gracz 1 z drużyny 1
            results[match[0][1]] += score1; // Gracz 2 z drużyny 1
            results[match[1][0]] += score2; // Gracz 1 z drużyny 2
            results[match[1][1]] += score2; // Gracz 2 z drużyny 2
        } else {
            alert(`Nieprawidłowy wynik w meczu ${index + 1}. Suma punktów musi wynosić 24.`);
            return;
        }
    });

    // Sortowanie graczy od największej do najmniejszej liczby punktów
    const sortedResults = Object.entries(results).sort((a, b) => b[1] - a[1]);

    // Wyświetlanie wyników
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Gracz</th>
                    <th>Punkty</th>
                </tr>
            </thead>
            <tbody>
                ${sortedResults.map(([playerIndex, points]) => `
                    <tr>
                        <td>${players[playerIndex]}</td>
                        <td>${points}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    document.getElementById('results').style.display = 'block';
}
