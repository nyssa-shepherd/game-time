class GamePieces {
    constructor(x, y, height, color) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.color = color;
    }

    draw(ctx) {
        console.log('hi');
        ctx.fillStyle = 'blue';
        return this;
    }
}


module.exports = GamePieces;