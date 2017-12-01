class Player {
  constructor(livesRemaining = 3) {
    this.livesRemaining = livesRemaining;
    this.wins = 0;
  }

  playerDie(ball) {
      if (this.livesRemaining >= 3){
        return this.livesRemaining--;
      }
  }

  drawLivesLeft(ctx) {
    ctx.font = "20px Arial";
    ctx.fillText("Lives: " + this.livesRemaining, 10,30);
  }
}


module.exports = Player;