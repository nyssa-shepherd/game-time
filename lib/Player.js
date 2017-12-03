class Player {
  constructor(livesRemaining = 3, score = 0) {
    this.livesRemaining = livesRemaining;
    this.wins = 0;
    this.score = score;
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
    ctx.fillText('Score: ' + this.score, 10, 30);
  }
}


module.exports = Player;