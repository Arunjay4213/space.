var background1, background2;
var scrollSpeed = 10;
var y1= 0;
var y2;
var spaceship, spaceshipImg;
var asteroidGroup, asteroid, asteroid1, asteroid2, asteroid3;
var rand;
var score = 0;
var gameState = "play";
var end;
var reset
function preload() {
background1 = loadImage("Images/background1.png");
background2 = loadImage("Images/background1.png")
spaceshipImg = loadImage("Images/spaceship.png");
asteroid1Img = loadAnimation("ObstacleImages/obs1.png", "ObstacleImages/obs2.png", "ObstacleImages/obs3.png",
 "ObstacleImages/obs4.png","ObstacleImages/obs5.png", "ObstacleImages/obs6.png", "ObstacleImages/obs7.png", 
 "ObstacleImages/obs8.png", "ObstacleImages/obs9.png","ObstacleImages/obs10.png", "ObstacleImages/obs11.png",
  "ObstacleImages/obs12.png", "ObstacleImages/obs13.png", "ObstacleImages/obs14.png", "ObstacleImages/obs15.png",
  "ObstacleImages/obs16.png");

  asteroid2Img = loadAnimation("ObstacleImages/a30000.png", "ObstacleImages/a30001.png", "ObstacleImages/a30002.png",
 "ObstacleImages/a30003.png","ObstacleImages/a30004.png", "ObstacleImages/a30005.png", "ObstacleImages/a30006.png", 
 "ObstacleImages/a30007.png", "ObstacleImages/a30008.png","ObstacleImages/a30009.png", "ObstacleImages/a30010.png",
  "ObstacleImages/a30011.png", "ObstacleImages/a30012.png", "ObstacleImages/a30013.png", "ObstacleImages/a30014.png",
  "ObstacleImages/a30015.png");


  asteroid3Img = loadAnimation("ObstacleImages/a40000.png", "ObstacleImages/a40001.png", "ObstacleImages/a40002.png",
 "ObstacleImages/a40003.png","ObstacleImages/a40004.png", "ObstacleImages/a40005.png", "ObstacleImages/a40006.png", 
 "ObstacleImages/a40007.png", "ObstacleImages/a40008.png","ObstacleImages/a40009.png", "ObstacleImages/a40010.png",
  "ObstacleImages/a40011.png", "ObstacleImages/a40012.png", "ObstacleImages/a40013.png", "ObstacleImages/a40014.png",
  "ObstacleImages/a40015.png");


  asteroid4Img = loadAnimation("ObstacleImages/b40000.png", "ObstacleImages/b40001.png", "ObstacleImages/b40002.png",
 "ObstacleImages/b40003.png","ObstacleImages/b40004.png", "ObstacleImages/b40005.png", "ObstacleImages/b40006.png", 
 "ObstacleImages/b40007.png", "ObstacleImages/b40008.png","ObstacleImages/b40009.png", "ObstacleImages/b40010.png",
  "ObstacleImages/b40011.png", "ObstacleImages/b40012.png", "ObstacleImages/b40013.png", "ObstacleImages/b40014.png",
  "ObstacleImages/b40015.png");


  gameover = loadAnimation("Images/gameover.webp")
  
  resetImage = loadImage("Images/play.png")

  
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  
  y2 = height;

spaceship = createSprite(width/2, height/2, 300, 300);
spaceship.addImage(spaceshipImg);
spaceship.debug = true;

asteroidGroup = new Group();



}



function draw() {
  
background("black");


if(gameState === "play"){

image(background1, 0, y1, width, height);
image(background2, 0, y2, width, height);

y1-= scrollSpeed;
y2-= scrollSpeed;

if( y1 <= -height) {
  y1 = height
}
if( y2 <= -height) {
  y2 = height
}

if(keyDown("w")){
spaceship.y -=15;
}
if(keyDown("a")){
  spaceship.x -= 15;
  }
  if(keyDown("d")){
    spaceship.x +=15;
    }
  if(keyDown("s")){
    spaceship.y +=15;
    }

spawnAsteroids();

if(frameCount%70 == 0){
  score = score + 10;
}
textSize(30);
fill("white")
text("Score: " + score, width-250, 70)
if(spaceship.isTouching(asteroidGroup)){
  gameState = "end";

}
}

if(gameState === "end"){
end= createSprite(width/2,height/2,width,height);
end.addAnimation("end1",gameover)
end.scale=3;
spaceship.destroy()
reset = createSprite(width/2, height/2 + 100)
reset.addImage(resetImage)
asteroidGroup.destroyEach()
asteroidGroup.setLifetimeEach(-1)

}

if(mousePressedOver(reset)){
  end.destroy();
  gameState = "play";
  score= 0;
  reset.visible = false;

}

drawSprites();
};

function spawnAsteroids(){

if(frameCount%30 === 0 ){
  asteroid = createSprite(Math.round(random(0, width)), -50);
  asteroid.velocityY= (6 + 3*score/100);

  
  rand = Math.round(random(1,4))

  asteroid.lifetime = (width/asteroid.velocityX);

  switch(rand){

    case 1: asteroid.addAnimation("asteroid1", asteroid1Img);
    break; 
    case 2: asteroid.addAnimation("asteroid2", asteroid2Img);
    break;
    case 3: asteroid.addAnimation("asteroid3", asteroid3Img);
    break;
    case 4: asteroid.addAnimation("asteroid4", asteroid4Img);
    break;

    default: 
    break; 



  }


  asteroidGroup.add(asteroid);
}

}
