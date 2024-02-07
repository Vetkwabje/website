var points = []
var mult;
var colors;
var angleMult; 

var r1, r2, g1, g2, b1, b2;
var cnv;



function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    centerCanvas();
    background(0);
    createPoints();
}

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
    cnv.style('display', 'block');
}


document.ontouchmove = function(event){
    event.preventDefault();
    points.push(createVector(mouseX, mouseY));

}

function setup() {
    colors = [
        getComputedStyle(document.documentElement).getPropertyValue('--back'),
        getComputedStyle(document.documentElement).getPropertyValue('--text'),
        getComputedStyle(document.documentElement).getPropertyValue('--primary'),
        getComputedStyle(document.documentElement).getPropertyValue('--secondary'),
        getComputedStyle(document.documentElement).getPropertyValue('--accent')
    ];
    noStroke();
    cnv = createCanvas(windowWidth, windowHeight);

    centerCanvas();
    
    //createCanvas(windowWidth, windowHeight);
    background(colors[0]);
    angleMode(DEGREES);
    createPoints();

}








function draw() {
        // background(0, 3);
    drawPoints(); 
    removePoints();
    
}

function drawPoints() {
    for (var i = 0; i < points.length; i++) {
        distFromCenter = dist(points[i].x, points[i].y, width / 2, height / 2);
        maxDist = dist(0, 0, width / 2, height / 2);
        var alpha = map(distFromCenter, 0, maxDist, 255, 0);
        
        let r = map(points[i].x, 0, width, r1, r2);
        let g = map(points[i].y, 0, height, r2, g2);
        let b = map(points[i].x, 0, width, b1, b2);
        
        let c = color(r, g, b, alpha);
        //let c = color(colors[int(colors.length * noise(points[i].x * mult, points[i].y * mult))]);

        let weight = 1.5;
        //let weight = map(distFromCenter, 0, maxDist, 4, 1.5);
        fill(c);
        stroke(c);
        
        strokeWeight(weight);
        


        var angle = map(noise(points[i].x * mult, points[i].y * mult), 0, 1, 0, angleMult * 360);

        points[i].add(createVector(cos(angle), sin(angle)));
        point(points[i].x, points[i].y);
    }
}


function mouseMoved() {
        points.push(createVector(mouseX, mouseY));
}


function createPoints() {

    points = [];
    r1 = random(255);
    r2 = random(255);
    g1 = random(255);
    g2 = random(255);
    b1 = random(255);
    b2 = random(255);
    noiseDetail(int(random(1, 6)), random(0.1, 0.4));
    mult = random(0.0008, 0.02);
    angleMult = int(random(1, 4));

    const density = int(random(16, 40));
    const space = width / density * pixelDensity();

    let margin = 10;
    let gap = 100;
    for (var x = -margin; x < width + margin; x += space) {
        for (var y = -margin; y < height + margin; y += space) {
            let randomX = random(-gap, gap);
            let randomY = random(-gap, gap);

            var p = createVector(x + randomX, y + randomY);
            points.push(p);
        }
    }
}

function removePoints() {
    // If points array is empty, stop drawing
    if (points.length == 0) {
        noLoop();
    }

    // If outside area (width, height) remove
    for (var i = points.length - 1; i >= 0; i--) {
        if (points[i].x < 0 || points[i].x > width || points[i].y < 0 || points[i].y > height) {
            points.splice(i, 1);
        }
    }
}

