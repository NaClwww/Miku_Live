import React, { useState } from "react";

const images = [
  "https://picsum.photos/id/1016/500/280",
  "https://picsum.photos/id/1018/500/280",
  "https://picsum.photos/id/1020/500/280",
  "https://picsum.photos/id/1024/500/280",
];

export default function StripAlbumFullWidth() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="w-full bg-white rounded-xl shadow-lg px-0 py-4 flex flex-col items-center">
      {/* 图片横排区，主图突出，其余缩略，自动等分 */}
      <div className="flex w-full justify-center items-center gap-4 px-4 overflow-x-auto">
        {images.map((img, idx) => (
          <div
            key={img}
            className={`
              transition-all duration-300 cursor-pointer flex-shrink-0
              overflow-hidden bg-gray-100 rounded-lg
              ${idx === current
                ? "h-48 flex-1 ring-4 ring-blue-400 scale-105 shadow-2xl z-10"
                : "h-28 flex-[0.6] opacity-70 hover:scale-105"}
            `}
            style={{
              minWidth: idx === current ? "320px" : "120px",
              maxWidth: idx === current ? "480px" : "150px",
              boxShadow: idx === current ? "0 4px 24px rgba(0,0,0,.18)" : undefined
            }}
            onClick={() => setCurrent(idx)}
          >
            <img
              src={img}
              alt={`img${idx}`}
              className="object-cover w-full h-full"
              draggable={false}
            />
          </div>
        ))}
      </div>
      {/* 指示条 */}
      <div className="flex justify-center items-center mt-4 w-full">
        {images.map((img, idx) => (
          <span
            key={img+'_ind'}
            className={`h-2 mx-1 rounded transition-all duration-200 cursor-pointer
              ${idx === current ? "w-8 bg-blue-500" : "w-3 bg-gray-300"}
            `}
            onClick={() => setCurrent(idx)}
          ></span>
        ))}
      </div>
    </div>
  );
}
