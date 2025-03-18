import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/log'

import { baseUrl } from './utils/functions'
import AdminPage from './pages/admin'
import Purchase from './pages/Purchase'

export default function RouterApp() {

    return (
        <Router>
            <Routes>
                <Route exact path={baseUrl + '/'} element={<Home />} />
                <Route path={baseUrl + '/login'} element={<Login />} />
                <Route path={baseUrl + "/admin"} element={<AdminPage />} />
                <Route path={baseUrl + "/purchase"} element={<Purchase />} />
            </Routes>
        </Router>
    )
}