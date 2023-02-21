var btnIdAndLocationArray = [
  {id: 1, location: 11},
  {id: 2, location: 12},
  {id: 3, location: 13},
  {id: 4, location: 14},
  {id: 5, location: 21},
  {id: 6, location: 22},
  {id: 7, location: 23},
  {id: 8, location: 24},
  {id: 9, location: 31},
  {id: 10, location: 32},
  {id: 11, location: 33},
  {id: 12, location: 34},
  {id: 13, location: 41},
  {id: 14, location: 42},
  {id: 15, location: 43},
  {id: 16, location: 44},
];

var values = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

var btnElements = [];
var scoreBoard = [];

var gameIsPlaying = false;

var lblSeconds = document.getElementById("seconds");
var sortedDataTable = document.getElementById("sortedData");
var seconds = 0;

function checkGameWin(){
  for (i=1; i<=16; i++){
    if(i==16){
      stop();
      break;
    }
    if(btnElements[i].innerHTML != i){
      break;
    }
  }
}

function resetGame(){
  btnElements = [];
  values = shuffle(values);

  seconds = 0;
  gameIsPlaying = true;

  for (i=1; i<=16; i++){
    btnElements[i] = document.getElementById(i);
    if(values[i-1] == 16){
      btnElements[i].innerHTML = "";
    }else{
      btnElements[i].innerHTML = values[i-1];
    }
  }
}

function stop(){
  gameIsPlaying = false;
  if(seconds>20){
    scoreBoard.push(seconds);
    displayTableData();
  }
  seconds = 0;
  lblSeconds.innerHTML = seconds;
}

function returnPossibility(loc){
  for (i=0; i<16; i++){
    if(btnIdAndLocationArray[i].location == loc){
      if(btnElements[btnIdAndLocationArray[i].id].innerHTML == ""){
        return btnIdAndLocationArray[i].id;
      }
    }
  }
  return -1;
}

function move(pressedButtonId){
  // console.log(btnElements[pressedButtonId].innerHTML);

  if(btnElements[pressedButtonId].innerHTML != ""){
    // console.log("passed");
    // console.log(btnElements[pressedButtonId].value.substring(0,1));
    var i = btnElements[pressedButtonId].value.substring(0,1);
    var j = btnElements[pressedButtonId].value.substring(1,2);

    if(returnPossibility((parseInt(i)-1) + (j)) != -1){Promise
      var temp = returnPossibility((parseInt(i)-1) + (j));
      btnElements[temp].innerHTML = btnElements[pressedButtonId].innerHTML;
      btnElements[pressedButtonId].innerHTML = "";
    }else if(returnPossibility((parseInt(i)+1) + (j)) != -1){
      var temp = returnPossibility((parseInt(i)+1) + (j));
      btnElements[temp].innerHTML = btnElements[pressedButtonId].innerHTML;
      btnElements[pressedButtonId].innerHTML = "";
    }else if(returnPossibility((i) + (parseInt(j)+1)) != -1){
      var temp = returnPossibility((i) + (parseInt(j)+1));
      btnElements[temp].innerHTML = btnElements[pressedButtonId].innerHTML;
      btnElements[pressedButtonId].innerHTML = "";
    }else if(returnPossibility((i) + (parseInt(j)-1)) != -1){
      var temp = returnPossibility((i) + (parseInt(j)-1));
      btnElements[temp].innerHTML = btnElements[pressedButtonId].innerHTML;
      btnElements[pressedButtonId].innerHTML = "";
    }else{
      console.log("NOT POSSIBLE");
    }

    checkGameWin();
  }else{
    // console.log("16");
  }
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

var secondsInterval = setInterval(()=>{
  if(gameIsPlaying){
    seconds++;
    lblSeconds.innerHTML = seconds;
  }
},1000);

function displayTableData(){
  scoreBoard = scoreBoard.sort((a,b)=>a-b);

  sortedDataTable.innerHTML = "";
  for(let i = 0; i < scoreBoard.length; i++){
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${scoreBoard[i]}</td>
    `;
    sortedDataTable.appendChild(row);
    if(i==5){
      break;
    }
  }
}