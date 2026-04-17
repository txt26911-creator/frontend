import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import {toast} from "react-toastify"

const ModalEditUser = ({show, onHide,  us, refreshUsers}) => {

    const [user, setUser] = useState({
    usuario: '',
    nombre: '',
    apellido: '',
    telefono: '',
    rol: ''
    })

      const handleChange = (e) => {

    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

useEffect(() => {
    if (us) {

      setUser(us);
      
    }
  }, [us]);

     const handleSave = async () => {
        const valid = true
    try {
     
      if(valid){
      let res = await fetch(`${process.env.REACT_APP_API}/api/update_us/${user.id_usuario}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      if(res){
        toast.success("El usuario se actualizó correctamente")
        console.log(res)
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
        <Modal.Title>Editar usuario / empleado</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              name='usuario'
              type="text"
              className="form-control"
              placeholder="Usuario"
              onChange={handleChange}
              value={user.usuario}
              
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              name='nombre'
              type="text"
              className="form-control"
              placeholder="Nombre"
              onChange={handleChange}
              value={user.nombre}
              
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input
              name='apellido'
              type="text"
              className="form-control"
              placeholder="Nombre"
              onChange={handleChange}
              value={user.apellido}
              
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input
              name='telefono'
              type="text"
              className="form-control"
              placeholder="Ingresa el telefono"
              onChange={handleChange}
              value={user.telefono}
            />
          </div>

         
          
          <div className="mb-3">
              <label className="form-label">Selecciona un privilegio</label>
              <Form.Select aria-label="Default select example" name='rol' onChange={handleChange} value={user.rol}>
              <option>Click para seleccionar menú</option>
              <option value="Administrador">Administrador</option>
              <option value="Vendedor">Vendedor</option>
              <option value="Almacenista">Almacenista</option>
            </Form.Select>
          </div>
           
          <div class="alert alert-warning" role="alert">
            Antes de guardar, recuerda verificar lo que estás escribiendo
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="success" onClick={onHide}>Cancelar</Button>
        <Button variant="warning" onClick={handleSave}>Guardar</Button>
      </Modal.Footer>

      </Modal>
    
    </>
  )
}

export default ModalEditUser