import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GiftBox = ({ position, speedMultiplier }) => {
    const groupRef = useRef();
    const currentSpeed = useRef(1);

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Smoothly interpolate speed
            currentSpeed.current = THREE.MathUtils.lerp(currentSpeed.current, speedMultiplier, delta * 2);

            groupRef.current.rotation.x += 0.002 * currentSpeed.current;
            groupRef.current.rotation.y += 0.003 * currentSpeed.current;
            groupRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.002 * currentSpeed.current;
        }
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Main box - Black */}
            <mesh>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial
                    color="#111111"
                    metalness={0.2}
                    roughness={0.8}
                />
            </mesh>
            {/* Ribbon 1 - Shiny Gray */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.1, 0.51, 0.51]} />
                <meshStandardMaterial
                    color="#888888"
                    metalness={0.8}
                    roughness={0.2}
                    emissive="#444444"
                    emissiveIntensity={0.2}
                />
            </mesh>
            {/* Ribbon 2 - Shiny Gray */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.51, 0.51, 0.1]} />
                <meshStandardMaterial
                    color="#888888"
                    metalness={0.8}
                    roughness={0.2}
                    emissive="#444444"
                    emissiveIntensity={0.2}
                />
            </mesh>
        </group>
    );
};

const FloatingBoxes = ({ speedMultiplier }) => {
    const boxes = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 20; i++) {
            temp.push({
                position: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5]
            });
        }
        return temp;
    }, []);

    return (
        <group>
            {boxes.map((box, i) => (
                <GiftBox key={i} position={box.position} speedMultiplier={speedMultiplier} />
            ))}
        </group>
    );
};

const CynicalBackground = () => {
    const [speedMultiplier, setSpeedMultiplier] = useState(1);

    const handleClick = () => {
        setSpeedMultiplier(5);
        setTimeout(() => setSpeedMultiplier(1), 1000);
    };

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at center, #1a1a1a 0%, #000000 70%)',
                cursor: 'pointer'
            }}
            onClick={handleClick}
        >
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <ambientLight intensity={0.8} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <pointLight position={[-10, -10, -10]} intensity={0.8} />
                <FloatingBoxes speedMultiplier={speedMultiplier} />
                <fog attach="fog" args={['#000000', 5, 20]} />
            </Canvas>
        </div>
    );
};

export default CynicalBackground;
