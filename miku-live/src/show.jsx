import { useEffect, useRef, useState } from 'react'
import './App.css'


function Show() {
  const endRef = useRef(null)
  const showRef = useRef(null)
  const buttonRef = useRef(null)
  const [atEndZone, setAtEndZone] = useState(false)
  const [show, setShow] = useState(false)
  const [threshold, setThreshold] = useState(0.1) // 新增状态保存阈值

  useEffect(() => {
    // 只有 DOM 挂载后才能获取 rect
    if (endRef.current && buttonRef.current) {
      const redarea = endRef.current
      const button = buttonRef.current
      const p = (8 * 4 + button.getBoundingClientRect().height + 8 * 4) / redarea.getBoundingClientRect().height
      setThreshold(p)
    }
  }, [show]) // show 为 true 时按钮才渲染

  useEffect(() => {
    // 蓝色区 observer
    const observerShow = new window.IntersectionObserver(
      ([entry]) => {
        setShow(entry.isIntersecting)
      },{ threshold: 0.1 }
    )
    if (showRef.current) observerShow.observe(showRef.current)

    // 红色区 observer
    let observer
    if (endRef.current) {
      observer = new window.IntersectionObserver(
        ([entry]) => {
          setAtEndZone(entry.isIntersecting)
        },
        { threshold } // 使用状态中的阈值
      )
      observer.observe(endRef.current)
    }

    return () => {
      observerShow.disconnect()
      if (observer) observer.disconnect()
    }
  }, [threshold])

  // 按钮样式，根据状态平滑切换
  const buttonBase = "p-4 rounded-full bg-blue-600 text-white shadow-lg transition-all duration-500 ease-in-out hover:scale-110"
  // 悬浮于页面（右下）
  const floatingStyle = "fixed right-8 bottom-8 scale-100 opacity-100"
  // 归位到红色区
  const endZoneStyle = "absolute right-8 top-8 scale-100 opacity-100"

  return (
    <div ref={showRef}>
        <div className="h-512 text-center bg-blue-100 flex items-center justify-center text-2xl">
            RefContent
        </div>
        <div
            ref={endRef}
            className="h-32 text-center bg-red-100 flex items-center justify-center text-2xl relative"
            style={{ position: 'relative' }}
        >
            {show && (
            <div ref={buttonRef} className={buttonBase +" " +(atEndZone ? endZoneStyle : floatingStyle)} style={{ pointerEvents: 'auto' }}>
                test
            </div>)}
            <div className='text-center'>RefEnd</div>
        </div>
    </div>
  )
}

export default Show