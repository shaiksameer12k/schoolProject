// // import React, { useState, useRef } from "react";
// // import Webcam from "react-webcam";

// // const WebcamComponent = () => {
// //   const [isCameraActive, setIsCameraActive] = useState(false);
// //   const webcamRef = useRef(null);

// //   const videoConstraints = {
// //     facingMode: "user", // or "environment" for back camera
// //   };

// //   // Start camera capture
// //   const startCamera = () => {
// //     setIsCameraActive(true);
// //   };

// //   // Stop camera capture
// //   const stopCamera = () => {
// //     setIsCameraActive(false);
// //   };

// //   // Capture the image
// //   const captureImage = () => {
// //     const imageSrc = webcamRef.current.getScreenshot();
// //     console.log(imageSrc); // Do something with the captured image (like save or display)
// //   };

// //   return (
// //     <div className="webcam-container">
// //       <div className="controls">
// //         <button onClick={startCamera}>Start Camera</button>
// //         <button onClick={stopCamera}>Stop Camera</button>
// //         <button onClick={captureImage}>Capture Image</button>
// //       </div>

// //       {/* Show webcam only if it's active */}
// //       {isCameraActive && (
// //         <Webcam
// //           audio={false}
// //           height={720}
// //           ref={webcamRef}
// //           screenshotFormat="image/jpeg"
// //           width={1280}
// //           videoConstraints={videoConstraints}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default WebcamComponent;

// import React, { useState, useRef } from "react";
// import Webcam from "react-webcam";

// const WebcamComponent = () => {
//   const [isCameraActive, setIsCameraActive] = useState(false);
//   const webcamRef = useRef(null);

//   const videoConstraints = {
//     facingMode: "user", // "user" for front camera, "environment" for back camera
//     width: 1280, // For better resolution on mobile devices
//     height: 720,
//   };

//   const startCamera = () => {
//     setIsCameraActive(true);
//   };

//   const stopCamera = () => {
//     setIsCameraActive(false);
//   };

//   const captureImage = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     console.log(imageSrc); // You can display or save this captured image
//   };

//   return (
//     <div className="webcam-container flex flex-col justify-center items-center p-4 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold mb-4">Mobile Camera Capture</h2>

//       {/* Camera start/stop buttons */}
//       <div className="controls mb-4 flex gap-4">
//         <button
//           onClick={startCamera}
//           className="bg-blue-500 text-white px-4 py-2 rounded-full"
//         >
//           Start Camera
//         </button>
//         <button
//           onClick={stopCamera}
//           className="bg-red-500 text-white px-4 py-2 rounded-full"
//         >
//           Stop Camera
//         </button>
//       </div>

//       {/* Display webcam if active */}
//       {isCameraActive && (
//         <Webcam
//           audio={false}
//           ref={webcamRef}
//           screenshotFormat="image/jpeg"
//           videoConstraints={videoConstraints}
//           width="100%" // Full width for responsiveness
//           height="auto"
//           className="border-2 border-gray-300 rounded-lg mb-4"
//         />
//       )}

//       {/* Capture Image Button */}
//       {isCameraActive && (
//         <button
//           onClick={captureImage}
//           className="bg-green-500 text-white px-6 py-2 rounded-full"
//         >
//           Capture Image
//         </button>
//       )}
//     </div>
//   );
// };

// export default WebcamComponent;

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const WebcamComponent = () => {
  const webcamRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const handleStartCamera = () => {
    setIsCameraOn(true);
  };

  const handleStopCamera = () => {
    setIsCameraOn(false);
  };

  const captureScreenshot = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
  };

  return (
    <div className="camera-container">
      <div className="camera-controls">
        <button onClick={handleStartCamera}>Start Camera</button>
        <button onClick={handleStopCamera}>Stop Camera</button>
        <button onClick={captureScreenshot}>Capture</button>
      </div>

      {isCameraOn && (
        <Webcam
          audio={false}
          height={360}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width="100%"
          videoConstraints={{
            facingMode: "environment", // For mobile camera access
          }}
        />
      )}
    </div>
  );
};

export default WebcamComponent;

