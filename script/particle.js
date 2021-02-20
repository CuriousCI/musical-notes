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
        this.maxSpeed = 10;
        this.maxForce = 1;
    }

    applyForce =
        force => this.acceleration.add(force);


    steer(target) {
        let desiredPosition = p5.Vector.sub(target, this.position);
        let desiredMagnitude = desiredPosition.mag();

        let speed = this.maxSpeed;

        if (desiredMagnitude < 100)
            speed = map(desiredMagnitude, 0, 100, 0, this.maxSpeed);
        desiredPosition.setMag(speed);

        let steer = p5.Vector.sub(desiredPosition, this.velocity);
        steer.limit(this.maxForce);
        return steer;
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.acceleration.mult(0);
    }

    behave() {
        let steer = this.steer(this.target);
        steer.mult(1);
        this.applyForce(steer);
    }

    show() {
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