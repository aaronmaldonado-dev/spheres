import {
  OrbitControls,
  Environment,
  OrthographicCamera
} from "@react-three/drei";
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
    <div className={styles.app} onKeyDown={onKeyDownHandler} tabIndex="0">
      <Canvas>
        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={50} />
        <color attach="background" args={["#202040"]} />
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          {mappedCmajorScale.map((mappedNote) => {
            return (
              <Sphere
                color={mappedNote.color}
                key={mappedNote.key}
                note={mappedNote.note}
                playNote={playNote}
              />
            );
          })}
          <Environment preset="sunset" />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} autoRotate={true} />
      </Canvas>
    </div>
  );
}
