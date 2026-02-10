"use client";

export default function WaveTransition({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`relative w-full ${flip ? "rotate-180" : ""}`}>
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <path
          d="M0,64 C240,96 480,32 720,64 C960,96 1200,32 1440,64 L1440,120 L0,120 Z"
          className="fill-zinc-950"
        >
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="
              M0,64 C240,96 480,32 720,64 C960,96 1200,32 1440,64 L1440,120 L0,120 Z;
              M0,32 C240,64 480,96 720,32 C960,64 1200,96 1440,32 L1440,120 L0,120 Z;
              M0,64 C240,96 480,32 720,64 C960,96 1200,32 1440,64 L1440,120 L0,120 Z
            "
          />
        </path>
        <path
          d="M0,80 C320,100 640,60 960,80 C1120,90 1280,70 1440,80 L1440,120 L0,120 Z"
          className="fill-zinc-900 opacity-50"
        >
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M0,80 C320,100 640,60 960,80 C1120,90 1280,70 1440,80 L1440,120 L0,120 Z;
              M0,70 C320,85 640,95 960,70 C1120,80 1280,90 1440,70 L1440,120 L0,120 Z;
              M0,80 C320,100 640,60 960,80 C1120,90 1280,70 1440,80 L1440,120 L0,120 Z
            "
          />
        </path>
      </svg>
    </div>
  );
}
