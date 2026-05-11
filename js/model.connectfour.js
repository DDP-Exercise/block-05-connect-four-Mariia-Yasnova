"use strict";

const ConnectFourModel = {
    rows: 6,
    cols: 7,
    board: [],
    currentPlayer: 1,
    gameOver: false,
    winningStones: [],

    init() {
        this.board = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
        this.currentPlayer = 1;
        this.gameOver = false;
        this.winningStones = [];

        this.dispatchBoardChanged();
        this.dispatchPlayerChange();
    },

    insertStone(col) {
        if (this.gameOver) return;

        for (let row = this.rows - 1; row >= 0; row--) {
            if (this.board[row][col] === 0) {
                this.board[row][col] = this.currentPlayer;
                this.dispatchBoardChanged();

                if (this.checkWinner(row, col)) {
                    this.gameOver = true;
                    this.dispatchGameOver(`Player ${this.currentPlayer} Wins!`);
                    return;
                }

                if (this.checkDraw()) {
                    this.gameOver = true;
                    this.dispatchGameOver("It's a Draw!");
                    return;
                }

                this.changePlayer();
                return;
            }
        }
    },

    changePlayer() {
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        this.dispatchPlayerChange();
    },

    checkDraw() {
        return this.board.every(row => !row.includes(0));
    },

    checkWinner(row, col) {
        const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];
        for (let [dr, dc] of directions) {
            let count = 1;
            let stones = [[row, col]];
            for (let dir of [-1, 1]) {
                let r = row + dr * dir;
                let c = col + dc * dir;
                while (r >= 0 && r < this.rows && c >= 0 && c < this.cols && this.board[r][c] === this.currentPlayer) {
                    count++;
                    stones.push([r, c]);
                    r += dr * dir;
                    c += dc * dir;
                }
            }
            if (count >= 4) {
                this.winningStones = stones;
                return true;
            }
        }
        return false;
    },

    dispatchPlayerChange() {
        document.dispatchEvent(new CustomEvent("connectfour.playerchange", { detail: { currentPlayer: this.currentPlayer } }));
    },

    dispatchBoardChanged() {
        document.dispatchEvent(new CustomEvent("connectfour.boardchanged", { detail: { board: this.board } }));
    },

    dispatchGameOver(message) {
        document.dispatchEvent(new CustomEvent("connectfour.gameover", { detail: { message, winningStones: this.winningStones } }));
    }
};