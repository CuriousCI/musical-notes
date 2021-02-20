class Particle {
    constructor(x, y) {
        this.target = createVector(x, y);
        this.position = createVector(
            random(width),
            random(height)
        );

        this.velocity = p5.Vector.random2D();
        this.acceleration = createVector();
        this.radius = random(3, 7);
    }

    steer() {
        const speed = 10;
        const movement = p5.Vector.sub(this.target, this.position);

        movement.setMag(
            movement.mag() < 100 ?
                map(movement.mag(), 0, 100, 0, speed) :
                speed
        );

        const steer = p5.Vector.sub(movement, this.velocity);
        steer.limit(1);
        this.acceleration.add(steer);
    }

    move() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.acceleration.mult(0);
    }

    display() {
        const strokeColor = lerpColor(
            color(163, 134, 131),
            color(221, 149, 68),
            map(this.position.y, 50, 300, 0, 1)
        );

        stroke(strokeColor);
        strokeWeight(this.radius);
        point(this.position.x, this.position.y);
    }

    clone = _ => new Particle(
        this.position.x,
        this.position.y
    );
}