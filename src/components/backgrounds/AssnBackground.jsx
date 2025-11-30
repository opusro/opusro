import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Network = () => {
    const pointsRef = useRef();
    const linesRef = useRef();
    const signalsRef = useRef();
    const mouseRef = useRef(new THREE.Vector3());

    const count = 80;
    const connectionDistance = 4;

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp.push({
                position: new THREE.Vector3((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 12, 0),
                velocity: new THREE.Vector3((Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01, 0),
                originalPosition: new THREE.Vector3((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 12, 0) // Keep track for subtle movement
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
            speed: 0.01, // Slower speed
            opacity: 0
        }));
    }, []);

    useFrame((state) => {
        // Update mouse position
        const { x, y } = state.mouse;
        mouseRef.current.set(x * 10, y * 6, 0);

        // Update particles
        particles.forEach((particle, i) => {
            // Smooth drifting movement
            particle.position.x += particle.velocity.x;
            particle.position.y += particle.velocity.y;
            particle.position.z += particle.velocity.z;

            // Gentle oscillation
            const time = state.clock.elapsedTime;
            particle.position.x += Math.sin(time * 0.2 + i * 0.1) * 0.005;
            particle.position.y += Math.cos(time * 0.15 + i * 0.15) * 0.005;

            // Boundary wrapping
            if (Math.abs(particle.position.x) > 8) particle.velocity.x *= -1;
            if (Math.abs(particle.position.y) > 6) particle.velocity.y *= -1;
            if (Math.abs(particle.position.z) > 3) particle.velocity.z *= -1;

            // Mouse attraction (much gentler)
            if (mouseRef.current) { // Changed from 'mouse.current' to 'mouseRef.current'
                const dx = mouseRef.current.x * 5 - particle.position.x;
                const dy = mouseRef.current.y * 5 - particle.position.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 3) {
                    particle.position.x += dx * 0.002;
                    particle.position.y += dy * 0.002;
                }
            }
        });

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

            // Spawn signals randomly
            if (Math.random() < 0.05) {
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

                        // Fade in/out using sine wave
                        const opacity = Math.sin(signal.progress * Math.PI);
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

    // Custom shader material for signals to handle per-vertex opacity
    const signalMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color('#ffffff') }
            },
            vertexShader: `
        attribute float alpha;
        varying float vAlpha;
        void main() {
          vAlpha = alpha;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 6.0; // Larger size
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
            fragmentShader: `
        uniform vec3 color;
        varying float vAlpha;
        void main() {
          if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.5) discard; // Circle shape
          gl_FragColor = vec4(color, vAlpha);
        }
      `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });
    }, []);

    // Texture for round nodes
    const texture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const context = canvas.getContext('2d');
        context.beginPath();
        context.arc(16, 16, 16, 0, 2 * Math.PI);
        context.fillStyle = '#ffffff';
        context.fill();
        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }, []);

    return (
        <>
            <points ref={pointsRef}>
                <bufferGeometry />
                <pointsMaterial size={0.15} color="#ffffff" map={texture} transparent opacity={0.8} alphaTest={0.5} />
            </points>
            <lineSegments ref={linesRef}>
                <bufferGeometry />
                <lineBasicMaterial color="#ffffff" transparent opacity={0.05} />
            </lineSegments>
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
