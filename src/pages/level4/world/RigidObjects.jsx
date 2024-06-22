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
      <RigidBody position={[-2, 4, -12]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
      </RigidBody>
      <RigidBody position={[-2, 4, -11]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color={"blue"} />
        </mesh>
      </RigidBody>
      <RigidBody position={[-2, 4, -9]} colliders={false}>
      </RigidBody>

    </>
  );
}

export default RigidObjects;
