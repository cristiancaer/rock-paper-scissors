function showRules(block){
    let rulesElement = document.getElementById('game__description')
    var status = rulesElement.style.display
    if (status==='block'){
        status = 'none'
    }
    else{
        status = 'block'
    }
    rulesElement.style.display = status
}


const gameElements = {
    path_img : '/rock-paper-scissors/img/SVG/',
    format_img: '.svg',
    getPathname: function(name){
        return this.path_img + name + this.format_img
    },
    computerScore: document.getElementById('game__computer-score'),
    addScore2computer: function(){
        let score = parseInt(this.computerScore.innerHTML)
        this.computerScore.innerHTML = score +1
    },
    computerOption: document.getElementById('game__computer-option'),
    setComputerOption: function(option){
        this.computerOption.src = this.getPathname(option)
    },
    playerScore: document.getElementById('game__player-score'),
    addScore2player: function(){
        let score = parseInt(this.playerScore.innerHTML)
        this.playerScore.innerHTML = score +1
    },
    playerOption: document.getElementById('game__player-option'),
    setPlayerOption:function(option){
        this.playerOption.src = this.getPathname(option)
    },
    result: document.getElementById('game__result'),
    setResult: async function(result){
        this.result.innerHTML = result
        for (let i=1; i<30;i++){
            this.result.style.fontSize = 30/(i)+'rem';
            await sleep(1000/30)
        }
    }   
}
const updateScore = {
    lost: ()=>gameElements.addScore2computer(),
    draw: ()=>console.log('draw'),
    win: ()=>gameElements.addScore2player()
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
var counter = 0;
 
async function spinComputerOption(){
    for (let option of gameOptions){
        gameElements.setComputerOption(option)
        await sleep(100)
    }
};
var areFighting = false
async function fighting(playerOption){
    if (!areFighting){
        areFighting = true
        gameElements.setPlayerOption(playerOption);
        await  spinComputerOption();
        let computerOption = getComputerAnswer();
        gameElements.setComputerOption(computerOption);
        let result = getGameResult(playerOption, computerOption)
        updateScore[result]()
        gameElements.setResult(result)
        areFighting = false
    }
}
 
function playGame(option2play){
    let playerOption = option2play.dataset.value;
    fighting(playerOption)
}
const key2image = {
    74: gameOptions[0],
    75: gameOptions[1],
    76: gameOptions[2],
    78: gameOptions[3],
    77: gameOptions[4]
}
window.addEventListener('keyup',function(event){
    let playerOption = key2image[event.keyCode]
    if (playerOption){
        fighting(playerOption)
    }
})