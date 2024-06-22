
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import React, { useEffect, useRef, useState } from 'react'

export default function Villano2(props) {

  const pelotaBodyRef = useRef()
  const group = useRef()
  const [dir, setDir] = useState(false)
  const { nodes, materials, animations } = useGLTF('/assets/level-models/villano2/villano2.glb')
  const { actions } = useAnimations(animations, group)
  const speed = 4
  useEffect(() => {
    console.log(actions)
      actions["Armature|Baked_Pinza_Slash"].play()
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
       <CuboidCollider args={[3, 2 , 4]} position={[-1, 0.5, -30]} />  

    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="653ef3703b1845c89e534a8adcaa7d57fbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Patas" rotation={[-Math.PI / 2, 0, -Math.PI]} scale={100} />
                <group name="Armature" rotation={[-Math.PI / 2, 0, -Math.PI]} scale={100}>
                  <group name="Object_6">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_9"
                      geometry={nodes.Object_9.geometry}
                      material={materials.Patas}
                      skeleton={nodes.Object_9.skeleton}
                    />
                    <skinnedMesh
                      name="Object_10"
                      geometry={nodes.Object_10.geometry}
                      material={materials.Cuerpo_y_Cabeza}
                      skeleton={nodes.Object_10.skeleton}
                    />
                    <skinnedMesh
                      name="Object_11"
                      geometry={nodes.Object_11.geometry}
                      material={materials.Luz_blanca}
                      skeleton={nodes.Object_11.skeleton}
                    />
                    <skinnedMesh
                      name="Object_12"
                      geometry={nodes.Object_12.geometry}
                      material={materials.Brazos}
                      skeleton={nodes.Object_12.skeleton}
                    />
                    <skinnedMesh
                      name="Object_13"
                      geometry={nodes.Object_13.geometry}
                      material={materials.Luz_Roja}
                      skeleton={nodes.Object_13.skeleton}
                    />
                    <group name="Object_8" rotation={[-Math.PI / 2, 0, -Math.PI]} scale={100} />
                  </group>
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

useGLTF.preload('/assets/level-models/villano2/villano2.glb')
