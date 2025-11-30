import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Galaxy = () => {
    const pointsRef = useRef();

    const parameters = {
        count: 8000, // Increased particle count
        size: 0.025, // Slightly larger particles
        radius: 5,
        branches: 2,
        spin: 3, // Increased for more coiling
        randomness: 0.2,
        randomnessPower: 3,
        insideColor: '#cc4020', // Less saturated
        outsideColor: '#1a2d6b'  // Less saturated
    };

    const { positions, colors } = useMemo(() => {
        const positions = new Float32Array(parameters.count * 3);
        const colors = new Float32Array(parameters.count * 3);

        const colorInside = new THREE.Color(parameters.insideColor);
        const colorOutside = new THREE.Color(parameters.outsideColor);

        for (let i = 0; i < parameters.count; i++) {
            const i3 = i * 3;

            // Position
            const radius = Math.random() * parameters.radius;
            const spinAngle = radius * parameters.spin;
            const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;

            const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
            const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
            const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

            positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
            positions[i3 + 1] = randomY; // Flattened galaxy
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

            // Color with opacity based on radius (brighter at edges)
            const normalizedRadius = radius / parameters.radius;
            const mixedColor = colorInside.clone();
            mixedColor.lerp(colorOutside, normalizedRadius);

            // Make colors brighter at the edges
            const brightnessFactor = 0.5 + (normalizedRadius * 0.5);

            colors[i3] = mixedColor.r * brightnessFactor;
            colors[i3 + 1] = mixedColor.g * brightnessFactor;
            colors[i3 + 2] = mixedColor.b * brightnessFactor;
        }

        return { positions, colors };
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += 0.001;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={parameters.count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={parameters.count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={parameters.size}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                vertexColors={true}
                transparent={true}
                opacity={0.8}
            />
        </points>
    );
};

const OpusLoopBackground = () => {
    return (
        <div style={{ width: '100%', height: '100%', background: '#050505' }}>
            <Canvas camera={{ position: [0, 5, 0], fov: 60, up: [0, 0, -1] }} onCreated={({ camera }) => camera.lookAt(0, 0, 0)}>
                <Galaxy />
            </Canvas>
        </div>
    );
};

export default OpusLoopBackground;
