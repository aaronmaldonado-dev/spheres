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
        x: config.scaleFactor * config.sphereProps.scale,
        y: config.scaleFactor * config.sphereProps.scale,
        z: config.scaleFactor * config.sphereProps.scale
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
      getRandomArbitrary(-6, 6),
      getRandomArbitrary(-6, 6),
      getRandomArbitrary(-6, 6)
    ],
    scale: getRandomArbitrary(0.5, 1.5)
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
      const scaleFactor = getRandomArbitrary(1.25, 2);

      tl.sphereScaleAnimation(mesh.current?.scale, {
        sphereProps,
        scaleFactor
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
      <meshStandardMaterial
        color={color}
        roughness={0.15}
        envMapIntensity={0.4}
      />
    </mesh>
  );
};
