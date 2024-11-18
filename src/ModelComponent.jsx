// src/ModelComponent.jsx
import React, { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';

export const ModelComponent = forwardRef(({ path, onClick, position }, ref) => {
  const { scene } = useGLTF(path);
  const clonedScene = scene.clone();
  
  return (
    <primitive
      object={scene}
      ref={ref}
      onClick={onClick}
      position={position.slice(0, 3)}
      rotation={position.slice(3).map(value => value * Math.PI / 2)}
    />
  );
});
