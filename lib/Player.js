class Player {
  constructor(score = 0, livesRemaining = 3) {
    this.livesRemaining = livesRemaining;
    this.wins = 0;
    this.score = score;
  }

  playerDie() {
    if (this.livesRemaining === 0) {
    // what goes here?
    } else if (this.livesRemaining <= 3) {
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