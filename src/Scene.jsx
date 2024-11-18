import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, TransformControls } from '@react-three/drei';
import { ModelComponent } from './ModelComponent';

const models = [
  { first: [9,0,0,0,0,0],    last: [0,0,0,0,0,0], path: '/models/finalParts/Bumper.glb' },
  // { first: [-12,-3,0,0,2,0],  last: [0,0,0,0,0,0], path: '/models/finalParts/Bumper.glb' },
  { first: [4,6,0,0,0,0],     last: [0,0,0,0,0,0], path: '/models/finalParts/FastenerTrim.glb' },
  { first: [0,0,0,0,0,0],     last: [0,0,0,0,0,0], path: '/models/finalParts/FloorPanel.glb' },
  { first: [-9.6,0,0,0,0,0],  last: [0,0,0,0,0,0], path: '/models/finalParts/HexBolt.glb' },
  { first: [-10.3,0,0,0,0,0], last: [0,0,0,0,0,0], path: '/models/finalParts/HexSocket.glb' },
  { first: [7,1,0,0,0,0],     last: [0,0,0,0,0,0], path: '/models/finalParts/InstrumentPanel.glb' },
  { first: [-7,0,0,0,0,0],    last: [0,0,0,0,0,0], path: '/models/finalParts/Insulator.glb' },
  { first: [5,0,-5,-1,0,0],   last: [0,0,0,0,0,0], path: '/models/finalParts/LeftDoor.glb' },
  { first: [1,0,-6,0,0,0],    last: [0,0,0,0,0,0], path: '/models/finalParts/LeftRoofRail.glb' },
  { first: [0,0,-4,-1,0,0],   last: [0,0,0,0,0,0], path: '/models/finalParts/LeftSidePanel.glb' },
  { first: [0,0,-2.5,0,0,0],  last: [0,0,0,0,0,0], path: '/models/finalParts/LeftSideRail.glb' },
  { first: [-8.4,0,0,0,0,0],  last: [0,0,0,0,0,0], path: '/models/finalParts/Nut.glb' },
  { first: [-5,-2,0,0,0,0],   last: [0,0,0,0,0,0], path: '/models/finalParts/Pipe.glb' },
  { first: [5,0,5,1,0,0],     last: [0,0,0,0,0,0], path: '/models/finalParts/RightDoor.glb' },
  { first: [1,0,6,0,0,0],     last: [0,0,0,0,0,0], path: '/models/finalParts/RightRoofRail.glb' },
  { first: [0,0,4,1,0,0],     last: [0,0,0,0,0,0], path: '/models/finalParts/RightSidePanel.glb' },
  { first: [0,0,2.5,0,0,0],   last: [0,0,0,0,0,0], path: '/models/finalParts/RightSideRail.glb' },
  { first: [4,5,0,0,0,0],     last: [0,0,0,0,0,0], path: '/models/finalParts/Roof.glb' },
  { first: [5,1,0,0,0,0],     last: [0,0,0,0,0,0], path: '/models/finalParts/SeatAssy.glb' },
  { first: [-9,0,0,0,0,0],    last: [0,0,0,0,0,0], path: '/models/finalParts/SrewBolt.glb' },
  { first: [-7.7,0,0,0,0,0],  last: [0,0,0,0,0,0], path: '/models/finalParts/Washer.glb' },
  { first: [-5,0,0,0,0,0],    last: [0,0,0,0,0,0], path: '/models/finalParts/Wheel.glb' },
  { first: [-6.1,0,0,0,0,0],  last: [0,0,0,0,0,0], path: '/models/finalParts/WheelInsulator.glb' },
  { first: [9,3,0,0,0,0],     last: [0,0,0,0,0,0], path: '/models/finalParts/WindScreen.glb' }  
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

      {models.map((model, index) => (
        <ModelComponent
          key={'model-'+index}
          path={model.path}
          ref={modelRefs.current[index]}
          onClick={(e) => handleModelClick(modelRefs.current[index], e)}
          position={model.first}
        />
      ))}

      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial transparent opacity={0} onClick={() => setSelected(null)} />
      </mesh>
    </Canvas>
  );
}