const gameOverScreen = document.getElementById('gameover-screen');

class Player {
  constructor(score = 0, livesRemaining = 3) {
    this.livesRemaining = livesRemaining;
    this.wins = 0;
    this.score = score;
  }

  playerDie() {
    if (this.livesRemaining <= 1) {
      gameOverScreen.style.display = 'block'; 
    } else {
      this.livesRemaining--;
    } 
  }

  drawIndicatorsText(ctx) {
    ctx.fillStyle = 'Black';
    ctx.font = "20px Arial";
    ctx.fillText("Lives: " + this.livesRemaining, 665, 580);
    ctx.fillText('Score: ' + this.score, 10, 580); 
  }
}


module.exports = Player;