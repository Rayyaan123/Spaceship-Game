class Game{
    constructor(){

    }

    getState(){
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value",function (data) {
            gameState = data.val();
        })
    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }

    async start() {
        if(gameState === 0){
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if(playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form();
            form.display();
        }

        player1 = createSprite(200,500);
        player1.addImage("ship1",player1img);
        player1.scale = 0.15;
    
        player2 = createSprite(800,500);
        player2.addImage("ship2", player2img);
        player2.scale = 0.3;
        players=[player1,player2];

        



        if(p1hp >= 1){
            player1hp1 = createSprite(30,30);
            player1hp1.addImage("hp",hpimg);
            player1hp1.scale = 0.2;
        }

        if(p1hp >= 2){
            player1hp2 = createSprite(95,30);
            player1hp2.addImage("hp",hpimg);
            player1hp2.scale = 0.2;
        }

        if(p1hp >= 3){
            player1hp3 = createSprite(160,30);
            player1hp3.addImage("hp",hpimg);
            player1hp3.scale = 0.2;
        }

    }

    play(){
        
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x =100;
        var y=200;
        var index =0;
        drawSprites();

        for(var plr in allPlayers){
        
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
            
            players[index - 1].x = x;
            players[index - 1].y = y;
   
        }


        if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
            player.distance -= 10;
            player.update();
        }
        if (keyIsDown(LEFT_ARROW) && player.index !== null) {
            player.distance += 10;
            player.update();
        }
        if(keyCode === 65){
            laser1 = createSprite(player1.x,player1.y);
            laser1.addImage("laser",laserImg);
            laser1.scale = 0.05;
            laser1.velocityY = -20;
            
        }
        if(keyDown("S")){
            laser2 = createSprite(player2.x,player2.y);
            laser2.addImage("laser",laserImg);
            laser2.scale = 0.05;
            laser2.velocityY = -20;
             
        }
        



        if(frameCount % 20 === 0) {
            rocks = createSprite(random(100,1000),0,100,100);
            rocks.velocityY = 6;
           rocks.scale = 0.3;
            var rand = Math.round(random(1,3));
            switch(rand){
                case 1: rocks.addImage("rock1",rock1img);
                break;
                case 2: rocks.addImage("rock2",rock2img);
                break;
                case 3: rocks.addImage("rock3",rock3img);
                break;
            }
            rockGroup.add(rocks);
        }

        if (player.index !== null) {
            for (var i = 0; i < rockGroup.length; i++) {
                if (rockGroup.get(i).isTouching(player1)) {
                    p1hp = p1hp - 1;
                    player.update();
                    rockGroup.get(i).destroy();
                }
            }
            for (var i = 0; i < rockGroup.length; i++) {
                if (rockGroup.get(i).isTouching(player2)) {
                    player.update();
                }
            }
        }

        
        

        if(p1hp == 2){
            player1hp3.destroy();
        }

        if(p1hp == 1){
            player1hp2.destroy();
        }

        if(p1hp == 0){
            player1hp1.destroy();
        }

        


    }

    end(){
        console.log("Game Has Ended");
    }

}