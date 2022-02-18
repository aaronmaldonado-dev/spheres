import { useRef } from "react";

export const Sphere = ({ color, note, playNote }) => {
  const mesh = useRef();

  const onClickHandler = (e) => {
    e.stopPropagation();
    playNote(note);
  };

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  return (
    <mesh
      ref={mesh}
      onClick={onClickHandler}
      position={[
        getRandomArbitrary(-2.75, 2.75),
        getRandomArbitrary(-2.75, 2.75),
        getRandomArbitrary(-2.75, 2.75)
      ]}
      scale={getRandomArbitrary(0.5, 1.15)}
    >
      <sphereGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
