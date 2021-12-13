let angle;
let magLine1;
let magLine2;
let imageCount =0;

function scene4(){
    background(0,0,0,255);
    blendMode(BLEND);
    handpose.on('predict', results => {
        predictions = results;
    });

    // create lines
    push();
    strokeWeight(1.5);
    stroke(255);
    magLine1.display();

    pop();
    
    // the turning angle
    for (let i = 0; i < predictions.length; i += 1) {
        const prediction = predictions[i]; 
        push();

        translate(-prediction.landmarks[9][0],-prediction.landmarks[9][1]);   
        translate(width/2,height/2);

        angle = (PI/2-atan((prediction.landmarks[9][1]-prediction.landmarks[0][1])/
        (prediction.landmarks[9][0]-prediction.landmarks[0][0])));


        pop();
    }
    // set angle
    magLine1.setAngle(angle);

    push();
    noStroke();
    fill(255);
    ellipse(width/2,height/2,500,500);
    pop();
    // show image
    imageMode(CENTER);
    image(handAndPlanet[imageCount],width/2,height/2,handAndPlanet[imageCount].width/5,handAndPlanet[imageCount].height/5);
    imageCount += 1;
    if (imageCount == handAndPlanet.length){
        imageCount = 0;
    }

    if(music.currentTime()-120>=57.5){
        whichScene = 5;
    }
    // show video
    if (!cameraOff){
        push();
        noTint();
        translate(2*video.width/3, 0);
        scale(-1, 1);
        imageMode(CORNER);
        image(video,0,0,2*video.width/3,2*video.height/3);
        pop();
    }

}