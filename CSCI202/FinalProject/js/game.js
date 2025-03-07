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

let playerName = "[player name]";
let favoriteImage = "images/carlBPA.jpg";
let favoriteColor;
let totalButtonPushes = 0;

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
        "LARRY: BPA? Isn't that the stuff in water bottles?"
    ],

    "startGame4": [
        "CARL: No, the Button Protection Agency",
        "YOU: Wait how is that actually a thing?",
        "LARRY: And what are you protecting buttons from, being pushed?"
    ],

    "startGame5": [
        "CARL: Exactly! Pushing a button is a sacriligeous act,",
        "CARL: Going against the teachings of Nopushius, the Button Guardian",
        "CARL: It's so terrible to be on the internet",
        "CARL: So many buttons everywhere",
        "LARRY: You do realize that buttons are meant to help you navigate...",
        "CARL: No! They are the flock of Nopushius and must not be touched!",
        "LARRY: Here, let me push the button again",
        "LARRY: You'll see it's not so bad",
        "LARRY: My friend Jamal pushed one earlier",
        "YOU: Yeah, he said it did something cool!",
        "CARL: NOOOO! I CAST DVD LOGO!!!"
    ],

    "1interlude1": [
        "YOU: Wow, did you see that?",
        "LARRY: Yeah, the whole background changed color!",
        "LARRY: See Carl? Buttons are so much cooler when you push them!"
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
    "setDudePortrait images/carl.jpg",
    "playDialogue startGame3",
    "setDudePortrait images/carlBPA.jpg",
    "playDialogue startGame4",
    "setDudePortrait images/carl.jpg",
    "playDialogue startGame5",

    "playButtonClicking DVDLogo 10 1500",
    "changeBgColor",
    "playDialogue 1interlude1",

    "displayFinalProduct"
];

function start() {
    let button = document.getElementById("button");
    button.addEventListener("mousedown", removeShadow);
    button.addEventListener("mouseleave", addShadow);
    button.addEventListener("mouseup", addShadow);
    button.addEventListener("click", clickButton);

    advanceEventQueue();
}

/* 
TODO:

MUST
Allow  more site modifying changes (background, title, text, image, etc)
    - add the rest of final product-modifying methods

put dialogue in json file

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
            advanceEventQueue();
            return;

        case "clearDudePortrait":
            clearDudePortrait();
            advanceEventQueue();
            return;

        case "setVisible":
            let elementID = words[1];
            let vis = Number(words[2]);
            setVisible(elementID, vis);
            advanceEventQueue();
            return;
        
        case "displayFinalProduct":
            displayFinalProduct();
            return;
    }
}

function displayFinalProduct() {
    let body = document.getElementById("body");
    body.style.backgroundColor = favoriteColor;
    

    body.innerHTML = `
        <img id="dudePortrait" src="" alt="">
        <h2>Hello, ` + playerName + ` and Larry, pushers of buttons</h2>
        <p>
            I am Nopushius, Guardian of Buttons. <br>
            In spite of the knowledge imparted to you by my faithful servants, <br>
            you have succeeded in pushing
        </p>
        <h1>` + totalButtonPushes + ` BUTTONS!</h1>
        <p>
            Despite my great power, I cannot take this cursed image off the screen! <br>
            Nor can I remove this vile background color you have set! <br>
            Do you see what you've done? <br>
            These crimes will not go unpunished!
        </p>
    `;

    setDudePotrait(favoriteImage);
    let dudePortrait = document.getElementById("dudePortrait");
    dudePortrait.style.top = "300px";
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
            return;
        }

        // done, move on
        setVisible("button", false);
        advanceEventQueue();
    }
}

function clickButton() {
    clickCount ++;
    totalButtonPushes++;
    
    if (waitingForClick) {
        waitingForClick = false;
        ignoreNextClick = true;
        advanceEventQueue();
    }
}

function updateScoreDisplay() {
    displayText("Time Left: " + clickTimer + " Clicks: " + clickCount + "/" + clicksNeeded, "text");
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
    let favoriteColor = event.target.value;
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
}

function clearDudePortrait() {
    setVisible("dudePortrait", false);
}

function playDialogue(dialogue) {
    setCurrDialogue(dialogue);
    document.addEventListener("click", advanceDialogue);
    advanceDialogue();
}

function advanceDialogue() {
    if (dialogueIndex + 1 >= currDialogue.length) { // +1 because if it were to advance
        // done, move on
        document.removeEventListener("click", advanceDialogue);
        advanceEventQueue();
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
