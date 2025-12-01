import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Network = () => {
    const pointsRef = useRef();
    const linesRef = useRef();
    const signalsRef = useRef();
    const mouseRef = useRef(new THREE.Vector3());

    const count = 80;
    const connectionDistance = 3; // Reduced distance for tighter connections

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp.push({
                position: new THREE.Vector3((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 12, 0),
                velocity: new THREE.Vector3((Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01, 0),
                originalPosition: new THREE.Vector3((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 12, 0)
            });
        }
        return temp;
    }, []);

    // Signals traveling along lines
    const signals = useMemo(() => {
        return Array(20).fill().map(() => ({
            active: false,
            start: new THREE.Vector3(),
            end: new THREE.Vector3(),
            progress: 0,
            speed: 0.08, // Much faster speed (meteorite effect)
            opacity: 0
        }));
    }, []);

    useFrame((state) => {
        // ... (mouse update code remains same)

        // ... (particle update code remains same)

        // Update geometry (Nodes as circles/points)
        if (pointsRef.current) {
            const positions = new Float32Array(count * 3);
            particles.forEach((p, i) => {
                positions[i * 3] = p.position.x;
                positions[i * 3 + 1] = p.position.y;
                positions[i * 3 + 2] = p.position.z;
            });
            pointsRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        }

        // Update lines and manage signals
        if (linesRef.current) {
            const linePositions = [];
            const connections = [];

            for (let i = 0; i < count; i++) {
                for (let j = i + 1; j < count; j++) {
                    const dist = particles[i].position.distanceTo(particles[j].position);
                    // Only connect if close enough
                    if (dist < connectionDistance) {
                        linePositions.push(
                            particles[i].position.x, particles[i].position.y, particles[i].position.z,
                            particles[j].position.x, particles[j].position.y, particles[j].position.z
                        );
                        connections.push({ start: particles[i].position, end: particles[j].position });
                    }
                }
            }
            linesRef.current.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

            // Spawn signals randomly on existing connections
            if (Math.random() < 0.1) { // Increased spawn rate slightly
                const signal = signals.find(s => !s.active);
                if (signal && connections.length > 0) {
                    const conn = connections[Math.floor(Math.random() * connections.length)];
                    signal.active = true;
                    signal.start.copy(conn.start);
                    signal.end.copy(conn.end);
                    signal.progress = 0;
                }
            }
        }

        // Update signals
        if (signalsRef.current) {
            const signalPositions = [];
            const signalOpacities = [];

            signals.forEach(signal => {
                if (signal.active) {
                    signal.progress += signal.speed;
                    if (signal.progress >= 1) {
                        signal.active = false;
                    } else {
                        const pos = new THREE.Vector3().lerpVectors(signal.start, signal.end, signal.progress);
                        signalPositions.push(pos.x, pos.y, pos.z);

                        // Fade out quickly like a burning meteorite
                        // High opacity at start, fading to 0 at end
                        const opacity = 1.0 - Math.pow(signal.progress, 2);
                        signalOpacities.push(opacity);
                    }
                }
            });

            // Need at least one point to avoid error if no signals
            if (signalPositions.length === 0) {
                signalPositions.push(0, 0, 0);
                signalOpacities.push(0);
            }

            signalsRef.current.geometry.setAttribute('position', new THREE.Float32BufferAttribute(signalPositions, 3));
            signalsRef.current.geometry.setAttribute('alpha', new THREE.Float32BufferAttribute(signalOpacities, 1));
        }
    });

    // ... (shader material remains same)

    return (
        <>
            <points ref={pointsRef}>
                <bufferGeometry />
                {/* Halved size from 0.15 to 0.075 */}
                <pointsMaterial size={0.075} color="#ffffff" map={texture} transparent opacity={0.9} alphaTest={0.5} />
            </points>
            <lineSegments ref={linesRef}>
                <bufferGeometry />
                <lineBasicMaterial color="#ffffff" transparent opacity={0.15} />
            </points>
            <points ref={signalsRef} material={signalMaterial}>
                <bufferGeometry />
            </points>
        </>
    );
    <points ref={signalsRef} material={signalMaterial}>
        <bufferGeometry />
    </points>
        </>
    );
};

const AssnBackground = () => {
    return (
        <div style={{ width: '100%', height: '100%', background: '#000000' }}>
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                <Network />
            </Canvas>
        </div>
    );
};

export default AssnBackground;
