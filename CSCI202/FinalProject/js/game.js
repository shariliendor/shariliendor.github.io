document.addEventListener("DOMContentLoaded", start);

let currDialogue;
let dialogueIndex = -1;

let buttonX = 300;
let buttonY = 300;
let buttonXSpeed = 1;
let buttonYSpeed = 1;

let ignoreNextClick = false;

let clickCount = 0;
let waitingForClick = false;
let clickTimerStart = 0;
let clickTimer = 0;
let clicksNeeded = 0;

let buttonMoveFunction;
let buttonMoveInterval;
let timerInterval;

const dialogues = {
    "startGame1": [
        "LARRY: So I heard there was this button thing",
        "YOU: A button thing...",
        "LARRY: Yeah, Jamal said it did something cool",
        "YOU: Hmm, what?",
        "LARRY: I don't know, he wouldn't tell me",
        "YOU: That's weird"
    ],

    "startGame2": [
        "LARRY: Is that...",
        "YOU: Could be...",
        "LARRY: Push it!"
    ],

    "startGame3": [
        "???: STOP!",
        "YOU: Huh?",
        "???: Step away from that button! I'm with the BPA!",
        "YOU: The what?",
        "LARRY: BPA? Isn't that the stuff in water bottles?",
        "???: What? No, Button Protection Agency"
    ]
};

let buttonMoveFunctions = {
    "DVDLogo": moveButtonDVDLogo,
    "SidetoSide": moveButtonSidetoSide,
    "StayStill": moveButtonStayStill
};

let queueIndex = -1;

let eventQueue = [
    "playDialogue startGame1",
    "setVisible button 1",
    "playDialogue startGame2",
    "waitForClick",
    "playDialogue startGame3"
];

function start() {
    let button = document.getElementById("button");
    button.addEventListener("mousedown", removeShadow);
    button.addEventListener("mouseleave", addShadow);
    button.addEventListener("mouseup", addShadow);
    button.addEventListener("click", clickButton);

    document.addEventListener("click", advanceDialogue);
    
    advanceEventQueue();
}

/* 
TODO:

MUST
Allow  more site modifying changes (background, title, text, image, etc)
    - decide what the final product is
    - add the rest of final product-modifying methods
    - put dialogue in json file

Add more button movement functions
    - maybe they just modify button speed?
    - button could move when clicked

set position of dialogue box


POTENTIALLY
Button cage?
set button color sort of like hp?
    -button gets darker when clicked, darkest at end
*/

function advanceEventQueue() {
    if (queueIndex >= eventQueue.length) {
        return;
    }
    
    queueIndex++;
    
    let words = eventQueue[queueIndex].split(" ");
    let funName = words[0];

    switch (funName) {
        case "playButtonClicking":
            let moveType = buttonMoveFunctions[words[1]];
            let clicksToPass = Number(words[2]);
            let timeAllowed = Number(words[3]);
            playButtonClicking(moveType, clicksToPass, timeAllowed);
            return;
        
        case "waitForClick":
            waitingForClick = true;
            return;
        
        case "playDialogue":
            let d = dialogues[words[1]];
            playDialogue(d);
            return;
        
        case "changeBgColor":
            changeBgColor();
            return;
        
        case "setDudePortrait":
            let dudePortait = words[1];
            setDudePotrait(dudePortait);
            return;

        case "clearDudePortrait":
            clearDudePortrait();
            return;

        case "setVisible":
            let elementID = words[1];
            let vis = Number(words[2]);
            setVisible(elementID, vis);
            advanceEventQueue();
            return;
    }
}

// function getDialogue(d) {
//     fetch('json/dialogues.json')
//         .then(response => response.json())
//         .then(data => {
//             return data[d];
//         })
//         .catch(error => console.error('Error loading data:', error)); 
// }

function playButtonClicking(buttonMoveFunction, clicksToPass, time) {
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
    clickTimer --;
    updateScoreDisplay();    

    if(clickTimer <= 0) {
        clickTimer = 0;
        clearInterval(timerInterval);
        clearInterval(buttonMoveInterval);

        if (clickCount < clicksNeeded) {
            // replay
            playButtonClicking(buttonMoveFunction, clicksNeeded, clickTimerStart);
        }

        // done, move on

        advanceEventQueue();
    }
}

function clickButton() {
    clickCount ++;
    
    if (waitingForClick) {
        waitingForClick = false;
        ignoreNextClick = true;
        advanceEventQueue();
    }
}

function updateScoreDisplay() {
    displayText("Time Left: " + clickTimer + " Clicks: " + clickCount, "text");
}

function changeBgColor() {
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
    formWrapper = document.getElementById("formWrapper");
    formWrapper.innerHTML = "";

    // done, move on
    ignoreNextClick = true;
    advanceEventQueue();
}

function setButtonMovement(newMove) {
    clearButtonMovement();
    buttonMoveFunction = newMove;
    buttonMoveInterval = setInterval(newMove);
}

function clearButtonMovement() {
    clearInterval(buttonMoveInterval);
}

function moveButtonStayStill(){}

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

    advanceEventQueue();
}

function clearDudePortrait() {
    setVisible("dudePortrait", false);

    advanceEventQueue();
}

function playDialogue(dialogue) {
    setCurrDialogue(dialogue);
    advanceDialogue();
}

function advanceDialogue() {
    if (dialogueIndex + 1 >= currDialogue.length) {
        return;
    }

    if (ignoreNextClick) {
        ignoreNextClick = false;
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
        // done, move on
        advanceEventQueue();
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
