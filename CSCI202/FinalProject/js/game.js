document.addEventListener("DOMContentLoaded", start);

let clicking = false;
let clickRegistered = false;

let currDialogue;
let dialogueIndex = -1;

let buttonX = 300;
let buttonY = 300;
let buttonXSpeed = 1;
let buttonYSpeed = 1;

let buttonClicks = 0;
let clickTimerStart = 0;
let clickTimer = 0;
let clicksNeeded = 0;

let buttonMoveFunction;
let buttonMoveInterval;
let timerInterval;

let activeElements = [];

let buttonMoveFunctions = {
    "DVDLogo": moveButtonDVDLogo,
    "SidetoSide": moveButtonSidetoSide
}

let eventQueue = [
    "playButtonClicking DVDLogo 10 1000"
]

function start() {
    document.addEventListener("mousebottondown", setClick);
    document.addEventListener("mousebuttonup", clearClick);

    let button = document.getElementById("button");
    button.addEventListener("mousedown", removeShadow);
    button.addEventListener("mouseleave", addShadow);
    button.addEventListener("mouseup", addShadow);
    button.addEventListener("click", clickButton);

    document.addEventListener("click", advanceDialogue);

    runEventQueue();
}

/* 
TODO:

MUST
gameplay flow (dialogue to gameplay to site mod, etc)
maybe an event queue

Allow  more site modifying changes (background, title, text, image, etc)
add more button movement functions, maybe they just modify button speed?
set position of dialogue box


POTENTIALLY
separate into different files
Button cage?
set button color sort of like hp?
    -button gets darker when clicked, darkest at end
*/

function runEventQueue() {
    let funName;
    let words;

    for (i = 0; i < eventQueue.length; i++) {
        words = eventQueue[i].split(" ");
        funName = words[0];
        
        switch (funName) {
            case "playButtonClicking":
                let moveType = buttonMoveFunctions[words[1]];
                let clicksToPass = Number(words[2]);
                let timeAllowed = Number(words[3]);
                playButtonClicking(moveType, clicksToPass, timeAllowed);
                break;
        }
    }
}

function playButtonClicking(buttonMoveFunction, clicksToPass, time) {
    activeElements.push("button");
    displayText("starting button move", "text");

    setButtonMovement(buttonMoveFunction);
    clickCount = 0;
    clickTimerStart = time;
    clickTimer = time;
    clicksNeeded = clicksToPass;
    timerInterval = setInterval(decrementTimer, 1);

    // reset button position
    buttonX = 300;
    buttonY = 300;
    updateButtonPosition();
}

function decrementTimer() {
    if (!(activeElements[activeElements.length - 1] == "button")) {
        return;
    }

    clickTimer --;
    updateScoreDisplay();

    if(clickTimer <= 0) {
        clickTimer = 0;
        clearInterval(timerInterval);
        clearInterval(buttonMoveInterval);
        activeElements.pop();

        if (clickCount < clicksNeeded) {
            // replay
            displayText("calling", "text");
            playButtonClicking(buttonMoveFunction, clicksNeeded, clickTimerStart);
        }

        // done, move on
    }
}

function clickButton() {
    if (!(activeElements[activeElements.length - 1] == "button")) {
        return;
    }
    clickCount ++;
}

function updateScoreDisplay() {
    displayText("Time Left: " + clickTimer + " Clicks: " + clickCount, "text");
}

function changeBgColor() {
    activeElements.push("form");

    formWrapper = document.getElementById("formWrapper");
    formWrapper.innerHTML = `
            <label for="colorPicker">Choose a backgroud color for your website:</label>
            <input type="color" id="colorPicker">
            <button id="formSubmit">Confirm</button>`;

    let colorPicker = document.getElementById("colorPicker");
    colorPicker.addEventListener("input", setBgColor);

    let submitButton = document.getElementById("formSubmit");
    submitButton.addEventListener("click", removeForm);
}

function setBgColor(event) {
    let body = document.getElementById("body");
    body.style.backgroundColor = event.target.value;
}

function removeForm() {
    activeElements.pop();

    formWrapper = document.getElementById("formWrapper");
    formWrapper.innerHTML = "";
}

function setButtonMovement(newMove) {
    clearButtonMovement();
    buttonMoveFunction = newMove;
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
    activeElements.push("dialogue");
    advanceDialogue();
}

function advanceDialogue() {
    if (!(activeElements[activeElements.length - 1] == "dialogue")) {
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
        activeElements.pop();
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