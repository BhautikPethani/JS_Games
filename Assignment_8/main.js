var ball = document.getElementById("ball");
var redDefender = document.getElementById("redDefender");
var blueDefender = document.getElementById("blueDefender");
var redGoalLbl = document.getElementById("redGoalScore");
var blueGoalLbl = document.getElementById("blueGoalScore");
var redScoreLbl = document.getElementById("redScore");
var blueScoreLbl = document.getElementById("blueScore");

var marginTop = 280;
var marginLeft = 480;

var redMarginTop = 230;
var blueMarginTop = 230;

var redScore = 0;
var blueScore = 0;

var redWin = 0;
var blueWin = 0;

var topBoundry = 200;
var bottomBoundry = 400;

var leftToRight = true;
var directionUp = true;
var gameIsRunning = false;

function initState(){
    if(gameIsRunning){
        gameIsRunning = false;
    }else{
        marginTop = 280;
        marginLeft = 480;
        redMarginTop = 230;
        blueMarginTop = 230;

        ball.style.marginTop = marginTop + "px";
        ball.style.marginLeft = marginLeft + "px";
        redDefender.style.marginTop = redMarginTop + "px";
        blueDefender.style.marginTop = blueMarginTop + "px";

        gameIsRunning = true;

        startGame();
    }
    
}

function goal(){
    gameIsRunning = false;
    marginTop = 280;
    marginLeft = 480;
    redMarginTop = 230;
    blueMarginTop = 230;

    ball.style.marginTop = marginTop + "px";
    ball.style.marginLeft = marginLeft + "px";
    redDefender.style.marginTop = redMarginTop + "px";
    blueDefender.style.marginTop = blueMarginTop + "px";

    if(redScore==7){
        redWin+=1;
        redScoreLbl.innerHTML = redWin;
    }else if(blueScore==7){
        blueWin+=1;
        blueScoreLbl.innerHTML = blueWin;
    }else{
        gameIsRunning = true;
    }
    
}

document.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    gameIsRunning = !gameIsRunning;
    startGame();
  }

  if(e.key == 'w'){
    let temp = redMarginTop;
    temp-=10;
    if(temp>0){
        if(redMarginTop>=0){
            redMarginTop-=10;
            redDefender.style.marginTop = redMarginTop + "px";
        }
    }
  }

  if(e.key == 's'){
    let temp = redMarginTop;
    temp+=10;
    if(temp<540){
        if(redMarginTop<=540){
            redMarginTop+=10;
            redDefender.style.marginTop = redMarginTop + "px";
        }
    }
  }

  if(e.key == 'ArrowUp'){
    let temp = blueMarginTop;
    temp-=10;
    if(temp>0){
        if(blueMarginTop>=0){
            blueMarginTop-=10;
            blueDefender.style.marginTop = blueMarginTop + "px";
        }
    }
  }

  if(e.key == 'ArrowDown'){
    let temp = blueMarginTop;
    temp+=10;
    if(temp<540){
        if(blueMarginTop<=540){
            blueMarginTop+=10;
            blueDefender.style.marginTop = blueMarginTop + "px";
        }
    }
  }
});

async function startGame(){
    while(true){
        if(gameIsRunning){
            await new Promise(resolve => setTimeout(resolve, 6));
            if(redScore>=3 && blueScore>=3){
                gameIsRunning =!gameIsRunning;
            }
            if(leftToRight){
                if(marginLeft >= 920){
                    var temp = marginTop - blueMarginTop;
                    if(temp >= 0 && temp<=40){
                        leftToRight = false;
                    }else if(marginTop <= bottomBoundry && marginTop >= topBoundry){
                        redScore++;
                        redGoalLbl.innerHTML = redScore;
                        goal();
                    }
                }
            }else{
                console.log("Test1 Passed");
                if(marginLeft <= 60){
                    console.log("Test2 Passed");
                    var temp = marginTop - redMarginTop;
                    if(temp >= 0 && temp<=40){
                        console.log("Test3 Passed");
                        leftToRight = true;
                    }else if(marginTop <= bottomBoundry && marginTop >= topBoundry){
                        console.log("Test4 Passed");
                        blueScore++;
                        blueGoalLbl.innerHTML = blueScore;
                        goal();
                    }
                }
            }

            if(marginTop == 0){
                directionUp = false;
            }else if(marginTop == 570){
                directionUp = true;
            }

            if(marginLeft == 0){
                leftToRight = true;
            }else if(marginLeft == 970){
                leftToRight = false;
            }

            if(directionUp && leftToRight){
                marginTop--;
                marginLeft++;
            }else if(!directionUp && leftToRight){
                marginTop++;
                marginLeft++;
            }else if(!directionUp && !leftToRight){
                marginTop++;
                marginLeft--;
            }else if(directionUp && !leftToRight){
                marginTop--;
                marginLeft--;
            }
            ball.style.marginTop = marginTop + "px";
            ball.style.marginLeft = marginLeft + "px";
        }else{
            break;
        }
    }
    
}