let musicVolume;
let playButtonValue = "Play/Pause";
function createGUI(){
    // playButton
    playButton = createButton(playButtonValue);
    playButton.position(width-150,height-80);
    playButton.mousePressed(playOrPause);
    playButton.size(80,40);
    playButton.style("cursor","pointer");
    
    //volume controller
    para = createP("Volume:");
    para.position(width-350,height-100);
    para.style('font-size', '20px');
    para.style('color', 'white');
    volumeController = createSlider(0,1,0.8,0.05);
    volumeController.position(width-350,height-80+20);
    volumeController.style('cursor', 'pointer');


    //blackandwhite only mode 
    CameraStatus = createButton("Show/Hide video");
    CameraStatus.position(width-500,height-80);
    CameraStatus.mousePressed(()=> cameraOff = !cameraOff);
    CameraStatus.size(80,40);
    CameraStatus.style("cursor","pointer");

}

function playOrPause(){
    if (music.isPlaying()){
        music.pause();
        playButtonValue = "play";
    }else{
        music.play();
        playButtonValue = "pause";
    }
}

