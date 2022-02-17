import { useRef } from "react";

export const Sphere = ({ playNote }) => {
  const mesh = useRef();

  const onClickHandler = () => {
    playNote("C5");
  };

  return (
    <mesh ref={mesh} onClick={onClickHandler}>
      <sphereGeometry />
      <meshStandardMaterial color="pink" />
    </mesh>
  );
};
