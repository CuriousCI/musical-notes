function Particle(x, y) {
    this.position = createVector(random(width), random(height));
    this.target = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.acceleration = createVector();
    this.radius = random(3, 7);
    this.maxSpeed = 10;
    this.maxForce = 1;
}

Particle.prototype.behaviors = function () {
    let arrive = this.arrive(this.target);
    // let mouse = createVector(mouseX, mouseY);
    // let flee = this.flee(mouse);

    arrive.mult(1);
    // flee.mult(5);

    this.applyForce(arrive);
    // this.applyForce(flee);
}

Particle.prototype.applyForce = function (force) {
    this.acceleration.add(force);
}

Particle.prototype.update = function () {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
}

Particle.prototype.show = function () {
    const strokeColor = lerpColor(
        color(163, 134, 131),
        color(221, 149, 68),
        map(this.position.y, 50, 300, 0, 1)
    );
    stroke(strokeColor);
    strokeWeight(this.radius);
    point(this.position.x, this.position.y);
}


Particle.prototype.arrive = function (target) {
    let desiredPosition = p5.Vector.sub(target, this.position);
    let desiredMagnitude = desiredPosition.mag();
    let speed = this.maxSpeed;
    if (desiredMagnitude < 100) {
        speed = map(desiredMagnitude, 0, 100, 0, this.maxSpeed);
    }
    desiredPosition.setMag(speed);
    let steer = p5.Vector.sub(desiredPosition, this.velocity);
    steer.limit(this.maxForce);
    return steer;
}

Particle.prototype.flee = function (target) {
    let desiredPosition = p5.Vector.sub(target, this.position);
    let desiredMagnitude = desiredPosition.mag();
    if (desiredMagnitude < 50) {
        desiredPosition.setMag(this.maxSpeed);
        desiredPosition.mult(-1);
        let steer = p5.Vector.sub(desiredPosition, this.velocity);
        steer.limit(this.maxForce);
        return steer;
    } else {
        return createVector(0, 0);
    }
}

Particle.prototype.clone = function () {
    let particle = new Particle(this.position.x, this.position.y);

    particle.position.x = this.position.x;
    particle.position.y = this.position.y;

    particle.velocity.x = this.velocity.x;
    particle.velocity.y = this.velocity.y;

    particle.acceleration.x = this.acceleration.x;
    particle.acceleration.y = this.acceleration.y;

    return particle;
}

