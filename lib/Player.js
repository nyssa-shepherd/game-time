var Ball = require('./Ball.js');


class Player {
  constructor(score = 0, livesRemaining = 3, gameStatus = '', trumpName = '', trumpTwitter = '', date = '', retweets = '') {
    this.livesRemaining = livesRemaining;
    this.wins = 0;
    this.score = score;
    this.gameStatus = gameStatus;
    this.trumpName = trumpName;
    this.trumpTwitter = trumpTwitter;
    this.date = date;
    this.retweets = retweets;
  }

  playerDie() {
      if (this.livesRemaining === 0) {
        this.trumpName = 'Donald J. Trump';
        this.trumpTwitter = '@realDonaldTrump';
        this.gameStatus = 'Game Over, Loser';
        this.date = '12/3/17, 6:36 AM';
        this.retweets = '8 Retweets 24 Likes'
      } else if (this.livesRemaining <= 3) {
        this.livesRemaining--;
      }
  }

  drawIndicatorsText(ctx, image) {
    ctx.fillStyle = 'Black';
    ctx.font = "20px Arial";
    ctx.fillText("Lives: " + this.livesRemaining, 665,30);
    ctx.fillText('Score: ' + this.score, 10, 30);
  
    ctx.fillText(this.trumpName, 130, 280);
    ctx.font = "15px Arial"
    ctx.fillText(this.trumpTwitter, 130, 300);
    ctx.font = "35px Arial";
    ctx.fillText(this.gameStatus, 130, 355);
    ctx.font = "15px Arial"
    ctx.fillText(this.date, 130, 400);
    ctx.fillText(this.retweets, 130, 435);
  }
}


module.exports = Player;