paper.install(window);
paper.setup(document.getElementById('mainCanvas'));

var totalSec = 0;

const shapes = ['square', 'circle'];
var c;

async function draw(){
    while(true){
        await new Promise(resolve => setTimeout(resolve, 1000));
        drawShape(
            shapes[Math.floor(Math.random() * shapes.length)],
            Math.floor(Math.random() * 1450),
            Math.floor(Math.random() * 700)
        );
        totalSec+=1;
        if(totalSec>=20){
            window.location.reload();
        }
    }
}

function drawShape(shape, x, y){
    if(shape == "circle"){
        c = Shape.Circle(x, y, Math.random() * (40 - 20) + 20);
        c.fillColor = Math.floor(Math.random()*16777215).toString(16);
        paper.view.draw();
    }else{
        c = Shape.Rectangle(x, y, Math.random() * (50 - 30) + 30, Math.random() * (50 - 30) + 30);
        c.fillColor = "#"+Math.floor(Math.random()*16777215).toString(16);
        paper.view.draw();
    }
    
}
draw();