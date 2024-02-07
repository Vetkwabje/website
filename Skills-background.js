var nr_prtcls;
var particles = [];
var colors = [];
const angleSharpness = 3;
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    nr_prtcls = int(random(60, 60));
    createParticles(nr_prtcls);
    colors = [
        getComputedStyle(document.documentElement).getPropertyValue('--back'),
        getComputedStyle(document.documentElement).getPropertyValue('--text'),
        getComputedStyle(document.documentElement).getPropertyValue('--primary'),
        getComputedStyle(document.documentElement).getPropertyValue('--secondary'),
        getComputedStyle(document.documentElement).getPropertyValue('--accent')
    ];
    console.log(colors[1]);
}

function createParticles(nr_prtcls) {
    //Choose mainCol randomly from colors;
    mainCol = color(random(100, 255), random(100, 255), random(100, 255));  
    mainCol.setAlpha(int(random(200, 255)));
    for (var i = 0; i < nr_prtcls; i++) {
        let x = width / 2;
        let y = height / 2;
        let angle = int(2 * random(angleSharpness, 16)) * PI / angleSharpness;
        let speed = random(10, 15);
        particles.push(new Particle(x, y, angle, speed, mainCol));
    }

}

function draw() {
    background(0);
    
    drawParticles();


    console.log(particles.length);
}




function drawParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].show();
        
        if (particles[i].x > windowWidth || particles[i].x < 0 || particles[i].y > windowHeight || particles[i].y < 0) {
            particles.splice(i, 1);
        }
    }
    if (particles.length == 0) {
        createParticles(int(random(40, 100)));
    }
}


class Particle {
    

    constructor(x, y, angle, speed, colr) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.size = 10;
        this.colr = colr;
        this.angle = angle;
        this.tailLength = 5;
        this.old = [];
        this.giveTail();
        this.chance = 0.6;
    }
    giveTail() {
        for (let i = 0; i < this.tailLength; i++) {
            this.old.push(createVector(this.x, this.y));
        }

    }



    update() {
        
        if (random(1) >= min(0.9, this.chance)) {
            // Change angle
            if (random(1) >= 0.5) {
                this.angle += PI / angleSharpness;
            } else {
                this.angle -= PI / angleSharpness;
            }
        }
        this.old.push(createVector(this.x, this.y));

        while (this.old.length > this.tailLength) {
            this.old.shift();
        }
        this.x += cos(this.angle) * this.speed;
        this.y += sin(this.angle) * this.speed;
        this.chance += 0.01;
        this.colr.setAlpha(map(dist(this.x, this.y, width / 2, height / 2), 0, width / 2, 255, 10));
    }

    show() {
        fill(this.colr);
        ellipse(this.x, this.y, this.size);
        for (let i = 0; i < this.old.length; i++) {
            let col = this.colr;
            // col.setAlpha(map(i, 0, this.old.length, 0, 255));
            fill(col);
            ellipse(this.old[i].x, this.old[i].y, this.size);
        }
    }

}

function keyPressed() {
    createParticles(int(random(40, 100)));
}