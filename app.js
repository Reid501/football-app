const container = document.getElementById('score-container')

const getData = async () => {
    // Get The Round Number For Current Fixtures
    let currentRound = ''
    try {
        const roundResponse = await fetch("https://v3.football.api-sports.io/fixtures/rounds?league=39&season=2020&current=true", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": "3df58566b86e228602d541d1219b95ab"
            }
        })
        if (roundResponse.ok) {
            const roundData = await roundResponse.json();
            // Get Response Data
            currentRound = roundData.response[0];
        }
        // Get The Fixtures For The Current Round
        const response = await fetch(`https://v3.football.api-sports.io/fixtures?league=39&season=2020&timezone=Europe/London&round=${currentRound}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": "3df58566b86e228602d541d1219b95ab"
            }
        })
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            // Add The Response To The DOM
            data.response.map( item => {
                // Create A Section For The Scores To Go
                let scoreSec;
                // Check If The Game Has Kicked Off
                if (item.fixture.status.elapsed === null){
                    scoreSec = document.createElement('DIV').innerHTML = 
                    '<div><p>-</p></div>';
                } else {
                    // Create Div Containing The Time And Score
                    scoreSec = document.createElement('DIV').innerHTML = `
                        <div>
                            <p>${item.fixture.status.elapsed}</p>
                            <p>${item.goals.home}-${item.goals.away}</p>
                        </div>
                    `
                }
                // Create Section
                const section = document.createElement('SECTION')
                // Append Section To The Container Div
                container.appendChild(section);
                // Update Section With The Data
                section.innerHTML = `
                <h3>${item.teams.home.name}</h3>
                <img src=${item.teams.home.logo}>
                ${scoreSec}
                <img src=${item.teams.away.logo}>
                <h3 class="away-team-name">${item.teams.away.name}</h3>
                `
            })
        }
    } catch (error) {
        console.log(error)
    }
}

// Call Function
getData()

 