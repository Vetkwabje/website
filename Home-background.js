var cnv;

//Main heap array
var points = [];

//Variables for colors and angles
var mult;
var colors;
var angleMult; 

var r1, r2, g1, g2, b1, b2;
var r, g, b;

var maxCount = 2000;


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

    myFunction_set('--secondary', color(min(r1, r2), min(g1, g2), min(b1, b2), 255).toString('#rrggbb'));

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
    frameRate(90);
    generateColors();


    // Get colors from CSS (=> Deprecated?) 
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
    console.log(points.length, frameRate());
}

function drawPoints() {
    for (var i = 0; i < points.length; i++) {
        distFromCenter = dist(points[i].x, points[i].y, width / 2, height / 2);
        maxDist = dist(0, 0, width / 2, height / 2);
        var alpha = map(distFromCenter, 0, maxDist, 255, 0);
        
        let r = map(points[i].x, 0, windowWidth, r1, r2);
        let g = map(points[i].y, 0, windowHeight, g2, g2);
        let b = map(points[i].x, 0, windowWidth, b1, b2);
        
        let stackCol = color(r, g, b, alpha);
        //let c = color(colors[int(colors.length * noise(points[i].x * mult, points[i].y * mult))]);

        let weight = 2;
        //let weight = map(distFromCenter, 0, maxDist, 4, 1.5);
        fill(stackCol);
        stroke(stackCol);
        
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


    r1 = int(getComputedStyle(document.documentElement).getPropertyValue('--r1'));

    r2 = int(getComputedStyle(document.documentElement).getPropertyValue('--r2'));
    g1 = int(getComputedStyle(document.documentElement).getPropertyValue('--g1'));
    g2 = int(getComputedStyle(document.documentElement).getPropertyValue('--g2'));
    b1 = int(getComputedStyle(document.documentElement).getPropertyValue('--b1'));
    b2 = int(getComputedStyle(document.documentElement).getPropertyValue('--b2'));




    noiseDetail(int(random(1, 5)), random(0.5));
    mult = random(0.02);
    angleMult = int(random(1, 2));

    const density = int(random(24, 60));
    const space = height / density * pixelDensity();

    let count = 0;

    let gap = 100;

    for (var x = 0; x < width; x += space) {
        for (var y = 0; y < height; y += space) {
            if (count > maxCount) {
                break;
            }
            let randomX = random(-gap, gap);
            let randomY = random(-gap, gap);
            let posX = x + randomX;
            let posY = y + randomY;

            var p = createVector(posX, posY);

            points.push(p);
            count++;
        }
    }

}



function removePoints() {
    // If points array is greater than 1000, remove a random point from points

    if (points.length > maxCount) {
        points.splice(int(random() * points.length), 1);
    }

    for (var i = points.length - 1; i >= 0; i--) {
        if (points[i].x < 0 || points[i].x > width || points[i].y < 0 || points[i].y > height) {
            // Remove a random point from points if length of points is greater than 1000, else set point to a new random position

            points[i].x = random(width);
            points[i].y = random(height);
        }
    }
}

