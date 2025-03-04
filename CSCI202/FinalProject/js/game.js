document.addEventListener("DOMContentLoaded", start);

let clicking = false;
let clickRegistered = false;

let currDialogue;
let dialogueIndex = -1;
let dialogueActive = false;

let buttonX = 300;
let buttonY = 300;
let buttonXSpeed = 1;
let buttonYSpeed = 1;

let buttonMoveInterval;

function start() {
    document.addEventListener("mousebottondown", setClick);
    document.addEventListener("mousebuttonup", clearClick);

    let button = document.getElementById("button");
    button.addEventListener("mousedown", removeShadow);
    button.addEventListener("mouseleave", addShadow);
    button.addEventListener("mouseup", addShadow);

    document.addEventListener("click", advanceDialogue);
    playDialogue(sample);

    setButtonMovement(moveButtonSidetoSide);
}

/* 
TODO:

MUST
Allow site modifying changes (background, title, text, image, etc)
gameplay flow (dialogue to gameplay to site mod, etc)
button click timer

add more button movement functions, maybe they just modify button speed?
set position of dialogue box


POTENTIALLY
separate into different files
Button cage?
set button color sort of like hp?
    -button gets darker when clicked, darkest at end
*/

function setButtonMovement(newMove) {
    clearButtonMovement();
    buttonMoveInterval = setInterval(newMove);
}

function clearButtonMovement() {
    clearInterval(buttonMoveInterval);
}

function moveButtonDVDLogo() {
    buttonX += buttonXSpeed;
    buttonY += buttonYSpeed;

    if (buttonX <= 0 || (buttonX + 200 >= screen.width)) buttonXSpeed *= -1;
    if (buttonY <= 0 || (buttonY + 375 >= screen.height)) buttonYSpeed *= -1;

    updateButtonPosition();
}

function moveButtonSidetoSide() {
    buttonX += buttonXSpeed;

    if (buttonX <= 0 || (buttonX + 200 >= screen.width)) buttonXSpeed *= -1;
    if (buttonY <= 0 || (buttonY + 375 >= screen.height)) buttonYSpeed *= -1;

    updateButtonPosition();
}

function constrainButtonPos() {
    // maybe
}

function updateButtonPosition() {
    let button = document.getElementById("button");

    button.style.left = buttonX + "px";
    button.style.top = buttonY + "px";
}

function removeShadow() {
    let button = document.getElementById("button");
    button.style.boxShadow = "none";
}

function addShadow() {
    let button = document.getElementById("button");
    button.style.boxShadow = "black 5px 5px";
}

function setDudePotrait(fileName) {
    let dudePortrait = document.getElementById("dudePortrait");
    dudePortrait.src = fileName;
    setVisible("dudePortrait", true);
}

function clearDudePortrait() {
    setVisible("dudePortrait", false);
}

function playDialogue(dialogue) {
    setCurrDialogue(dialogue);
    dialogueActive = true;
    advanceDialogue();
}

function advanceDialogue() {
    if (!dialogueActive) {
        return;
    }

    dialogueIndex ++;
    let dString = "";
    if (dialogueIndex > 1) {
        dString += currDialogue[dialogueIndex - 2] + "<br>";
    }
    if (dialogueIndex > 0) {
        dString += currDialogue[dialogueIndex - 1] + "<br>";
    }
    dString += currDialogue[dialogueIndex]
    
    displayText(dString, "DialogueBox");

    if (dialogueIndex >= currDialogue.length - 1) {
        dialogueActive = false;
    }
}



function setCurrDialogue(dialogue) {
    currDialogue = dialogue;
    dialogueIndex = -1;
}

function displayText(text, elementID) {
    document.getElementById(elementID).innerHTML = text;
}

function setVisible(elementID, visible) {
    let element = document.getElementById(elementID);
    if (visible) {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

function setClick() {
    clicking = true;
    clickRegistered = false;
}

function clearClick() {
    clicking = false;
}

sample = [
    "BOB: Hello!",
    "LARRY: Hey Bob!",
    "LARRY: How's it going?",
    "BOB: Great, you?"
]