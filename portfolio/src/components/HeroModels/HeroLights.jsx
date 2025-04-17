import * as THREE from 'three';
import React from 'react';
import { useEffect } from 'react';

export function HeroLights() {
    useEffect(() => {
        const rectLight = new THREE.RectAreaLight('#ff3b31', 65, 2.5, 1.65);
        rectLight.position.set(1, 4, -2);
        rectLight.rotation.set(-0.1, Math.PI, 0);
        
        // Clean up
        return () => {
            rectLight.dispose();
        };
    }, []);

    return (
        <>
            <primitive object={new THREE.RectAreaLight()} 
                width={2.5}
                height={1.65}
                intensity={65}
                color={'#ff3b31'}
                rotation={[-0.1, Math.PI, 0]}
                position={[1, 4, -2]}
            />
            <spotLight
                position={[2, 5, 6]}
                intensity={100}
                angle={0.2}
                penumbra={0.1}
                color="white"
                castShadow
            />
            <spotLight
                position={[4, 5, 4]}
                intensity={40}
                angle={0.3}
                penumbra={0.5}
                color="4cc9f0"
                castShadow
            />
            <spotLight
                position={[-3, 5, 5]}
                intensity={60}
                angle={0.4}
                penumbra={1}
                color="9d4edd"
                castShadow
            />

            <pointLight
                position={[0, 1, 0]}
                intensity={10}
                color="#7209b7"
                castShadow
            />
            <pointLight
                position={[1, 2, -2]}
                intensity={10}
                color="#0d00a4"
                castShadow
            />

        </>
    );
}

export default HeroLights;