//SCENE1
// Scene 1 var
let amp;
let handLength;
let pointDis;
let ellipseWidth;
let ellipseHeight;

function scene1(){
    clear();
        // obtain the amplitude
        fft.analyze();
        amp = map(fft.getEnergy("mid"),0,255,0,height);
        //console.log(amp); var related to all audio mapping

        // handpose
        background(bgForAll[0],bgForAll[1],bgForAll[2],100);
        if (!cameraOff){
            push();
            translate(2*video.width/3, 0);
            scale(-1, 1);
            imageMode(CORNER);
            image(video,0,0,2*video.width/3,2*video.height/3);
            pop();
        }
    
        handpose.on('predict', results => {
            predictions = results;
          });
        // background blending effect
        // use a if statement to alternate between blendMode

        if (frameCount%300 < 100){
            blendMode(BURN);
        }else if (frameCount%200 < 100){
            blendMode(DIFFERENCE);
        } else{
            blendMode(BLEND);
   
        }
 
        push();
        rectMode(CENTER); 
        // the effect of this rectangle is to prevent the screen from changing into pure white
        // the Dodge effect will eventually make the screen into pure white
        // this blendmode is interesting to play with 
        // choice of blendMode
        if (frameCount%300 < 100){
            fill(bgForAll[0],bgForAll[1],bgForAll[2],50);
            rect(width/2,height/2,width,height)
            blendMode(SOFT_LIGHT);
        }else if (frameCount%200 < 100){
            fill(bgForAll[0],bgForAll[1],bgForAll[2],50);
            rect(width/2,height/2,width,height)
            blendMode(DODGE);
        } else{
            fill(bgForAll[0],bgForAll[1],bgForAll[2],50);
            rect(width/2,height/2,width,height)
            blendMode(MULTIPLY);
        }
    


        // MAGIC CIRCLE
        push();
        if (music.currentTime()<43.5){
            // draw points
            fill(elementColorForAll[0],elementColorForAll[1],elementColorForAll[2]);

            sqrAndCrcle(width/2,height/2,1,255);
            if(music.currentTime()>=24.1){
                sqrAndCrcle(0,height/2,3,255*0.5*(cos((frameCount/20)*2*PI/4.4)+1));
                sqrAndCrcle(width,height/2,3,255*0.5*(cos((frameCount/20)*2*PI/4.4)+1));
            }
        }else if(music.currentTime()<62.6){
            connectEdge(width/2,height/2);
            let transpVar = 0.5*(cos(frameCount/60)+1);
            microSystem(width/2,height/2,60,255*transpVar);
            if (music.currentTime()>=48.0){
                push();
                translate(width/2,height/2);
                rotate(PI/3);
                microSystem(0,0,200,100*transpVar);
                pop();
            }
            if (music.currentTime()>=53.0){
                push();
                translate(width/2,height/2);
                rotate(2*PI/3);
                microSystem(0,0,300,60*transpVar);
                microSystem(width/2,0,300,60*transpVar);
                microSystem(-width/2,0,300,60*transpVar);
                pop();
            }
            if (music.currentTime()>=57.8){
                transp = 0;
            }
        }else if (music.currentTime()>=62.6){
            flattMagicCircle();          
        }

        // draw the lines
        pop();
        pop();

        noStroke();
        // this if statement is separated from others to avoid blending problems
        if (music.currentTime()<43.5){
            drawLines();
        }

        if (music.currentTime()>100.9){
            whichScene = 2;
            clear();
        }

}
