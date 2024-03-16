import { Cloud, Environment, Sky, Sparkles, Stars } from "@react-three/drei";

export default function Environments() {
    return <>
        <Environment
            //files={"/assets/hdris/umhlanga_sunrise_4k.hdr"}
            files={"https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/umhlanga_sunrise_4k.hdr"}
            preset={null}
            background={false}
            ground={{
                height:20,
                scale: 300,
                radius: 500
            }}
        />
        {/* <Sky
            sunPosition={[0, 0, -1]}
            inclination={0.2}
            azimuth={180}
        /> */}
        <Sparkles
            color={"white"}
            count={200}
            size={4}
            scale={15}
            speed={0.5}
        />
        <Cloud
            opacity={0.5}
            speed={0.5}
            width={50}
            depth={5}
            segments={20}
            position-y={10}
        />
        <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={2}
            saturation={1}
        />
    </>
}