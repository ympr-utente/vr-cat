import React, { useRef } from 'react';
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Spinner = ({ speed = 1, initialShift = Math.random() * 10, invert = false, position, ...props }) => {
  const obstacleRef = useRef();
  const rotation = useRef(new THREE.Quaternion());

  useFrame(({ clock }) => {
    if (obstacleRef.current) {
      const time = clock.getElapsedTime();
      const rotationAngle = (time * speed + initialShift) * (invert ? -1 : 1);
      const rotationQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, rotationAngle, 0));
      obstacleRef.current.setRotation(rotationQuaternion);
    }
  });

  return (
    <RigidBody ref={obstacleRef} position={position} type="kinematic">
      <mesh castShadow receiveShadow {...props}> <cylinderGeometry args={[1, 0.25, 1.5]}/>
        <meshStandardMaterial color={'#88E6FF'}/>
        <mesh castShadow receiveShadow rotation={[0, 0, -Math.PI / 2]}>
          <cylinderGeometry args={[0.25, 0.25, 13]} />
          <meshStandardMaterial color={'white'}/>
        </mesh>
      </mesh>
    </RigidBody>
  );
};

export default Spinner;
