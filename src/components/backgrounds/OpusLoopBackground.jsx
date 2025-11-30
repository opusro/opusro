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

            // Color with opacity based on radius (brighter at edges, darker at center)
            const normalizedRadius = radius / parameters.radius;
            const mixedColor = colorInside.clone();
            mixedColor.lerp(colorOutside, normalizedRadius);

            // Make colors much darker at center, brighter at edges
            const brightnessFactor = 0.2 + (normalizedRadius * 0.8); // Range from 0.2 to 1.0

            colors[i3] = mixedColor.r * brightnessFactor;
            colors[i3 + 1] = mixedColor.g * brightnessFactor;
            colors[i3 + 2] = mixedColor.b * brightnessFactor;
        }

        return { positions, colors };
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += 0.001;

            // Subtle particle movement
            const positions = pointsRef.current.geometry.attributes.position.array;
            const time = state.clock.elapsedTime;

            for (let i = 0; i < parameters.count; i++) {
                const i3 = i * 3;

                // Add very subtle sine wave movement to each particle
                // Use particle index to offset the wave for variety
                const offsetX = Math.sin(time * 0.3 + i * 0.01) * 0.015;
                const offsetY = Math.cos(time * 0.2 + i * 0.015) * 0.015;
                const offsetZ = Math.sin(time * 0.25 + i * 0.02) * 0.015;

                positions[i3] += offsetX;
                positions[i3 + 1] += offsetY;
                positions[i3 + 2] += offsetZ;
            }

            pointsRef.current.geometry.attributes.position.needsUpdate = true;
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
        <div style={{ width: '100%', height: '100%', background: '#050505', position: 'relative' }}>
            <Canvas camera={{ position: [0, -2, 5], fov: 60, up: [0, 0, -1] }} onCreated={({ camera }) => camera.lookAt(0, -2, 0)}>
                <Galaxy />
            </Canvas>
            {/* Vignette effect to fade edges to black */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(5,5,5,0.5) 70%, #050505 100%)',
                pointerEvents: 'none'
            }} />
        </div>
    );
};

export default OpusLoopBackground;
