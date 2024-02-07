var points = []

var mult;
var colors;
var angleMult; 

var r1, r2, g1, g2, b1, b2;
var r, g, b;
var cnv;



function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    centerCanvas();
    background(0);
    createPoints();
}



/////////////////// Functions for setting and getting CSS variables //////////////////////
// Get the root element
var r = document.querySelector(':root');

// Create a function for getting a variable value
function myFunction_get() {
    // Get the styles (properties and values) for the root
    var rs = getComputedStyle(r);
    // Alert the value of the --blue variable
    alert("The value of X is: " + rs.getPropertyValue('--blue'));
}

// Create a function for setting a variable value
function myFunction_set(CSSvar, value) {
    // Set the value of variable --blue to another value (in this case "lightblue")
    r.style.setProperty(CSSvar, value);
}
///////////////////////////////////////////////////////////////////////////////////////////




function generateColors() {
    r1 = int(random(255));
    r2 = int(random(255));
    g1 = int(random(255));
    g2 = int(random(255));
    b1 = int(random(255));
    b2 = int(random(255));

    myFunction_set('--r1', r1);
    myFunction_set('--r2', r2);
    myFunction_set('--g1', g1);
    myFunction_set('--g2', g2);
    myFunction_set('--b1', b1);
    myFunction_set('--b2', b2);


    let c = color(max(r1, r2), max(g1, g2), max(b1, b2), 255);

    myFunction_set('--primary', c.toString('#rrggbb'));

    myFunction_set('--secondary', color(min(100, min(r1, r2)), min(100, min(g1, g2)), min(100, min(b1, b2)), 255).toString('#rrggbb'));

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
    generateColors();
    colors = [
        getComputedStyle(document.documentElement).getPropertyValue('--back'),
        getComputedStyle(document.documentElement).getPropertyValue('--text'),
        getComputedStyle(document.documentElement).getPropertyValue('--primary'),
        getComputedStyle(document.documentElement).getPropertyValue('--secondary'),
        getComputedStyle(document.documentElement).getPropertyValue('--accent')
    ];

    noCursor();
    noStroke();
    cnv = createCanvas(windowWidth, windowHeight);

    centerCanvas();
    
    //createCanvas(windowWidth, windowHeight);
    background(colors[0]);
    angleMode(DEGREES);
    createPoints();

}








function draw() {
    background(0, 3);
    drawPoints(); 
    removePoints();


}

function drawPoints() {
    for (var i = 0; i < points.length; i++) {
        distFromCenter = dist(points[i].x, points[i].y, width / 2, height / 2);
        maxDist = dist(0, 0, width / 2, height / 2);
        var alpha = map(distFromCenter, 0, maxDist, 255, 0);
        
        let r = map(points[i].x, 0, windowWidth, r1, r2);
        let g = map(points[i].y, 0, windowHeight, g2, g2);
        let b = map(points[i].x, 0, windowWidth, b1, b2);
        
        let c = color(r, g, b, alpha);
        //let c = color(colors[int(colors.length * noise(points[i].x * mult, points[i].y * mult))]);

        let weight = 2;
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
    // r1 = random(255);
    // r2 = random(255);
    // g1 = random(255);
    // g2 = random(255);
    // b1 = random(255);
    // b2 = random(255);


    r1 = int(getComputedStyle(document.documentElement).getPropertyValue('--r1'));

    r2 = int(getComputedStyle(document.documentElement).getPropertyValue('--r2'));
    g1 = int(getComputedStyle(document.documentElement).getPropertyValue('--g1'));
    g2 = int(getComputedStyle(document.documentElement).getPropertyValue('--g2'));
    b1 = int(getComputedStyle(document.documentElement).getPropertyValue('--b1'));
    b2 = int(getComputedStyle(document.documentElement).getPropertyValue('--b2'));




    noiseDetail(int(random(1, 10)), random(0.2, 0.5));
    mult = random(0.0008, 0.05);
    angleMult = int(random(1, 2));

    const density = int(random(24, 50));
    const space = width / density * pixelDensity();

    let margin = 10;
    let gap = 100;
    for (var x = -margin; x < width + margin; x += space) {
        for (var y = -margin; y < height + margin; y += space) {
            let randomX = random(-gap, gap);
            let randomY = random(-gap, gap);
            let posX = x + randomX;
            let posY = y + randomY;

            var p = createVector(posX, posY);

            points.push(p);
        }
    }

}



function removePoints() {
    // If outside area (width, height) remove
    for (var i = points.length - 1; i >= 0; i--) {
        if (points[i].x < 0 || points[i].x > width || points[i].y < 0 || points[i].y > height) {
            points[i].x = random(width);
            points[i].y = random(height);
        }
    }
}

