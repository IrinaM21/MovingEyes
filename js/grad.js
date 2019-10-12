/* grad.js */ 

/**
 * The code below creates two eyes with pupils that follow the mouse while it is 
 * within the canvas.
 */

// nothing happens until the page has loaded
$(document).ready(function() {

    // get the canvas element by id and assign it to variable canvas
    var canvas = document.getElementById("c1");

    // get the context and assign it to variable ctx
    var ctx = canvas.getContext('2d');
    

    // the Eye constructor creates new Javascript objects representing eyes.
    // an "eye" has a fixed outline and a moving pupil
    
    // the eyes are created in this way so that more eyes in other colors and sizes
    // can easily be created, even though this is not the purpose of the website
    // as it currently exists

    // eyeX and eyeY are the coordinates of the centers of the eyes
    // eyeRadius is the radius of each eye
    // pupRadius is the radius of each pupil
    // pupColor is the color of each pupil
     function Eye(eyeX, eyeY, eyeRadius, pupRadius, pupColor){
        this.eyeX = eyeX;
        this.eyeY = eyeY;
        this.eyeRadius = eyeRadius;
        this.pupColor = pupColor;
        this.pupRadius = pupRadius;

        // the coordinates of the pupil are set to the coordinates of the eye
        // so that the pupils are in the center of the eye before the mouse has
        // entered the canvas
        this.pupX = eyeX;
        this.pupY = eyeY;

    }

    // the function draw draws each eye
    Eye.prototype.draw = function(){
        ctx.beginPath();
        // the white part of the eye is drawn
        ctx.arc(this.eyeX, this.eyeY, this.eyeRadius, 0, Math.PI*2, false);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.beginPath();
        // the pupil is drawn
        ctx.arc(this.pupX, this.pupY, this.pupRadius, 0, Math.PI*2, false);
        ctx.fillStyle = this.pupColor;
        ctx.fill();   
        
    }

    // this function updates the location of the pupil to "look" at the mouse
    // and then redraws the entire mouse
    // it expects the canvas to be cleaned each time the mouse is moved
    
    // the formulas use trigonometry to put the pupils on the line between
    // the center of the eye and the mouse
    // this creates the "looking" illusion
     Eye.prototype.updateAndDrawEye = function(evt){

        // offsetX and offsetY are used so because, unlike clientX and clientY,
        // they provide the coordinates of the mouse relative to the target of the event
        // as opposed to the entire client area
        // this is necessary when the canvas is offset inside the page (ie by margins)
        var xDis2 = evt.offsetX - this.eyeX;
        var yDis2 =  evt.offsetY - this.eyeY;
        var bigHypo = Math.sqrt(parseInt(Math.pow(xDis2, 2)) + parseInt(Math.pow(yDis2, 2)));

        var ratio = 30/bigHypo;

        this.pupX = ratio * xDis2 + this.eyeX;
        this.pupY = ratio * yDis2 + this.eyeY;
        this.draw();
    }
    
    // the radius of the pupil is set to 20
    var pupRad = 20;
    // the radius of the eye is set to 50
    var cornRad = 50;
    // the y coordinate of the eyes is set to 200
    var cornY = 200;
    // the x coordinate of the left eye is set to 200
    var c1X = 200;
    // the x coordinate of the right eye is set to 400
    var c2X = 400;

    // create both eyes with black pupils
    var leftEye = new Eye(c1X, cornY, cornRad, pupRad,'black');
    leftEye.draw();
    var rightEye = new Eye(c2X, cornY, cornRad, pupRad, 'black');
    rightEye.draw();

    // event listener cleans the canvas each time the mouse is moved
    // and calls updateAndDrawEye() for both eyes
    canvas.addEventListener("mousemove", function(evt){
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        //first pupil

        leftEye.updateAndDrawEye(evt);

        //second pupil
        rightEye.updateAndDrawEye(evt);         
});
});