// declare vars
let cav;
let predictions = [];
let video;
let handpose;
let music;
let fft;
let amp;
let handLength;
let pointDis;




// color for stroke
let a = 24;
let b = 40
let c = 74;

// effects
let backgroundBlend;
let lineBlend;


function preload(){
    music = loadSound("WORLD.mp3");
}

function setup(){
    cav = createCanvas(700,500);

    // the handpose
    video = createCapture(VIDEO);
    handpose = ml5.handpose(video);
    video.size(1400,1000);
    
    // pixel processing of the video
    video.hide();


    // music and related
    music.play();
    fft = new p5.FFT();

    //effects 
    backgroundBlend = ["BLEND","DIFFERENCE","OVERLAY"];
    lineBlend = ["MULTIPLY","DODGE","BURN"];



}

function draw(){


    

    // obtain the amplitude
    fft.analyze();
    amp = map(fft.getEnergy("mid"),0,255,0,height);
    //console.log(amp); var related to all audio mapping

    // handpose
    background(227, 176, 73,100);
    
    handpose.on('predict', results => {
        predictions = results;
      });
    // background blending effect
    // use a if statement to alternate between blendMode
    if (frameCount%300 < 100){
        blendMode(BURN);
        console.log("1");
    }else if (frameCount%200 < 100){
        blendMode(DIFFERENCE);
        console.log("2");
    } else{
        blendMode(BLEND);
        console.log("3");
    }
    


    //image(video,0,0,video.width/2,video.length/2); // test for video

    
    // pixelate and modify the video
    // video.loadPixels();
    // loadPixels();
    // for (let i = 0; i< 4*video.width*video.height;i+=4){
    //     pixels[i] = video.pixels[i];
    //     pixels[i+1] = video.pixels[i+1+20*4];
    //     pixels[i+2] = video.pixels[i-2-20*4];
    //     pixels[i+3] = video.pixels[i+3];
    // }
    // updatePixels();



    


    //draw Auxilitary shapes
    
    
    push();
    rectMode(CENTER);


    // the effect of this rectangle is to prevent the screen from changing into pure white


    // the Dodge effect will eventually make the screen into pure white
    // this blendmode is interesting to play with 

    // choice of blendMode
    if (frameCount%300 < 100){
        fill(93, 120, 158,50);
        rect(width/2,height/2,width,height)
        blendMode(BURN);
    }else if (frameCount%200 < 100){
        fill(93, 120, 158,50);
        rect(width/2,height/2,width,height)
        blendMode(DODGE);
    } else{
        fill(93, 120, 158,50);
        rect(width/2,height/2,width,height)
        blendMode(MULTIPLY);
    }


    // draw points
    fill(84, 57, 19);
    ellipse(pointDis,amp,10);
    ellipse(width-pointDis,height-amp,10);
    noFill();
    stroke(84, 57, 19);
    strokeWeight(1.5);
    const diameter = height-10
    ellipse(width/2,height/2,diameter)
    
    //rotate the square
    push();
    translate(width/2,height/2);
    rotate(frameCount/50);
    square(0,0,sqrt(2*pow((diameter)/2,2)))
    
    pop();


    pop();
    

    drawLines();
    noStroke();


    

}




// function that draws a line-composed shape on one's hand
function drawLines() {
    // set lineDrew to true

    for (let i = 0; i < predictions.length; i += 1) {
        const prediction = predictions[i];


        handLength = prediction.landmarks[0][1]-prediction.landmarks[12][1];
        pointDis = map(handLength,40,220,250,50); // map the dis of two points


        
        for (let j = 0; j < prediction.landmarks.length; j += 3) {
            const keypoint1 = prediction.landmarks[j];

            

            strokeWeight(2);
            // if (frameCount%10 == 0){
            //     a = random(0,255);
            //     b = random(0,255);
            //     c = random(0,255);
            // }
            // use burn here to preserve the changes [blend,dodge,burn]
            if (frameCount%300 < 100){
                blendMode(BLEND);
            }else if (frameCount%200 < 100){
                blendMode(DODGE);
            } else{
                blendMode(DODGE);
            }
            stroke(84, 57, 19);
            line(pointDis,amp,keypoint1[0],keypoint1[1])
            line(width-pointDis,height-amp,keypoint1[0],keypoint1[1])
            //text(j.toString(),keypoint1[0],keypoint1[1]); //this is used to find the elements of hands
            
            
        }
        

    }
}
  