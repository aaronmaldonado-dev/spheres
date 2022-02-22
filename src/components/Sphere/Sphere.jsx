import { useRef, useEffect, useCallback, useState } from "react";
import gsap from "gsap";

const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;

const animationTime = 0.15;

gsap.registerEffect({
  name: "sphereScaleAnimation",
  effect: (targets, config) => {
    return gsap.fromTo(
      targets,
      {
        x: config.sphereProps.scale,
        y: config.sphereProps.scale,
        z: config.sphereProps.scale
      },
      {
        ease: "power2.inOut",
        duration: 0.25,
        yoyo: true,
        repeat: 1,
        x: config.scale,
        y: config.scale,
        z: config.scale
      }
    );
  },
  defaults: { duration: animationTime },
  extendTimeline: true
});

export const Sphere = ({ color, note, playNote, pressedNote }) => {
  const [sphereTimeline, setSphereTimeline] = useState(null);
  const [sphereProps] = useState({
    position: [
      getRandomArbitrary(-2.75, 2.75),
      getRandomArbitrary(-2.75, 2.75),
      getRandomArbitrary(-2.75, 2.75)
    ],
    scale: getRandomArbitrary(0.5, 1.15)
  });
  const mesh = useRef();

  const animatePlayNote = useCallback(() => {
    sphereTimeline.play(0);
    playNote(note);
  }, [note, playNote, sphereTimeline]);

  const onClickHandler = (e) => {
    e.stopPropagation();
    animatePlayNote();
  };

  useEffect(() => {
    if (pressedNote && pressedNote === note) {
      animatePlayNote(note);
    }
  }, [animatePlayNote, pressedNote, note]);

  useEffect(() => {
    setSphereTimeline(() => {
      const tl = gsap.timeline({ paused: true });
      const scale = getRandomArbitrary(1.25, 2);

      tl.sphereScaleAnimation(mesh.current?.scale, {
        sphereProps,
        scale
      });
      return tl;
    });
  }, [sphereProps]);

  return (
    <mesh
      ref={mesh}
      onClick={onClickHandler}
      position={sphereProps.position}
      scale={sphereProps.scale}
    >
      <sphereGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
