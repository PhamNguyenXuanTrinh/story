import React from 'react'
import {BrowserRouter as Routers, Routes, Route} from 'react-router-dom'
import { HomePage } from './Pages/HomePage/HomePage'
import { DetailPage } from './Pages/DetailPage/DetailPage'
function App() {
  
  return (
    <div>
      <Routers>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/detail' element={<DetailPage/>}/>
        </Routes>
      </Routers>
    </div>
  )
}
export default App