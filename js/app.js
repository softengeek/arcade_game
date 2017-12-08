// Enemies our player must avoid - constructor function
var Enemy = function(yPosition, xPosition, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.y = yPosition;
    this.x = xPosition;
    this.speed = speed;
    this.initialX = this.x;
    this.initialY = this.y;
};

//Update the enemies to allow them to move across the screen and collison of enemies nad player
Enemy.prototype.update = function(dt) {
    this.x = this.x + (this.speed * dt);

    if (this.x > 500) { //loops each enemy so that they reappear on the screen
      this.x = this.initialX;
    }

    //position of Enemy to the nearest 100 since the player moves along x in 100's
    //Collision of enemy and player
    const xPositionToHundreds = Math.floor(this.x/100)*100;
    if (player.y === this.y && xPositionToHundreds === player.x) {
      player.newX = player.initialX;
      player.newY = player.initialY;
      player.update(dt);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Constructor function for player
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.initialX = this.x;
    this.initialY = this.y;
}

//update player's movements on key press
Player.prototype.update = function(dt) {
  if (this.newX >= 0 && this.newX <= 400){
    this.x = this.newX;
  }

  if (this.newY < 40 ) {
    this.y = this.initialY;
    this.x = this.initialX;
    this.newX = this.initialX;
    this.newY = this.initialY;
    winner();
  }

  if (this.newY >= 40 && this.newY <= 400) {
    this.y = this.newY;
  }
}

//Render the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Handling even keypress and updating the position
Player.prototype.handleInput = function(key) {
  switch(key) {
    case 'up': this.newY = this.y - 90;
               break;

    case 'down': this.newY = this.y + 90;
               break;

    case 'left': this.newX = this.x - 100;
               break;

    case 'right': this.newX = this.x + 100;
               break;
  }
}

//Initializing player and enemies
const player = new Player();
const allEnemies = [
  new Enemy(40, 0, 200),
  new Enemy(130, 0, 350),
  new Enemy(220, -200, 1000)
];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Once the player wins, this screen will be displayed
function winner() {
  swal(
    'You Won!',
    `Play Again?`,
    'success')
 .then((gameRestart) => {
     if (gameRestart) {
       location.reload();
     }
   });
}
