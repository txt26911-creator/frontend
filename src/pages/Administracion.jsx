import { Container, Card, Button, Col, Spinner} from "react-bootstrap"
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react"
import ModalAddUser from "../components/modals/ModalAddUser";
import ModalEditUser from "../components/modals/ModalEditUser";
import Swal from "sweetalert2"


const Administracion = () => {
    const [users, setUsers] = useState([])
        //modal agregar usuario
    const [showModalAddUser, setShowModalAddUser ] = useState(false);
    const handleShowModalAddUser = () => setShowModalAddUser(true);
    const handleCloseModalAddUser = () => setShowModalAddUser(false);
    //modal editar usuario
    const [showModalEditUser, setShowModalEditUser ] = useState(false);
    const handleShowModalEditUser = () => setShowModalEditUser(true);
    const handleCloseModalEditUser = () => setShowModalEditUser(false);
    const[userSelected, setuserSelected] = useState(null);
    const[loading, setLoading] = useState(true)
    


      const getUsers = async () => {
        setLoading(true)
    try {
      const res = await fetch(`${process.env.REACT_APP_API}/api/usuarios`, {method: "GET"});
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
    finally{
      setLoading(false)
    }

  }
  useEffect(() =>{
    getUsers();
  }, [])

  const handleEdit = (user) =>{
    handleShowModalEditUser();
    setuserSelected(user)
  }

  const eliminarUser = (id) => {
    
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar"
    }).then((result) => {
      
      if (result.isConfirmed) {

            const req =  fetch(process.env.REACT_APP_API+"/api/delete_user/"+id, {method: "DELETE"})
            .then((response) =>{
              response.ok ? response.json() : console.error("Falla api:", response.json()
              )
            }
            
          ).then(() => {
              Swal.fire({
                title: "Eliminado!",
                text: "El usuario ha sido eli",
                icon: "success"
              })
              getUsers()
      }).catch((error) => {
        Swal.fire('Error', 'No se pudo eliminar: '+error, "error")
      })
            
          
      }
        
        
    
      
    });
  }
    
  return (

    <Container fluid>
      <Col sm={12}>
      <Card className="mb-3 mt-3">
        <Card.Header className="bg-white text-dark border-secondary">
          <h5 className="text-center">Lista de usuarios</h5>
        </Card.Header>
        <Card.Body>
          <Button variant="success" onClick={handleShowModalAddUser}><i className="bi bi-person-add"></i> Nuevo usuario</Button>
          <hr />
              {loading ? (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner animation="grow" variant='dark'/>
      <Spinner animation="grow" variant='dark'/>
      <Spinner animation="grow" variant='dark'/>
    </div>
  ) : (
          <Table striped bordered hover responsive='sm' className='table'>
        <thead className='text-center'>
          <tr>
            <th scope='col'>Nombre</th>
            <th scope='col'>Privilegio</th>
            <th scope='col'>Teléfono</th>
            <th scope='col'> </th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {users.map((us) => (
            <tr key={us.id_usuario}>
              <td>{us.nombre} {us.apellido}</td>
              <td>{us.rol}</td>
              <td>{us.telefono}</td>
              <td >
                  <div className="d-flex  justify-content-center gap-2">
                  <button className="btn btn-warning" onClick={() => handleEdit(us)}>
                    <i className="bi bi-pencil"></i>
              
                  </button>
                  <button className="btn btn-danger" onClick={() =>eliminarUser(us.id_usuario)}>
                    <i className="bi-trash3-fill"></i>

                  </button>
                </div>

             </td>
            </tr>
          ))}
        </tbody>
        
      </Table>
  )}
        </Card.Body>
        
      </Card>
      
          </Col>


          <ModalAddUser show={showModalAddUser} onHide={handleCloseModalAddUser} refreshUsers={getUsers}/>
          <ModalEditUser show={showModalEditUser} onHide={handleCloseModalEditUser} refreshUsers={getUsers} us={userSelected}/>
    </Container>
    
  )
}

export default Administracion