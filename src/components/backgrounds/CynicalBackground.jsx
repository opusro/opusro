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
            {/* Main box - dark gray */}
            <mesh>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial
                    color="#2c2c2c"
                    metalness={0.3}
                    roughness={0.6}
                />
            </mesh>
            {/* Ribbon horizontal - gold */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.55, 0.08, 0.08]} />
                <meshStandardMaterial
                    color="#d4af37"
                    metalness={0.6}
                    roughness={0.3}
                />
            </mesh>
            {/* Ribbon vertical - gold */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.08, 0.55, 0.08]} />
                <meshStandardMaterial
                    color="#d4af37"
                    metalness={0.6}
                    roughness={0.3}
                />
            </mesh>
            {/* Small bow on top */}
            <mesh position={[0, 0.3, 0]}>
                <sphereGeometry args={[0.1, 8, 8]} />
                <meshStandardMaterial
                    color="#c9a030"
                    metalness={0.5}
                    roughness={0.4}
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
