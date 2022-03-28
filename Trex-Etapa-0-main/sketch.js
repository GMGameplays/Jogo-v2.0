var BgImg,AlienImg; 
var AlienS1;
var Spaceship;
var score=0;
var life=3;
var AlienM=[];
var gameState=jogando;

function preload(){ 
  BgImg = loadImage("Assets/bg.png"); 
  AlienImg = loadImage("Assets/Ship1.png");
  SpaceshipImg = loadImage("Assets/Spaceship.png");
  LaserImg=loadImage("Assets/blue_laser.png");
  RlaserImg=loadImage("Assets/Pure_21+(1).png");
  noHeartsImg=loadAnimation("Assets/0.png");
  oneHeartImg=loadAnimation("Assets/2.png");
  twoHeartsImg=loadAnimation("Assets/4.png");
  threeHeartsImg=loadImage("Assets/6.png");
} 
function setup() {
  createCanvas(800,600);
  Background=createSprite(400,300,800,600);
  Background.addImage(BgImg);
  Background.velocityX=-10;
  Background.scale=2;
  Spaceship=createSprite(100,300,100,100);
  Spaceship.addImage(SpaceshipImg);
  Spaceship.setCollider("rectangle",0,0,85,75);
  AlienG=new Group();
  LaserG=new Group();
  RlaserG=new Group();
  Hbar=createSprite(150,580,200,15);
  hBar=createSprite(150,580,200,15);
  hBar.shapeColor="green";
  Hbar.shapeColor="black";
  lifeImg=createSprite(80,80,54,17);
  lifeImg.scale=1.25
  lifeImg.addAnimation("3H",threeHeartsImg);
  lifeImg.addAnimation("2H",twoHeartsImg);
  lifeImg.addAnimation("1H",oneHeartImg);
  lifeImg.addAnimation("0H",noHeartsImg);
  lifeImg.changeAnimation("3H");
  invWall=createEdgeSprites();
} 
function draw() {
  background(220);
  if(Background.x<0){
    Background.x=200
  }
  LaserG.isTouching(AlienG,ADestroy);
  RlaserG.isTouching(Spaceship,SDestroy);
  spawnAlien();
  if(frameCount%45===0){
    AShoot();
  }
  Moviment();
  loseHeart();
  drawSprites();
  textSize(20);
  text("Score:"+score,50,50);
  Spaceship.bounceOff(invWall);
} 
function spawnAlien() { 
  if(frameCount%40===0){
  AlienS1=createSprite(700,100,64,64); 
  AlienS1.addImage(AlienImg);
  AlienS1.setCollider("rectangle",0,0,64,35);
  AlienS1.y=Math.round(random(50,550));
  AlienS1.velocityX=-10
  AlienG.add(AlienS1);
  }
}
function Moviment() {
  if(keyDown(UP_ARROW)){
    Spaceship.y=Spaceship.y-7
  }
  if(keyDown(DOWN_ARROW)){
    Spaceship.y=Spaceship.y+7
  }
  if(keyDown(RIGHT_ARROW)){
    Shoot();
  }
}
function Shoot() {
  if(frameCount%15 === 0){
  Laser=createSprite(Spaceship.x+90,Spaceship.y,421,76);
  Laser.scale=0.25
  Laser.addImage(LaserImg);
  Laser.velocityX=10
  LaserG.add(Laser);
  }
}
function AShoot() {
    Rlaser=createSprite(AlienS1.x-90,AlienS1.y,421,76);
    Rlaser.scale=0.30;
    Rlaser.addImage(RlaserImg);
    Rlaser.velocityX=-10
    RlaserG.add(Rlaser)
}
function ADestroy(AlienS1,Laser) {
  AlienS1.destroy();
  Laser.destroy();
  score=score+1
}
function SDestroy(Rlaser){
  Rlaser.remove();
  hBar.width-=5;
  hBar.x-=2.5
}
function loseHeart() {
  if(AlienS1.x<0){
    life=life-1
    lifeImg.changeAnimation("2H");
    AlienS1.destroy();
  }
}