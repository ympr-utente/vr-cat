import { RigidBody, quat, vec3 } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { socket } from "../../socket/socket-manager";

/**
 * Player2 component controls a player character in a 3D environment.
 * It handles synchronization of player movements with a server via WebSockets.
 *
 * @component
 * @returns {JSX.Element} The Player2 component.
 */
export default function Player2() {
  // Refs for the rigid body and player mesh
  const rbPlayer2Ref = useRef();
  const player2Ref = useRef();

  /**
   * Moves the player to a new position and rotation.
   *
   * @param {Object} transforms - The transformation data.
   * @param {Array} transforms.translation - The new translation (position) as a 3-element array.
   * @param {Array} transforms.rotation - The new rotation as a quaternion array.
   */
  const movePlayer = (transforms) => {
    const { translation, rotation } = transforms;

    const newTranslation = vec3(translation);
    const newRotation = quat(rotation);

    rbPlayer2Ref.current?.setTranslation(newTranslation, true);
    rbPlayer2Ref.current?.setRotation(newRotation, true);
  };

  useEffect(() => {
    // Set up the WebSocket event listener for "player-moving"
    socket.on("player-moving", (transforms) => movePlayer(transforms));

    // Clean up the event listener on component unmount
    return () => {
      socket.off("player-moving", (transforms) => movePlayer(transforms));
    };
  }, []);

  return (
    <RigidBody ref={rbPlayer2Ref} position={[0, 2, 2]}>
      <mesh ref={player2Ref}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial color={0x960056} />
      </mesh>
    </RigidBody>
  );
}
