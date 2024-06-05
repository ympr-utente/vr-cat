import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CuboidCollider, RigidBody } from '@react-three/rapier'

export default function Boxer(props) {
  const pelotaBodyRef = useRef()
  const group = useRef()
  const [dir, setDir] = useState(false)
  const { nodes, materials, animations } = useGLTF('/assets/level-models/boxer/boxer.glb')
  const { actions } = useAnimations(animations, group)
  const speed = 4
  useEffect(() => {
    console.log(actions)
    actions["motionless_jab"].play()
  }, [])

  useFrame((state, delta) => {
    const currentPosition = pelotaBodyRef.current?.translation()

    let moveX = currentPosition?.x
    let moveY = currentPosition?.y

    if (currentPosition?.x >= 6) {
      setDir(false)
    }
    if (currentPosition?.x <= -6) {
      setDir(true)
    }

    if (dir){
      moveX += delta * speed;
    }
    else{
      moveX -= delta * speed;
    }
    

    pelotaBodyRef.current?.setTranslation({
      x:  moveX,
      y:  moveY,
      z:  currentPosition.z
    }, true)
  })

  return (
    <RigidBody ref={pelotaBodyRef} type="fixed" position={props.position} colliders={false}>
    <CuboidCollider args={[1, 8, 1]} position={[-0.46,0,-37.7]} />  {/* Ajusta el tamaño y la posición según sea necesario */}
    <CuboidCollider args={[1, 2, 3]} position={[0,1,-35.7]} />  {/* Ajusta el tamaño y la posición según sea necesario */}
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="573b106985ea467c844d6facc00c39a2fbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.lambert1}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <skinnedMesh
                    name="Object_8"
                    geometry={nodes.Object_8.geometry}
                    material={materials.Good_Right_GloveRight_Gloveblinn1}
                    skeleton={nodes.Object_8.skeleton}
                  />
                  <skinnedMesh
                    name="Object_9"
                    geometry={nodes.Object_9.geometry}
                    material={materials.Good_Right_GloveRight_Glovelambert2}
                    skeleton={nodes.Object_9.skeleton}
                  />
                  <group name="Object_6" />
                  <group name="dude" />
                  <group
                    name="R_Arm_IKHandle"
                    position={[-1.959, 2.627, 3.004]}
                    rotation={[0, -0.008, 0]}
                  />
                  <group name="L_Arm_IKHandle" position={[1.96, 2.604, 4.313]} />
                  <group name="R_Leg_IKHandle" position={[-0.975, -10.505, -1.819]} />
                  <group name="L_Leg_IKHandle" position={[0.916, -10.729, 2.265]} />
                  <group name="Head_Ctrl" position={[-0.018, 2.531, 0.013]} />
                  <group name="Body_Ctrl" position={[0, -0.541, 0.013]} rotation={[0, -0.433, 0]} />
                  <group
                    name="Hip_Ctrl"
                    position={[-0.008, -1.836, 0.013]}
                    rotation={[0, -0.433, 0]}
                  />
                  <group
                    name="R_Arm_Ctrl"
                    position={[-1.959, 2.626, 3.089]}
                    rotation={[0, -0.008, 0]}
                  />
                  <group name="L_Arm_Ctrl" position={[1.96, 2.604, 4.325]} />
                  <group name="R_Leg_Ctrl" position={[0, 0.195, -1.819]} />
                  <group name="L_Leg_Ctrl" position={[0, -0.029, 2.265]} />
                  <group name="R_Arm_PoleVector" position={[3.82, -8.93, 4.87]} />
                  <group name="L_Arm_PoleVector" position={[3.044, -6.421, -3.182]} />
                  <group name="R_Leg_PoleVector" position={[-4.137, 0, 0]} />
                  <group name="L_Leg_PoleVector" position={[-0.079, 0, 0]} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
    </RigidBody>
  )
}

useGLTF.preload('/assets/level-models/boxer/boxer.glb')