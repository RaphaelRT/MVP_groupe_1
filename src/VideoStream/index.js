import React, {useEffect, useRef, useState} from 'react'
import './index.css';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { v4 as uuidv4 } from 'uuid';
import Chevron from "../imgs/chevron-down.svg"

const getFrames = async (stream)=> {
    let frame_counter = 0;

    const track = stream.getVideoTracks()[0];
    const media_processor = new window.MediaStreamTrackProcessor(track);

    const reader = media_processor.readable.getReader();
    while (true) {
        const result = await reader.read();
        if (result.done)
        break;

        let frame = result.value;
        //console.log(frame)
    }

}


const VideoStream = () => {
  const videoStream = useRef(null);
  const [isPaused, setIsPaused] = useState(false)
  const videoRef = useRef();
  const canvasRef = useRef();
  const [dimensions, setDimensions] = useState({});
  const [predictImage, setPredictImage] = useState();
  const [started, setStarted] = useState(false);
  const [imgName, setImgName] = useState();
  const [imgLink, setImgLink] = useState("");
  const [deviceInfos_list, setDeviceInfos_list] = useState([]);
  const [selectedMode, SetSelectedMode] = useState()
  const [isDrpOpn, SetIsDrpOpn] = useState(false)

  function gotDevices(deviceInfos) {
    if (deviceInfos_list.length === 0) {
      for (var i = 0; i !== deviceInfos.length; ++i) {
        var deviceInfo = deviceInfos[i];
        if (deviceInfo.kind.toString().toLowerCase().includes("video")){
          deviceInfos_list.push(deviceInfo)
        }
        
      }
      setDeviceInfos_list(deviceInfos_list)
      if (selectedMode === undefined ) {
        SetSelectedMode(deviceInfos_list[0]["deviceId"])
      }
      console.log(deviceInfos_list)

    }
    
  }

  const streamCamVideo = (constraints) => {
    navigator.mediaDevices.enumerateDevices()
    .then(gotDevices)
    .catch(err => console.log(err));
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function(mediaStream) {
        var video = document.querySelector("video");

        video.srcObject = mediaStream;
        //console.log(mediaStream.getVideoTracks())
        getFrames(mediaStream)
        video.onloadedmetadata = function(e) {
          if (isPaused){
            video.pause()
          }else {
            video.play();
          }
        };
    })
    .catch(function(err) {
      console.log(err.name + ": " + err.message);
    }); // always check for errors at the end.
  }

  

  let context;
  if (canvasRef.current) {
    context = canvasRef.current.getContext('2d');
  }

  function getVideoSizeData(videoRef) {
    const ratio = videoRef.current.videoWidth / videoRef.current.videoHeight;
    const w = videoRef.current.videoWidth - 100;
    const h = parseInt(w / ratio, 10);
    //console.log(w, h)
    return {
      ratio,
      w,
      h
    };
  }
  const send_input_image = (content)=> {
    fetch(`/files/${imgName}.jpeg`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
       'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: content
      })
    }).then(res => {
      if (res.status === 201){
        fetch(`/predict/${imgName}.jpeg`).then((res)=> {
          if (res.status === 200) {
            setImgLink("/download/"+imgName+".jpeg")
          }
          console.log(res.status)
        }).catch((err)=> console.log(err))
      }
    }).catch((err)=> console.log(err))
  }

  useEffect(()=>{
    var constraints = { audio: true, video: {optional: [{sourceId: selectedMode}] } };
    streamCamVideo(constraints)
    if (videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', function() {
        const { w, h } = getVideoSizeData(videoRef);
        canvasRef.current.width = w;
        canvasRef.current.height = h;
        setDimensions({
          w: w,
          h: h
        });
      });
    }
    if (started) {
      snap()
    }
  },[started, selectedMode])

  function snap() {
    if (context && videoRef.current && started) {
      //var video = document.querySelector("video");
      //video.pause()
      context.fillRect(0, 0, dimensions.w, dimensions.h);
      context.drawImage(videoRef.current, 0, 0, dimensions.w, dimensions.h);
      download()
    }
  }
  var download = function(){
    var link = document.createElement('a');
    link.download = 'filename.png';
    link.href = document.getElementById('canvas').toDataURL()
    //console.log(document.getElementById('canvas').toDataURL())
    setPredictImage(document.getElementById('canvas').toDataURL())
    send_input_image(document.getElementById('canvas').toDataURL("image/jpeg").split(';base64,')[1])
    setIsPaused(true)

    //link.click();
  }

  const render_video = () => {
    if (isPaused === false) {
      return (
        <div>
          <video autoPlay={true} id="videoElement" muted ref={videoRef}></video>
          <canvas id={"canvas"} crossOrigin="anonymous" ref={canvasRef}/>
          <button className="predictOrRetry" onClick={()=> {
            setStarted(true)
            setImgName(uuidv4())
          }}>Launch prediction</button>
        </div>
      )
    } else {
      //console.log(predictImage)
      return (
        <div>
        <img className="input_img" src={ predictImage } alt=""/>
        <button className="predictOrRetry" onClick={()=> {
          setStarted(false)
          setIsPaused(false)
          setImgLink("")
        }}>Restart</button>
      </div>
      )
    }
    
  }
  const render_output = () => {
    if (imgLink !== "") {
      return (
        <div className='output_container'>
            <h4>
            Output image :
            </h4>
            <img className="outputImg" src={imgLink}></img>
        </div>
      )
    }
    if (started && imgLink === "") {
      return (<span>Loading ...</span>)
    }
  }
  const render_selected = (selectedMode) => {
    if (selectedMode) {
      let filter = deviceInfos_list.filter(obj => {return obj.deviceId === selectedMode})
      if (filter.length > 0 ){
        return filter
      } else {
        return "no camera found !"
      }
    } else {
      return "Loading camera"
    }
    
  }

  return (
      <div className='videoStream'>
              <div className="dd-wrapper">
            <div className="dd-header">
                <button className="dd-header-title" onClick={()=>{SetIsDrpOpn(!isDrpOpn)}}>
                  <span>{render_selected(selectedMode)[0]["label"]}</span>
                  <img className={isDrpOpn ? "rotated" : ""} src={Chevron} alt=""></img>
                </button>
            </div>
            <div className="dd-list" style={{display: isDrpOpn ? "flex" : "none"}}>
                {
                deviceInfos_list.map((item) => {
                    if(selectedMode !== item.deviceId) {
                        return (
                            <button
                                className="dd-list-item"
                                onClick={()=>{
                                    SetSelectedMode(item.deviceId)
                                    SetIsDrpOpn(false)
                                    console.log("click")
                                    }
                                }>{item.label}</button>
                        )
                    }
                })
            }
            </div>
        </div>
        {render_video()}
        {render_output()}
    </div>
  );
}

export default VideoStream