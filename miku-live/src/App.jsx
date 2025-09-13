import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navi from './navi'
import Index from './index/index.jsx'
import LivePage from './lives/lives.jsx'
import "./App.css"

function App() {

  return (
    <BrowserRouter>
      {/* <Navi /> */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/lives" element={<LivePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;