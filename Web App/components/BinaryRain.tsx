'use client';

import React, { useEffect, useRef } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    // Set the canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Set up the letters and columns
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZ0123456789'.repeat(6).split('');
    const fontSize = 16; // Increased font size for larger digits
    const columns = Math.round(canvas.width / fontSize);
    const drops: number[] = Array.from({ length: columns }, () => 1);

    // Draw function for the animation
    const draw = () => {
      // Set background color
      ctx.fillStyle = '#9A43B1';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set matrix rain text style
      ctx.fillStyle = '#00FF00'; // Brighter green color
      ctx.font = `${fontSize}px monospace`;

      // Add glow effect
      ctx.shadowColor = '#00FF00';
      ctx.shadowBlur = 10;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Move the rain drop down
        drops[i]+=0.6;
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
      }
    };

    // Animation loop using requestAnimationFrame
    const animate = () => {
      draw();
      requestAnimationFrame(animate);
    };

    animate();

    // Resize canvas on window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: 'block' }} />;
};

export default MatrixRain;
