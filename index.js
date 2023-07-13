const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.font = "30px Arial";
canvas.width = 700;
canvas.height = 900;
const fridge = new Image();
const man = new Image();
const ground = new Image();
const laserbeam = new Image();
const iceCube = new Image();
const junkFood = new Image();
fullAnimationTime = 20
animationSpeed = fullAnimationTime/2
frame = 0;
groundMove = 0;
groundSpeed = 5;
laserbeamFrame = 0;
laserbeamActive = false;
gameOver = false;
laserbeamCharge = 0;
const foodObjects = [];

class Food{
  constructor(xPos,yPos){
    this.xPos = xPos;
    this.yPos = yPos;
    this.frame = 0
  }
  move(target){
    this.xPos+=5;
    this.frameUpdate()
  }
  frameUpdate(){
    this.frame+=1;
    if (this.frame>=80){
      this.frame=0;
    }
  }
}

class Man{
  constructor(xPos,yPos,weightLevel){
    this.xPos = xPos;
    this.yPos = yPos;
    this.weightLevel = weightLevel;
    this.frame = 0;
    this.steps = 0;
    this.frozen = false;
    this.frozenCounter = 0;
  }
  animationSpeed(){
    return 5+2*(this.weightLevel);
  }
  speedUpdate(){
    if (this.frozen){
      if (this.frozenCounter>=65){
        this.frozen = false;
        this.frozenCounter = 0
      }
      else{
        this.frozenCounter += 1;
        this.xPos-=5;
      }
  }
    if (!this.frozen){
      this.xPos+=10-this.animationSpeed();
  }
  if (this.xPos>=100 && this.xPos<=130){
    gameOver = true;
  }

}
}

function updateDisplay(frame,groundMove,laserbeamFrame){
  if (!gameOver){
  PlayerMan1.speedUpdate()
  context.fillStyle = 'black';
  context.fillRect(0,0,canvas.width,canvas.height);
  context.drawImage(ground,0-groundMove,500);
  context.drawImage(ground,500-groundMove,500);
  context.drawImage(ground,1000-groundMove,500);
  context.drawImage(fridge,0+(Math.floor(frame/animationSpeed)*30),0,30+(Math.floor(frame/animationSpeed)*40),70,100,430,30+(Math.floor(frame/animationSpeed)*40),70);
  context.drawImage(man,0+(Math.floor(PlayerMan1.frame/PlayerMan1.animationSpeed())*80),0+90*PlayerMan1.weightLevel,80+(Math.floor(PlayerMan1.frame/PlayerMan1.animationSpeed())*10),90,PlayerMan1.xPos,PlayerMan1.yPos,80+(Math.floor(PlayerMan1.frame/PlayerMan1.animationSpeed())*10),90);
  if (PlayerMan1.frozen){context.drawImage(iceCube,PlayerMan1.xPos,PlayerMan1.yPos);}
  for (let i = 0;i<foodObjects.length;i++){
    foodObjects[i].move(PlayerMan1);
    context.drawImage(junkFood,0+50*Math.floor(this.frame/5),0,50,50,foodObjects[i].xPos,foodObjects[i].yPos,50,50);
  }
  for (let i = 0;i<laserbeamFrame;i++){
    context.drawImage(laserbeam,170+50*i,420);
    if (170+50*i>=PlayerMan1.xPos && 170+50*i<=PlayerMan1.xPos+90){
      PlayerMan1.frozen=true
    }
  }
}
}


function loop(){
  window.requestAnimationFrame(loop);
  frame+=1
  if (laserbeamActive){
    if (laserbeamFrame>=32){
      laserbeamFrame = 0;
      laserbeamActive = false;
    }
    else{laserbeamFrame+=1;}
  }
  if (!PlayerMan1.frozen){
  PlayerMan1.frame+=1
}
  groundMove+=groundSpeed
  if (frame>=fullAnimationTime){frame=0;laserbeamCharge+=1}
  if (PlayerMan1.frame>=(PlayerMan1.animationSpeed()*2)){
    PlayerMan1.frame=0;
    PlayerMan1.steps+=2;
    if (PlayerMan1.steps>=4){
      PlayerMan1.steps-=4
      if (PlayerMan1.weightLevel>0){
      PlayerMan1.weightLevel-=1;
    }
    }
  }
  if (groundMove>=500){groundMove=0}
  updateDisplay(frame,groundMove,laserbeamFrame);
}
const PlayerMan1 = new Man(350,410,3)

window.addEventListener('keydown', (event)=> {

 if (event.key == 'z'){
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
    PlayerMan1.xPos=350;
    PlayerMan1.weightLevel = 3
  }
  else if (event.key == 'k'){
    foodObjects.push(new Food(170,420));
  }
  else if (event.key == 'l' && !laserbeamActive){
    laserbeamActive=true;
  }
})
junkFood.src = "JunkFood.png";
junkFood.onload = () =>{
  iceCube.src = "Ice_cube.png";
  iceCube.onload = () =>{
    laserbeam.src = 'Laserbeam.png';
    laserbeam.onload = () =>{
      ground.src = 'ground.png';
      ground.onload = () =>{
        man.src = 'Man.png';
        man.onload = () =>{
          fridge.src = 'EvilFridge.png';
          fridge.onload = () => {loop();}
        }
      }
    }
  }
}
