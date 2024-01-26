var point = 0;
var cross = true;

let bgm = new Audio('bailSong.mp3');
let goAudio = new Audio('gameover.mp3');

function playAudio() {
    bgm.play().catch(error => {
        console.error("Error playing audio:", error);
    });
}
// Play audio when the user interacts with the document
document.addEventListener("click", playAudio);

setTimeout(() => {
    let msg = document.querySelector(".welcome");
    msg.style.visibility = "hidden";
},2500);

document.onkeydown = function(e){
    console.log("key code is : ", e.keyCode)
    if(e.keyCode==38){
        dino = document.querySelector('.dino')
        dino.classList.add('animateDino')
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 1200);

    }

    if(e.keyCode==39){
        dino = document.querySelector('.dino')
        let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
        dino.style.left = dx + 120 + "px";

    }

    if(e.keyCode==37){
        dino = document.querySelector('.dino')
        let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
        dino.style.left = dx - 120 + "px";
    }
    
}



setInterval(() => {
    let dino = document.querySelector(".dino");
    let gameOver = document.querySelector(".gameOver");
    let obstacle = document.querySelector(".obstacle");
    

    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue("bottom"));
    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
    let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("left"));
    let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("bottom"));

    let setX = Math.abs(dx - ox);
    let setY = Math.abs(dy - oy);
    
    if (setX < 80 && setY < 52) {
        console.log("nahi hot");
        gameOver.style.visibility = 'visible';
        goAudio.play();
        bgm.pause();
        setTimeout(() => {
            bgm.play();
            goAudio.pause();
        },1200);
        obstacle.classList.remove('animateObs');
        point = 0;
        
    }

    else if(setX < 145 && cross){
        point++;
        updateScore(point);
        cross = false;
        setTimeout(() => {
            cross = true;
        },1000);

        setTimeout(() => {
            if(point%2==0 && point>0){
                levelSpeed = parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue("animation-duration"));
                if(levelSpeed>2.25){
                newSpeed = levelSpeed - 0.3;
                obstacle.style.animationDuration = newSpeed + "s";
                }
            }
        },300);
    }
}, 100);



function updateScore(point){
    score = document.querySelector("#scoreCont");
    score.innerText = "Your Score: " + point;
}