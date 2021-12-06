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

 function scene2(){
   background(bgColor,bgTransp);
   blendMode(BLEND);
   //stroke(0);
   smooth() 
   handpose.on('predict', results => {
       predictions = results;
     });


   if ( music.currentTime() < 115.5){

   
       // add 
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

       hand1.display(); // the arg is the stroke color
       hand2.display();
       myEye.blink();
       myCuni1.display();
       myCuni2.display();
       myGrid.display();
   }else if (music.currentTime()>136){
       push();
       rectMode(CORNER);
       fill(255);
        rect(0,0,width,height);
        pop();
   } else{
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
        //    eyeCenter.invertColor();
        //    handCenter.invertColor();


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

   if(music.currentTime()>=139.2){
       whichScene = 3;
   }

 }