let btnStart = document.getElementById("btnStart");

let Welcome = document.getElementById("Welcome");
Welcome.hidden = true;
const Word = ["Parler", "Dire", "Accomplir", "Programmer", "Saluer", "Calmer"];
let random = "";
let Game = document.getElementById("Game");
let lives = 0;
let find = 0;
let Guessed = "";
let Alphabet ="abcdefghijklmnopqrstuvwyz"
let Resultat = document.getElementById("Resultat");
// let ChooseDifficulty = document.getElementById("ChooseDifficulty");
// ChooseDifficulty.hidden = true;

// let Difficulty = document.getElementById("Difficulty");
// Difficulty.hidden = true;

// let BtnEasy = document.getElementById("EasyDifficulty");
// let BtnNormal = document.getElementById("NormalDifficulty");
// let BtnInsane = document.getElementById("InsaneDifficulty");
// let WordEasy = [];
// let WordNormal = [];
// let WordInsane = [];

btnStart.addEventListener("click",()=>{
    btnStart.hidden = true;
    Welcome.hidden = false;
    random = GetRandom();
    SetupGame();
    StarGame();
    document.getElementById("Game").style.display = "flex"
    Resultat.removeChild(Resultat.firstChild);
    // ChooseDifficulty.hidden = false;
    // Difficulty.hidden = false;
});

// BtnEasy.addEventListener("click", () => {
//     ChooseDifficulty.hidden = true;
//     Difficulty.hidden = true;
// });
// BtnNormal.addEventListener("click", () => {
//     ChooseDifficulty.hidden = true;
//     Difficulty.hidden = true;
// });
// BtnInsane.addEventListener("click", () => {
//     ChooseDifficulty.hidden = true;
//     Difficulty.hidden = true;
// })

function GetRandom(){
    return Word[Math.floor(Math.random()* Word.length)].toLocaleLowerCase();
}

function SetupGame(){
    for(let i = 0; i < random.length; i++){
        let div = document.createElement("div");
        div.className = "Letter";
        div.innerHTML = "_";
        div.setAttribute("id", "Letter" + i);
        Game.appendChild(div);          
    }
}

function StarGame(){
    lives = 6;
    find = 0;
    Guessed = "";
    document.onkeydown = StartTurn;
}

function StartTurn(e){
    if(CheckInput(e.key)){
        Guessed += e.key;
        if(CheckInWord(e.key)){
            ShowLetter(e.key)
        }
        else{
            lives--;
        }
    }
    CheckWin();
    console.log("find = " + find + "\nlives = " + lives);
}
function CheckInput(key){
    if(Alphabet.includes(key) && !Guessed.includes(key))
        return 1;
    else
        return 0;
}
function CheckInWord(key){
    if (random.includes(key))
        return 1;
    else
        return 0;
}

function ShowLetter(key){
    for (let i = 0; i < random.length; i++){
        if (random[i] == key){
            find++;
            document.querySelector("#Letter" + i).innerHTML = key;
        }
    }
}

function CheckWin(){
    if (find == random.length){
        ShowResult(1);
    }
    else if (lives <= 0){
        ShowResult(0);
    }
}

function ShowResult(win){
    if(win){
        console.log("winner");
        let Win = document.createElement("div");
        Win.className = "Win";
        Win.innerHTML = "You win the game the word was " + random;
        Resultat.appendChild(Win);
        Reset();
        btnStart.hidden = false;
        Welcome.hidden = true;
    }
    else{
        console.log("looser!");
        let Loose = document.createElement("div");
        Loose.className = "Loose";
        Loose.innerHTML = "You loose the game the word was " + random;
        Resultat.appendChild(Loose);
        Reset();
        btnStart = false;
        Welcome.hidden = true;
    }
}
function Reset(){
    while (Game.firstChild) {
        Game.removeChild(Game.firstChild);
    }
    document.onkeydown = null;
}