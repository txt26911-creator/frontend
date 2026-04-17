import '../styles/inventario.css'
import ModalAddProduct from '../components/modals/ModalAddProduct';
import ModalEditProduct from '../components/modals/ModalEditProduct';
import ModalEliminarProduct from '../components/modals/ModalEliminarProduct';
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Spinner from 'react-bootstrap/Spinner';
import PagiantionBootstrap from '../components/PagiantionBootstrap';

import {Container, Col, Row} from 'react-bootstrap';



const Inventario = () => {
    const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage] = useState(10);
  const [loading, setLoading] = useState(true);


    //modal agregar producto
    const [showModalAddProduct, setShowModalAddProduct ] = useState(false);
    const handleShowModalAddProduct = () => setShowModalAddProduct(true);
    const handleCloseModalAddProduc = () => setShowModalAddProduct(false);
  //modal editar producto

    const [showModalEditProduct, setShowModalEditProduct ] = useState(false);
    const handleShowModalEditProduct = () => setShowModalEditProduct(true);
    const handleCloseModalEditProduct = () => setShowModalEditProduct(false);

    //modal eliminar producto
    const [showModalDeleteProduct, setShowModalDeleteProduct ] = useState(false);
    const handleShowModalDeleteProduct = () => setShowModalDeleteProduct(true);
    const handleCloseModalDeleteProduct = () => setShowModalDeleteProduct(false);
const [searchTerm, setSearchTerm] = useState("");
    //

  const [products, setProducts] = useState([]);

  const[productSelected, setProductSelected] = useState(null);


  const handleEdit = (p) =>{
    handleShowModalEditProduct()
    setProductSelected(p)
    

  }
    const handleDelete = (p) =>{
    handleShowModalDeleteProduct()
    setProductSelected(p)
    

  }
  


  const getProducts = async (page = 1,  search = searchTerm) => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.REACT_APP_API}/api/productos?page=${page}&limit=${perPage}&search=${search}`);
      const data = await res.json();
  setProducts(data.data);      
    setTotalPages(data.totalPages); 
    setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
    finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    getProducts(1, searchTerm);
  }, [searchTerm]);

  

  return (
     

    <Container fluid className='mt-4'>
      
      <Row>
  
    <Col sm={12} className="d-flex gap-2">

      <input
          type="text"
          className="form-control"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="btn btn-light "
          onClick={() => getProducts(1)}
          
        ><i className="bi bi-search"></i></button>
        
                <button className='btn btn-success ' onClick={handleShowModalAddProduct}><i className="bi bi-plus-circle"></i></button>
   
        
        </Col>
        <Col className='mt-4' sm={12} >
      <div className="row justify-content-center" >
        <div className="col-12 col-sm-10">
              {loading ? (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner animation="grow" variant='light'/>
      <Spinner animation="grow" variant='light'/>
      <Spinner animation="grow" variant='light'/>
    </div>
  ) : (
        <Table striped bordered hover responsive='sm' className='table'>
        <thead className='text-center'>
          <tr>
            <th scope='col'>Código</th>
            <th scope='col'>Nombre</th>
            <th scope='col'>Precio</th>
            <th scope='col'>Stock</th>
            <th scope='col'>Categoría</th>
            <th scope='col' className="d-none d-md-table-cell">Proveedor</th>
            <th scope='col'> </th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {products.map((p) => (
            <tr key={p.id_producto} >
              <td>{p.codigo}</td>
              <td>{p.nombre}</td>
              <td>{p.precio}</td>
              <td><span className={(p.stock == 0) ? 'badge text-bg-danger' : (p.stock) < 3 ? 'badge text-bg-warning' : 'badge text-bg-success' }>{p.stock}</span></td>
              <td >{p.categoria}</td>
              <td className="d-none d-md-table-cell">{p.proveedor}</td>
              <td >
                  <div className="d-flex  justify-content-center gap-2">
                  <button className="btn btn-warning" onClick={() => handleEdit(p)}>
                    <i className="bi bi-pencil"></i>
              
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(p)}>
                    <i className="bi bi-trash-fill"></i>

                  </button>
                </div>

             </td>
            </tr>
          ))}
        </tbody>
        
      </Table>

  )}
  <PagiantionBootstrap
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => getProducts(page, searchTerm)}
      />
      </div>
        
      
      </div>
        </Col>
      </Row>
       
        
        <ModalAddProduct show={showModalAddProduct} onHide={handleCloseModalAddProduc} refreshProducts={getProducts}/>
        <ModalEditProduct show={showModalEditProduct} onHide={handleCloseModalEditProduct} p={productSelected} refreshProducts={getProducts}/>
        <ModalEliminarProduct show={showModalDeleteProduct} onHide={handleCloseModalDeleteProduct} p={productSelected} refreshProducts={getProducts}/>
      </Container>
      
 
    
  )
}

export default Inventario