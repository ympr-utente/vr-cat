
import React, { useEffect, useRef } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'

export default function Person(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/assets/models/lowpolyPerson/lowpolyPerson.glb')
  const { actions } = useAnimations(animations, group)
  useEffect(() => {
    console.log(actions)
    actions["WALK"].play()
  }, [])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Armature_26" position={[0, 4.431, 0]}>
                <group name="GLTF_created_0">
                  <primitive object={nodes.GLTF_created_0_rootJoint} />
                  <skinnedMesh
                    castShadow={true}
                    receiveShadow={true}
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.skin}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <skinnedMesh
                    castShadow={true}
                    receiveShadow={true}
                    name="Object_8"
                    geometry={nodes.Object_8.geometry}
                    material={materials.material}
                    skeleton={nodes.Object_8.skeleton}
                  />
                  <skinnedMesh
                    castShadow={true}
                    receiveShadow={true}
                    name="Object_9"
                    geometry={nodes.Object_9.geometry}
                    material={materials.Shirt}
                    skeleton={nodes.Object_9.skeleton}
                  />
                  <skinnedMesh
                    castShadow={true}
                    receiveShadow={true}
                    name="Object_10"
                    geometry={nodes.Object_10.geometry}
                    material={materials.Jeans}
                    skeleton={nodes.Object_10.skeleton}
                  />
                  <skinnedMesh
                    castShadow={true}
                    receiveShadow={true}
                    name="Object_11"
                    geometry={nodes.Object_11.geometry}
                    material={materials.Shoes}
                    skeleton={nodes.Object_11.skeleton}
                  />
                  <skinnedMesh
                    castShadow={true}
                    receiveShadow={true}
                    name="Object_12"
                    geometry={nodes.Object_12.geometry}
                    material={materials.Hair}
                    skeleton={nodes.Object_12.skeleton}
                  />
                  <group name="Cube_25" />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/lowpolyPerson/lowpolyPerson.glb')