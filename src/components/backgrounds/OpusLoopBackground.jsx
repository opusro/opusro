import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Galaxy = () => {
    const pointsRef = useRef();

    const parameters = {
        count: 5000,
        size: 0.02,
        radius: 5,
        branches: 2,
        spin: 3, // Increased for more coiling
        randomness: 0.2,
        randomnessPower: 3,
        insideColor: '#cc4020', // Less saturated
        outsideColor: '#1a2d6b'  // Less saturated
    };

    const { positions, colors, alphas } = useMemo(() => {
        const positions = new Float32Array(parameters.count * 3);
        const colors = new Float32Array(parameters.count * 3);
        const alphas = new Float32Array(parameters.count);

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

            // Color
            const mixedColor = colorInside.clone();
            mixedColor.lerp(colorOutside, radius / parameters.radius);

            colors[i3] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;

            // Alpha - transparent at center, opaque at edges
            const normalizedRadius = radius / parameters.radius;
            alphas[i] = normalizedRadius * normalizedRadius; // Quadratic falloff for smoother gradient
        }

        return { positions, colors, alphas };
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
                <bufferAttribute
                    attach="attributes-alpha"
                    count={parameters.count}
                    array={alphas}
                    itemSize={1}
                />
            </bufferGeometry>
            <shaderMaterial
                vertexShader={`
                    attribute float alpha;
                    attribute vec3 color;
                    varying vec3 vColor;
                    varying float vAlpha;
                    
                    void main() {
                        vColor = color;
                        vAlpha = alpha;
                        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                        gl_PointSize = ${parameters.size} * (300.0 / -mvPosition.z);
                        gl_Position = projectionMatrix * mvPosition;
                    }
                `}
                fragmentShader={`
                    varying vec3 vColor;
                    varying float vAlpha;
                    
                    void main() {
                        float dist = length(gl_PointCoord - vec2(0.5));
                        if (dist > 0.5) discard;
                        gl_FragColor = vec4(vColor, vAlpha);
                    }
                `}
                transparent={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                vertexColors={true}
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
