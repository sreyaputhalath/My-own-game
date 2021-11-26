
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var balls = [];

obstaclesGroup = new Group();

function preload(){
 orangepeel =loadImage("./Assets/Orangepeel.png");
 dryleaf = loadImage("./Assets/dryLeaf.png");
 carrot = loadImage("./Assets/Carrot.png");
 brokenBulb = loadImage("./Assets/bulb.png");
 plastic = loadImage("./Assets/plastic.png");
 can = loadImage("./Assets/can.png")

}

function setup() {
  createCanvas(800,800);

  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;
  cannon = new Cannon(180, 110, 100, 50, angle);
  
}

function draw(){
  background(51);
  Engine.update(engine);
  cannon.display();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
}

 spawnObstacles();

}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
    ball.animate();
    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) { 
      ball.remove(index);
      
    }
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}

function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(400,165,10,40);
    obstacle.velocityX = -2;
    
     //generate random obstacles
     var rand = Math.round(random(1,6));
     switch(rand) {
       case 1: obstacle.addImage(orangepeel);
               break;
       case 2: obstacle.addImage(dryleaf);
               break;
       case 3: obstacle.addImage(carrot);
               break;
       case 4: obstacle.addImage(brokenBulb);
               break;
       case 5: obstacle.addImage(plastic);
               break;
       case 6: obstacle.addImage(can);
               break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     obstacle.scale = 0.5;
     obstacle.lifetime = 300;
    
    //add each obstacle to the group
     obstaclesGroup.add(obstacle);
  }
 }

