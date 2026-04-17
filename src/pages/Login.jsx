import { useEffect, useState } from 'react';
import {toast} from 'react-toastify'
import '../styles/login.css'
import {  useNavigate } from 'react-router-dom';

const Login = () => {

       const [user, setUser] = useState("");
       const [pass, setPass] = useState("");
       const navigate = useNavigate();

       async function Auth(){
          if (user === "" || pass === ""){
            toast.error("NO PUDISTE ACCEDER")
          }else{
            const response = await  fetch(`${process.env.REACT_APP_API}/api/login`, {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({usuario: user, pass})
            });
            const wbt = await response.json()
            if(response.ok && wbt.ok){
              localStorage.setItem("token", wbt.token)
              localStorage.setItem("name", wbt.name)
              localStorage.setItem("lastname", wbt.lastname)
              localStorage.setItem("rol", wbt.role)
              navigate("/dashboard")
            }else{
              toast.error("NO PUDISTE ACCEDER")
            }


       }
      }

  return (
    <div className='content'>
        <div className='login-form'>
        <form>
        <img src='logo.png' alt='logo' className='logo'/>
        <h3>APLICACIÓN INTEGRAL DE GESTIÓN</h3>
        
        <label>Usuario</label>
        <input type="text" className='form-control' onChange={(event) => setUser(event.target.value)}/>
        <label>Contraseña</label>
        <input type="password"   className='form-control' onChange={(event) => setPass(event.target.value)}/>
        <button onClick={Auth} type='button' className='btn btn-secondary'>ACCEDER</button>   
        </form>
        </div>
        
      </div>
      
  )
}

export default Login