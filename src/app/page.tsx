'use client';
import { useEffect, useState } from "react";

type Position = {
  x: number;
  y: number;
};

export default function LevelBall() {
  const [position, setPosition] = useState<Position>({ x: 50, y: 50 });

  useEffect(() => {
    const requestPermission = async () => {
      // Check if the DeviceOrientationEvent needs permission (iOS 13+)
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          const response = await DeviceOrientationEvent.requestPermission();
          if (response === 'granted') {
            startTrackingOrientation();
          } else {
            alert('Permission denied to access motion sensors.');
          }
        } catch (error) {
          console.error('Permission request failed:', error);
        }
      } else {
        // If permission isn't required, start tracking immediately
        startTrackingOrientation();
      }
    };

    const startTrackingOrientation = () => {
      const handleOrientationEvent = (event: DeviceOrientationEvent) => {
        const { beta, gamma } = event;

        if (beta === null || gamma === null) return;

        let x = Math.min(Math.max(gamma, -45), 45);
        let y = Math.min(Math.max(beta, -45), 45);

        x = ((x + 45) / 90) * 100;
        y = ((y + 45) / 90) * 100;

        setPosition({ x, y });
      };

      window.addEventListener('deviceorientation', handleOrientationEvent);
    };

    requestPermission();

    return () => {
      window.removeEventListener('deviceorientation', startTrackingOrientation);
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
