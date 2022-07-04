const gameOptions = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
const optionsNumber = gameOptions.length;
const gameOptionsMap = Object.fromEntries(gameOptions.map((option,index)=>[option,index]))

const win2= {
    rock: [gameOptionsMap.scissors,gameOptionsMap.lizard],
    paper: [gameOptionsMap.rock, gameOptionsMap.spock],
    scissors: [gameOptionsMap.paper, gameOptionsMap.lizard],
    lizard: [gameOptionsMap.spock, gameOptionsMap.paper],
    spock: [gameOptionsMap.rock, gameOptionsMap.scissors]
};

function getComputerAnswer(){
    let value = Math.floor(optionsNumber*Math.random());
    return gameOptions[value];
}
const gameResult={
    lost : 'lost',
    draw : 'draw',
    win : 'win',
};
function getGameResult(playerOption, computerOption){
    // player vs computer
    if (playerOption===computerOption){
        return gameResult.draw
    }
    if (win2[playerOption].includes(gameOptionsMap[computerOption])){
        return gameResult.win
    }
    return gameResult.lost
}
