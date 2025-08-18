import { useRef, useEffect, useState } from 'react'
import './App.css'

function App() {
  const cards = [
    { id: 1, text: '卡片一' },
    { id: 2, text: '卡片二' },
    { id: 3, text: '卡片三' },
    { id: 4, text: '卡片四' },
    { id: 5, text: '卡片五' },
  ]
  const cardRefs = useRef([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const center = window.innerHeight / 2
      let minDist = Infinity
      let activeIdx = 0
      cardRefs.current.forEach((ref, idx) => {
        if (ref) {
          const rect = ref.getBoundingClientRect()
          const cardCenter = rect.top + rect.height / 2
          const dist = Math.abs(cardCenter - center)
          if (dist < minDist) {
            minDist = dist
            activeIdx = idx
          }
        }
      })
      setActive(activeIdx)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center h-full max-w-md">
          <h1 className="text-5xl font-bold text-gray-800">Hello there</h1>
          <p className="py-6 text-gray-800">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center min-h-screen bg-gray-100 py-20 gap-8">
        {cards.map((card, idx) => (
          active === idx && (
            <div key={card.id} className="flex items-center gap-6">
              {/* 卡片本身 */}
              <div
                ref={el => cardRefs.current[idx] = el}
                className="w-80 h-40 flex items-center
                  bg-blue-500 text-white rounded-lg shadow-2xl scale-110 z-10 transition-all duration-500"
              >
                <div className="flex-1 flex justify-center items-center">
                  {card.text}
                </div>
              </div>
              {/* 卡片右侧的文字 */}
              <div className="text-gray-800 text-lg">
                右侧内容
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  )
}
export default App