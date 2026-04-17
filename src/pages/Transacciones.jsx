import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Spinner from 'react-bootstrap/Spinner';
import Autosuggest from 'react-autosuggest'
import '../styles/ventas.css'
import Swal from 'sweetalert2'

import { Card, Col, FormGroup, Input, InputGroup, Row,  Button, Container, Form, ModalTitle, } from "react-bootstrap";
import ModalVerNota from "../components/modals/ModalVerNota";

const Transacciones = () => {

  const name = localStorage.getItem("name");
  const lastname = localStorage.getItem("lastname");
  
    const [showModalVerNota, setShowModalVerNota ] = useState(false);
    const handleShowModalVerNota = () => setShowModalVerNota(true);
    const handleCloseModalVerNota = () => setShowModalVerNota(false);

  const [productos, setProductos] = useState([])
   const [a_Productos, setA_Productos] = useState([])
   const [a_Busqueda, setA_Busqueda] = useState("")
   const [tipoDocumento, setTipoDocumento] = useState("Nota sencilla");
   const [numeroDoc, setNumeroDoc] = useState(0)

   
       const [total, setTotal] = useState(0)
    const [subTotal, setSubTotal] = useState(0)
    const [igv, setIgv] = useState(0)
   
       const onChange = (e, {newValue}) => {
        setA_Busqueda(newValue)
    }
   const inputProps = {
        placeholder : "Buscar producto",
        value: a_Busqueda,
        onChange
    }
        const eliminarProducto = (id) => {

        let listaproductos = productos.filter(p => p.id_producto != id)

        setProductos(listaproductos)

        calcularTotal(listaproductos)
    }
        const onSuggestionsFetchRequested = ({ value }) => {
       
          if (value.length < 3) {
            setA_Productos([]);
            return;
      }
            

        const api = fetch(`${process.env.REACT_APP_API}/api/venta/productos/` + value)
            .then((response) => {
                return response.ok ? response.json() : Promise.reject(response);
            })
            .then((dataJson) => {
                setA_Productos(dataJson)
            }).catch((error) => {
                console.log("No se pudo obtener datos, mayor detalle: ", error)
            })
      
    }
        const getSuggestionValue = (sugerencia) => {

        return sugerencia.codigo + " - " + sugerencia.nombre + " - " + "$"+sugerencia.precio
    }
        const renderSuggestion = (sugerencia) => (
         
          <span>
            {sugerencia.codigo + " - " + sugerencia.nombre + " - " + "$"+sugerencia.precio}
          </span>

     )
    const onSuggestionsClearRequested = () => {
        setA_Productos([])
    }

        const reestablecer = () => {
        setTipoDocumento("Nota sencilla")
        setProductos([])
        setTotal(0)
        setSubTotal(0)
        setIgv(0)
    }
    const terminarVenta = () => {
      if(productos.length<1){
        Swal.fire(
          'Oops...',
          'Por favor, agrega productos para poder finalizar la venta.',
          'error'
        )
        return
      }

        Swal.fire({
              title: "Gestión de pagos",
              html: `
                   <div style="text-align: center;">
                  <label for="efectivo" style="display:block; margin-top:10px;">Total:</label>
                  <input id="cantidad" class="swal2-input" value="${total}" readonly>
                  <label for="efectivo" style="display:block; margin-top:10px;">Efectivo recibido:</label>
                  <input id="efectivo" class="swal2-input" value="0.0" placeholder="Efectivo">
                </div>
              `,
              focusConfirm: false,
              preConfirm: () => {
                
                  const cantidad = parseFloat(document.getElementById("cantidad").value);
                  const efectivo = parseFloat(document.getElementById("efectivo").value);

                  let cambio = efectivo - cantidad  || 0
                 if (cantidad>efectivo){
                  Swal.showValidationMessage(`Falta efectivo para completar la transacción: ${Math.abs(cambio).toFixed(2)}`)
                  return false;
                 }
                 return { total: total, efectivo: efectivo, cambio: cambio };
              }
            }).then((result) =>{
              if(result.isConfirmed){
                Swal.fire({
  
                  html: `<label class="alert alert-warning"><strong>Cambio: ${(result.value.cambio).toFixed(2)}</strong></label>`, 
                  icon: "success" ,
                  confirmButtonText: "Finalizar venta"
                }
                ).then((result) => {
                  if(result.isConfirmed){

                     let venta = {

            tipoDocumento: tipoDocumento,
            subTotal: parseFloat(subTotal),
            igv: parseFloat(igv),
            total:parseFloat(total),
            listaProductos: productos,
            usuario: name +' '+ lastname
        }


        const api = fetch(`${process.env.REACT_APP_API}/api/venta/registrar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(venta)
        })
        .then((response) => {
            return response.ok ? response.json() : Promise.reject(response);
        })
        .then((dataJson) => {
            reestablecer();
            var data = dataJson;
            setNumeroDoc(data.numeroDocumento)
            handleShowModalVerNota();
            

        }).catch((error) => {
            Swal.fire(
                'Opps!',
                'No se pudo crear la venta',
                'error'
            )
            console.log("No se pudo enviar la venta ", error)
        })

                    
                  }
                })
              }

            })
           
            
      
       
    }

    
    const sugerenciaSeleccionada = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {

        Swal.fire({
            title:  `Ingresa la cantidad que deseas vender de: \n${suggestion.nombre}`,
            html: `Disponibilidad de piezas al momento: <strong>${suggestion.stock}</strong>`,
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Volver',
            showLoaderOnConfirm: true,
            preConfirm: (inputValue) => {

                
                if (isNaN(parseFloat(inputValue))) {
                    setA_Busqueda("")
                    Swal.showValidationMessage(
                        "Debe ingresar un valor númerico"
                    )
                }else if(inputValue > suggestion.stock){
                  Swal.showValidationMessage("¡No hay la cantidad suficiente en existencia!")

                } else {

                    let producto = {
                        id_producto: suggestion.id_producto,
                        nombre: suggestion.nombre,
                        cantidad: parseInt(inputValue),
                        precio: suggestion.precio,
                        total: suggestion.precio * parseFloat(inputValue)
                    }
                    let arrayProductos = []
                    arrayProductos.push(...productos)
                    arrayProductos.push(producto)

                    setProductos((anterior) => [...anterior, producto])
                    calcularTotal(arrayProductos)
                }
                

            },
            allowOutsideClick: () => !Swal.isLoading()

        }).then((result) => {
            if (result.isConfirmed) {
                setA_Busqueda("")
            } else {
                setA_Busqueda("")
            }
        })
    }
    const calcularTotal = (arrayProductos) => {
        let t = 0;
        let st = 0;
        let imp = 0;

        if (arrayProductos.length > 0) {

            arrayProductos.forEach((p) => {
                t = p.total + t
            })

            st = t / (1.16)
            imp = t - st
        }

        //Monto Base = (Monto con IGV) / (1.18)

        //IGV = (Monto con IGV) – (Monto Base)

        setSubTotal(st.toFixed(3))
        setIgv(imp.toFixed(3))
        setTotal(t.toFixed(3))
    }


  return (
   <Container fluid>

  <Row className="mt-4">
    
   
    <Col sm={8}>
      <Card className="mb-3">
        <Card.Header className="bg-white text-dark border-secondary">
          <h5 className="text-center">Productos</h5>
        </Card.Header>
        <Card.Body>
      <Col sm={12}>
          <FormGroup>
            <Autosuggest suggestions={a_Productos} inputProps={inputProps}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            onSuggestionSelected={sugerenciaSeleccionada}
            
            />
          </FormGroup>
      </Col>
      <Col sm={23} className="mt-2">
          <Table striped bordered hover responsive='sm' className='table'>
        <thead className='text-center'>
          <tr>
            <th></th>
            <th scope='col'>Producto</th>
            <th scope='col'>Cantidad</th>
            <th scope='col'>Precio</th>
            <th scope='col'>Total</th>
          </tr>
        </thead>
        <tbody className='text-left'>
  
          {
            (productos.length <1 ) ?(
              <tr>
                <td colSpan={5}>Sin productos</td>
              </tr>
            ):(
              productos.map((item) => (
                <tr key={item.id_producto} className="text-center">
                    <td>
                        <Button className="btn-danger" size="sm"
                        onClick={() => eliminarProducto(item.id_producto)}
                        >
                            <i className="bi-trash3-fill"></i>
                        </Button>
                    </td>
                    <td>{item.nombre}</td>
                    <td>{item.cantidad}</td>
                    <td>{item.precio}</td>
                    <td>{item.total}</td>
                </tr>
            ))
            )

            
          
          }
            
          
        </tbody>
        
      </Table>
       </Col>
        </Card.Body>
      </Card>
    </Col>

   
    <Col sm={4}>
      
 
      <Card className="mb-3">
        <Card.Header className="bg-white text-dark border-secondary">
          <h5 className="text-center">Detalles</h5>
        </Card.Header>
        <Card.Body>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text>Tipo:</InputGroup.Text>
            <Form.Select  value={tipoDocumento} onChange={ (e) => setTipoDocumento(e.target.value)}>
              <option>Nota sencilla</option>
              <option>Factura</option>
            </Form.Select>
          </InputGroup>
           <Col sm={12}>
              <InputGroup size="sm" className="mb-3">
                  <InputGroup.Text>Sub Total:</InputGroup.Text>
                  <Form.Control value={subTotal} disabled/>
              </InputGroup>
          </Col>
            <Col sm={12}>
              <InputGroup size="sm" className="mb-3">
                  <InputGroup.Text>IVA (16%):</InputGroup.Text>
                  <Form.Control value={igv} disabled/>
              </InputGroup>
            
          </Col>
               <Col sm={12} className="mt-2">
              <InputGroup size="sm" >
                  <InputGroup.Text>Total:</InputGroup.Text>
                  <Form.Control value={total} disabled/>
                  
              </InputGroup>
            
          </Col>
        </Card.Body>
      </Card>

      
      <Card>
        <Card.Body className="text-center">
          <Button variant="success" onClick={terminarVenta}>
            <i className="bi bi-credit-card"></i> Terminar venta
          </Button>
        </Card.Body>
      </Card>

    </Col>
  </Row>
  <ModalVerNota show={showModalVerNota} onHide={handleCloseModalVerNota} idVenta={numeroDoc}/>
</Container>

  )
}

export default Transacciones