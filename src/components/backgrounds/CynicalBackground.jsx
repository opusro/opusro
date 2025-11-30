```
import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

            <mesh position={[0, 0, 0]} scale={[0.2, 1.02, 1.02]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshPhysicalMaterial color="#444" roughness={0.3} metalness={0.5} />
            </mesh>
        </group>
    );
};

const FloatingBoxes = ({ speedMultiplier }) => {
    const boxes = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 20; i++) {
            temp.push({
                position: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5],
                rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
                scale: Math.random() * 0.5 + 0.5
            });
        }
        return temp;
    }, []);

    return (
        <group>
            {boxes.map((box, i) => (
                <GiftBox key={i} {...box} speedMultiplier={speedMultiplier} />
            ))}
        </group>
    );
};

const CynicalBackground = () => {
    const [speedMultiplier, setSpeedMultiplier] = useState(1);

    const handleClick = () => {
        setSpeedMultiplier(5);
        setTimeout(() => setSpeedMultiplier(1), 1000); // Reset after 1 second
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
