const gameBoard = (() => {
    let gameArray = ['', '', '', '', '', '', '', '', ''];

    const displayBoard = () => {
        let playArea = document.getElementById("playArea");
        let cells = document.createDocumentFragment();
        for(let i = 0; i < 9; i++) {
            let cell = document.createElement('div');
            cell.setAttribute("data-cellNum", `${i}`);
            cell.classList.add('cell');
            cell.textContent = gameArray[i];
            cells.appendChild(cell);
        }
        playArea.appendChild(cells);
    }


    const checkColumn = () => {
        let leftColumn = gameArray[0] + gameArray[3] + gameArray[6];
        let midColumn = gameArray[1] + gameArray[4] + gameArray[7];
        let rightColumn = gameArray[2] + gameArray[5] + gameArray[8];
        if (leftColumn == "XXX" || midColumn == "XXX" || rightColumn == "XXX") {
            //player wins
        } else if (leftColumn == "000" || midColumn == "000" || rightColumn == "000") {
            //computer wins
        }
    }

    const checkRow = () => {
        let topRow = gameArray[0] + gameArray[1] + gameArray[2];
        let midRow = gameArray[3] + gameArray[4] + gameArray[5];
        let bottomwRow = gameArray[6] + gameArray[7] + gameArray[8];
        if (topRow == "XXX" || midRow == "XXX" || bottomwRow == "XXX") {
            //player wins
        } else if (topRow == "000" || midRow == "000" || bottomwRow == "000") {
            //computer wins
        }
    }

    const checkDiagonal = () => {
        let leftDown = gameArray[0] + gameArray[4] + gameArray[8];
        let leftUp = gameArray[6] + gameArray[4] + gameArray[2];
        if (leftDown == "XXX" || leftUp == "XXX") {
            //player wins
        } else if (leftDown == "000" || leftUp == "000") {
            //computer wins 
        }
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

    return {displayBoard};

})();


gameBoard.displayBoard();







const displayController = () => {
    let playerScore = 0;
    let computerScore = 0;




}