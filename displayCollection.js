document.addEventListener('DOMContentLoaded', displayCards);

function getSites(fileName) {
    sites = [];
    fetch(fileName)
        .then(response => response.json())
        .then(data => {
            const parent = document.getElementById('container');
            
            data.forEach(item => {
                sites.push([`${item.title}`, `${item.url}`, `${item.description}`])
            });
        })
        .catch(error => console.error('Error loading data:', error)); 

    return sites;
}

function displayCards() {

    mySites = getSites("sites.json");
    interestingSites = getSites("interestingWebsites.json");
  
    fetch('sites.json')
        .then(response => response.json())
        .then(data => {
            const parent = document.getElementById('container');
            
            data.forEach(item => {
                addElement(item, parent);
            });
        })
        .catch(error => console.error('Error loading data:', error)); 
}

function addElement(item, parent) {
    const card = document.createElement('div');
    
    card.setAttribute("class", "card m-1");
    card.innerHTML = `
        <h2><a href="${item.url}">${item.title}<a></h2>
        <p>${item.description}<p>
        `;
    
    parent.appendChild(card);
}