const gameBoard = (() => {
    let gameArray = ['', '', '', '', '', '', '', '', ''];

    const checkColumn = () => {
        let leftColumn = gameArray[0] + gameArray[3] + gameArray[6];
        let midColumn = gameArray[1] + gameArray[4] + gameArray[7];
        let rightColumn = gameArray[2] + gameArray[5] + gameArray[8];
        if (leftColumn == "XXX" || midColumn == "XXX" || rightColumn == "XXX") {
            //player wins
        } else if (leftColumn == "OOO" || midColumn == "OOO" || rightColumn == "OOO") {
            //computer wins
        }
    }

    const checkRow = () => {
        let topRow = gameArray[0] + gameArray[1] + gameArray[2];
        let midRow = gameArray[3] + gameArray[4] + gameArray[5];
        let bottomwRow = gameArray[6] + gameArray[7] + gameArray[8];
        if (topRow == "XXX" || midRow == "XXX" || bottomwRow == "XXX") {
            //player wins
        } else if (topRow == "OOO" || midRow == "OOO" || bottomwRow == "OOO") {
            //computer wins
        }
    }

    const checkDiagonal = () => {
        let leftDown = gameArray[0] + gameArray[4] + gameArray[8];
        let leftUp = gameArray[6] + gameArray[4] + gameArray[2];
        if (leftDown == "XXX" || leftUp == "XXX") {
            //player wins
        } else if (leftDown == "OOO" || leftUp == "OOO") {
            //computer wins 
        }
    }

    const displayBoard = () => {
        let playArea = document.getElementById("playArea");
        let allCells = document.createDocumentFragment();
        for(let i = 0; i < 9; i++) {
            let cell = document.createElement('div');
            cell.setAttribute("data-cellNum", `${i}`);
            cell.classList.add('cell');
            cell.textContent = gameArray[i];
            cell.addEventListener('click', (e) => {
                playerMove(e);
                computerMove();
                displayBoard();
            });
            allCells.appendChild(cell);
        }
        clearBoardDisplay(playArea);
        playArea.appendChild(allCells);
    }

    const clearBoardDisplay = (parent) => {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild)
        }
    
    }

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

    const playerMove = (e) => {
        if (e.target.textContent == "") {
            let gameArrayIndex = e.target.getAttribute('data-cellNum');
            gameArray[gameArrayIndex] = "X";
        } else {
            alert("No can do!");
        }
        
    }

    const computerMove = () => {
        let randomFreeCellIndex = getIndexOfFreeCell();
        gameArray[randomFreeCellIndex] = "0";
    }

   

    const playerClick = () => {

    }

    const playerWins = () => {
        //message saying you win
        //restart game
    }

    const computerWins = () => {
        //message saying you lost
        //restart game
    }

    const restartGame = () => {
        gameArray = ['', '', '', '', '', '', '', '', ''];
    }

    return {displayBoard, gameArray, getIndexOfFreeCell};

})();

gameBoard.displayBoard();







const displayController = () => {
    let playerScore = 0;
    let computerScore = 0;




}