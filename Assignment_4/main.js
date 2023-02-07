var secCounter = 9;
var mlSecCounter = 60;
var reverse = true;
var containerColor = "white";
var pause = false;
var pauseCounter = 0;

function timer() {
    const div = document.getElementById("container");
    const timer = document.getElementById("timer");

    var interval = setInterval(
        async ()=>{
          if(!pause){
            if(reverse){
              mlSecCounter-=1;
              timer.innerHTML = secCounter + " : " + mlSecCounter;
              if(mlSecCounter==0){
                secCounter-=1;
                mlSecCounter = 60;
                timer.style.color = "#"+Math.floor(Math.random()*16777215).toString(16);
                div.style.backgroundColor = "#"+Math.floor(Math.random()*16777214).toString(16);
              }
              if(secCounter < 0){
                reverse = false;
                secCounter = 0;
                mlSecCounter = 0;
                pause = true;
              }
            }else {
              mlSecCounter+=1;
              timer.innerHTML = secCounter + " : " + mlSecCounter;
              if(mlSecCounter==59){
                secCounter+=1;
                mlSecCounter = 0;
                timer.style.color = "#"+Math.floor(Math.random()*16777215).toString(16);
                div.style.backgroundColor = "#"+Math.floor(Math.random()*16777214).toString(16);
              }
              if(secCounter > 9){
                reverse = true;
                secCounter = 9;
                mlSecCounter = 60;
                pause = true;
              }
            }
          }else{
            pauseCounter+=1;
            if(pauseCounter==60){
              pauseCounter = 0;
              pause = false;
            }
          }
        },  
        16.66
    )
}
timer()