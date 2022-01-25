class Game {
    constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leadeboardTitle = createElement("h2");
    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");

    }    
   
    getState() {
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function(data) {
          gameState = data.val();
        });
      }
      update(state) {
        database.ref("/").update({
          gameState: state
        });
      }
    
    start() {
        player = new Player();
        playerCount = player.getCount();
    
         form = new Form();
         form.display();

         boy1 = createSprite(width/2 -250, height-180);
         boy1.addAnimation("boy1walking",boy1img);
         boy1.scale = 0.8

         
         boy2 = createSprite(width/2 -250, height-95);
         boy2.addAnimation("boy2walking",boy2img);
         boy2.scale = 1

         boys = [boy1,boy2];

        //boys = boy1 + boy2
        


        
         /*water = new Group();
         powerCoins = new Group();

          //Adding fuel sprite in the game
          this.addSprites(water, 4, waterImage, 0.02);

           // Adding coin sprite in the game
            this.addSprites(powerCoins, 18, powerCoinImage, 0.09);*/
            


        
    }

    handleElements() {
        form.hide();
        //form.titleImg.position(40, 50);
        //form.titleImg.class("gameTitleAfterEffect");

        this.resetTitle.html("Reset Game");
        this.resetTitle.class("resetText");
        this.resetTitle.position(width / 2 + 300, 60);
    
        this.resetButton.class("resetButton");
        this.resetButton.position(width / 2 + 330, 120);

        this.leadeboardTitle.html("Leaderboard");
        this.leadeboardTitle.class("resetText");
        this.leadeboardTitle.position(width / 3 - 200, 40);

        this.leader1.class("leadersText");
        this.leader1.position(width / 3 - 190, 80);

        this.leader2.class("leadersText");
        this.leader2.position(width / 3 - 190, 130);
    }

    play() {

        this.handleElements();
        Player.getPlayersInfo(); 

        if (allPlayers !== undefined) {
          image(track, -width*5, 0, width, height); 
           //index of the array
        var index = 0;

      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //use data form the database to display the boys in x and y direction
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        boys[index - 1].position.x = x;
        boys[index - 1].position.y = y;

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);

          //this.handleFuel(index);
          //this.handlePowerCoins(index);

          // Changing camera position in y direction
          camera.position.x = boys[index - 1].position.x;
        }
      }
          
       // handling keyboard events
      this.handlePlayerControls();

            drawSprites();
          
          }
    
      }

      handleResetButton() {
        this.resetButton.mousePressed(() => {
          database.ref("/").set({
            playerCount: 0,
            gameState: 0,
            players: {},
           // carsAtEnd: 0
          });
          window.location.reload();
        });
      }

      showLeaderboard() {
        var leader1, leader2;
        var players = Object.values(allboys);
        if (
          (players[0].rank === 0 && players[1].rank === 0) ||
          players[0].rank === 1
        ) {
          // &emsp;    This tag is used for displaying four spaces.
          leader1 =
            players[0].rank +
            "&emsp;" +
            players[0].name +
            "&emsp;" +
            players[0].score;
    
          leader2 =
            players[1].rank +
            "&emsp;" +
            players[1].name +
            "&emsp;" +
            players[1].score;
        }
        this.leader1.html(leader1);
        this.leader2.html(leader2);
      }

      handlePlayerControls() {
        if (keyIsDown(RIGHT_ARROW)) {
          this.playerMoving = true;
          player.positionX += 10;
          player.update();
        }

        if (keyIsDown(UP_ARROW)) {
          this.playerMoving = true;
          player.positionY += 10;
          player.update();
        }
      }
    

    }
