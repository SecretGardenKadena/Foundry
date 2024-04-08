import { useEffect, useRef, useState } from "react";
import styles from './CustomCursor.module.css'

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      setPosition({ x, y });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className={styles.cursor}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      ref={cursorRef}
    >
      <div className={styles.star}></div>
      <div className={styles.line}></div>
    </div>
  );
};

export default CustomCursor;
