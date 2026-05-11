"use strict";

const ConnectFourView = {
    boardElement: null,

    init() {
        this.boardElement = document.getElementById("board");
    },

    render(board) {
        if (!this.boardElement) return;
        this.boardElement.innerHTML = "";

        board.forEach((row, r) => {
            row.forEach((cellValue, c) => {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.col = c;
                if (cellValue === 1) cell.classList.add("player1");
                if (cellValue === 2) cell.classList.add("player2");
                this.boardElement.appendChild(cell);
            });
        });
    },

    updateCurrentPlayer(player) {
        const el = document.getElementById("current-player");
        if (el) el.textContent = `Current Player: Player ${player}`;
    },

    showWinner(message, winningStones) {
        document.getElementById("message").textContent = message;
        const cells = document.querySelectorAll(".cell");
        winningStones.forEach(([r, c]) => {
            const index = r * 7 + c;
            if (cells[index]) cells[index].classList.add("winner");
        });
    }
};

// Подписка на события
document.addEventListener("connectfour.boardchanged", (e) => ConnectFourView.render(e.detail.board));
document.addEventListener("connectfour.playerchange", (e) => ConnectFourView.updateCurrentPlayer(e.detail.currentPlayer));
document.addEventListener("connectfour.gameover", (e) => ConnectFourView.showWinner(e.detail.message, e.detail.winningStones));