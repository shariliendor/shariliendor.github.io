document.addEventListener("DOMContentLoaded", start);

let currDialogue;
let dialogueIndex = -1;

let buttonX = 300;
let buttonY = 300;
let buttonSize = 200;
let buttonXSpeed = 1;
let buttonYSpeed = 1;
let randomizePosOnClick = false;
let shrinkOnClick = false;

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
        "LARRY: See Carl? Buttons are so much cooler when you push them!",
        "CARL: NOOOO! You've made it do something!",
        "YOU: Umm yeah, that's kinda the point...",
        "CARL: Nopushius will find you!!"
    ],

    "1interlude2": [
        "???: Everything alright over here?",
        "CARL: Joe, thank goodness you're here! They've pushed the button!",
        "LARRY: Oh come on, not another one!"
    ],

    "1interlude2.5": [
        "JOE: What!? No! You told them not to, didn't you?",
        "CARL: I did! but did they listen?",
        "YOU: Look, buttons are meant to be pushed",
        "YOU: You can't get anywhere without pushing buttons!",
        "LARRY: I guess we'll have to push the button to show this guy too",
        "LARRY: This was not how I envisioned my day going..."
    ],

    "1interlude3": [
        "CARL: NOOOOOO! I CAST DVD LOGO!!!",
        "JOE: NOOOOOO! I CAST JUMP AFTER PUSH!!!"
    ],

    "2interlude1": [
        "JOE: WHAT? They cracked both of our spells together??",
        "CARL: That's never happened before!",
        "LARRY: I think you're kinda missing the point here...",
        "YOU: Yeah... we pushed the button and nobody died",
        "YOU: It only asked for our names",
        "JOE: Now Nopushius knows your names,",
        "JOE: He'll surely be coming for you",
        "LARRY: Yeah, yeah",
        "LARRY: Anyone else we need to show that pushing a button isn't the end of the world?",
        "CARL: I'm calling Amanda, this is getting out of hand",
        "YOU: Wait seriously!?",
        "LARRY: How many more of you are there??",
    ],

    "2interlude2": [
        "AMANDA: You'd be surprised",
        "YOU: How did you get here so fast??",
        "AMANDA: Nopishius sent me. He's on his way here as we speak",
        "YOU: OK, this is actually getting crazy,",
        "YOU: Maybe we don't wanna mess with these people",
        "YOU: for all we know, this is a dangerous gang and they call their leader Nopushius",
        "LARRY: You might be right,",
        "LARRY: But if moving a button around is all their henchmen can do,",
        "LARRY: I seriously doubt we're in trouble",
        "YOU: Fair. Let's push that button one more time"
    ],

    "2interlude3": [
        "CARL: NOOOOOO! I CAST DVD LOGO!!!",
        "JOE: NOOOOOO! I CAST JUMP AFTER PUSH!!!",
        "AMANDA: NOOOOOO! I CAST SHRINK AFTER PUSH!!!"
    ]
};

let buttonMoveFunctions = {
    "DVDLogo": moveButtonDVDLogo,
    //"SidetoSide": moveButtonSidetoSide,
    //"StayStill": moveButtonStayStill
};

let queueIndex = -1;

let eventQueue = [
    // start of game
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

    // clicking 1
    "playButtonClicking DVDLogo 10 1500",
    "changeBgColor",
    "playDialogue 1interlude1",
    "setDudePortrait images/joe.jpg",
    "playDialogue 1interlude2",
    "setDudePortrait images/joeAngry.jpg",
    "playDialogue 1interlude2.5",
    "setVisible button 1",
    "waitForClick",
    "playDialogue 1interlude3",

    // clicking 2
    "setRandomizePos 1",
    "playButtonClicking DVDLogo 10 2500", //1500",
    "getUserName",
    "playDialogue 2interlude1",
    "setDudePortrait images/amanda.jpg",
    "playDialogue 2interlude2",
    "setVisible button 1",
    "waitForClick",
    "playDialogue 2interlude3",

    //clicking 3
    "setRandomizePos 1",
    "setShrinking 1",
    "playButtonClicking DVDLogo 10 3000",
    // choose image

    // end of game
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
            setButtonPosition(300, 300);
            return;
        
        case "playDialogue":
            let d = dialogues[words[1]];
            playDialogue(d);
            return;
        
        case "changeBgColor":
            changeBgColor();
            return;
        
        case "getUserName":
            getUserName();
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
        
        case "setRandomizePos":
            setRandomizePos(Boolean(Number(words[1])));
            advanceEventQueue();
            return;
        
        case "setShrinking":
            shrinkOnClick = Boolean(Number(words[1]));
            advanceEventQueue();
            break;
        
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
    //<button id="resetButton">Replay</button>
    setDudePotrait(favoriteImage);
    let dudePortrait = document.getElementById("dudePortrait");
    dudePortrait.style.top = "300px";

    let resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", resetGame);
}

// function resetGame() {
//     queueIndex = -1;

//     dialogueIndex = -1;

//     buttonX = 300;
//     buttonY = 300;
//     buttonSize = 200;
//     buttonXSpeed = 1;
//     buttonYSpeed = 1;
//     randomizePosOnClick = false;
//     shrinkOnClick = false;

//     ignoreNextClick = false;

//     clickCount = 0;
//     waitingForClick = false;
//     clickTimerStart = 0;
//     clickTimer = 0;
//     clicksNeeded = 0;

//     playerName = "[player name]";
//     favoriteImage = "images/carlBPA.jpg";
//     favoriteColor = "white";
//     totalButtonPushes = 0;

//     let body = document.getElementById("body");
//     body.style.backgroundColor = "white";
    

//     body.innerHTML = `
//         <div id="wrapper">
//             <h1 id="text">Hey look a button!</h1>
//             <div id="button"></div>
//             <img id="dudePortrait" src="" alt="">
//             <p id="DialogueBox"></p>

//             <div id="formWrapper"></div>
        
//         </div>
//     `;


//     advanceEventQueue();
// }

function playButtonClicking(buttonMoveFunction, clicksToPass, time) {
    setButtonMovement(buttonMoveFunction);
    clickCount = 0;
    clickTimerStart = time;
    clickTimer = time;
    clicksNeeded = clicksToPass;
    timerInterval = setInterval(decrementTimer, 1);
    setVisible("dudePortrait", false);
    
    // reset button position and size
    setButtonPosition(300, 300);
    buttonSize = 200;
}

function setButtonPosition(x, y) {
    buttonX = x;
    buttonY = y;
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
        buttonSize = 200;
        setVisible("dudePortrait", true);
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

    if (randomizePosOnClick) {
        buttonX = Math.floor(Math.random() * (screen.width - buttonSize));
        buttonY = Math.floor(Math.random() * (screen.height - buttonSize - 175));
    }

    if (shrinkOnClick) {
        let button = document.getElementById("button");

        buttonSize -= 10;
        if(buttonSize <= 0) {
            buttonSize = 10;
        }

        button.style.width = buttonSize + "px";
        button.style.height = buttonSize + "px";
    }
}

function updateScoreDisplay() {
    displayText("Time Left: " + clickTimer + " Clicks: " + clickCount + "/" + clicksNeeded, "text");
}

function getUserName() {
    formWrapper = document.getElementById("formWrapper");
    formWrapper.innerHTML = `
            <label for="nameForm">What's your name? </label>
            <input type="text" id="nameForm">
            <button id="formSubmit">Confirm</button>`;

    let nameForm = document.getElementById("nameForm");
    nameForm.addEventListener("change", setUserName);

    let submitButton = document.getElementById("formSubmit");
    submitButton.addEventListener("click", removeForm);
}

function changeBgColor() {
    formWrapper = document.getElementById("formWrapper");
    formWrapper.innerHTML = `
            <label for="colorPicker">Choose a color for the background: </label>
            <input type="color" id="colorPicker">
            <button id="formSubmit">Confirm</button>`;

    let colorPicker = document.getElementById("colorPicker");
    colorPicker.addEventListener("input", setBgColor);

    let submitButton = document.getElementById("formSubmit");
    submitButton.addEventListener("click", removeForm);
}

function setUserName(event) {
    playerName = event.target.value;
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

function setRandomizePos(b) {
    randomizePosOnClick = b;
}

function moveButtonDVDLogo() {
    buttonX += buttonXSpeed;
    buttonY += buttonYSpeed;

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
