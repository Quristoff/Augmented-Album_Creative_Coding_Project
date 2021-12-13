//SCENE3
let hands;
let textList = ["WORLD","Intimacy","Connection","Self","Home"];
let rectTransp = 0;

function scene3(){
    
    background(elementColorForAll[0],elementColorForAll[1],elementColorForAll[2],20);

    // load handpose
    handpose.on('predict', results => {
        predictions = results;
    });

    // show video
    if (!cameraOff){
        push();
        translate(4*video.width/1.2, 0);
        scale(-1, 1);
        imageMode(CENTER);
        image(video,random(0,width),random(0,height),video.width/1.2,video.height/1.2);
        tint(bgForAll[0],bgForAll[1],bgForAll[2],180);
        pop();
    }

    // show hands
    image(hands[floor(random(0,hands.length))],random(0,width),random(0,height),video.width/1.2,video.height/1.2);
    tint(bgForAll[0],bgForAll[1],bgForAll[2],180);

    // show words
    push();
    noStroke();
    fill(bgForAll[0],bgForAll[1],bgForAll[2],150);
    textSize(random(50,height/5));
    text(textList[floor(random(0,hands.length))],random(0,width),random(0,height));
    pop();


    // a rectangle that is covering eveything gradually
    push();
    noStroke();
    rectMode(CORNER);
    fill(elementColorForAll[0],elementColorForAll[1],elementColorForAll[2],rectTransp);
    rect(0,0,width,height)
    pop();
    rectTransp +=2;
    
    // hand landmarks
    for (let i = 0; i < predictions.length; i += 1) {
        const prediction = predictions[i]; 
        push();

        translate(-prediction.landmarks[9][0],-prediction.landmarks[9][1]);   
        translate(width/2,height/2);
        for (let j = 0; j < prediction.landmarks.length; j += 1) {
            const keypoint = prediction.landmarks[j];
            push();
            blendMode(BLEND);
            noStroke();
            fill(bgForAll);
            ellipse(keypoint[0],keypoint[1],30,5);
            pop();
        }
        pop();
    }


    if (music.currentTime() -120 >= 38.3){
        whichScene = 4;
    }

}