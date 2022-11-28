import React, { useRef, useEffect } from 'react';
import Paper from 'paper';
import polygon from './polygon';
import test from "../imgs/0a319b48_d1241b81-421b-4aa5-a7bc-6ccb11e0fb48_multiple.jpg"

const Canvas = props => {
  
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current;
    Paper.setup(canvas);
    polygon();
  }, []);
  
  return <canvas ref={canvasRef} {...props} id="canvas" resize="false" style={{backgroundImage: `url(${test})`,backgroundPosition: 'center',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat'}}/>
}

export default Canvas;