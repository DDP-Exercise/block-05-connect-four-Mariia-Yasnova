"use strict";

const ConnectFourController = {
    init() {
        ConnectFourView.init();
        ConnectFourModel.init();

        document.getElementById("board").addEventListener("click", (e) => {
            if (e.target.classList.contains("cell")) {
                const col = e.target.dataset.col;
                ConnectFourModel.insertStone(Number(col));
            }
        });

        document.getElementById("restart-btn").addEventListener("click", () => {
            document.getElementById("message").textContent = "";
            ConnectFourModel.init();
        });
    }
};

window.addEventListener("DOMContentLoaded", () => {
    ConnectFourController.init();
});