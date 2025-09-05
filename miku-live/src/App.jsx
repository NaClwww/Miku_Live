import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navi from './navi'
import Index from './index/index.jsx'
import FloatButtonDemo from './flowButton.jsx'  
import Details from './details/details.jsx'
import MovableAlbum from './details/details2.jsx'

function App() {

  return (
    <BrowserRouter>
      <Navi />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/details" element={<Details />} />
        <Route path="/flowButton" element={<FloatButtonDemo />} />
        <Route path='/album' element={<MovableAlbum />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App