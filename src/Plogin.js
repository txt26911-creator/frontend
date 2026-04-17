import Axios from 'axios'

const Auth = (user, pass) => {
    Axios.post('http://localhost:3001/login', {
        usuario: user,
        pass: pass,

    })
   // .then((token) => console.log(token))
    .then(() => console.log('Inicio de sesión correcto, bienvenido!'))
    .catch((error) => console.log('Ocurrió un error:', error))
}

Auth('oscar_perez', 'perez12');