import Axios from 'axios'

const InsertarUser = (user, pass, rol, nombre, apellido) => {
    Axios.post('http://localhost:3001/register', {
        user: user,
        password: pass,
        rol: rol,
        nombre: nombre,
        apellido: apellido
    })
    .then(() => console.log('Usuario registrado con éxito'))
    .catch((error) => console.log('Ocurrió un error:', error))
}

InsertarUser('oscar_perez', 'perez12', 'Vendedor', 'Oscar', 'Perez');