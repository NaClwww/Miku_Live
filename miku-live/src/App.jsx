// import { useEffect, useRef, useState } from 'react'
// import './App.css'
// import Test from './show'
// import Show from './show'


// function App() {
//   const endRef = useRef(null)
//   const showRef = useRef(null)
//   const buttonRef = useRef(null)
//   const [atEndZone, setAtEndZone] = useState(false)
//   const [show, setShow] = useState(false)
//   const [threshold, setThreshold] = useState(0.1) // 新增状态保存阈值

//   useEffect(() => {
//     // 只有 DOM 挂载后才能获取 rect
//     if (endRef.current && buttonRef.current) {
//       const redarea = endRef.current
//       const button = buttonRef.current
//       const p = (8 * 4 + button.getBoundingClientRect().height + 8 * 4) / redarea.getBoundingClientRect().height
//       setThreshold(p)
//     }
//   }, [show]) // show 为 true 时按钮才渲染

//   useEffect(() => {
//     // 蓝色区 observer
//     const observerShow = new window.IntersectionObserver(
//       ([entry]) => {
//         setShow(entry.isIntersecting)
//       },{ threshold: 0.05 }
//     )
//     if (showRef.current) observerShow.observe(showRef.current)

//     // 红色区 observer
//     let observer
//     if (endRef.current) {
//       observer = new window.IntersectionObserver(
//         ([entry]) => {
//           setAtEndZone(entry.isIntersecting)
//         },
//         { threshold } // 使用状态中的阈值
//       )
//       observer.observe(endRef.current)
//     }

//     return () => {
//       observerShow.disconnect()
//       if (observer) observer.disconnect()
//     }
//   }, [threshold])

//   // 按钮样式，根据状态平滑切换
//   const buttonBase = "p-4 rounded-full bg-blue-600 text-white shadow-lg transition-all duration-500 ease-in-out hover:scale-110"
//   // 悬浮于页面（右下）
//   const floatingStyle = "fixed right-8 bottom-8 scale-100 opacity-100"
//   // 归位到红色区
//   const endZoneStyle = "absolute right-8 top-8 scale-100 opacity-100"

//   return (
//     <div className='bg-gray-100 min-h-screen'>
//       {/* 首页 */}
//       <div className="h-screen flex items-center justify-center">
//         <div className="flex flex-col items-center justify-center text-center h-full max-w-md">
//           <h1 className="text-5xl font-bold text-gray-800">Hello there</h1>
//           <p className="py-6 text-gray-800">向下滚动查看更多内容</p>
//         </div>
//       </div>

//       {/* 其他项 */}
//       <Show />
//       <Show />
//     </div>
//   )
// }

// export default App

import { useState } from "react";
const images = ["img1.jpg","img2.jpg","img3.jpg"]; // 替换为你的图片列表

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex overflow-x-auto space-x-4 p-4">
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          className={`w-64 h-40 object-cover rounded-lg cursor-pointer
            transition-transform duration-300
            ${activeIndex === idx ? "scale-110 ring-4 ring-blue-500 z-10" : "opacity-70"}
          `}
          onClick={() => setActiveIndex(idx)}
          alt={`图片${idx}`}
        />
      ))}
    </div>
  );
}