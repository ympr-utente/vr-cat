import { Environment } from "@react-three/drei";

export default function Environments() {
    return <>
        <Environment
          files={"./assets/hdris/umhlanga_sunrise_4k.hdr"}
            preset={null}
            background={false}
            ground={{
                height:800,
                scale: 250,
                radius: 300
            }}
        />
    </>
}