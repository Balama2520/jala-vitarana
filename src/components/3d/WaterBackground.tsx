"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, Stars, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function AnimatedSphere({ position, scale, color, speed, distort }: { position: [number, number, number]; scale: number; color: string; speed: number; distort: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
        }
    });

    return (
        <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
            <Sphere ref={meshRef} args={[1, 128, 128]} scale={scale} position={position}>
                <MeshDistortMaterial
                    color={color}
                    attach="material"
                    distort={distort}
                    speed={2}
                    roughness={0.1}
                    metalness={0.9}
                    opacity={0.6}
                    transparent
                />
            </Sphere>
        </Float>
    );
}

export default function WaterBackground() {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden bg-slate-950">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950 z-[1]" />
            <Canvas className="h-full w-full" camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={2} color="#20B2AA" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#001F3F" />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <Sparkles count={200} scale={10} size={2} speed={0.4} opacity={0.5} color="#20B2AA" />

                {/* Main Cybernetic Organs */}
                <AnimatedSphere
                    position={[0, 0, -2]}
                    scale={2}
                    color="#1a3c40"
                    speed={1.5}
                    distort={0.4}
                />

                <AnimatedSphere
                    position={[-4, 2, -5]}
                    scale={1.5}
                    color="#0f2a35"
                    speed={2}
                    distort={0.3}
                />

                <AnimatedSphere
                    position={[4, -2, -5]}
                    scale={1.5}
                    color="#0f2a35"
                    speed={2.5}
                    distort={0.3}
                />

                {/* Bioluminescent Cores */}
                <Float speed={4} rotationIntensity={1} floatIntensity={2}>
                    <Sphere args={[0.2, 32, 32]} position={[0, 0, 1]}>
                        <meshStandardMaterial
                            color="#22d3ee"
                            emissive="#22d3ee"
                            emissiveIntensity={2}
                            roughness={0}
                            toneMapped={false}
                        />
                    </Sphere>
                </Float>
            </Canvas>
        </div>
    );
}
