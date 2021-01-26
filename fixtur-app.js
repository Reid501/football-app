const table = document.getElementById('score-container')

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
            data.response.map( item => {
                const tableRow = document.createElement('TR')
                table.appendChild(tableRow);
                tableRow.innerHTML = ``
            })
        }
    } catch (error) {
        console.log(error)
    }
}

getData()

 // let scoreSec;
                // if (item.fixture.status.elapsed === null){
                //     scoreSec = document.createElement('TH').innerHTML = '-';
                // } else {
                //     scoreSec = document.createElement('TH').innerHTML = `
                //         <tr>${item.fixture.status.elapsed}</tr>
                //         <tr>${item.goals.home}-${item.goals.away}</tr>
                //     `
                // }