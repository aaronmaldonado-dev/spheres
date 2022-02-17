import { OrbitControls, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import { Sphere } from "./components/Sphere";
import { mappedCmajorScale } from "./constants/mappedCmajorScale";
import { createLeadSynth } from "./utils/createLeadSynth";

import "normalize.css";
import styles from "./App.module.css";

const { playNote } = createLeadSynth();

export default function App() {
  const getNote = (key) => {
    return mappedCmajorScale.find((item) => item.key === key.toUpperCase())
      ?.note;
  };

  const onKeyDownHandler = (e) => {
    const note = getNote(e.key);
    if (note) playNote(note);
  };

  return (
    <div className={styles.app} tabIndex="0" onKeyDown={onKeyDownHandler}>
      <Canvas>
        <color attach="background" args={["#202040"]} />
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <Sphere playNote={playNote} />
          <Environment preset="sunset" />
        </Suspense>
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}
