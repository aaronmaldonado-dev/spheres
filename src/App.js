import {
  OrbitControls,
  Environment,
  OrthographicCamera
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";

import { createLeadSynth } from "./utils/createLeadSynth";
import { mappedCmajorScale } from "./constants/mappedCmajorScale";

import { Sphere } from "./components/Sphere";
// import { DroneSynth } from "./components/DroneSynth";

import "normalize.css";
import styles from "./App.module.css";

const { playNote } = createLeadSynth();

export default function App() {
  const [pressedNote, setPressedNote] = useState(null);

  const getNote = (key) => {
    return mappedCmajorScale.find((item) => item.key === key.toUpperCase())
      ?.note;
  };

  const onKeyDownHandler = (e) => {
    const note = getNote(e.key);
    if (note) setPressedNote(note);
  };

  const onKeyUpHandler = () => {
    setPressedNote(null);
  };

  return (
    <div
      className={styles.app}
      onKeyDown={onKeyDownHandler}
      onKeyUp={onKeyUpHandler}
      tabIndex="0"
    >
      {/* <DroneSynth /> */}
      <Canvas>
        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={50} />
        <color attach="background" args={["#202040"]} />
        <ambientLight intensity={0.05} />
        <Suspense fallback={null}>
          {mappedCmajorScale.map((mappedNote) => {
            return (
              <Sphere
                color={mappedNote.color}
                key={mappedNote.key}
                note={mappedNote.note}
                playNote={playNote}
                pressedNote={pressedNote}
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
