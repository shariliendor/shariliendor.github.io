
document.addEventListener("mouseover", start);



let clickCount = 0;
let hovered = false;
let score = 0;
let buttonX = 300;
let buttonY = 300;
let buttonXSpeed = 1;
let buttonYSpeed = 1;

function start() {
    const button = document.getElementById("button");
    button.addEventListener("click", clickButton);
    button.addEventListener("mouseover", hover);
    button.addEventListener("mousedown", removeShadow);
    button.addEventListener("mouseup", addShadow);
}

function hover() {
    if (hovered) return;

    let text = document.getElementById("text");

    text.innerHTML = "Well don't just awkwardly hover! Click it already!"
    hovered = true;
}

function clickButton() {
    let text = document.getElementById("text");
    let button = document.getElementById("button");
    let dude = document.getElementById("dude");
    //let counter = document.getElementById("clickCount");
    clickCount++;
    //counter.innerHTML = clickCount;

    switch (clickCount) {
        case 1: {
            text.innerHTML = "Great! It's supposed to do something though... Maybe try again?";
            break;
        }

        case 2: {
            text.innerHTML = "Hmm... I'm not sure if it's working... One more time?";
            break;
        }

        case 3: {
            button.style.backgroundColor = "green";
            text.innerHTML = "Well it's green now... Maybe it finished loading or something and now it'll work";
            break;
        }

        case 4: {
            text.innerHTML = "It's a dude!";
            dude.style.display = "block";
            break;
        }

        case 5: {
            text.innerHTML = "He looks angry... Maybe you shouldn't push it anymore...";
            dude.src = "images/angryDude.png";
            break;
        }

        case 6: {
            text.innerHTML = "Wait.. What? (Score: " + score + ")";
            dude.src = "images/angryDudeSpell.png"
            setInterval(moveButton);
            break;
        }

        case 7: {
            text.innerHTML = "Oh dear god... (Score: " + score + ")";
            dude.src = "images/angryDudeFaster.png";
            goFaster();
            score ++;
        }

        default: {
            text.innerHTML = "This is getting out of hand... (Score: " + score + ")";
            goFaster();
            score ++;
        }
    }
}

function removeShadow() {
    let button = document.getElementById("button");
    button.style.boxShadow = "none";
}

function addShadow() {
    let button = document.getElementById("button");
    button.style.boxShadow = "black 5px 5px";
}




function moveButton() {
    let button = document.getElementById("button");
    buttonX += buttonXSpeed;
    buttonY += buttonYSpeed;

    button.style.left = buttonX + "px";
    button.style.top = buttonY + "px";

    if (buttonX <= 0 || (buttonX + 200 >= screen.width)) buttonXSpeed *= -1;
    if (buttonY <= 0 || (buttonY + 375 >= screen.height)) buttonYSpeed *= -1;
}

function goFaster() {
    if (buttonXSpeed > 0) buttonXSpeed += 0.5;
    else buttonXSpeed -= 0.5;

    if (buttonYSpeed > 0) buttonYSpeed += 0.5;
    else buttonYSpeed -= 0.5;
}