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
            {/* Main box */}
            <mesh>
                <boxGeometry args={[0.4, 0.4, 0.4]} />
                <meshStandardMaterial
                    color="#e74c3c"
                    metalness={0.3}
                    roughness={0.4}
                    emissive="#e74c3c"
                    emissiveIntensity={0.2}
                />
            </mesh>
            {/* Edge glow */}
            <mesh>
                <boxGeometry args={[0.42, 0.42, 0.42]} />
                <meshBasicMaterial
                    color="#ff6b6b"
                    transparent={true}
                    opacity={0.3}
                    wireframe={true}
                />
            </mesh>
            {/* Ribbon horizontal */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.45, 0.08, 0.08]} />
                <meshStandardMaterial
                    color="#f1c40f"
                    metalness={0.5}
                    roughness={0.3}
                    emissive="#f1c40f"
                    emissiveIntensity={0.3}
                />
            </mesh>
            {/* Ribbon vertical */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.08, 0.45, 0.08]} />
                <meshStandardMaterial
                    color="#f1c40f"
                    metalness={0.5}
                    roughness={0.3}
                    emissive="#f1c40f"
                    emissiveIntensity={0.3}
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
            style={{ width: '100%', height: '100%', background: '#0a0a0a', cursor: 'pointer' }}
            onClick={handleClick}
        >
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <ambientLight intensity={0.8} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <pointLight position={[-10, -10, -10]} intensity={0.8} />
                <FloatingBoxes speedMultiplier={speedMultiplier} />
                <fog attach="fog" args={['#0a0a0a', 5, 20]} />
            </Canvas>
        </div>
    );
};

export default CynicalBackground;
