import './App.css'
import React from 'react'
import { Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage';

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path = "/" element = {<HomePage/>} />
        <Route path = "/chats" element = {<ChatPage/>} />
        <Route path = "*" element = {<h1>Enter a valid URL</h1>} />
      </Routes>
    </div>
  )
}

export default App
