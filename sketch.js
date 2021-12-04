var PLAY = 1;
var END = 0;
var gameState = PLAY;
var man,man_collided,man_running;
var groud,invisibleGround,groundImg;
var ObstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4;
var score;
var gameoverImg;

function preload(){
    man_running = loadAnimation("man1.jpg","man2.jpg","man3.jpg");
    man_collided = loadAnimation("Man collieded.jpg");

    groundImg = loadImage("Groud.jpg");

    obstacle1 = loadImage("obstacle1.jpg");
    obstacle2 = loadImage("obstacle2.jpg");
    obstacle3 = loadImage("obstacle3.jpg");
    obstacle4 = loadImage("obstacle4.jpg");

    gameoverImg = loadImage("Gameover Img.png");
}

function setup() {
    createCanvas(400,400);

    man = createSprite(50,60,20,50);
    man.addAnimation("running", man_running);
    man.addAnimation("collided", man_collided);
    man.scale = 0.05;

    ground = createSprite(400,180,400,20);
    ground.addImage("ground",groundImg);
    ground.x = ground.width /1;

    gameOver = createSprite(300,100);
    gameOver.addImage(gameoverImg);

    invisibleGround = createSprite(400,190,400,10);
    invisibleGround.visible = false;

    
    

    ObstaclesGroup = createGroup();

    man.setCollider("rectangle",0,0,man.width,man.height);

    score = 0;
 
}

function draw() {
    background(180);

    text("Score: "+ score, 500,50);

    if(gameState === PLAY){

        gameOver.visible = false;

        ground.velocityX = -(4 + 3* score/100);

        score = score + Math.round(getFrameRate()/60);

        if (ground.x < 0){
            ground.x = ground.width/2;
          }
          if(keyDown("space")&& man.y >= 200) {
            man.velocityY = -5;
          }

          man.velocityY = man.velocityY + 0.8;

          spawnObstacles();

          if(ObstaclesGroup.isTouching(man)){
            man.velocityY = -12;

           

          }
    }
    else if (gameState === END) {

        gameOver.visible = true;

        man.changeAnimation("collided", man_collided);

        ground.velocityX = 0;
        man.velocityY = 0;

        ObstaclesGroup.setLifetimeEach(-1);
        ObstaclesGroup.setVelocityXEach(0);
        
        
    }

    man.collide(invisibleGround);

    if(mousePressedOver()) {
        reset();
      }

      drawSprites();
}
function reset(){
    gameState=PLAY;
  
    gameOver.visible=false;

    ObstaclesGroup.destroyEach();

    man.changeAnimation("running",man_running);
  
    score=0;
}
function spawnObstacles(){
    if (frameCount % 60 === 0){
      var obstacle = createSprite(600,360,10,40);
      obstacle.velocityX = -(6 + score/100);
      
       //generate random obstacles
       var rand = Math.round(random(1,4));
       switch(rand) {
         case 1: obstacle.addImage(obstacle1);
                 break;
         case 2: obstacle.addImage(obstacle2);
                 break;
         case 3: obstacle.addImage(obstacle3);
                 break;
         case 4: obstacle.addImage(obstacle4);
                 break;
        default: break;        
       }
       obstacle.scale = 0.5;
       obstacle.lifetime = 300;

       

     ObstaclesGroup.add(obstacle);
    }
}