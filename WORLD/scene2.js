 //SCENE2
 let myGrid;
 let myLargerGrid;
 let myLargestGrid;
 let myEye;
 let myEye2;
 let myEye3;
 let hand1;
 let myCuni1;
 let myCuni2;
 let myCuni3;

 let eyeCenter;
 let handCenter;

 let mySize;
 let myDim;
 let interval;

let ellipseSize = 200;
let ellipseColor = 0;
let bgColor = 255;
let bgTransp = 100;

let titleText = "";

 function scene2(){
   background(bgColor,bgTransp);
   // show video
   if (!cameraOff){
    push();
    translate(2*video.width/3, 0);
    scale(-1, 1);
    imageMode(CORNER);
    image(video,0,0,2*video.width/3,2*video.height/3);
    pop();     
   }

   blendMode(BLEND);

   smooth() 

   // load Hnadpose
   handpose.on('predict', results => {
       predictions = results;
     });


   if ( music.currentTime() < 115.5){

   
       // add elements to grid
       if (music.currentTime() > 106){

           myEye2.blink();
           microSystem(myLargerGrid.getPos(2,0)[0],myLargerGrid.getPos(2,0)[1],(mySize/myDim)-30,255);
           myCuni2.setPara(myGrid.getPos(1,2)[0],myGrid.getPos(1,2)[1]-10);
           
           myCuni3.display();
           hand1.setPara(myLargerGrid.getPos(0,1)[0],myLargerGrid.getPos(0,1)[1],50,0);
           hand2.setPara(myLargerGrid.getPos(2,1)[0],myLargerGrid.getPos(2,1)[1],50,0);

           myLargerGrid.display();
           if (music.currentTime() > 110.5){
               myLargestGrid.display();
               myEye3.blink();
           }
           
       }

       hand1.display(); 
       hand2.display();
       myEye.blink();
       myCuni1.display();
       myCuni2.display();
       myGrid.display();
   }else if (music.currentTime()>136){ // turn white
       push();
       rectMode(CORNER);
       fill(255);
       noStroke();
        rect(0,0,width,height);
        fill(0)
        textSize(height/3);
        text(titleText,width/2,height/2);
        pop();
        if (music.currentTime()-120 >= 19.1){
            titleText = "D";
        }else if (music.currentTime()-120 >= 18.95){
            titleText = "L";
        }else if(music.currentTime()-120 >= 18.8){
            titleText = "R";
        }else if (music.currentTime()-120 >= 18.65){
            titleText = "O";
        }else if (music.currentTime()-120 >= 18.50){
            titleText = "W";
        }
   } else{ // only an eye
       bgTransp = 255; 
       push();
       noStroke();
       fill(ellipseColor);
       ellipse(width/2,height/2,ellipseSize);
       pop();

       eyeCenter.keepOpen();

       handCenter.display();
       if (music.currentTime()>120.5){
        if (ellipseSize == 200+7*80){
            eyeCenter.invertColor();
            handCenter.invertColor();
       }
       if (ellipseSize < sqrt(pow(width,2)+pow(height,2))-100){
            ellipseSize += 80;
       }else{
           ellipseSize = 200;



           if (ellipseColor == 0){
            ellipseColor =255;
           }else if(ellipseColor == 255){  
            ellipseColor = 0;
           }

           if (bgColor == 255){
            bgColor = 0;
           }else if (bgColor == 0){
            bgColor = 255;
           }
       }
      

       }
    
       
   }
   // next scene prereq
   if(music.currentTime()>=139.2){
       whichScene = 3;
   }

 }