import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import {toast} from 'react-toastify'
import 'bootstrap-icons/font/bootstrap-icons.css';

const ModalEliminarProduct = ({show, onHide, refreshProducts, p}) => {

    
  const [product, setProduct] = useState({
    codigo: '',
    nombre: '',
    precio: '',
    stock: '',
    categoria: '',
    proveedor: ''
  });

        useEffect(() => {
    if (p) {
      setProduct(p);
    }
  }, [p]);

    const handleDelete = async () => {
    try {

        let res = await fetch(`${process.env.REACT_APP_API}/api/delete/${product.id_producto}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        });
        if(res){
        toast.success("El producto se ha eliminado")
        setTimeout(()=>{
                refreshProducts()
                onHide()
            },0)
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
        <Modal.Title>¿Deses eliminar el producto seleccionado? </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        
          <div class="alert alert-danger text-center" role="alert">
            <b>¡Atención!<br></br>
            Una vez eliminado el producto no es posible la recuperación del mismo.
            </b>
          </div>
          <div className="alert alert-info">
            
    <div className="d-flex flex-column gap-2">
    <div>
      <i className="bi bi-upc-scan me-2"></i> 
      <strong>Código:</strong> {product.codigo}
    </div>
    <div>
      <i className="bi bi-card-text me-2"></i> 
      <strong>Nombre:</strong> {product.nombre}
    </div>
    <div>
      <i className="bi bi-currency-dollar me-2"></i> 
      <strong>Precio:</strong> {product.precio}
    </div>
    <div>
      <i className="bi bi-box-seam me-2"></i> 
      <strong>Stock:</strong> {product.stock}
    </div>
    <div>
      <i className="bi bi-truck me-2"></i> 
      <strong>Proveedor:</strong> {product.proveedor}
    </div>
  </div>
           
            
          </div>
     
      </Modal.Body>

      <Modal.Footer>
        <Button variant="success" onClick={onHide}>Cancelar</Button>
        <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
      </Modal.Footer>

      </Modal>
    
    </>
  )
}

export default ModalEliminarProduct