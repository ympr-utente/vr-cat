
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import React, { useEffect, useRef, useState } from 'react'

export function Villano1(props) {
  const pelotaBodyRef = useRef()
  const group = useRef()
  const [dir, setDir] = useState(false)
  const { nodes, materials, animations } = useGLTF('/assets/level-models/villano1/villano1.glb')
  const { actions } = useAnimations(animations, group)
  const speed = 4
  useEffect(() => {
    console.log(actions)
     actions["mixamo.com"].play()
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
       <CuboidCollider args={[1, 4 , 4]} position={[-0.5, 0.3, -45]} />  
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="dc4d815e8851442ca5013e9675a4c610fbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.M_Inimigo}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <group name="Object_6" rotation={[-1.562, -0.007, 0.021]} scale={44.77} />
                  <group name="inimigo" rotation={[-1.562, -0.007, 0.021]} scale={44.77} />
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

useGLTF.preload('/assets/level-models/villano1/villano1.glb')

