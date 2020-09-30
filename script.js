const gameBoard = (() => {
    let gameArray = ['', '', '', '', '', '', '', '', ''];
    let gameOver = false;

    //function that checks column for win
    const checkColumn = () => {
        let leftColumn = gameArray[0] + gameArray[3] + gameArray[6];
        let midColumn = gameArray[1] + gameArray[4] + gameArray[7];
        let rightColumn = gameArray[2] + gameArray[5] + gameArray[8];
        if (leftColumn == "XXX" || midColumn == "XXX" || rightColumn == "XXX") {
            playerWins();
        } else if (leftColumn == "OOO" || midColumn == "OOO" || rightColumn == "OOO") {
            computerWins();
        }
    }

    //function that checks row for win
    const checkRow = () => {
        let topRow = gameArray[0] + gameArray[1] + gameArray[2];
        let midRow = gameArray[3] + gameArray[4] + gameArray[5];
        let bottomwRow = gameArray[6] + gameArray[7] + gameArray[8];
        if (topRow == "XXX" || midRow == "XXX" || bottomwRow == "XXX") {
            playerWins();
        } else if (topRow == "OOO" || midRow == "OOO" || bottomwRow == "OOO") {
            computerWins();
        }
    }
    //function that checks diagonal for win
    const checkDiagonal = () => {
        let leftDown = gameArray[0] + gameArray[4] + gameArray[8];
        let leftUp = gameArray[6] + gameArray[4] + gameArray[2];
        if (leftDown == "XXX" || leftUp == "XXX") {
            playerWins();
        } else if (leftDown == "OOO" || leftUp == "OOO") {
            computerWins(); 
        }
    }
    //function that checks for a tie
    //timeout provides time for the browser to paint markers
    const checkForTie = () => {
        window.setTimeout(() => {
            const isTaken = (cell) => cell != "";
            if (gameArray.every(isTaken) && gameOver == false) {
                alert("Tie!");
                restartGame();
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
            cell.addEventListener('click', (e) => {
                playerClick(e);
                displayBoard();
            });
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
        for (let i = 0; i < gameArray.length; i++) {
            if (gameArray[i] == '') {
                freeCellIndexes.push(i);
            }
        }
        let randomFreeIndex = freeCellIndexes[Math.floor(Math.random()*freeCellIndexes.length)];
        return randomFreeIndex;
    }

    //function that controls a player's choice of move
    const playerMove = (e) => {
        let gameArrayIndex = e.target.getAttribute('data-cellNum');
        gameArray[gameArrayIndex] = "X";
        
    }

    //function that grabs a free space index and chooses it for the AI's play
    const computerMove = () => {
        if (gameOver == false) {
            let randomFreeCellIndex = getIndexOfFreeCell();
            gameArray[randomFreeCellIndex] = "O";
        }
        
    }

    //function that controls the order of events on a player click against the computer 
    const playerClick = (e) => {
        if (e.target.textContent == "") {
            playerMove(e);
            checkColumn();
            checkDiagonal();
            checkRow();
            checkForTie();
            computerMove();
        } else {
            alert("Choose a free cell, bro!");
        }
    }

    const restartGame = () => {
        gameArray = ['', '', '', '', '', '', '', '', ''];
        gameOver = false;
        displayBoard();
    }

    const playerWins = () => {
        gameOver = true;
        window.setTimeout(function() {
            alert("You win this round!");
            restartGame();
         }, 250);
         
    }

    const computerWins = () => {
        gameOver = true;
        window.setTimeout(function() {
            alert("Computer wins this round!");
            restartGame();
        }, 250);
        
    }

    return {displayBoard};

})();




const playerFactory = (name) => {
    const getName = () => {

    }
}




const displayController = (() => {
    let gameModeMenu = document.querySelector('.choose-game-mode');
    let humanGameButton = document.getElementById('human-game');
    let aiGameButton = document.getElementById('AI-game');
    let nameInput = document.querySelector('.player-menu');

    let playerScore = 0;
    let computerScore = 0;

    const showPlayerInput = () => {
        humanGameButton.addEventListener('click', () => {
            nameInput.classList.toggle('display-player-menu');
        });
    }

    const startAIGame = () => {
        aiGameButton.addEventListener('click', () => {
            gameModeMenu.classList.add('hide-choose-game-mode');
            gameBoard.displayBoard();
        })
    }

    return {showPlayerInput, startAIGame}
})();

displayController.showPlayerInput();
displayController.startAIGame();