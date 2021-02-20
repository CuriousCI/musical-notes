function toPoints(text, textSize) {
    const bounds = font.textBounds(text, 0, 0, textSize);
    const x = width / 2 - bounds.w / 2,
        y = height / 2 - bounds.h / 2;

    return font.textToPoints(text, x, y + 100, textSize, {
        sampleFactor: 0.1
    });
}

function randomText() {
    const notes = "abefhpqrtwxyAEHSTZ";
    const textWidth = random(4, 5);
    let text = '';
    for (let _ = 0; _ < textWidth; _++)
        text += `${notes[floor(random(notes.length))]} `;

    return text;
}

function updateText() {
    const points = toPoints(randomText(), 150);

    if (points.length < particles.length) {
        particles.splice(
            points.length - 1,
            particles.length - points.length
        );
    } else if (points.length > particles.length) {
        for (
            let index = particles.length;
            index < points.length;
            index++
        ) {
            const particle = particles[index - particles.length].clone();
            particles.push(particle);
        }
    }

    points.forEach((point, index) => {
        particles[index].target = createVector(point.x, point.y);

        const force = p5.Vector.random2D();
        force.mult(random(20));
        particles[index].acceleration.add(force);
    });
}