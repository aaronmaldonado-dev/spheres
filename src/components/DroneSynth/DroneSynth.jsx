import { useEffect, useState } from "react";

import { createDroneSynth } from "../../utils/createDroneSynth";

import styles from "./DroneSynth.module.css";

const { playDrone, stopDrone } = createDroneSynth();

export const DroneSynth = () => {
  const [status, setStatus] = useState(false);

  const onClickHandler = () => {
    setStatus(!status);
  };

  useEffect(() => {
    if (status) {
      playDrone();
    } else {
      stopDrone();
    }
  }, [status]);

  return (
    <button className={styles.btn} onClick={onClickHandler}>
      drone {status ? "on" : "off"}
    </button>
  );
};
