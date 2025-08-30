import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus, OrbitControls, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

// Animated 3D Resume representation
function FloatingResume() {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = React.useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        {/* Main resume "paper" */}
        <Box args={[2, 2.8, 0.1]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.9}
            emissive="#00d4ff"
            emissiveIntensity={hovered ? 0.1 : 0.05}
          />
        </Box>
        
        {/* Header section */}
        <Box args={[1.8, 0.3, 0.12]} position={[0, 1.1, 0.06]}>
          <meshStandardMaterial color="#00d4ff" />
        </Box>
        
        {/* Content lines */}
        {Array.from({ length: 8 }, (_, i) => (
          <Box 
            key={i} 
            args={[1.6 - (i % 3) * 0.2, 0.08, 0.12]} 
            position={[-0.1, 0.6 - i * 0.2, 0.06]}
          >
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#00d4ff" : "#a855f7"} 
              transparent 
              opacity={0.7}
            />
          </Box>
        ))}
      </group>
    </Float>
  );
}

// Particle system for background
function Particles() {
  const points = useRef<THREE.Points>(null);
  
  const particlesPosition = React.useMemo(() => {
    const positions = new Float32Array(300 * 3);
    
    for (let i = 0; i < 300; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05;
      points.current.rotation.y = state.clock.elapsedTime * 0.075;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#00d4ff"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
}

// Main 3D Scene component
export default function Scene3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
        
        <Particles />
        <FloatingResume />
        
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}