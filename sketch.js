var PLAY = 1;

var END = 0;

var gameState = PLAY;

var player, playerrahul;

var ground,groundImg

var background1,backgroundimg;

var background2,background2img;

var background3,background3img;

var cloudsGroup,cloudImage;

var tree, treeimg, treegroup;

var stone,stoneimg, stonegroup;

var invisibleground;

var coins, coinsimg, coingroup;

var birds, birdsimg, birdsgroup;

var snake, snakeimg, snakegroup;

var score = 0;

var coinscollect = 0;

var gameover, gameoverimg;

var restart,restartImg;

var diamonds, diamondimg;

var treasure, treasureimg;

var bellSound;



function preload() {
  
  playerrahul = loadAnimation("character2back.png","character3back.png");
  
  backgroundimg = loadImage("back.png");
  
  groundImg = loadImage("ground.png");
  
  cloudImage = loadImage("cloud.png");
  
  treeimg = loadImage("tree.png");
  
  stoneimg = loadImage("stone.png");
  
  gameoverimg = loadImage("gameover.png")
  
  restartImg = loadImage("restart.png");
  
  bellSound = loadSound("26079704_boxing-bell_by_fastsellers_preview.mp3")
  

  
  coinsimg = loadAnimation("coin1.png","coin2.png","coin3.png","coin4.png","coin5.png","coin6.png");
  
  birdsimg = loadAnimation("bird1.png", "bird2.png", "bird3.png");
  
  snakeimg = loadAnimation("snake1.png","snake2.png","snake3.png","snake4.png","snake1.png","snake5.png","snake6.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  

   gameState=PLAY;
   player = createSprite(35,10,10,10);
   player.addAnimation("playerrahul",playerrahul);
   player.scale = 0.4;

  
   
  ground = createSprite(300,390);
  ground.addImage(groundImg);
  gameState=PLAY; 
  ground.velocityX = -(6 + 3*score/100);
  
   invisibleground = createSprite(200,420,800,5);
  
   invisibleground.visible = false;
  
   treegroup = new Group();
   stonegroup = new Group();
   coingroup = new Group();
   birdsgroup = new Group();
   snakegroup = new Group();
   cloudsGroup = new Group();
 
   coinscollect = 0;
  
}

function draw() {
  background(backgroundimg)


  spawntree();
  spawnStones();
  spawncoins1();
  spawncoins2();
  spawnbirds();
  spawnsnake();
  
   player.collide(invisibleground);
  
  
    textSize(20);
    fill("black")
    text("Score: "+ score, 20,50);
    text("Coins Collected: "+ coinscollect,20,100);
  
    score = score + Math.round(getFrameRate()/60);
  
   if (ground.x < 600){
      ground.x = ground.width/2;
    }
  
  
  
  if(gameState===PLAY){
  
  if (player.isTouching(coingroup)) {
       coingroup.destroyEach();
    coinscollect = coinscollect + 1;
    score = score + 20;
    
  }
  
    if (keyDown("space") && player.y >=200 ) {
         player.velocityY = -23;
       
    }
  
  if (player.isTouching(stonegroup) ||player.isTouching(snakegroup))      {
       player.velocity = 0;

       gameover = createSprite(width/2,height/2-50);
       gameover.addImage(gameoverimg);
       gameover.scale = 0.5;

       gamestate=END;
      }
  
  player.velocityY = player.velocityY + 2;
  }
    else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    player.velocityY = 0;
    if(mousePressedOver(restart)) {  
      gameState=PLAY;
      reset();
      
     }
   }
  drawSprites();
 }

function spawntree() {
    if(frameCount % 400 === 0) {
     tree = createSprite(800,320,10,40);
     tree.addImage(treeimg);
     tree.velocityX = -(6 + 3*score/100);
     tree.scale = 0.3; 
     tree.lifetime = 220;

  treegroup.add(tree);
}
}

function spawnStones() {
  if(frameCount % 250 === 0) {
      stone = createSprite(600,390,20,30);
      stone.addImage(stoneimg);
      stone.velocityX = -(6 + 3*score/100);
      stone.scale = 0.1; 
      stone.lifetime = 220;
    
    //stone.debug = true;
    stone.setCollider("rectangle",0,0,30,30)

  stonegroup.add(stone);
}
}

function spawncoins1() {
    if(frameCount % 125 === 0) {
      coins = createSprite(600,200,20,30);
      coins.addAnimation("coinsimg",coinsimg);
      coins.velocityX = -(6 + 3*score/100);
      coins.scale = 0.1; 
      coins.lifetime = 220;

  coingroup.add(coins);
}
}

function spawncoins2() {
    if(frameCount % 135 === 0) {
      coins = createSprite(800,200,10,40);
      coins.addAnimation("coinsimg",coinsimg);
      coins.velocityX = -(6 + 3*score/100);
      coins.scale = 0.1; 
      coins.lifetime = 220;

  coingroup.add(coins);
}
}

function spawnbirds() {
      if(frameCount % 110 === 0) {
      birds = createSprite(800,200,10,40);
      birds.addAnimation("birdsimg",birdsimg);
      birds.velocityX = -(6 + 3*score/100);
      birds.scale = 0.250; 
      birds.lifetime = 220;

  birdsgroup.add(birds);
}  
}

function spawnsnake() {
    if(frameCount % 185 === 0) {
      snake = createSprite(600,390,20,30);
      snake.addAnimation("snakeimg",snakeimg);
      snake.velocityX = -(6 + 3*score/100);
      snake.scale = 0.250; 
      snake.lifetime = 220;
      
     // snake.debug = true;
      snake.setCollider("rectangle",0,0,20,20)

  snakegroup.add(snake);
}
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(300,300);
  
    cloud.addImage(cloudImage);
    cloud.scale = 1;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable

    
    //adjust the depth
    cloud.depth = trex.depth;
    player.depth = player.depth+1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  snakegroup.destroyEach();
  stonegroup.destroyEach();
  treegroup.destroyEach();
  coingroup.destroyeach();
  birdsgroup.destroyEach();
  score = 0;
  
}

