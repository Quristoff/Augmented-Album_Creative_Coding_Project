let handFinal;
let lineFinal = ["If you can always on the present, you'll be a happy man.",
"You'll see that there is life in the desert, that there are stars in the heavens...",
"Life will be a party for you, a grand festival,",
"because life is the moment we're living right now."];

function scene5(){
    background(0,50);
    handpose.on('predict', results => {
        predictions = results;
    });
    //scale(0.7);
    handFinal.display();

    // show quotes
    push();
    textAlign(CENTER);
    textSize(30);
    fill(255);
    noStroke();
    textStyle(NORMAL);
    if(music.currentTime()-120>58){
        text(lineFinal[0],width/2,height/6);
    }

    if(music.currentTime()-180>2){
        text(lineFinal[1],width/2,height/6+70);
    }

    if(music.currentTime()-180>6){
        text(lineFinal[2],width/2,height/6+2*70);
    }

    if(music.currentTime()-180>10){
        text(lineFinal[3],width/2,height/6+3*70);
    }

    textStyle(ITALIC);
    textAlign(LEFT);
    if(music.currentTime()-180>14){
        text("            -The Alchemist (Paulo Coelho,1988)",width/2,height/6+4*70);
    }
    pop();

    if(music.currentTime()-180>17){
        background(0);
        textSize(60);
        fill(255);
        textAlign(CENTER);
        text("Quristoff Jiang",width/2,height/2);
    }
    //special thanks
    if(!music.isPlaying()){
        noStroke();
        background(0);
        push();
        fill(255);
        textAlign(CENTER);

        textSize(60);
        text("Special Thanks",width/2,height/6);

        textSize(35);
        text("Jiayi Tan\t\t\tfor Photography",width/2,2*height/6);
        text("Alan Ren\t\t\tfor Tech Assistance",width/2,2*height/6+80);
        text("Emily Wang\t\t\tfor Sketch Improvement",width/2,2*height/6+160);
        pop();

        push();
        textAlign(CENTER,CENTER);
        textSize(25);
        textFont("Times New Roman");
        fill(lerpColor(color(255,255,255),color(0,0,0),0.5*(sin(frameCount/10)+1.2)));
        text("Press anywhere to restart",width/2,5*height/6);
        pop();

        cav.mousePressed(playMusic);
        if (mouseIsPressed){
            clear();
            whichScene = 1;
        }
    
    }

}