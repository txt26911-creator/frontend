import '../styles/style.css'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
const MainLayout = () => {
  return (
    
    <>

        <Sidebar/>
   
        <main className='main'>
        <Outlet/>
        </main>
    
    </>
  )
}

export default MainLayout