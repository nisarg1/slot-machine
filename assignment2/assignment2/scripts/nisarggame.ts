﻿// CreateJS Boilerplate for COMP397


class Button {
    //PRIVATE INSTANCE VARIABLES
    private _image: createjs.Bitmap;
    private _x: number;
    private _y: number;

    constructor(path: string, x: number, y: number) {
        this._x = x;
        this._y = y;
        this._image = new createjs.Bitmap(path);
        this._image.x = this._x;
        this._image.y = this._y;

        this._image.addEventListener("mouseover", this._buttonOver);
        this._image.addEventListener("mouseout", this._buttonOut);
    }

    // PUBLIC PROPERTIES
    public setX(x: number): void {
        this._x = x;
    }

    public getX(): number {
        return this._x;
    }

    public setY(y: number): void {
        this._y = y;
    }

    public getY(): number {
        return this._y;
    }

    public getImage(): createjs.Bitmap {
        return this._image;
    }


    // PRIVATE EVENT HANDLERS
    private _buttonOut(event: createjs.MouseEvent): void {
        event.currentTarget.alpha = 1; // 100% Alpha 

    }

    private _buttonOver(event: createjs.MouseEvent): void {
        event.currentTarget.alpha = 0.5;

    }
}




// VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var canvas; // Reference to the HTML 5 Canvas element
var stage: createjs.Stage; // Reference to the Stage
var tiles: createjs.Bitmap[] = [];
var reelContainers: createjs.Container[] = [];

// GAME CONSTANTS
var NUM_REELS: number = 3;


// GAME VARIABLES
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
var winRatio = 0;

/* Tally Variables */
var kitkat1s = 0;
var kitkat2s = 0;
var dairymilks = 0;
var mnms = 0;
var snickers = 0;
var reeses = 0;
var hersheys = 0;
var blanks = 0;



// GAME OBJECTS
var game: createjs.Container; // Main Game Container Object
var background: createjs.Bitmap;
var spinButton: Button;
var betMaxButton: Button;
var betOneButton: Button;
var resetButton: Button;
var powerButton: Button;

// FUNCTIONS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function init() {



    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas); // Parent Object
    stage.enableMouseOver(20); // Turn on Mouse Over events

    createjs.Ticker.setFPS(60); // Set the frame rate to 60 fps
    createjs.Ticker.addEventListener("tick", gameLoop);

    main();
}


// GAMELOOP
function gameLoop() {
    stage.update();
}


/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    var kitkat1s = 0;
    var kitkat2s = 0;
    var dairymilks = 0;
    var mnms = 0;
    var snickers = 0;
    var reeses = 0;
    var hersheys = 0;
    var blanks = 0;

}

/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
}


/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    }
    else {
        return !value;
    }
}


/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "hershey";
                hersheys++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "kitkat1";
                kitkat1s++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "kitkat2";
                kitkat2s++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "dairymilk";
                dairymilks++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "m&m";
                mnms++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "snicker";
                snickers++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "reese";
                reeses++;
                break;
        }
    }
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings() {
    if (blanks == 0) {
        if (kitkat1s == 3) {
            winnings = playerBet * 10;
        }
        else if (kitkat2s == 3) {
            winnings = playerBet * 20;
        }
        else if (dairymilks == 3) {
            winnings = playerBet * 30;
        }
        else if (mnms == 3) {
            winnings = playerBet * 40;
        }
        else if (snickers == 3) {
            winnings = playerBet * 50;
        }
        else if (reeses == 3) {
            winnings = playerBet * 75;
        }
        else if (hersheys == 3) {
            winnings = playerBet * 100;
        }
        else if (kitkat1s == 2) {
            winnings = playerBet * 2;
        }
        else if (kitkat2s == 2) {
            winnings = playerBet * 2;
        }
        else if (dairymilks == 2) {
            winnings = playerBet * 3;
        }
        else if (mnms == 2) {
            winnings = playerBet * 4;
        }
        else if (snickers == 2) {
            winnings = playerBet * 5;
        }
        else if (reeses == 2) {
            winnings = playerBet * 10;
        }
        else if (hersheys == 2) {
            winnings = playerBet * 20;
        }
        else {
            winnings = playerBet * 1;
        }

        if (hersheys == 1) {
            winnings = playerBet * 5;
        }
        winNumber++;
        //showWinMessage();
    }
    else {
        lossNumber++;
        //showLossMessage();
    }

}


// MAIN MEAT of my code goes here 
function spinButtonClicked(event: createjs.MouseEvent) {

    spinResult = Reels();
    fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];

    // Iterate over the number of reels
    for (var index = 0; index < NUM_REELS; index++) {
        reelContainers[index].removeAllChildren();
        tiles[index] = new createjs.Bitmap("assets/images/" + spinResult[index] + ".png");
        reelContainers[index].addChild(tiles[index]);
    }
}
function resetButtonClicked(event) {
    spinResult = Reels();
    fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];

    for (var index = 0; index < NUM_REELS; index++) {
        reelContainers[index].removeAllChildren();
        tiles[index] = new createjs.Bitmap("assets/images/blank.png");
        reelContainers[index].addChild(tiles[index]);
    }
}
function powerButtonClicked(event) {
    createUI();
}



function createUI() {

    background = new createjs.Bitmap("assets/images/background.png");
    game.addChild(background); // Add the background to the game container

    for (var index = 0; index < NUM_REELS; index++) {
        reelContainers[index] = new createjs.Container();
        game.addChild(reelContainers[index]);
    }
    reelContainers[0].x = 24;
    reelContainers[0].y = 32;
    reelContainers[1].x = 162;
    reelContainers[1].y = 32;
    reelContainers[2].x = 297;
    reelContainers[2].y = 32;



    // Spin Button
    spinButton = new Button("assets/images/spinButton.png", 345, 377);
    game.addChild(spinButton.getImage());


    // Spin Button Event Listeners
    spinButton.getImage().addEventListener("click", spinButtonClicked);

    // Bet Max Button
    betMaxButton = new Button("assets/images/betMaxButton.png", 171, 406);
    game.addChild(betMaxButton.getImage());
    betMaxButton.getImage().addEventListener("click", spinButtonClicked);


    // Bet One Button
    betOneButton = new Button("assets/images/betOneButton.png", 171, 355);
    game.addChild(betOneButton.getImage());
    betOneButton.getImage().addEventListener("click", spinButtonClicked);


    // Reset Button
    resetButton = new Button("assets/images/resetButton.png", 17, 406);
    game.addChild(resetButton.getImage());
    resetButton.getImage().addEventListener("click", resetButtonClicked);

    // Power Button
    powerButton = new Button("assets/images/powerButton.png", 17, 354);
    game.addChild(powerButton.getImage());
    powerButton.getImage().addEventListener("click", powerButtonClicked);

}


function main() {
    game = new createjs.Container(); // Instantiates the Game Container

    createUI();

    stage.addChild(game); // Adds the Game Container to the Stage


}


