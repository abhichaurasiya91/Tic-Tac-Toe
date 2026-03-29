let boxes =document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newGame = document.querySelector(".newgame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let count = 0;

let turnO = true;

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () =>{
    turnO = true;
    count = 0;
    enableboxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) =>{
    box.addEventListener("click" , () =>{
        if (turnO) {
            box.innerText = "O";
            box.style.color = "#A22C29";
            box.style.color= "none";            
            turnO = false;
        }else{
            box.innerText = "X";
            box.style.color = "#826AED";
            box.style.color= "none";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner ();
        if (count === 9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw = () =>{
    msg.innerText = "Draw , Start a new game."
    msgContainer.classList.remove("hide");
    disableboxes();
};

const disableboxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableboxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) =>{
    msg.innerText = `Congratulations, the Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableboxes();
};

checkWinner = () =>{
    for(let pattern of winPattern){
    //     console.log(pattern[0], pattern[1], pattern[2]);
    //     console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if(pos1val != "" && pos2val != "" && pos3val != ""){
        if(pos1val === pos2val && pos2val === pos3val){
            showWinner(pos1val);
            return true;
        }
    }
    }
};

newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);