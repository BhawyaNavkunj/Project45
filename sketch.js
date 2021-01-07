var player, ground, score, playerImg, playerI;
var obstacle, obstaclesGroup;
var bg1;
var ninjaImg, soldierImg, bombImg;
var weapon;
var gameState = 1;
var gameOver, restart, gameOverImg, restartImg;

function preload(){
  playerImg = loadAnimation("Assets/Player/man1.png","Assets/Player/man2.png","Assets/Player/man3.png","Assets/Player/man4.png","Assets/Player/man5.png","Assets/Player/man6.png","Assets/Player/man7.png","Assets/Player/man8.png");
  bg1 = loadImage("Assets/Backgrounds/bg2.jpg");
  gameOverImg = loadImage("Assets/gameOver.png");
  restartImg = loadImage("Assets/restart.png");
  playerI = loadAnimation("Assets/Player/man1.png");
  ninjaImg = loadAnimation("Assets/Obstacles/ninja1.png","Assets/Obstacles/ninja2.png","Assets/Obstacles/ninja3.png","Assets/Obstacles/ninja4.png","Assets/Obstacles/ninja5.png","Assets/Obstacles/ninja6.png");
  soldierImg = loadAnimation("Assets/Obstacles/soldier1.png","Assets/Obstacles/soldier2.png","Assets/Obstacles/soldier3.png","Assets/Obstacles/soldier4.png","Assets/Obstacles/soldier5.png",)
  bombImg = loadImage("Assets/Obstacles/Bomb.png");
}

function setup(){
  createCanvas(1200,400);

  player = createSprite(70,345,20,20);
  player.addAnimation("running",playerImg);
  player.scale = 0.5;
  player.setCollider("rectangle",0,0,player.width-100,player.height);

  ground = createSprite(600,380,5000,10);
  ground.visible = false;

  weapon = createSprite(70,player.y-100,20,20);
  weapon.visible = false;

  gameOver = createSprite(600,200,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1.05;
  gameOver.visible = false;

  restart = createSprite(600,250,10,10);
  restart.addImage(restartImg);
  restart.scale = 0.25;
  restart.visible = false;

  score = 0;
  obstaclesGroup = new Group();
  //player.debug = true;
}

function draw(){
  background(bg1);
  textSize(18);
  fill("white");
  text("Score:"+score,20,20);
  weapon.y = player.y - 100;
  
  if(gameState===1){
    ground.velocityX = -5
    if(ground.x<0){
      ground.x = width/2;
    }

    if(keyDown("space")&& player.y>200){
      player.velocityY = -20;
    }
    player.velocityY = player.velocityY + 0.8;
    
    score = score + Math.round(getFrameRate()/30);
    spawnObstacles();

    if(player.isTouching(obstaclesGroup)){
      gameState = 0;
    }

    if(score>500){
      weapon.visible = true;
    }
  }

  if(gameState===0){
    player.visible = false;
    obstaclesGroup.destroyEach();
    weapon.visible = false;
    gameOver.visible = true;
    restart.visible = true;

    /*if(mousePressedOver(restart)){
      reset();
    }*/
  }

  
  player.collide(ground);
  drawSprites();
}

function spawnObstacles(){
  if(frameCount%150===0){
    obstacle = createSprite(1200,310,10,10);
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1: obstacle.addAnimation("ninja",ninjaImg);
      break;
      case 2: obstacle.addAnimation("soldier",soldierImg);
      obstacle.scale = 0.3;
      break;
      case 3: obstacle.addImage(bombImg);
      obstacle.scale = 0.3;
      obstacle.y = 315;
      break;
      default: break;
    }
    obstacle.velocityX= -7;
    obstacle.lifetime = 1200;
    obstaclesGroup.add(obstacle);
  }

  /*function reset(){
    player.visible = true;
    score = 0;
    gameState = 1;
  }*/
}
  