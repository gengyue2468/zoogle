"use client";

import { MicrophoneIcon } from "../icons";

/**
 * 圆形麦克风图标 + 外圈一大层白色块律动（Google 风格）
 */
export default function WaveformMicrophone({
  className = "",
  size = 120,
}: {
  className?: string;
  size?: number;
}) {
  const whiteBlockSize = size + 80;

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: whiteBlockSize * 1.2, height: whiteBlockSize * 1.2 }}
    >
      <div
        className="absolute rounded-full bg-white"
        style={{
          width: whiteBlockSize,
          height: whiteBlockSize,
          animation: "waveform-white-pulse 1.2s ease-in-out infinite",
        }}
      />
      <div
        className="relative flex items-center justify-center rounded-full bg-zoogle-red border-2 border-white text-white"
        style={{ width: size, height: size }}
      >
        <MicrophoneIcon className="shrink-0" style={{ width: size * 0.4, height: size * 0.4 }} />
      </div>
    </div>
  );
}
