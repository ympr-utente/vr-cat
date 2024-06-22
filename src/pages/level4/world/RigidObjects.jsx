import { Text } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  CylinderCollider,
  RigidBody,
} from "@react-three/rapier";

function RigidObjects() {
  return (
    <>
      {/* Rigid body boxes */}
      <RigidBody position={[-2, 4, -12]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color={"lightsteelblue"} />
        </mesh>
      </RigidBody>
      <RigidBody position={[-2, 4, -11]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color={"lightsteelblue"} />
        </mesh>
      </RigidBody>
      <RigidBody position={[-2, 4, -9]} colliders={false}>
        <group>
          <Text
            scale={0.5}
            color="black"
            maxWidth={10}
            textAlign="center"
            position={[0, 1, 0]}
            rotation={[0, -Math.PI / 2, 0]}
          >
            mass: 1
          </Text>
          <CuboidCollider args={[0.5, 0.5, 0.5]} />
          <mesh receiveShadow castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"lightsteelblue"} />
          </mesh>
        </group>
      </RigidBody>
      <RigidBody position={[-2, 4, -13]} colliders={false}>
        <group>
          <Text
            scale={0.5}
            color="black"
            maxWidth={10}
            textAlign="center"
            position={[0, 1.5, 0]}
            rotation={[0, -Math.PI / 2, 0]}
          >
            mass: 3.375
          </Text>
          <CuboidCollider args={[0.5, 0.5, 0.5]} />
         <mesh receiveShadow castShadow>
            <boxGeometry args={[1.5, 1.5, 1.5]}/>
            <meshStandardMaterial color={"lightsteelblue"} />
          </mesh>
        </group>
      </RigidBody>
    </>
  );
}

export default RigidObjects;
