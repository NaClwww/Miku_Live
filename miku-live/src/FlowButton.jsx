import { useEffect, useRef, useState } from 'react'
import './App.css'

function FloatButtonDemo() {
  const [position, setPosition] = useState('center')
  const target = useRef(null)
  const button = useRef(null)


  useEffect(() => {
    const handleScroll = () => {
      if (!target.current) return
      const elem = target.current.getBoundingClientRect()
      // 判断 target 是否在视口顶部之上
      if (window.innerHeight - elem.top <= 8 * 4 * 2 + button.current.offsetHeight) {
        setPosition('top')
      }
      // 判断 target 是否在视口底部之下
      else if (elem.bottom < window.innerHeight) {
        setPosition('bottom')
      }
      // 否则居中
      else {
        setPosition('center')
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll() // 初始化
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 按钮样式
  let btnClass =
    "btn bg-red-100 "
  if (position === 'top') btnClass += "absolute top-8"
  else if (position === 'bottom') btnClass += "absolute bottom-8"
  else btnClass += " fixed bottom-8"

  return (
    <div>
      <div className='h-256'></div>
      <div>
        <div ref={target} className="flex h-256 w-full items-center bg-blue-100 justify-center relative">
          <div className={btnClass} ref={button}>测试按钮</div> 
        </div>
      </div>
      <div className='h-256'></div>
    </div>
  )
}

export default FloatButtonDemo