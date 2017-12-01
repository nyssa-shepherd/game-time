class Player {
  constructor(livesRemaining = 3) {
    this.livesRemaining = livesRemaining;
    this.wins = 0;
  }

  playerDie(ball) {
      if (this.livesRemaining >= 3){
        return this.livesRemaining--;
      }

      if (this.livesRemaining === 0) {

      }
  }

  drawIndicatorsText(ctx) {
    ctx.font = "20px Arial";
    ctx.fillText("Lives: " + this.livesRemaining, 520,30);
    ctx.fillText("Score:", 10, 30);
  }
}


module.exports = Player;