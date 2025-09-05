import React, { useEffect, useRef } from "react";

function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

const DvdBackground = () => {
  const dvdRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

   console.log("test back")
  useEffect(() => {
    const dvd = dvdRef.current!;
    const img = imgRef.current!;
    const container = containerRef.current!;

    let dx = 1.5;
    let dy = 1.5;
    console.log("test back")
    // Start at initial position
    let x = getRandomNumber(0,1000)
    let y = getRandomNumber(0,1000)

    const move = () => {
      const containerRect = container.getBoundingClientRect();
      const imgWidth = img.offsetWidth;
      const imgHeight = img.offsetHeight;

      // Bounce when edges of image touch container walls
      if (x <= 0 || x + imgWidth >= containerRect.width) dx *= -1;
      if (y <= 0 || y + imgHeight >= containerRect.height) dy *= -1;

      x += dx;
      y += dy;

      dvd.style.left = x + "px";
      dvd.style.top = y + "px";

      requestAnimationFrame(move);
    };

    move();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        overflow: "hidden",
      }}
    >
      <div
        ref={dvdRef}
        style={{
          position: "absolute",
          top: 100,
          left: 100,
          width: "300px", // match image width
          height: "auto",
        }}
      >
        <img
          ref={imgRef}
          src="/reviewdle-logo-cropped.png"
          alt="DVD Logo"
          style={{
            width: "200px",
            height: "auto",
            display: "block",
          }}
        />
      </div>
    </div>
  );
};

export default DvdBackground;
