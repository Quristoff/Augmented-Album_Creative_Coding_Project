// Scene 0 method
function scene0(){
    background(lerpColor(color(0,0,0,150),color(255,255,255,150),0.5*(sin(frameCount/20)+1)));
    if (!cameraOff){
        push();
        translate(2*video.width/3, 0);
        scale(-1, 1);
        imageMode(CORNER);
        image(video,0,0,2*video.width/3,2*video.height/3);
        pop();
    }

    cav.mousePressed(playMusic);

    // a note for applyMatrix function
    //applyMatrix(a, b, c, d, e, f)
    //[[a,c,e],
    // [b,d,f],
    // [0,0,1]] 
    // transformation matrixes


    push();
    scale(1.5);
    strechingLine(width/8,height/2);
    pop();

    textAlign(CENTER,CENTER);
    textSize(25);
    textFont("Times New Roman");
    fill(lerpColor(color(186, 144, 52,20+255*(sin(frameCount/20))+1),color(0,0,0,20+255*(sin(frameCount/20))+1.2),0.5*(sin(frameCount/20)+1.2)));
    text("Press anywhere to start",3*width/4,height/4);
    text("Please turn on the volume and the camera",3*width/4,height/4+40);
    text("Make sure your hand is visible through the camera",3*width/4,height/4+80);

    fill(lerpColor(color(186, 144, 52),color(0,0,0),0.5*(sin(frameCount/20)+1)));
    textSize(140);
    text("W O R L D",width/2,height/2);

    if (mouseIsPressed){
        whichScene = 1;
    }
}