var dog, happyDog, database, foodS, foodStock
var dogImg, dogHappyImg;
var food, foodImg;


function preload()
{
  dogImg = loadImage("Dog.png");
  dogHappyImg = loadImage("happydog.png");
  foodImg = loadImage("milk.png");
  

}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  foodStock.set(50);
  
  food1 = createSprite(210,280,10,10);
  food1.addImage(foodImg);
  food1.scale = 0.025;
  food1.visible = false;



}


function draw() {  
  background("Green")

  if(foodS !== 0){
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappyImg);
    food1.visible = true;

   
  }

  if(keyWentUp(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg);
    food1.visible = false;
  }
}

if(foodS == 0){
  
  dog.addImage(dogImg);

}
   drawSprites();
  textSize(17);
  fill("red");
  text("Press UP ARROW KEY to feed Tom Milk!!",50,50);
  fill(270);
  text("Food Remaining:"+foodS,170,440);
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }else{
    x=x-1
  }

  database.ref('/').update({
    food:x
  })
}