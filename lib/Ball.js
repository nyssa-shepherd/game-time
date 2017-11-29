var GamePieces = require('./GamePieces.js');

class Ball extends GamePieces {
    constructor(x, y, dx, dy, color) {
        super(x, y, color);
        this.dx = dx;
        this.dy = dy;
        this.radius = 10;
        this.color = color;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false, this.color);
        ctx.strokeStyle = 'blue';
        ctx.stroke();
        return this;
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;

        if(this.x + this.radius > 600 || this.x - this.radius < 0){
            this.dx = -this.dx;
        } 
        if(this.y + this.radius > 600 || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
    }  
};

module.exports = Ball;