import React, {useEffect} from 'react'

const VideoStream = () => {

  const streamCamVideo = () => {
    
  var constraints = { audio: true, video: { width: window.innerWidth*0.3, height: window.innerHeight*0.3 } };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function(mediaStream) {
      var video = document.querySelector("video");

      video.srcObject = mediaStream;
      video.onloadedmetadata = function(e) {
        video.play();
      };
    })
    .catch(function(err) {
      console.log(err.name + ": " + err.message);
    }); // always check for errors at the end.
  }

  useEffect(()=>{
    streamCamVideo()
  },[])

  return (
    <div>
        <video autoPlay={true} id="videoElement" muted></video>
    </div>
  );
}

export default VideoStream