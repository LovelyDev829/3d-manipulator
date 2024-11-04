// src/ModelComponent.jsx
import React, { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';

export const ModelComponent = forwardRef(({ path, onClick }, ref) => {
  const { scene } = useGLTF(path);
  
  return (
    <primitive
      object={scene}
      ref={ref}
      onClick={onClick}
      position={[0, 0, 0]}
    />
  );
});
