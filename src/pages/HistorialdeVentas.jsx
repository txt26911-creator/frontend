import {Table, Button, Container, Col, Row, Spinner} from "react-bootstrap"
import { useState, useEffect } from "react"
import ModalVerNota from "../components/modals/ModalVerNota"
import PagiantionBootstrap from "../components/PagiantionBootstrap"


const HistorialdeVentas = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setstartDate] = useState("");
    const [endDate, setendDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage] = useState(8);
    const [detalleVenta, setDetalleVenta] = useState([])
    const [showModalVerNota, setShowModalVerNota ] = useState(false);
    const  handleShowModalVerNota = () => setShowModalVerNota(true);
    const handleCloseModalVerNota = () => setShowModalVerNota(false);
    const[ventaSelected, setVentaSelected] = useState(null);
     const [loading, setLoading] = useState(true);

      const handleSelect = (item) =>{
    setVentaSelected(item)
    console.log(ventaSelected)
    handleShowModalVerNota()
    
    

  }

    const Endpoint = async (page=1, search = searchTerm) =>{
      setLoading(true)
      try{
        const res = await fetch(`${process.env.REACT_APP_API}/api/ventas/?page=${page}&limit=${perPage}&search=${search}&start=${startDate}&end=${endDate}`)
        const data = await res.json()
        setDetalleVenta(data.data);
        setTotalPages(data.totalPages); 
      setCurrentPage(page);
      }
      catch (e){
        console.log(e)
      }
      finally{
        setLoading(false)
      }
    }
        const fechaConHora = (fecha) => {
  if (!fecha) return ""
  const d = new Date(fecha)
  const day = String(d.getDate()).padStart(2, "0")
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const year = d.getFullYear()
  const hours = String(d.getHours()).padStart(2, "0")
  const minutes = String(d.getMinutes()).padStart(2, "0")
  return `${day}/${month}/${year} ${hours}:${minutes}`
}
const verDetalles = async () => {

}

    useEffect(() => {
        Endpoint();
    },[])



  return (
    <>

    
    <Container fluid>
    <Row>
        
      <Col sm={12} className="mt-4 d-flex gap-2">

      <input
          type="text"
          className="form-control ms-3"
          placeholder="Número de documento"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input type="date" value={startDate} onChange={(e) => setstartDate(e.target.value)}/>
        <input type="date" value={endDate} onChange={(e) => setendDate(e.target.value)}/>
        <button className="btn btn-light" onClick={() => Endpoint(1)}><i className="bi bi-search"></i></button>
        
          
        
        </Col>
        <Col sm={12} className="mt-4">

        {loading ? (    <div className="d-flex justify-content-center align-items-center">
      <Spinner animation="grow" variant='light'/>
      <Spinner animation="grow" variant='light'/>
      <Spinner animation="grow" variant='light'/>
    </div>) : (

          <div style={{ maxHeight: "550px"}}>
        <Table striped bordered hover responsive className='table'>
        <thead  className="text-center">
          <tr>
            <th scope='col' className="d-none d-md-table-cell">Numero de documento</th>
            <th scope='col'>Fecha</th>
            <th scope='col'>Vendedor</th>
            <th scope='col'>Total</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody className='text-center'>
  
          {
            (detalleVenta.length <1 ) ?(
              <tr>
                <td colSpan={5}>Sin ventas</td>
              </tr>
            ):(
              detalleVenta.map((item) => (

                <tr key={item.id_venta} className="text-center">
                  <td className="d-none d-md-table-cell">0000{item.id_venta}</td>
                    <td>{fechaConHora(item.fecha)}</td>
                    <td>{item.usuario}</td>
                    <td>${item.total}</td>
                    <td><Button variant="warning" style={{background: "#369", border: "none", color: "white"}}  onClick={() => handleSelect(item.id_venta)}><i class="bi bi-file-text"></i></Button></td>
                </tr>
            ))
            )

            
          
          }
            
          
        </tbody>
        </Table>
        
        <PagiantionBootstrap
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => Endpoint(page, searchTerm)}
      />
        </div>
    )}

        </Col>
        </Row>
        <ModalVerNota show={showModalVerNota} onHide={handleCloseModalVerNota} idVenta={ventaSelected}/>
    </Container>
    </>
  )
}

export default HistorialdeVentas