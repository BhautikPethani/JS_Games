const arr1 = ['dam','dry','ego','fan','gal','ham','man','net','hit','lip'];
const arr2 = ['able', 'alto', 'anna', 'bait', 'born', 'city', 'cent', 'dump', 'lift','hell'];
const arr3 = ['about', 'begin', 'chose', 'grace', 'media', 'mouse', 'style', 'theft', 'study', 'throw'];

var text = document.getElementById("movableDiv");

var marginTop = 0;
var lap = 1;
var life = 3;
var result = [];
var randomArray = [];
var randomWord = "dam";
var fallingSpeed = 150;
var textEnter = document.getElementById("textEnter");
var scoreBoard = document.getElementById("scoreBoard");
var lifeBoard = document.getElementById("lifeBoard");
var score = 0;
var scoreElement = document.getElementById("score");
var gameOverModal = document.getElementById("gameOverModal");


var lapInterval = setInterval(
  fallingWords,
  fallingSpeed
);

var twentySecInterval = setInterval(
  ()=>{
    clearInterval(lapInterval);
    if(lap>=6){
      gameOver();
    }
    console.log("LAP "+lap);
    lap++;
    fallingSpeed-=20;
    lapInterval = setInterval(
      fallingWords,
      fallingSpeed
    );
    if(lap>6){
      gameOver();
    }
  },
  20000
);

if(lap>=6){
  gameOver();
}

function checkAns(ans){
  text.value = "";
  if(ans === randomWord){
    score++;
    scoreBoard.innerHTML = score;
  }else{
    life--;
    lifeBoard.innerHTML = life;
  }
  textEnter.value = "";
  if(life<=0){
    gameOver();
  }
}

function onChangeListener(){
  if(textEnter.value === randomWord){
    marginTop = 0;
    getRandomWord();
    text.style.marginLeft = Math.floor(Math.random() * 900) + "px";
    score++;
    scoreBoard.innerHTML = score;
    textEnter.value = "";
  }
}

function fallingWords(){
  if(marginTop>=450){
    marginTop = 0;
    checkAns(textEnter.value);
    getRandomWord();
    text.style.marginLeft = Math.floor(Math.random() * 900) + "px";
  }
  marginTop+=10;
  text.style.marginTop = marginTop + "px";
}

function getRandomWord(){
  if(lap==1){
    randomArray = arr1;
  }else if(lap==2){
    randomArray = arr1.concat(arr2);
  }else if(lap==3){
    randomArray = arr2;
  }else if(lap==4){
    randomArray = arr2.concat(arr3);
  }else if(lap==5){
    randomArray = arr1.concat(arr2);
    randomArray = randomArray.concat(arr3);
  }else if(lap==6){
    randomArray = arr3;
  }
  randomWord = randomArray[Math.floor(Math.random() * randomArray.length)];
  text.innerHTML=randomWord;
}

function gameOver(){
  clearInterval(twentySecInterval);
  clearInterval(lapInterval);
  result.push(score);
  console.log(result);
  gameOverModal.style.display = "block";
}

var closeModal = document.getElementsByClassName("close")[0];

closeModal.onclick = function() {
  modal.style.display = "none";
}