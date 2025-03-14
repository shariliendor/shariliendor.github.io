document.addEventListener('DOMContentLoaded', start);

function start() {
    displayCards("sites.json", "projectContainer", "Project: ");
    displayCards("interestingWebsites.json", "interestingContainer", "Interesting Site: ")
}

function displayCards(fileName, containerID, prefix) {
    const parent = document.getElementById(containerID);
  
    fetch(fileName)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                addElement(item, parent, prefix);
            });
        })
        .catch(error => console.error('Error loading data:', error)); 
}

function addElement(item, parent, prefix) {
    const card = document.createElement('div');
    
    card.setAttribute("class", "card m-1");
    card.innerHTML =
        "<h2><a href='" + item.url + "' target='_blank'>" + prefix + item.title + " <a></h2>" + 
        "<p>" + item.description + "<p>";
    
    parent.appendChild(card);
}

function getTitle(site) {
    return site[0];
}

function getUrl(site) {
    return site[1];
}

function getDesc(site) {
    return site[2];
}