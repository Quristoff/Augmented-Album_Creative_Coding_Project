function strechingLine(xPos,yPos){

    let i = 0
    while(i < 36){
        push();
        stroke(lerpColor(color(186, 144, 52),color(0,0,0),0.5*(sin(frameCount/20)+1)));
        translate(xPos,yPos);
        rotate(i*2*PI/36);
        //line(0,0,random(10,width/3),0)
        line(0,0,noise(frameCount/7-i*20)*width/3,0);
        pop();
        i++;
    }
}



function sqrAndCrcle(xPos,yPos,size,transp){
    push();
    noFill();
    stroke(elementColorForAll[0],elementColorForAll[1],elementColorForAll[2],transp);
    strokeWeight(1.5);
    const diameter = (height/3)*size;
    ellipse(xPos,yPos,diameter)
    push();
    translate(xPos,yPos);
    rotate(frameCount/50);
    square(0,0,sqrt(2*pow((diameter)/2,2)))  
    pop();
}

function microSystem(xPos,yPos,size,transp){
    push();    
    translate(xPos,yPos);
    noFill();
    ellipse(0,0,30);
    for (var i = -1; i < 2;i++){
      push();
      noFill();
      rotate(i*PI/3);
      
      push();
      noStroke();
      fill(elementColorForAll[0],elementColorForAll[1],elementColorForAll[2])
      ellipse(size/2*cos(frameCount/60-(i*3*PI/4)), // a parametric function of frameCount
      (size*30/16)*sin(frameCount/60-(i*3*PI/4)),size/6);
      pop();
    
      noFill();
      strokeWeight(1.5);
      stroke(elementColorForAll[0],elementColorForAll[1],elementColorForAll[2],transp);
      ellipse(0,0,size,30*size/8);
      pop();
    }
    pop();
}

function drawLines() {
    for (let i = 0; i < predictions.length; i += 1) {
        const prediction = predictions[i];
        handLength = prediction.landmarks[0][1]-prediction.landmarks[12][1];
        pointDis = map(handLength,40,220,width/3,100); // map the dis of two points

        fill(elementColorForAll[0],elementColorForAll[1],elementColorForAll[2]);
        ellipse(pointDis,amp,10);
        ellipse(width-pointDis,height-amp,10);
       
        for (let j = 0; j < prediction.landmarks.length; j += 3) {
            const keypoint1 = prediction.landmarks[j];

            strokeWeight(2);
            //use burn here to preserve the changes [blend,dodge,burn]
            if (frameCount%300 < 100){
                blendMode(BLEND);
            }else if (frameCount%200 < 100){
                blendMode(DODGE);
            } else{
                blendMode(DODGE);
            }
            stroke(elementColorForAll[0],elementColorForAll[1],elementColorForAll[2]);
            line(pointDis,amp,width-width*keypoint1[0]/video.width,height*keypoint1[1]/video.height);
            line(width-pointDis,height-amp,width-width*keypoint1[0]/video.width,height*keypoint1[1]/video.height);
            //text(j.toString(),keypoint1[0],keypoint1[1]); //this is used to find the elements of hands                       
        }
    }
}

function connectEdge(xPos,yPos){
    for (let i = 0; i < predictions.length; i += 1) {
        const prediction = predictions[i];
        for (let j = 0; j < prediction.landmarks.length; j += 3) {
            const keypoint = prediction.landmarks[j];
            push();
            if (frameCount%300 < 100){
                blendMode(BLEND);
                console.log("a");
            }else if (frameCount%200 < 100){
                blendMode(DODGE);
                console.log("b");
            } else{
                blendMode(DODGE);
                console.log("c");
            }
            stroke(elementColorForAll[0],elementColorForAll[1],elementColorForAll[2]);
            line(0,height*keypoint[1]/video.height,xPos,yPos);
            line(width,height*keypoint[1]/video.height,xPos,yPos);
            pop();
        }
    }

}

function flattMagicCircle(){
    for (let i = 0; i < predictions.length; i += 1) {
        const prediction = predictions[i];
        const keypoint = prediction.landmarks[10];
        handLength = prediction.landmarks[0][1]-prediction.landmarks[12][1];
        ellipseWidth = map(handLength,40,220,100,width-50);
        ellipseHeight = map(handLength,40,220,100,height-300);
    }

    push();
    translate(width/2,height/2);
    applyMatrix(4,0,0,1/4,0,0);
    applyMatrix(1,0,0,4,0,0);
    rotate(frameCount/100)
    strechingLine(0,0);
    pop();

    noFill();
    stroke(elementColorForAll[0],elementColorForAll[1],elementColorForAll[2])
    strokeWeight(2);
    ellipse(width/2,height/2,ellipseWidth,ellipseHeight);
    
    
    let stars = []
    for (var i = 0; i < 10; i++){
      randomSeed(i);
      stars.push(new Planet(i));
    }
    
    for (var j = 0; j < stars.length;j++){
      stars[j].display();
    } 
  }
  
  class Planet{
    constructor(angleDeviation){
      this.angleDeviation = random(0,2*PI);
      this.xPos = width/2+(ellipseWidth)/2*sin(frameCount/60+angleDeviation*(PI/6));
      this.yPos = height/2+(ellipseHeight)/2*cos(frameCount/60+angleDeviation*(PI/6));
      this.size = random(50,width/10);
    }
    display(){
      push();
      fill(elementColorForAll[0],elementColorForAll[1],elementColorForAll[2]);
      noStroke();
      translate(this.xPos,this.yPos);
      ellipse(0,0,this.size);
      pop();
    }
    getPosition(){
      return [this.xPos,this.yPos];
    }
  }


  class eye{
    constructor(xPos,yPos,size,color = 0){
      this.xPos = xPos;
      this.yPos = yPos;
      this.size = size;   
      this.color = color

    }
    invertColor(){
      if(this.color == 255){
        this.color = 0;
      } else{
        this.color  = 255;
      }
    }
    open(){

  
    // draw the upper eyelid
      beginShape();
      stroke(this.color);
      noFill();
      vertex(this.xPos-this.size/2,this.yPos);
      bezierVertex(this.xPos-this.size/4,this.yPos-this.size/3,this.xPos+this.size/4,this.yPos-this.size/3,this.xPos+this.size/2,this.yPos);
      endShape()
      ellipse(this.xPos,this.yPos,this.size/2);
      
      fill(this.color);
      ellipse(this.xPos,this.yPos,this.size/3)   

    }
    blink(){
      push();
      stroke(this.color);
      beginShape();
      strokeWeight(1.5);
      noFill();
      vertex(this.xPos-this.size/2,this.yPos);
      bezierVertex(this.xPos-this.size/4,this.yPos+this.size/3,this.xPos+this.size/4,this.yPos+this.size/3,this.xPos+this.size/2,this.yPos);
      endShape()
      
      beginShape();
      noFill();
      strokeWeight(2);
      vertex(this.xPos-this.size/2,this.yPos-this.size/5);
      bezierVertex(this.xPos-this.size/4,this.yPos-this.size/3-this.size/5,this.xPos+this.size/4,this.yPos-this.size/3-this.size/5,this.xPos+this.size/2,this.yPos-this.size/5);
      endShape()
      if (frameCount % 150 < 100){
        this.open();
      }
      pop();
    }
    keepOpen(){
      push();
      stroke(this.color);
      beginShape();
      strokeWeight(1.5);
      noFill();
      vertex(this.xPos-this.size/2,this.yPos);
      bezierVertex(this.xPos-this.size/4,this.yPos+this.size/3,this.xPos+this.size/4,this.yPos+this.size/3,this.xPos+this.size/2,this.yPos);
      endShape()
      
      beginShape();
      noFill();
      strokeWeight(2);
      vertex(this.xPos-this.size/2,this.yPos-this.size/5);
      bezierVertex(this.xPos-this.size/4,this.yPos-this.size/3-this.size/5,this.xPos+this.size/4,this.yPos-this.size/3-this.size/5,this.xPos+this.size/2,this.yPos-this.size/5);
      endShape()
      this.open();
    }
  }

  class HandShape{

    constructor(xPos,yPos,size,strokeColor){
        this.xPos = xPos;
        this.yPos = yPos;
        this.size = size;
        this.strokeColor  = color(strokeColor);
        
    }
    invertColor(){
      if (this.strokeColor == 0){
        this.strokeColor = 255;
      }else{
        this.strokeColor = 0;
      }

    }
    setPara(xPos,yPos,size,strokeColor){
      this.xPos = xPos;
      this.yPos =yPos;
      this.size =size;
      this.strokeColor = strokeColor;  
    }
    display(){
      for (let i = 0; i < predictions.length; i += 1) {
        const prediction = predictions[i];
        push();
        strokeWeight(2);
        stroke(this.strokeColor);
        noFill();
        translate(this.xPos,this.yPos);
        translate(-prediction.landmarks[9][0],-prediction.landmarks[9][1]); // make the handpose always centered
        beginShape();
        // let theList = [17,0,4,8,12,16,20];
        // for (let i in theList){
        //     curveVertex(prediction.landmarks[i][0],prediction.landmarks[i][1]);
        // }
        curveVertex(prediction.landmarks[17][0],prediction.landmarks[17][1]);
        curveVertex(prediction.landmarks[0][0],prediction.landmarks[0][1]);
        curveVertex(prediction.landmarks[4][0],prediction.landmarks[4][1]);
        curveVertex(prediction.landmarks[8][0],prediction.landmarks[8][1]);
        curveVertex(prediction.landmarks[12][0],prediction.landmarks[12][1]);
        curveVertex(prediction.landmarks[16][0],prediction.landmarks[16][1]);
        curveVertex(prediction.landmarks[20][0],prediction.landmarks[20][1]);
        endShape(CLOSE);
        pop();
        // for (let j = 0; j < prediction.landmarks.length; j += 1) {
        //     console.log("yes");
        //     const keypoint1 = prediction.landmarks[j];
        //     fill(255);
        //     text(j.toString(),keypoint1[0],keypoint1[1]); //this is used to find the elements of hands 
        //  
      }
    }
}

class grid{
  constructor(xPos,yPos,size,dim){
    this.xPos = xPos;
    this.yPos = yPos;
    this.size = size;
    this.dim = dim;
    this.interval = size/dim;    
  }
  getPos(x,y){
    return [this.xPos-this.size/2+x*this.interval+this.interval/2,this.yPos-this.size/2+y*this.interval+this.interval/2];
  }
  display(){
    rectMode(CENTER);
    stroke(0);
    noFill()
    square(this.xPos,this.yPos,this.size);
    for (let i =  1; i < this.dim;i++){
      line(this.xPos-(this.size/2)+i*this.interval,this.yPos-(this.size/2),this.xPos-(this.size/2)+i*this.interval,this.yPos+(this.size/2));
      line(this.xPos-(this.size/2),this.yPos-(this.size/2)+i*this.interval,this.xPos+(this.size/2),this.yPos-(this.size/2)+i*this.interval);   
    }   
  }
}

class cuniform{
  constructor(xPos,yPos){
    this.xPos = xPos;
    this.yPos = yPos;
  }
  setPara(xPos,yPos){
    this.xPos = xPos;
    this.yPos = yPos;
  }
  display(){
    push();
    translate(this.xPos,this.yPos);
    stroke(1.5);
    if(frameCount%120 < 40){
      fill(0);
    }else{
      noFill();
    }
    triangle(0-15,0-15,0+15,0-15,0,0+50);
    
    if(frameCount%120 < 80 && frameCount%120 > 40){
      fill(0);
    }else{
      noFill();
    }
    triangle(0-15-10,0-15,0-10,0+50,0-30-10,0+50);
    
    if(frameCount%120 < 120 && frameCount%300 > 80){
      fill(0);
    }else{
      noFill();
    }
    triangle(0-15+40,0-15,0+40,0+50,0-30+40,0+50);  
    pop();
  }
}

class MagneticLine{
  constructor(xPos,yPos,xStep,yStep,size){
    this.xPos = xPos;
    this.yPos = yPos;
    this.xStep = xStep;
    this.yStep = yStep;
    this.size = size
    this.rotationAngle = 0;
  }
  display(){
    for (var i = this.xPos; i < width; i += this.xStep){
      for (var j = this.yPos; j < height; j+= this.yStep){
        push();

        
        translate(i,j);
        rotate(2*atan(j/i)+4*this.rotationAngle);
        line(0,0,0,this.size);
        pop();
      }
    }
  }
  setAngle(angle){
    this.rotationAngle = angle;
  }
}

class MagneticLineReversed{
  constructor(xPos,yPos,xStep,yStep,size){
    this.xPos = xPos;
    this.yPos = yPos;
    this.xStep = xStep;
    this.yStep = yStep;
    this.size = size
    this.rotationAngle = 0;
  }
  display(){
    for (var i = this.xPos; i > width/2; i -= this.xStep){
      for (var j = this.yPos; j < height; j+= this.yStep+this.size){
        push();
        translate(i,j)
        rotate(atan(j/i)/2+this.rotationAngle);
        line(0,0,0,this.size);
        pop();
      }
    }
  }
  setAngle(angle){
    this.rotationAngle = angle;
  }
}