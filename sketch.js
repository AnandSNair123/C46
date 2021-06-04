var rocket_img,rocket_sound;
var space_img,space;
var earth_img,mars_img,jupiter_img,saturn_img,uranus_img,neptune_img;
var meteorite_img;
var meteorite,meteoriteGroup;
var rocket;
var earth,mars,jupiter,saturn,uranus,neptune;
var coins,coins_img,coinsGroup;
var gameState;
var PLAY=1;
var END=0;
var score = 0;


function preload(){
space_img = loadImage("space.jpg");
rocket_img = loadImage("rocket.png");
rocket_sound = loadSound("rocketsound.wav");
earth_img = loadImage("earth.png");
mars_img = loadImage("mars.png");
jupiter_img = loadImage("jupiter.png");
saturn_img = loadImage("saturn.png");
uranus_img = loadImage("uranus.png");
neptune_img = loadImage("neptune.png");
meteorite_img = loadImage("meteorite.png");
coins_img = loadImage("coins.png");
}

function setup() {
 var canvas = createCanvas(1200,500);

 space = createSprite(600,250);
 space.addImage("space",space_img);
 space.velocityX = -(4+score/10);

 mars = createSprite(1400,250,200,200);
        mars.addImage(mars_img);
        mars.visible = false;

 rocket = createSprite(100,250,50,50);
 rocket.addImage("rocket",rocket_img);
 rocket.scale = 0.5;
 rocket.setCollider("rectangle",20,0,300,100);
 //rocket_sound.loop();

 coinsGroup = new Group();
 meteoriteGroup = new Group();
 gameState = PLAY;
 
}

function draw() {
    background("black");
    if(gameState === PLAY){
        rocket.visible = true;
        var edges = createEdgeSprites();
        console.log(edges);
        rocket.bounceOff(edges);
        if(coinsGroup.isTouching(rocket)){
            score++
            coinsGroup.destroyEach();
            
        }
        console.log(score);
        if(space.x<500){
            space.x = space.width/2;
        }
        if(keyDown(DOWN_ARROW)){
            rocket.y = rocket.y+5;
        }
        if(keyDown(UP_ARROW)){
            rocket.y = rocket.y-5;
        }
        spawnMeteorites();
        spawnCoins();
        Mars();
        
        
if(meteoriteGroup.isTouching(rocket)){
    gameState = END;
    startCounter = World.frameCount;
}   
 
    }
   else if(gameState === END){
        rocket.destroy();
        coinsGroup.destroyEach();
        coinsGroup.setVelocityXEach(0);
        coinsGroup.setLifetimeEach(-1);
        meteoriteGroup.destroyEach();
        meteoriteGroup.setVelocityXEach(0);
        meteoriteGroup.setLifetimeEach(-1);
        space.velocityX = 0;
    }
      
 drawSprites();
 stroke("white");
 fill("white");
 textSize(30);
 textFont("ComicSansMS");
 text("Score : "+score,100,60);
}

function spawnMeteorites(){
    if(frameCount%180===0){
        var rand = Math.round(random(50,450));
        meteorite = createSprite(1200,rand,50,50);
        meteorite.addImage(meteorite_img);
        meteorite.velocityX = -(5+score/10);
        meteorite.lifetime = 240;
        meteorite.scale = 0.5
        meteorite.setCollider("rectangle",0,0,200,200)
        meteoriteGroup.add(meteorite);
    }
}

function spawnCoins(){
    if(frameCount%120===0){
        var rand = Math.round(random(50,450));
        coins = createSprite(1200,rand,50,50);
        coins.addImage(coins_img);
        coins.velocityX = -(5+score/10);
        coins.lifetime = 240;
        coins.scale = 0.1;
        coinsGroup.add(coins);

    }

}

function Mars(){
   // background(0);
    if(score === 1){
        
mars.visible = true;
mars.velocityX = -5;
        meteoriteGroup.destroyEach();
        meteoriteGroup.setVelocityXEach(0);
        meteoriteGroup.setLifetimeEach(0);

        coinsGroup.destroyEach();
        coinsGroup.setVelocityXEach(0);
        coinsGroup.setLifetimeEach(0);
        
        
        if(mars.isTouching(rocket)){
 
            gameState = END;
            mars.destroy();
            stroke("yellow");
            fill("yellow");
            textSize(30);
            textFont("ComicSansMS");
            text("You have reached Mars!",600,250);

            stroke("yellow");
            fill("yellow");
            textSize(30);
            textFont("ComicSansMS");
            text("To go to the next stage press 'SPACE'",600,300);
            if(keyDown("SPACE")){
                gameState = PLAY;
            }

        }
    }
}