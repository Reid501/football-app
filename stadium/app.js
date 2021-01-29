const container = document.getElementById('stadium-container')

const getData = async () => {

        // Get The Stadium Data
    try {
        const response = await fetch("https://v3.football.api-sports.io/teams?league=39&season=2020", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": "3df58566b86e228602d541d1219b95ab"
            }
        })
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            data.response.map(item => {
                const section = document.createElement('SECTION');
                container.appendChild(section)
                section.innerHTML = `
                <img class="badge" src=${item.team.logo}>
                <h2>${item.team.name}</h2>
                <h3>${item.venue.name}</h3>
                <h4>CAPACITY: ${item.venue.capacity}</h4>
                <img class="stadium-pic" src=${item.venue.image}>
                `
            })
        }
    } catch (error) {
        console.log(error)
    }
}

// Call Function
getData()
