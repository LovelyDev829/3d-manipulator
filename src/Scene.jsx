import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, TransformControls } from '@react-three/drei';
import { ModelComponent } from './ModelComponent';

const models = [
  '/models/finalParts/Bumper.glb',
  '/models/finalParts/FastenerTrim.glb',
  '/models/finalParts/FloorPanel.glb',
  '/models/finalParts/HexBolt.glb',
  '/models/finalParts/HexSocket.glb',
  '/models/finalParts/InstrumentPanel.glb',
  '/models/finalParts/Insulator.glb',
  '/models/finalParts/LeftDoor.glb',
  '/models/finalParts/LeftRoofRail.glb',
  '/models/finalParts/LeftSidePanel.glb',
  '/models/finalParts/LeftSideRail.glb',
  '/models/finalParts/Nut.glb',
  '/models/finalParts/Pipe.glb',
  '/models/finalParts/RightDoor.glb',
  '/models/finalParts/RightRoofRail.glb',
  '/models/finalParts/RightSidePanel.glb',
  '/models/finalParts/RightSideRail.glb',
  '/models/finalParts/Roof.glb',
  '/models/finalParts/SeatAssy.glb',
  '/models/finalParts/SrewBolt.glb',
  '/models/finalParts/Washer.glb',
  '/models/finalParts/Wheel.glb',
  '/models/finalParts/WheelInsulator.glb',
  '/models/finalParts/WindScreen.glb'
];

export default function Scene() {
  const [selected, setSelected] = useState(null);
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const [controlMode, setControlMode] = useState("translate");
  
  const modelRefs = useRef(Array(models.length).fill().map(() => React.createRef()));

  const handleModelClick = (modelRef, event) => {
    event.stopPropagation();
    setSelected(modelRef.current);
  };

  const snapRotation = (object) => {
    object.rotation.x = Math.round(object.rotation.x / (Math.PI / 2)) * (Math.PI / 2);
    object.rotation.y = Math.round(object.rotation.y / (Math.PI / 2)) * (Math.PI / 2);
    object.rotation.z = Math.round(object.rotation.z / (Math.PI / 2)) * (Math.PI / 2);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Shift") {
      setControlMode("rotate");
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "Shift") {
      setControlMode("translate");
    }
  };

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
      <ambientLight intensity={0.25} />
      <directionalLight position={[2, 1.25, 5]} intensity={1.7} />
      <directionalLight position={[0, -1.25, 5]} intensity={1.7} />
      <directionalLight position={[0, -1.25, -5]} intensity={1.7} />
      <pointLight position={[0, 4, 0]} intensity={1.5} />
      <pointLight position={[-4, 2, 0]} intensity={1.5} />
      
      <OrbitControls enabled={controlsEnabled} />
      
      {selected && (
        <TransformControls
          object={selected}
          mode={controlMode}
          onMouseDown={() => setControlsEnabled(false)}
          onMouseUp={() => {
            if (controlMode === "rotate") {
              snapRotation(selected);
            }
            setControlsEnabled(true);
          }}
        />
      )}

      {models.map((path, index) => (
        <ModelComponent
          key={path}
          path={path}
          ref={modelRefs.current[index]}
          onClick={(e) => handleModelClick(modelRefs.current[index], e)}
        />
      ))}

      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial transparent opacity={0} onClick={() => setSelected(null)} />
      </mesh>
    </Canvas>
  );
}