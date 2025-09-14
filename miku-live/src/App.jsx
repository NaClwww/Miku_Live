import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navi from './navi'
import Index from './index/index.jsx'
import LivePage from './lives/lives.jsx'
import "./App.css"
import Gift from './gift/gift.jsx'

function App() {

  return (
    <BrowserRouter>
      <Navi />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/lives" element={<LivePage />} />
        <Route path="/music" element={<Gift />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;