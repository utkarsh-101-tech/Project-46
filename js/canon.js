class Canon {
    constructor(x, y, w, h, angle) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.angle = angle;
        this.baseImg = loadImage("assets/cannon_base.png");
        this.canonImg = loadImage("assets/CANON.png");
    }
    display() {
        if (keyIsDown(RIGHT_ARROW) && this.angle < 0.35) {
            this.angle += 0.02;
        }
        if (keyIsDown(LEFT_ARROW) && this.angle > -1.45) {
            this.angle -= 0.02;
        }
        fill("#676e6a");
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        rect(-10, -20, this.width, this.height);
        // rotate(this.angle + 1.50);
        // imageMode(CENTER);
        // image(this.canonImg, 5, 30, this.width + 200, this.height + 200)
        pop();
        arc(this.x - 35, this.y + 90, 140, 200, PI, TWO_PI);
        push();
        imageMode(CENTER);
        image(this.baseImg, this.x - 20, this.y, 250, 240);
        pop();
    }
}