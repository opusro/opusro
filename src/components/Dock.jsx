import { useEffect, useMemo, useState } from "react";
import { useMotionValue } from "framer-motion";
import DockIcon from "./DockIcon";
import "./Dock.css";

const Dock = ({ onOpenProduct, onOpenBlog, onOpenContact }) => {
  const mouseX = useMotionValue(Infinity);
  const mouseClientX = useMotionValue(Infinity);
  const mouseClientY = useMotionValue(Infinity);
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });
  const [gyroEnabled, setGyroEnabled] = useState(false);

  const items = useMemo(
    () => [
      { id: "loop", type: "loop", label: "Loop", action: () => onOpenProduct("loop") },
      { id: "first", type: "first", label: "1st°", action: () => onOpenProduct("first") },
      { id: "blog", type: "blog", label: "Blog", action: onOpenBlog },
      { id: "contact", type: "contact", label: "Contact", action: onOpenContact },
    ],
    [onOpenBlog, onOpenContact, onOpenProduct],
  );

  useEffect(() => {
    if (!gyroEnabled) {
      return undefined;
    }

    const onOrientation = (event) => {
      const gamma = typeof event.gamma === "number" ? event.gamma : 0;
      const beta = typeof event.beta === "number" ? event.beta : 0;
      const x = Math.max(-1, Math.min(1, gamma / 35));
      const y = Math.max(-1, Math.min(1, beta / 45));
      setTilt({ x, y, active: true });
    };

    window.addEventListener("deviceorientation", onOrientation, true);
    return () => {
      window.removeEventListener("deviceorientation", onOrientation, true);
    };
  }, [gyroEnabled]);

  const enableGyroscope = async () => {
    if (gyroEnabled || typeof window === "undefined") {
      return;
    }

    const supportsDeviceOrientation = "DeviceOrientationEvent" in window;
    if (!supportsDeviceOrientation) {
      return;
    }

    if (typeof window.DeviceOrientationEvent.requestPermission === "function") {
      try {
        const permission = await window.DeviceOrientationEvent.requestPermission();
        if (permission === "granted") {
          setGyroEnabled(true);
        }
      } catch {
        // Ignore permission errors, gyroscope remains disabled.
      }
      return;
    }

    setGyroEnabled(true);
  };

  return (
    <div
      className="dock"
      onTouchStart={enableGyroscope}
    >
      <div
        className="dock__tray"
        onMouseMove={(event) => {
          mouseX.set(event.pageX);
          mouseClientX.set(event.clientX);
          mouseClientY.set(event.clientY);
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity);
          mouseClientX.set(Infinity);
          mouseClientY.set(Infinity);
        }}
      >
        {items.map((item) => (
          <DockIcon
            key={item.id}
            type={item.type}
            label={item.label}
            layoutId={`dock-icon-${item.id}`}
            mouseX={mouseX}
            mouseClientX={mouseClientX}
            mouseClientY={mouseClientY}
            tilt={tilt}
            onClick={item.action}
          />
        ))}
      </div>
    </div>
  );
};

export default Dock;
