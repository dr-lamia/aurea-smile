import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Use a function to load STL models here for real-world use
const TeethMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useEffect(() => {
    // You can use STLLoader from three/examples/jsm/loaders/STLLoader for real STL
  }, []);
  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[3.2, 1.4, 0.6]} />
      <meshStandardMaterial color="#fffaf3" metalness={0.2} roughness={0.6} />
    </mesh>
  );
};

const ThreeDTeethViewer = () => (
  <div className="w-full h-96 bg-gray-900 rounded-lg border-4 border-gold relative">
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <TeethMesh />
      <OrbitControls />
    </Canvas>
    <div className="absolute top-2 right-2 flex gap-2">
      <button className="px-2 py-1 bg-gold text-ivory rounded">Reset View</button>
      <button className="px-2 py-1 bg-gold text-ivory rounded">Occlusal</button>
      <button className="px-2 py-1 bg-gold text-ivory rounded">Frontal</button>
      <a
        href="/api/propose-teeth"
        download="teeth_setup.stl"
        className="px-2 py-1 bg-gold text-ivory rounded"
      >
        Download STL
      </a>
    </div>
  </div>
);

export default ThreeDTeethViewer;