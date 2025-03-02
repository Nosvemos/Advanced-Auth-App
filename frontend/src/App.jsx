import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import HomePage from './pages/HomePage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
      <ToastContainer toastClassName={'!bg-base-100 !shadow-xl !text-base-content/80'} position="top-center" autoClose={3000}/>
    </div>
  )
}

export default App