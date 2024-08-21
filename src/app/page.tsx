'use client';
import { useEffect, useState } from "react";


type Position = {
  x: number;
  y: number;
};

export default function LevelBall() {
  const [position, setPosition] = useState<Position>({ x: 50, y: 50 });

  useEffect(() => {
    const handleOrientationEvent = (event: DeviceOrientationEvent) => {
      const { beta, gamma } = event; // beta (tilt front-back), gamma (tilt left-right)

      // Ensure beta and gamma exist
      if (beta === null || gamma === null) return;

      // Map the beta and gamma values to the screen position
      // Adjust range [-90, 90] to a percentage value
      let x = Math.min(Math.max(gamma, -45), 45); // Constrain between -45 and 45 degrees
      let y = Math.min(Math.max(beta, -45), 45); // Constrain between -45 and 45 degrees

      x = ((x + 45) / 90) * 100; // Normalize between 0 and 100
      y = ((y + 45) / 90) * 100; // Normalize between 0 and 100

      setPosition({ x, y });
    };

    // Add the event listener for device orientation
    window.addEventListener("deviceorientation", handleOrientationEvent);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("deviceorientation", handleOrientationEvent);
    };
  }, []);
  

  return (
    <div className={'container'}>
      <div
        className={`ball`}
        style={{
          top: `${position.y}%`,
          left: `${position.x}%`,
          transform: "translate(-50%, -50%)",
        }}
      ></div>
    </div>
  );
}
