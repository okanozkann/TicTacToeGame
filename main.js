const X_Class ="cross"
const O_Class="circle"
const COMBINATIONS=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const result = document.getElementById("result");
const resultText = document.querySelector(".result-text");
const restartButton = document.getElementById("restartButton");

let turn

const swapTurn = () => { turn = !turn}
const placeMark = (cell,currentClass) => {cell.classList.add(currentClass)}
const placeHover = () => {
    board.classList.remove(X_Class);
    board.classList.remove(O_Class);
         if(turn) board.classList.add(O_Class)
         else board.classList.add(X_Class)

}



const endGame = (draw) => {
    if(draw) resultText.innerText = "Beraberlik !";
    else resultText.innerText = `${turn ? 'O ':'X '}Kazandı!`

    result.classList.add('show');
}

const isDraw = () =>{
    return[...cells].every(cell =>{
        return cell.classList.contains(X_Class) || cell.classList.contains(O_Class)
    })
}


const checkWin = (currentClass) => {
    return COMBINATIONS.some(combination=>{
        return combination.every(index =>{
            return cells[index].classList.contains(currentClass)
        });
    })
}


const handleClick =(e) =>{
    const cell=e.target
    const currentClass = turn ? O_Class : X_Class
    placeMark(cell,currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    }
    else if(isDraw()){
        endGame(true)
    }
    else{
        swapTurn()
        placeHover()
    }
}


const resetGame=()=>{
    cells.forEach(cell=>{
        cell.classList.remove(X_Class)
        cell.classList.remove(O_Class)
        cell.removeEventListener('click',handleClick);
        cell.addEventListener('click',handleClick,{once:true});

    })
}
const startGame=()=>{
    turn=false
    resetGame()
    placeHover()
    result.classList.remove('show')
}

startGame()
restartButton.addEventListener('click',startGame)