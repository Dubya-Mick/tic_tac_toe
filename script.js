const gameBoard = (() => {
    let gameArray = ['', '', '', '', '', '', '', '', ''];
    let gameOver = false;
    let aiGame = false; 
    let player1;
    let player2;
    let currentPlayer;

    //function that checks column for win
    const checkColumn = () => {
        let leftColumn = gameBoard.gameArray[0] + gameBoard.gameArray[3] + gameBoard.gameArray[6];
        let midColumn = gameBoard.gameArray[1] + gameBoard.gameArray[4] + gameBoard.gameArray[7];
        let rightColumn = gameBoard.gameArray[2] + gameBoard.gameArray[5] + gameBoard.gameArray[8];
        if (leftColumn == "XXX" || midColumn == "XXX" || rightColumn == "XXX") {
            if (gameBoard.aiGame == true) {
                humanWins();
            } else {
                gameBoard.player1.winRound();
            }
        } else if (leftColumn == "OOO" || midColumn == "OOO" || rightColumn == "OOO") {
            if (gameBoard.aiGame == true) {
                aiWins();
            } else {
               gameBoard.player2.winRound();
            }
        }
    }

    //function that checks row for win
    const checkRow = () => {
        let topRow = gameBoard.gameArray[0] + gameBoard.gameArray[1] + gameBoard.gameArray[2];
        let midRow = gameBoard.gameArray[3] + gameBoard.gameArray[4] + gameBoard.gameArray[5];
        let bottomwRow = gameBoard.gameArray[6] + gameBoard.gameArray[7] + gameBoard.gameArray[8];
        if (topRow == "XXX" || midRow == "XXX" || bottomwRow == "XXX") {
            if (gameBoard.aiGame == true) {
                humanWins();
            } else {
                gameBoard.player1.winRound();
            }
        } else if (topRow == "OOO" || midRow == "OOO" || bottomwRow == "OOO") {
            if (gameBoard.aiGame == true) {
                aiWins();
            } else {
                gameBoard.player2.winRound();
            }
        }
    }

    //function that checks diagonal for win
    const checkDiagonal = () => {
        let leftDown = gameBoard.gameArray[0] + gameBoard.gameArray[4] + gameBoard.gameArray[8];
        let leftUp = gameBoard.gameArray[6] + gameBoard.gameArray[4] + gameBoard.gameArray[2];
        if (leftDown == "XXX" || leftUp == "XXX") {
            if (gameBoard.aiGame == true) {
                humanWins();
            } else {
                gameBoard.player1.winRound();
            }
        } else if (leftDown == "OOO" || leftUp == "OOO") {
            if (gameBoard.aiGame == true) {
                aiWins();
            } else {
                gameBoard.player2.winRound();
            }
        }
    }

    //function that checks for a tie
    //timeout provides time for the browser to paint markers
    const checkForTie = () => {
        window.setTimeout(() => {
            const isTaken = (cell) => cell != "";
            if (gameBoard.gameArray.every(isTaken) && gameOver == false) {
                let winDisplay = document.querySelector('#winner-display');
                winDisplay.textContent = 'Tie.';
                displayController.showWinner();
            }
        }, 250);
        
    }

    //function that adds divs to playArea to represent the gameboard
    const displayBoard = () => {
        let playArea = document.getElementById("playArea");
        let allCells = document.createDocumentFragment();
        for(let i = 0; i < 9; i++) {
            let cell = document.createElement('div');
            cell.setAttribute("data-cellNum", `${i}`);
            cell.classList.add('cell');
            cell.textContent = gameArray[i];
            cell.textContent = gameBoard.gameArray[i];
            if (gameBoard.aiGame == true) {
                cell.addEventListener('click', (e) => {
                    clickVsAi(e);
                });
            } else {
                cell.addEventListener('click', (e) => {
                    clickPVP(e);
                });
            }
            allCells.appendChild(cell);
        }
        clearBoardDisplay(playArea);
        playArea.appendChild(allCells);
    }

    //function that clears the board display
    const clearBoardDisplay = (parent) => {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild)
        }
    
    }

    //function that grabs the index of a random free cell for the 'AI'
    const getIndexOfFreeCell = () => {
        freeCellIndexes = [];
        for (let i = 0; i < gameBoard.gameArray.length; i++) {
            if (gameBoard.gameArray[i] == '') {
                freeCellIndexes.push(i);
            }
        }
        let randomFreeIndex = freeCellIndexes[Math.floor(Math.random()*freeCellIndexes.length)];
        return randomFreeIndex;
    }

    //function that controls a player's choice of move
    const humanMove = (e) => {
        let gameArrayIndex = e.target.getAttribute('data-cellNum');
        gameBoard.gameArray[gameArrayIndex] = "X";
        
    }

    //function that grabs a free space index and chooses it for the AI's play
    const aiMove = () => {
        if (gameOver == false) {
            let randomFreeCellIndex = getIndexOfFreeCell();
            gameBoard.gameArray[randomFreeCellIndex] = "O";
        }
        
    }

    //function that controls the order of events on a player click against the computer 
    const clickVsAi = (e) => {
        if (e.target.textContent == "") {
            humanMove(e);
            aiMove();
            displayBoard();
            checkColumn();
            checkDiagonal();
            checkRow();
            checkForTie();
            
        } else {
            alert("Choose a free cell, bro!");
        }
    }

    //function that restarts the game for a new round
    const restartGame = () => {
        gameBoard.gameArray = ['', '', '', '', '', '', '', '', ''];
        gameOver = false;
        if(!gameBoard.aiGame) {
            displayController.player2NameDisplay.style.fontSize = '';
            displayController.player1NameDisplay.style.fontSize = '2rem';
            gameBoard.currentPlayer = gameBoard.player1.getName();
        }
        displayBoard();
    }

    //function that controls a human win against the AI
    const humanWins = () => {
        gameOver = true;
        window.setTimeout(function() {
            let winDisplay = document.querySelector('#winner-display');
            winDisplay.textContent = 'You win.';
            displayController.showWinner();
         }, 250);
         
    }

    //function that controls an AI win
    const aiWins = () => {
        gameOver = true;
        window.setTimeout(function() {
            let winDisplay = document.querySelector('#winner-display');
            winDisplay.textContent = 'The AI wins.';
            displayController.showWinner();
        }, 250);
        
    }

    //function that toggles the current player 
    const toggleCurrentPlayer = () => {
        if (gameBoard.currentPlayer == gameBoard.player1.getName()) {
            displayController.player1NameDisplay.style.fontSize = '';
            gameBoard.currentPlayer = gameBoard.player2.getName();
            displayController.player2NameDisplay.style.fontSize = '2rem';
        } else {
            gameBoard.currentPlayer = gameBoard.player1.getName();
            displayController.player2NameDisplay.style.fontSize = '';
            displayController.player1NameDisplay.style.fontSize = '2rem';

        }
    }

    //function that hands the logic of a pvp click
    const clickPVP = (e) => {
        if (e.target.textContent == '' && gameBoard.currentPlayer == gameBoard.player1.getName()) {
            gameBoard.player1.placeMarker(e);
        } else if (e.target.textContent == '' && gameBoard.currentPlayer == gameBoard.player2.getName()) {
            gameBoard.player2.placeMarker(e);
        }
        toggleCurrentPlayer();
        displayBoard();
        checkColumn();
        checkDiagonal();
        checkRow();
        checkForTie();
    }


    return {displayBoard, 
            player1, 
            player2, 
            aiGame, 
            gameArray, 
            currentPlayer, 
            restartGame};

})();


const player = (name, marker) => {
    let score = 0;
    const getName = () => name;
    const getMarker = () => marker;
    //function that handles the placement of markers for pvp
    const placeMarker = (e) => {
        let gameArrayIndex = e.target.getAttribute('data-cellNum');
        gameBoard.gameArray[gameArrayIndex] = getMarker();
    }
    //function that handles a player win
    const winRound = () => {
        window.setTimeout(function() {
            displayController.showWinner();
            let winDisplay = document.querySelector('#winner-display');
            winDisplay.textContent = `${name} wins!`;
            gameBoard.restartGame();
        }, 250);
    }

    return {score, getName, getMarker, placeMarker, winRound}
}

const displayController = (() => {
    let playArea = document.getElementById('playArea');
    let gameModeMenu = document.querySelector('.choose-game-mode');
    let restartButton = document.getElementById('restart-button');
    let player1NameDisplay = document.getElementById('player-1-name');
    let player2NameDisplay = document.getElementById('player-2-name');
    let winBackground = document.querySelector('.win-display-background');

    //function that toggles name input menu for pvp
    const toggleNameInputMenu = () => {
        let nameInput = document.querySelector('.player-menu');
        nameInput.classList.toggle('display-player-menu');
    }

    //function that hides main menu during gameplay
    const hideChooseGameMode = () => {
        gameModeMenu.classList.add('hide-choose-game-mode');
    }

    //function that shows the tic tac toe board
    const showPlayArea = () => {
        playArea.style.display = 'grid';
    }

    //adds the name input menu toggle to human game button click
    const showPlayerInput = () => {
        let humanGameButton = document.getElementById('human-game');
        humanGameButton.addEventListener('click', toggleNameInputMenu);
    }

    //reveals the main menu restart button
    const showRestartButton = () => {
        restartButton.style.display = 'block';
    }

    //function that pulls up the modal showing the winner
    const showWinner = () => {
        winBackground.style.display = 'block';
    }

    //button that allows you to start a new round after a win
    const newRoundButton = () => {
        let newRoundStartButton = document.querySelector('#new-round-button');
        newRoundStartButton.addEventListener('click', () => {
            winBackground.style.display = 'none';
            gameBoard.restartGame();
        })
    }

    //back to main menu
    const restart = () => {
        restartButton.addEventListener('click', () => {
            window.location.reload();
        })
    }

    //starts a game against the AI
    const startAIGame = () => {
        let aiGameButton = document.getElementById('AI-game');
        aiGameButton.addEventListener('click', () => {
            hideChooseGameMode();
            gameBoard.aiGame = true;
            newRoundButton();
            showPlayArea();
            showRestartButton();
            gameBoard.displayBoard();
        })
    }

    //creates the players by calling the player factory function
    const createPlayers = () => {
        let player1Name = document.getElementById('player-1').value;
        let player2Name = document.getElementById('player-2').value;
        if (player1Name == '' || player2Name == '') {
            alert('Make sure to fill in player names!');
        } else {
            gameBoard.player1 = player(player1Name, "X");
            gameBoard.player2 = player(player2Name, "O");
            gameBoard.currentPlayer = gameBoard.player1.getName();
            player1NameDisplay.textContent = `${player1Name}: X`;
            player1NameDisplay.style.fontSize = '2rem';
            player2NameDisplay.textContent = `${player2Name}: O`;
            hideChooseGameMode();           
        }
    }

    //starts a PVP game
    const startHumanGame = () => {
        let startHumanGameButton = document.querySelector('#start-button');
        startHumanGameButton.addEventListener('click', () => {
            createPlayers();
            showPlayArea();
            showRestartButton();
            newRoundButton();
            gameBoard.displayBoard();
        })
    }

    const gameInit = () => {
        displayController.showPlayerInput();
        displayController.startAIGame();
        displayController.startHumanGame();
        displayController.restart();
    }

    return {showPlayerInput, 
            startAIGame, 
            startHumanGame, 
            restart,
            showWinner,
            gameInit,
            player1NameDisplay, 
            player2NameDisplay}
})();

displayController.gameInit();

