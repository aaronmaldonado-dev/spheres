import { useRef } from "react";
import gsap from "gsap";

export const Sphere = ({ color, note, playNote }) => {
  const mesh = useRef();

  const onClickHandler = (e) => {
    e.stopPropagation();
    const scale = getRandomArbitrary(1.25, 2);

    // there's a bug that I actually like,
    // click two consecutive times and sphere is gonna keep the target scale
    gsap.to(mesh.current.scale, {
      duration: 0.25,
      x: scale,
      y: scale,
      z: scale,
      yoyo: true,
      repeat: 1
    });

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
