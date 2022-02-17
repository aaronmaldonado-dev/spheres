import * as Tone from "tone";

import "normalize.css";
import styles from "./App.module.css";

const mappedCmajorScale = [
  { key: "A", note: "C5" },
  { key: "S", note: "D5" },
  { key: "D", note: "E5" },
  { key: "F", note: "F5" },
  { key: "G", note: "G5" },
  { key: "H", note: "A5" },
  { key: "J", note: "B5" }
];

const synth = new Tone.Synth().toDestination();

const playNote = (note) => {
  synth.triggerAttackRelease(note, "8n");
};

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
    <div className={styles.app} tabIndex="0" onKeyDown={onKeyDownHandler}></div>
  );
}
