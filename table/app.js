const table = document.getElementById('table');

const getData = async () => {
    // Collect the Data from the Football API Website.
    try{
        const response = await fetch("https://v3.football.api-sports.io/standings?league=39&season=2020", {
	    "method": "GET",
	    "headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "3df58566b86e228602d541d1219b95ab"
            }
        })
        if (response.ok){
            // Change data to JSON
            const data = await response.json();
            // Find the league table data in the object and save it to var
            const rawLeagueData = data.response[0].league.standings[0];
            // Map over league table data and add the data to the table
            rawLeagueData.map( item => {
                const tableRow = document.createElement('TR')
                table.appendChild(tableRow);
                tableRow.innerHTML = 
                `
                <th>${item.rank}</th>
                <th><img src=${item.team.logo}></th>
                <th>${item.team.name}</th>
                <th>${item.points}</th>
                <th>${item.all.played}</th>
                <th>${item.goalsDiff}</th>
                <th>${item.form}</th>
                `
            })
        }
    } catch(err) {
        // Log erros to console
        console.log(err)
        container.innerHTML = `<h1 class="error-message">Sorry, Looks like we have run out of API calls</h1>`
    }
}

// Run the function
getData();