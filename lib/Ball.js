class Ball extends GamePieces {
    constructor(x, y, radius, startAngle, endAngle, color) {
        super(x, y, color);
        this. radius = radius;
        this.startAngle = 0;
        this.endAngle = Math.PI *  2;
        this.antiClockwise = false;
    }

    draw(ctx){
        return super.draw(ctx);
    };
}

var newBall = new Ball (10, 10, 'green');