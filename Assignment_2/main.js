// var interval = setInterval(
    var topOffset = -8;
    var leftOffset = 0;    
    var forwardDown = true;
    var forwardLeft = true;
    var leftEnd = 8;
    var leftRightCounter = 0;

    function move() {
      var div = document.getElementById("movableDiv");
        var interval = setInterval(
            ()=>{
                (forwardDown) ? topOffset+=1 : topOffset-=1;
                div.style.top = div.offsetTop + (topOffset) + "px";
                // console.log(topOffset);
                if(topOffset >= 18){
                    topOffset = -8;
                    forwardDown = false;

                    leftRightCounter += 1;
                    // console.log(leftRightCounter);
                    div.style.backgroundColor = "#"+Math.floor(Math.random()*16777215).toString(16);
                    if(forwardLeft){
                        div.style.left = div.offsetLeft + 60.5 + "px";
                    }else{
                        div.style.left = div.offsetLeft + -58.5 + "px";
                    }
                    if(leftRightCounter >= leftEnd){
                        forwardLeft = !forwardLeft;
                        (leftEnd == 8) ? leftEnd = 11 : leftEnd = 8;
                        leftRightCounter = 0;
                    }
                }  
                else if(topOffset <= -34){
                    topOffset = -8;
                    forwardDown = true;
                    
                    // console.log(leftRightCounter);
                    leftRightCounter += 1;
                    div.style.backgroundColor = "#"+Math.floor(Math.random()*16777215).toString(16);
                    if(forwardLeft){
                        div.style.left = div.offsetLeft + 60.5 + "px";
                    }else{
                        div.style.left = div.offsetLeft + -58.5 + "px";
                    }
                    if(leftRightCounter >= leftEnd){
                        forwardLeft = !forwardLeft;
                        (leftEnd == 8) ? leftEnd = 11 : leftEnd = 8;
                        leftRightCounter = 0;
                    }
                }
            },  
            55
        )
    }
    move()
    // 50);