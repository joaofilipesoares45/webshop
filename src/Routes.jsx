import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/log'

import { baseUrl } from './utils/functions'
export default function RouterApp() {
    return (
        <Router>
            <Routes>
                <Route path={baseUrl + '/home'} element={
                    <Home />
                } />

                <Route path={baseUrl + '/login'} element={
                    <Login />
                } />
                <Route exact path={baseUrl + '/'} element={
                    <Home />
                } />
            </Routes>
        </Router>
    )
}