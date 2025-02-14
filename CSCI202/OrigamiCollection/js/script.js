// This event listener waits for the DOM (Document Object Model) to fully load before executing the contained code.
document.addEventListener('DOMContentLoaded', displayCards);

function displayCards() {
  
    fetch('json/collection.json')
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
        <img class = "card-img-top" src="${item.imageUrl}" alt="${item.altText}">
        <div class = "card-body">
            <h2>${item.title}</h2>
            <p> Design: ${item.designer} </p>
            <p> Complexity: ${getStars(item.complexity)} </p>
            <a href="${item.diagramLink}" target = "_blank" class = "card-link">Diagrams</a>
        </div>
        `;
    
    parent.appendChild(card);
}

function getStars(num) {
    let str = "";

    for (let i = 0; i < 5; i++) {
        if (i < num) str += "★";
        else str += "☆";
    }

    return str;
}