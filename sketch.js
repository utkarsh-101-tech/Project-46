const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
var tower, ground, canon, boat, canonBall;
var canonAngle = -90;
var balls = [];
var boats = [];
var boatAnim = [];

function preload() {
    bg = loadImage("assets/background.gif");
    boatSprite = loadJSON("assets/boat/boat.json");
    boatImg = loadImage("assets/boat.png");
}

function setup() {
    createCanvas(1200, 600);
    engine = Engine.create();
    world = engine.world;
    tower = new Tower(150, 350, 160, 310);
    // ground = new Ground(600, height - 5, 1200, 1);
    canon = new Canon(180, 110, 120, 70, -PI / 4);

}

function draw() {
    background(bg);
    Engine.update(engine);
    tower.display();
    destroyBoth();

    showBoat();
    for (i = 0; i < boats.length; i++) {
        boats[i].display();
        boats[i].move();
    }

    for (var i = 0; i < balls.length; i++) {
        showBall(balls[i], i);
    }

    canon.display();
}





function keyPressed() {
    if (keyCode === DOWN_ARROW) {
        canonBall = new CanonBall(canon.x, canon.y);
        balls.push(canonBall);
    }
}

function showBoat() {
    if (boats.length < 4) {
        if (boats.length === 0) {
            boat = new Boat(1300, height - 100, 200, 200, -100);
            boats.push(boat);
        }
        if (boats[boats.length - 1].body.position.x < width - random(200, 500, 600, 400)) {
            boat = new Boat(1300, height - 100, 200, 200, -100);
            boats.push(boat);
        }
    }
}

function keyReleased() {
    if (keyCode === DOWN_ARROW) {
        balls[balls.length - 1].shoot();
    }
}

function showBall(ball, index) {
    ball.display();
    if (ball.body.position.x > width || ball.body.position.y >= height - 50) {
        Matter.World.remove(world, ball.body);
        balls.splice(index, 1);
    }
}

function destroyBoth() {
    for (i = 0; i < balls.length; i++) {
        for (a = 0; a < boats.length; a++) {
            var collision = Matter.SAT.collides(balls[i].body, boats[a].body);
            if (collision.collided) {
                console.log("win 1")
                Matter.World.remove(world, boats[a]);

                boats.splice(a, 1);

                Matter.World.remove(world, balls[i]);
                // balls[i].destroy();
                balls.splice(i, 1);
            }
        }
    }
}

function gameOver() {
    swal({
            title: "GAME OVER",
            text: "YOU LOSE",
            imageUrl: "https://cdn3.vectorstock.com/i/1000x1000/58/02/cartoon-pirate-captain-holding-a-treasure-map-vector-23875802.jpg",
            imageSize: "150*150",
            confirmButtonText: "play again",

        },
        function(isConfirm) {
            if (isConfirm) {
                location.reload();
            }
        }
    )
}