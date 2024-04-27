import { Cloud, Environment, Sky, Sparkles, Stars } from "@react-three/drei";

export default function Environments() {
    return (
        <>
            <Environment preset={null}
                files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/shanghai_bund_4k.hdr"
                background={true}
                ground={
                    {
                        height: 10,
                        scale: 512,
                        radius: 400,
                    }
                }
            />
            {/* <Sky
        sunPosition={[0, 0, -1]}
        inclination={0.2}
        /> */}
            <Sparkles
                color="white"
                count={100}
                size={4}
                speed={2}
                scale={10}
            />
            
             <Cloud
                opacity={0.5}
                speed={0.5}
                width={50}
                depth={5}
                segments={20}
                position-y={10}
                position-z={-20}
            />
            <Cloud
                opacity={0.5}
                speed={0.5}
                width={50}
                depth={5}
                segments={20}
                position-y={10}
                position-z={-10}
            />
              <Cloud
                opacity={0.5}
                speed={0.5}
                width={50}
                depth={5}
                segments={20}
                position-y={10}
                position-z={0}
            />
        
           

           <Cloud
                opacity={0.5}
                speed={0.5}
                width={50}
                depth={5}
                segments={20}
                position-y={10}
                position-z={10}
            />
              <Cloud
                opacity={0.5}
                speed={0.5}
                width={50}
                depth={5}
                segments={20}
                position-y={10}
                position-z={0}
            />
              <Cloud
                opacity={0.5}
                speed={0.5}
                width={50}
                depth={5}
                segments={20}
                position-y={10}
                position-z={20}
            />
              <Cloud
                opacity={0.5}
                speed={0.5}
                width={50}
                depth={5}
                segments={20}
                position-y={10}
                position-z={30}
            />
            <Cloud
                opacity={0.5}
                speed={0.5}
                width={50}
                depth={5}
                segments={20}
                position-y={10}
                position-z={40}
            />
            {/* <Stars 
            radius={100}
            depth={50}
            count={5000}
            factor={2}
            saturation={0}
        /> */}


        </>
    );
}
//<Environment files={'/assets/hdris/Standard-Cube-Map'} background={true} />