import * as Tone from "tone";

export const createLeadSynth = () => {
  const synth = new Tone.Synth().toDestination();

  const playNote = (note) => {
    synth.triggerAttackRelease(note, "8n");
  };

  return { playNote };
};
