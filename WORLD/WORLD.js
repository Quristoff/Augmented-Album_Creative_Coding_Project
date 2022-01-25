// declare vars
let cav;
let predictions = [];
let video;
let handpose;

let fft;

let whichScene = 0; // int for determining which scene
let scene= [scene0,scene1,scene2,scene3,scene4,scene5];

let bgForAll;
let strokeForAll;

let cameraOff = false;


function setup(){
    cav = createCanvas(windowWidth,windowHeight);
    frameRate(25);

    // the handpose
    video = createCapture(VIDEO);
    //video.size(width,height);
    handpose = ml5.handpose(video);

    
    // pixel processing of the video
    video.hide();

    // music and related
    fft = new p5.FFT();

    // setup for scene2
    mySize = 300;
    myDim =  3;
    interval = mySize/myDim;
    hand1= new HandShape(width/4,height/2,50,0);
    hand2 = new HandShape(3*width/4,height/2,50,0);
    myGrid = new grid(width/2,height/2,mySize,myDim);
    myEye = new eye(myGrid.getPos(0,0)[0],myGrid.getPos(0,0)[1],(mySize/myDim)-10);
    myCuni1= new cuniform(myGrid.getPos(1,0)[0],myGrid.getPos(1,0)[1]-10);
    myCuni2= new cuniform(myGrid.getPos(0,2)[0],myGrid.getPos(0,2)[1]-10);
    myLargerGrid = new grid(width/2,height/2,mySize*3,myDim);
    myEye2 = new eye(myLargerGrid.getPos(1,2)[0],myLargerGrid.getPos(1,2)[1],(mySize*3/myDim)-10);
    myCuni3 = new cuniform(myGrid.getPos(1,1)[0],myGrid.getPos(1,1)[1]-10);
    eyeCenter = new eye(width/2,height/2,800);
    handCenter = new HandShape(width/2,height/2,300,255);
    myLargestGrid = new grid(width/2,height/2,mySize*3*3,myDim);
    myEye3 = new eye(myLargestGrid.getPos(0,1)[0],myLargestGrid.getPos(0,1)[1],(mySize*9/myDim)-10);


    //setup for scene3
    hands = [connection,home,intimacy,self];


    //setup for scene4
    magLine1 = new MagneticLine(0,0,20,50,50);

    //setup for scene5
    handFinal = new HandShape(width/2,3*height/4,8,255);

    // GUI
    createGUI();

}

function playMusic(){
    if(!music.isPlaying()){
        music.play()
        //music.jump(180);
    };
}



function draw(){

    bgForAll = video.get(10,10);
    elementColorForAll = video.get(video.width/2,video.height/2-20);

    


    // music Volume
    music.setVolume(volumeController.value());
    //clear();


    //text(music.currentTime(),width/10,height/10);
    //console.log(whichScene);
    scene[whichScene]();
    //playMusic();   

}

function keyPressed(){
    if (keyCode === 83){
        saveCanvas('myCanvas', 'png');    
    }
}







  

  

    
 


  
  
  

  
