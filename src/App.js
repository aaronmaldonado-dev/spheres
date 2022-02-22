import { OrbitControls, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import chroma from "chroma-js";

import { createLeadSynth } from "./utils/createLeadSynth";
import { mappedCmajorScale } from "./constants/mappedCmajorScale";

import { Sphere } from "./components/Sphere";
import { Instructions } from "./components/Instructions";

import "normalize.css";
import styles from "./App.module.css";

const { playNote } = createLeadSynth();

export default function App() {
  const [colors] = useState(() => {
    return chroma.scale("Spectral").colors(mappedCmajorScale.length);
  });
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
      <Instructions />
      <Canvas
        shadows
        camera={{ position: [0, 0, 40], fov: 30, near: 1, far: 60 }}
      >
        <color attach="background" args={["#202040"]} />
        <ambientLight intensity={0.1} />
        <spotLight
          angle={0.25}
          penumbra={1}
          intensity={1.25}
          position={[30, 30, 30]}
        />
        <directionalLight
          intensity={4}
          color="purple"
          position={[-20, 20, 220]}
        />

        <Suspense fallback={null}>
          {mappedCmajorScale.map((mappedNote, index) => {
            return (
              <Sphere
                color={colors[index]}
                key={mappedNote.key}
                note={mappedNote.note}
                playNote={playNote}
                pressedNote={pressedNote}
              />
            );
          })}
          <Environment preset="warehouse" />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} autoRotate={true} />
      </Canvas>
    </div>
  );
}
