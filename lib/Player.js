
class Player {
  constructor(score = 0, livesRemaining = 3) {
    this.livesRemaining = livesRemaining;
    this.wins = 0;
    this.score = score;
    this.isDead = false;
  }

  playerDie() {
    let self = this;
    if (self.livesRemaining <= 1) {
      self.isDead = true;
    } else {
      self.livesRemaining--;
    } 
    return self;
  }

  drawIndicatorsText(ctx) {
    ctx.fillStyle = 'Black';
    ctx.font = "20px Arial";
    ctx.fillText("Lives: " + this.livesRemaining, 665, 580);
    ctx.fillText('Score: ' + this.score, 10, 580); 
  }
}


module.exports = Player;