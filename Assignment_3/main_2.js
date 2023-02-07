var forwardLeft = true;
var forwardDown = false;
var forward = true;
var marginTop = 0;
var marginLeft = 0;

var counter = 0;
function move() {
    var div = document.getElementById("movableDiv");
    var h1 = document.getElementById("middlebox");

    var interval = setInterval(
        async ()=>{

            if(forward){
                if(forwardLeft){
                    // console.log(marginTop.toString() + "ABC" + marginLeft.toString());
                    div.style.marginLeft = marginLeft + "px";
                    if(marginLeft>=0 && marginLeft<550 && marginTop==0){
                        marginLeft += 25;
                    }else if(marginLeft>0 && marginLeft<=550 && marginTop==350){
                        marginLeft -= 25;
                    }else if(marginLeft>=0 && marginTop==350){
                        forwardLeft = false;
                        forwardDown = true; 
                    }
                    else if(marginLeft >= 550){
                        forwardLeft = false;
                        forwardDown = true;
                    }
                }else if(forwardDown){
                    // console.log(marginTop.toString() + "XYZ" + marginLeft.toString());
                    div.style.marginTop = marginTop + "px";
                    if(marginTop>0 && marginTop<=350 && marginLeft==0){
                        marginTop -= 25;
                    }else if(marginTop>=0 && marginTop<350 && marginLeft==550){
                        marginTop += 25;
                    }else if(marginTop >= 350){
                        forwardLeft = true;
                        forwardDown = false;
                    }

                    if(marginLeft == 0 && marginTop == 25){
                        div.style.backgroundColor = "#"+Math.floor(Math.random()*16777215).toString(16);
                        counter+=1;
                        h1.innerHTML = counter;
                    }
                }
            }else{
                if(forwardLeft){
                    // console.log(marginTop.toString() + "ABC" + marginLeft.toString());
                    div.style.marginLeft = marginLeft + "px";
                    if(marginLeft>=0 && marginLeft<550 && marginTop==0){
                        marginLeft += 25;
                    }else if(marginLeft>0 && marginLeft<=550 && marginTop==350){
                        marginLeft -= 25;
                    }else if(marginLeft>=0 && marginTop==350){
                        forwardLeft = false;
                        forwardDown = true; 
                    }
                    else if(marginLeft >= 550){
                        forwardLeft = false;
                        forwardDown = true;
                    }
                }else if(forwardDown){
                    // console.log(marginTop.toString() + "XYZ" + marginLeft.toString());
                    div.style.marginTop = marginTop + "px";
                    if(marginTop>0 && marginTop<=350 && marginLeft==0){
                        marginTop -= 25;
                    }else if(marginTop>=0 && marginTop<350 && marginLeft==550){
                        marginTop += 25;
                    }else if(marginTop >= 350){
                        forwardLeft = true;
                        forwardDown = false;
                    }

                    if(marginLeft == 0 && marginTop == 25){
                        div.style.backgroundColor = "#"+Math.floor(Math.random()*16777215).toString(16);
                        counter+=1;
                        h1.innerHTML = counter;
                    }
                }
            }

            if(marginLeft == 0 && marginTop == 0){
                await new Promise(resolve => setTimeout(resolve, 2000));
                forwardLeft = !forwardLeft;
                forwardDown = !forwardDown;
                forward = !forward;
            }
        },  
        43
    )
}
move()
    // 50);