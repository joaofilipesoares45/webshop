import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/log'

export default function RouterApp() {
    return (
        <Router>
            <Routes>
                <Route path='/home' element={
                    <Home />
                } />

                <Route path='/login' element={
                    <Login />
                } />
                <Route exact path='/' element={
                    <Home />
                } />
            </Routes>
        </Router>
    )
}