import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, TransformControls } from '@react-three/drei';
import { ModelComponent } from './ModelComponent';

export default function Scene() {
  const [selected, setSelected] = useState(null);
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const [controlMode, setControlMode] = useState("translate"); // Default to translate
  const model01Ref = useRef();
  const model02Ref = useRef();
  const model03Ref = useRef();
  const model04Ref = useRef();
  const model05Ref = useRef();
  const model06Ref = useRef();
  const model07Ref = useRef();
  const model08Ref = useRef();
  const model09Ref = useRef();
  const model10Ref = useRef();
  const model11Ref = useRef();
  const model12Ref = useRef();
  const model13Ref = useRef();
  const model14Ref = useRef();
  const model15Ref = useRef();
  const model16Ref = useRef();
  const model17Ref = useRef();
  const model18Ref = useRef();
  const model19Ref = useRef();
  const model20Ref = useRef();
  const model21Ref = useRef();
  const model22Ref = useRef();
  const model23Ref = useRef();
  const model24Ref = useRef();

  // Click handler for model selection
  const handleModelClick = (model, event) => {
    event.stopPropagation();
    setSelected(model);
  };

  // Snap rotation to the nearest 90 degrees
  const snapRotation = (object) => {
    object.rotation.x = Math.round(object.rotation.x / (Math.PI / 2)) * (Math.PI / 2);
    object.rotation.y = Math.round(object.rotation.y / (Math.PI / 2)) * (Math.PI / 2);
    object.rotation.z = Math.round(object.rotation.z / (Math.PI / 2)) * (Math.PI / 2);
  };

  // Handle key down events
  const handleKeyDown = (event) => {
    if (event.key === "Shift") {
      setControlMode("rotate"); // Change to rotate mode when Shift is pressed
    }
  };

  // Handle key up events
  const handleKeyUp = (event) => {
    if (event.key === "Shift") {
      setControlMode("translate"); // Revert back to translate mode when Shift is released
    }
  };

  // Add event listeners for keydown and keyup
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <Canvas style={{ width: '100vw', height: '100vh' }}>
      {/* Lights */}
      <ambientLight intensity={1.25} /> {/* Soft ambient light */}
      <directionalLight position={[2, 1.25, 5]} intensity={0.7} /> {/* Directional light */}
      <directionalLight position={[0, -1.25, 5]} intensity={0.7} /> {/* Additional directional light */}
      <directionalLight position={[0, -1.25, -5]} intensity={0.7} /> {/* Another directional light */}
      <pointLight position={[0, 4, 0]} intensity={0.5} /> {/* Point light */}
      <pointLight position={[-4, 2, 0]} intensity={0.5} /> {/* Additional point light */}

      {/* Orbit Controls */}
      <OrbitControls enabled={controlsEnabled} />

      {/* Transform Controls */}
      {selected && (
        <TransformControls
          object={selected}
          mode={controlMode} // Use the current control mode
          onMouseDown={() => setControlsEnabled(false)} // Disable OrbitControls when moving starts
          onMouseUp={() => {
            if (controlMode === "rotate") {
              snapRotation(selected); // Snap rotation on mouse release
            }
            setControlsEnabled(true); // Re-enable OrbitControls after moving or rotating
          }}
        />
      )}

      {/* Models with individual click handlers */}
      <ModelComponent path="/models/finalParts/Bumper.glb" ref={model01Ref} onClick={(e) => handleModelClick(model01Ref.current, e)} />
      <ModelComponent path="/models/finalParts/FastenerTrim.glb" ref={model02Ref} onClick={(e) => handleModelClick(model02Ref.current, e)} />
      <ModelComponent path="/models/finalParts/FloorPanel.glb" ref={model03Ref} onClick={(e) => handleModelClick(model03Ref.current, e)} />
      <ModelComponent path="/models/finalParts/HexBolt.glb" ref={model04Ref} onClick={(e) => handleModelClick(model04Ref.current, e)} />
      <ModelComponent path="/models/finalParts/HexSocket.glb" ref={model05Ref} onClick={(e) => handleModelClick(model05Ref.current, e)} />
      <ModelComponent path="/models/finalParts/InstrumentPanel.glb" ref={model06Ref} onClick={(e) => handleModelClick(model06Ref.current, e)} />
      <ModelComponent path="/models/finalParts/Insulator.glb" ref={model07Ref} onClick={(e) => handleModelClick(model07Ref.current, e)} />
      <ModelComponent path="/models/finalParts/LeftDoor.glb" ref={model08Ref} onClick={(e) => handleModelClick(model08Ref.current, e)} />
      <ModelComponent path="/models/finalParts/LeftRoofRail.glb" ref={model09Ref} onClick={(e) => handleModelClick(model09Ref.current, e)} />
      <ModelComponent path="/models/finalParts/LeftSidePanel.glb" ref={model10Ref} onClick={(e) => handleModelClick(model10Ref.current, e)} />
      <ModelComponent path="/models/finalParts/LeftSideRail.glb" ref={model11Ref} onClick={(e) => handleModelClick(model11Ref.current, e)} />
      <ModelComponent path="/models/finalParts/Nut.glb" ref={model12Ref} onClick={(e) => handleModelClick(model12Ref.current, e)} />
      <ModelComponent path="/models/finalParts/Pipe.glb" ref={model13Ref} onClick={(e) => handleModelClick(model13Ref.current, e)} />
      <ModelComponent path="/models/finalParts/RightDoor.glb" ref={model14Ref} onClick={(e) => handleModelClick(model14Ref.current, e)} />
      <ModelComponent path="/models/finalParts/RightRoofRail.glb" ref={model15Ref} onClick={(e) => handleModelClick(model15Ref.current, e)} />
      <ModelComponent path="/models/finalParts/RightSidePanel.glb" ref={model16Ref} onClick={(e) => handleModelClick(model16Ref.current, e)} />
      <ModelComponent path="/models/finalParts/RightSideRail.glb" ref={model17Ref} onClick={(e) => handleModelClick(model17Ref.current, e)} />
      <ModelComponent path="/models/finalParts/Roof.glb" ref={model18Ref} onClick={(e) => handleModelClick(model18Ref.current, e)} />
      <ModelComponent path="/models/finalParts/SeatAssy.glb" ref={model19Ref} onClick={(e) => handleModelClick(model19Ref.current, e)} />
      <ModelComponent path="/models/finalParts/SrewBolt.glb" ref={model20Ref} onClick={(e) => handleModelClick(model20Ref.current, e)} />
      <ModelComponent path="/models/finalParts/Washer.glb" ref={model21Ref} onClick={(e) => handleModelClick(model21Ref.current, e)} />
      <ModelComponent path="/models/finalParts/Wheel.glb" ref={model22Ref} onClick={(e) => handleModelClick(model22Ref.current, e)} />
      <ModelComponent path="/models/finalParts/WheelInsulator.glb" ref={model23Ref} onClick={(e) => handleModelClick(model23Ref.current, e)} />
      <ModelComponent path="/models/finalParts/WindScreen.glb" ref={model24Ref} onClick={(e) => handleModelClick(model24Ref.current, e)} />
      

      {/* Background plane for deselection */}
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial transparent opacity={0} onClick={() => setSelected(null)} />
      </mesh>
    </Canvas>
  );
}