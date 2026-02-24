import Login from './Components/Login'
import Signup from './Components/SignUp'
import Dashboard from './Components/Dashboard'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import ProtectedRoute from './Components/ProtectedRoute'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      {/* <h1>app</h1> */}
    </div >
  )
}

export default App