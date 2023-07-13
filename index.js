const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.font = "30px Arial";
canvas.width = 700;
canvas.height = 600;
const fridge = new Image();
const man = new Image();
const ground = new Image();
fullAnimationTime = 20
animationSpeed = fullAnimationTime/2
frame = 0;
groundMove = 0;
groundSpeed = 5;

class Man{
  constructor(xPos,yPos,weightLevel){
    this.xPos = xPos;
    this.yPos = yPos;
    this.weightLevel = weightLevel;
    this.frame = 0;

  }
  animationSpeed(){
    return 5+2*(this.weightLevel);
  }
  speedUpdate(){
    this.xPos+=10-this.animationSpeed();
  }


}

function updateDisplay(frame,groundMove){
  PlayerMan1.speedUpdate()
  context.fillStyle = 'black';
  context.fillRect(0,0,canvas.width,canvas.height);
  context.drawImage(ground,0-groundMove,190);
  context.drawImage(ground,500-groundMove,190);
  context.drawImage(ground,1000-groundMove,190);
  context.drawImage(fridge,0+(Math.floor(frame/animationSpeed)*30),0,30+(Math.floor(frame/animationSpeed)*40),70,100,120,30+(Math.floor(frame/animationSpeed)*40),70);
  context.drawImage(man,0+(Math.floor(PlayerMan1.frame/PlayerMan1.animationSpeed())*80),0+90*PlayerMan1.weightLevel,80+(Math.floor(PlayerMan1.frame/PlayerMan1.animationSpeed())*10),90,PlayerMan1.xPos,PlayerMan1.yPos,80+(Math.floor(PlayerMan1.frame/PlayerMan1.animationSpeed())*10),90);
}

function loop(){
  window.requestAnimationFrame(loop);
  frame+=1
  PlayerMan1.frame+=1
  groundMove+=groundSpeed
  if (frame>=fullAnimationTime){frame=0;}
  if (PlayerMan1.frame>=(PlayerMan1.animationSpeed()*2)){PlayerMan1.frame=0;}
  if (groundMove>=500){groundMove=0}
  updateDisplay(frame,groundMove);
}
const PlayerMan1 = new Man(300,100,0)

window.addEventListener('keydown', (event)=> {
  if (event.key == 'd'){
  myObject1.adjustOrientation(-.25,0)
}
  else if (event.key == 'w'){
  myObject1.adjustOrientation(0,-.25)
}
  else if (event.key == 'a'){
  myObject1.adjustOrientation(.25,0)
}
  else if (event.key == 's'){
  myObject1.adjustOrientation(0,.25)
}
  else if (event.key == 'z'){
    if (PlayerMan1.weightLevel<5){
    PlayerMan1.weightLevel+=1;
  }
  }
  else if (event.key == 'x'){
    if (PlayerMan1.weightLevel>0){
    PlayerMan1.weightLevel-=1;
  }
  }
  else if (event.key == 'r'){
    PlayerMan1.xPos=300;
  }

})
ground.src = 'ground.png';
ground.onload = () =>{
  man.src = 'Man.png';
  man.onload = () =>{
    fridge.src = 'EvilFridge.png';
    fridge.onload = () => {loop();}
  }
}
