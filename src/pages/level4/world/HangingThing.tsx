// HangingThing.tsx
import { Box, Sphere } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import {
  RigidBody,
  MeshCollider,
  useSphericalJoint
} from "@react-three/rapier";
import { useRef } from "react";

const HangingThing = (props: GroupProps) => {
  const anchor = useRef(null);
  const box = useRef(null);

  useSphericalJoint(anchor, box, [
    [0, 0, 0],
    [0, 2, 0]
  ]);

  return (
    <group {...props}>
      <RigidBody ref={anchor} />
      <RigidBody ref={box} position={[0, -2, 0]}>
        <Box args={[0.2, 4, 0.2]}>
          <meshPhysicalMaterial color={'#20AEB3'}/>
        </Box>
        <MeshCollider type="ball">
          <Sphere args={[0.5]} position={[0, -2, 0]}>
            <meshPhysicalMaterial color={'#20AEB3'}/>
          </Sphere>
        </MeshCollider>
      </RigidBody>
    </group>
  );
};

export default HangingThing;
