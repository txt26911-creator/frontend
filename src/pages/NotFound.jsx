import "../styles/style.css"
import {Link} from 'react-router-dom'

 
const NotFound = () => {
  return (
    <div className='not-found'>
        <p>La página a la que intentas acceder no existe</p>
        <Link className="btn btn-primary volver" to={"/auth"}>Volver al inicio</Link>
    </div>
  )
}

export default NotFound