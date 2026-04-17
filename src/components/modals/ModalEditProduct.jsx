import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import {toast} from 'react-toastify'


const ModalEditProduct = ({show, onHide, p, refreshProducts}) => {

    let valid = true;


  const [product, setProduct] = useState({
    codigo: '',
    nombre: '',
    precio: '',
    stock: '',
    categoria: '',
    proveedor: ''
  });
  const handleChange = (e) => {

    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };
    useEffect(() => {
    if (p) {
      setProduct(p);
    }
  }, [p]);

  const verificar = () => {
  valid = true;

  if (!product.codigo.trim()) valid = false;
  if (!product.nombre.trim()) valid = false;
  if (product.precio <= 0) valid = false;
  if (product.stock < 0) valid = false;
  if (!product.categoria) valid = false;
  if (!product.proveedor.trim()) valid = false;
};
   const handleSave = async () => {
  try {
    verificar()
    if(valid){
    let res = await fetch(`${process.env.REACT_APP_API}/api/update/${product.id_producto}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if(res){
      toast.success("El producto se actualizó correctamente")
      setTimeout(()=>{
            refreshProducts()
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
        <Modal.Title>Editar producto</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form>
          <div className="mb-3">
            <label className="form-label">Código</label>
            <input
              name='codigo'
              type="text"
              className="form-control"
              placeholder="Código único del producto el nombre"
              onChange={handleChange}
              value={product.codigo}
              
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              name='nombre'
              type="text"
              className="form-control"
              placeholder="Ingresa el nombre"
              onChange={handleChange}
              value={product.nombre}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Precio</label>
            <input
              name="precio"
              type="number"
              className="form-control"
              placeholder="Ingresa el precio"
              onChange={handleChange}
              value={product.precio}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Stock</label>
            <input
              name='stock'
              type="number"
              className="form-control"
              placeholder="Ingresa el stock al momento"
              onChange={handleChange}
              value={product.stock}
            />
          </div>
          <div className="mb-3">
              <label className="form-label">Selecciona una categoría</label>
              <Form.Select aria-label="Default select example" name='categoria' onChange={handleChange} value={product.categoria}>
              <option>Click para seleccionar menú</option>
              <option value="Caballero">Caballero</option>
              <option value="Dama">Dama</option>
              <option value="Unisex">Unisex</option>
              <option value="Sin cateogoría">Sin categoría</option>
            </Form.Select>
          </div>
            <div className="mb-3">
            <label className="form-label">Proovedor</label>
            <input
              name='proveedor'
              type="text"
              className="form-control"
              placeholder="Ingresa el proveedor"
              onChange={handleChange}
              value={product.proveedor}
            />
          </div>
          <div class="alert alert-primary" role="alert">
            Antes de guardar, recuerda verificar lo que estás escribiendo
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="success" onClick={onHide}>Cancelar</Button>
        <Button variant="warning" onClick={handleSave}>Guardar</Button>
      </Modal.Footer>

      </Modal>
    
    </>
  )
}

export default ModalEditProduct