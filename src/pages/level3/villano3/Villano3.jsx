
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import React, { useEffect, useRef, useState } from 'react'

export default function Villano3(props) {
  const pelotaBodyRef = useRef()
 const group = useRef()
 const [dir, setDir] = useState(false)
 const { nodes, materials, animations } = useGLTF('/assets/level-models/villano3/villano3.glb')
 const { actions } = useAnimations(animations, group)
 const speed = 4
 useEffect(() => {
   console.log(actions)
     actions["MG_MeleeCombo_Full_Done"].play()
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
    <CuboidCollider args={[1, 1 , 1]} position={[-0.46,0,-41.7]} />  
    <CuboidCollider args={[1, 1, 1]} position={[-0.46,1.2,-40]} /> 
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="e650e1b584124562a848279fdd747669fbx" rotation={[Math.PI / 2, 0, 0]}>
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
                    name="Object_9"
                    geometry={nodes.Object_9.geometry}
                    material={materials.lambert1}
                    skeleton={nodes.Object_9.skeleton}
                  />
                  <group name="Object_6" position={[-1.456, 0.814, -0.009]} />
                  <group name="Object_8" />
                  <group name="Dark_Laser" position={[-1.456, 0.814, -0.009]} />
                  <group name="Moff_Gideon" />
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

useGLTF.preload('/assets/level-models/villano3/villano3.glb')