import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, TransformControls } from '@react-three/drei';
import { ModelComponent } from './ModelComponent';

export default function Scene() {
  const [selected, setSelected] = useState(null);
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const [controlMode, setControlMode] = useState("translate"); // Default to translate
  const model1Ref = useRef();
  const model2Ref = useRef();

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
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

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
      <ModelComponent
        path="/models/model1.glb"
        ref={model1Ref}
        onClick={(e) => handleModelClick(model1Ref.current, e)}
      />
      <ModelComponent
        path="/models/model2.glb"
        ref={model2Ref}
        onClick={(e) => handleModelClick(model2Ref.current, e)}
      />

      {/* Background plane for deselection */}
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial transparent opacity={0} onClick={() => setSelected(null)} />
      </mesh>
    </Canvas>
  );
}