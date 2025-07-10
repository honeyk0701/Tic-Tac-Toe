let boxes = document.querySelectorAll('.box');
let resetButton = document.querySelector('#reset');
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

let turnO = true; // playerX , playerO

const winningCombination = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //vertical
    [0, 4, 8], [2, 4, 6] //diagonal
];

const resetGame = () => {
    turnO = true;
    boxes.forEach((box) => {
        box.innerText = "";
        box.style.color = "";
        box.style.background = ""; // Reset background color if changed
        box.disabled = false; // Enable the box
    });
    msgContainer.classList.add("hide");
    enableBoxes();
};

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        if (box.disabled) return; // If the box is already disabled, do nothing

        console.log('Box clicked');
        if (turnO) {
            box.innerText = 'O';
            box.style.color = 'red';
            turnO = false;
        } else {
            box.innerText = 'X';
            box.style.color = 'blue';
            turnO = true;
        }
        box.disabled = true; // Disable the box after it has been clicked
        checkWinner();
    });
});

const dissabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
    }
};

const showWinner = (winner) => {
    msg.innerText = ` congrat ,winner ${winner}`;
    msgContainer.classList.remove("hide");
    dissabledBoxes();
};

const checkWinner = () => {
    for (let pattern of winningCombination) {
        let pos1value = boxes[pattern[0]].innerText;
        let pos2value = boxes[pattern[1]].innerText;
        let pos3value = boxes[pattern[2]].innerText;

        if (pos1value != "" && pos2value != "" && pos3value != "") {
            if (pos1value === pos2value && pos2value === pos3value) {
                console.log(`${pos1value} is the winner`);
                // Change the background color of the winning boxes to green and text color to white
                boxes[pattern[0]].style.background = 'green';
                boxes[pattern[0]].style.color = 'white';
                boxes[pattern[1]].style.background = 'green';
                boxes[pattern[1]].style.color = 'white';
                boxes[pattern[2]].style.background = 'green';
                boxes[pattern[2]].style.color = 'white';
                showWinner(pos1value);
            }
        }
    }
};

newGameBtn.addEventListener('click', resetGame);
resetButton.addEventListener('click', resetGame);