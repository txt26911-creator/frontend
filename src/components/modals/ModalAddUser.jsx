import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import {toast} from 'react-toastify'


const ModalAddUser = ({show, onHide, refreshUsers}) => {

    let valid = true;
  let newErrors = []

  const [user, setUser] = useState({
    usuario: '',
    nombre: '',
    apellido: '',
    password: '',
    telefono: '',
    privilegio: ''
  });
  const handleChange = (e) => {

    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const verificar = () =>{
      Object.keys(user).forEach(key => {
    if (user[key].trim() === "") {
      newErrors[key] = "Este campo es obligatorio";
      valid = false;
    }
  });
  }

  const handleSave = async () => {
  try {
    verificar()
    if(valid){
    let res = await fetch(`${process.env.REACT_APP_API}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    if(res){
      toast.success("El usuario se registró correctamente")
      setTimeout(()=>{
          refreshUsers()
            onHide()
          },0)
    }
    
  }else{
    toast.error('Recuerda rellenar todos los campos')
    
  }
  } catch (error) {
    console.error(error);
    toast.error('Algo salió mal')
  }
};
  return (
    <>
     <Modal show={show} onHide={onHide} backdrop='static' >
        <Modal.Header closeButton>
        <Modal.Title>Agregar nuevo usuario</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              name='nombre'
              type="text"
              className="form-control"
              placeholder="Ingresa el nombre"
              onChange={handleChange}
              
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input
              name='apellido'
              type="text"
              className="form-control"
              placeholder="Ingresa el apellido"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              name='usuario'
              type="text"
              className="form-control"
              placeholder="Ejemplo usuario_apellido o usuario@correoexample.com"
              onChange={handleChange}
            />
          </div>


          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              name="password"
              type="text"
              className="form-control"
              placeholder="Ingresa la contraseña"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Telefono</label>
            <input
              name='telefono'
              type="number"
              className="form-control"
              placeholder="Ingresa el telefono"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
              <label className="form-label">Selecciona el privilegio</label>
              <Form.Select aria-label="Default select example" name='privilegio' onChange={handleChange}>
              <option>Click para seleccionar menú</option>
              <option value="Administrador">Administrador</option>
              <option value="Vendedor">Vendedor</option>
              <option value="Almacenista">Almacenista</option>
            </Form.Select>
          </div>
          <div class="alert alert-warning" role="alert">
            Antes de guardar, recuerda verificar lo que estás escribiendo
          </div>
          <div class="alert alert-danger" role="alert">
            Antes de guardar, recuerda o anota la contraseña ya que es única e irremplazable
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="success" onClick={handleSave}>Guardar</Button>
      </Modal.Footer>

      </Modal>
    
    
    
    </>
  )
}

export default ModalAddUser