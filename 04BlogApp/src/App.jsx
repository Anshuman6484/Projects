import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import PostDetails from './components/PostDetails'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:title" element={<PostDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
