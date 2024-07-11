import './App.css'
import Header from "./shared/components/Header.tsx";
import {Outlet} from 'react-router-dom'

const App = () => {

    return (
        <div className="app bg-gray-800">
            <Header/>
            <Outlet />
        </div>
    )
}

export default App
