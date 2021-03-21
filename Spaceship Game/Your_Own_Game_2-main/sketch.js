var database;
var back_img;
var gameState =0;
var playerCount = 0;
var allPlayers;
var score =0;
var player;
var form;
var game;
var player1,player2;
var players;
var rocks;
var rockGroup;
var rock1img, rock2img, rock3img;
var player1img;
var player2img;
var player1score =0;
var player2score =0;
var player1hp1,player1hp2,player1hp3;
var player2hp1,player2hp2,player2hp3;
var hp
var hpimg;
var laser, laserImg, laser1, laser2;
var p1hp = 3;
var p2hp = 3;


function preload(){
  back_img = loadImage("images/spacenew.jpg");
  player1img = loadImage("images/ship1.png");
  player2img = loadImage("images/ship2.png")
  rock1img = loadImage("images/rock1.png");
  rock2img = loadImage("images/rock2.png");
  rock3img = loadImage("images/rock3.png");
  hpimg = loadImage("images/hp.png");
  laserImg = loadImage("images/laser.png");
  rockGroup = new Group();
}

function setup() {

  createCanvas(1000, 600);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  
}

function draw() {

  background(back_img);

  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
    
  }
  if(gameState == 2){
    game.end();
  }

}

