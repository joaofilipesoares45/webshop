import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/log'

import { baseUrl } from './utils/functions'
import AdminPage from './pages/admin'
import Purchase from './pages/Purchase'
import { useContext } from 'react'
import { DataContext } from './context/DataContext'
import Search from './pages/search'

export default function RouterApp() {
    const { searchText } = useContext(DataContext)

    return (
        <Router>
            <Routes>
                <Route exact path={baseUrl + '/'} element={<Home />} />
                <Route path={baseUrl + '/login'} element={<Login />} />
                <Route path={baseUrl + "/admin"} element={<AdminPage />} />
                <Route path={baseUrl + "/purchase"} element={<Purchase />} />
                <Route path={baseUrl+ "/search"} element={<Search text={searchText}/>} />
            </Routes>
        </Router>
    )
}