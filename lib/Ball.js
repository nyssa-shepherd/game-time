var GamePieces = require('./GamePieces.js');

class Ball extends GamePieces {
    constructor(x, y, radius, startAngle, endAngle, color) {
        super(x, y, color);
        this. radius = 10;
        this.startAngle = 0;
        this.endAngle = Math.PI *  2;
        this.color = color;
        this.antiClockwise = false;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.antiClockwise, this.color);
        ctx.strokeStyle = 'blue';
        ctx.stroke();
        return this;
    }
};

module.exports = Ball;