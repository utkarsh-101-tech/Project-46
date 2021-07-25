class Boat {
    constructor(x, y, w, h, pos) {
        var options = {
            isStatic: true
        }
        this.image = loadImage("assets/boat.png");

        this.body = Bodies.rectangle(x, y, w, h, options);
        this.width = w;
        this.height = h;
        this.pos = pos;
        this.life = 100;
        World.add(world, this.body);
    }

    display() {
        var pos = this.body.position;
        var angle = this.body.angle;
        push()
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, this.pos, this.width, this.height);
        pop();
    }

    move() {
        if (this.body.position.x > 300) {
            Matter.Body.translate(this.body, { x: -1, y: 0 });
        } else {
            gameOver();
        }
    }
}