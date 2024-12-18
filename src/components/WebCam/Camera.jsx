import React, { useState, useRef } from "react";
import { Camera } from "react-camera-pro";

const CameraComponent = () => {
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const handleStartCamera = () => {
    setIsCameraOn(true);
  };

  const handleStopCamera = () => {
    setIsCameraOn(false);
  };
  return (
    <div>
      {isCameraOn && <Camera ref={camera} />}
      <div className="camera-controls">
        <button onClick={handleStartCamera}>Start Camera Pro</button>
        <button onClick={handleStopCamera}>Stop Camera Pro</button>
      </div>

      <button onClick={() => setImage(camera.current.takePhoto())}>
        Take photo
      </button>
      <img src={image} alt="Taken photo" />
    </div>
  );
};

export default CameraComponent;
