import * as Tone from "tone";

const synth = new Tone.PolySynth().toDestination();
synth.set({
  volume: 0.5
});

export const createDroneSynth = () => {
  const playDrone = () => {
    synth.triggerAttack(["C3", "E3", "G3"], Tone.now());
  };

  const stopDrone = () => {
    synth.triggerRelease(["C3", "E3", "G3"], Tone.now());
  };

  return { playDrone, stopDrone };
};
