import { Modal, Button, Row, Col, Table, Form} from "react-bootstrap"
import { useState, useEffect } from "react";
import {jsPDF} from 'jspdf'
//import QRCode from "qrcode"

const ModalVerNota = ({show, onHide, idVenta}) => {


    const [detalleVenta, setDetalleVenta] = useState({})
    const [detalleProductos, setDetalleProductos] = useState([])


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


useEffect(() => {
  if (!idVenta || !show) return;
  if (detalleVenta.id_venta === idVenta) return;

  const fetchData = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API}/api/ventas/ver/${idVenta}`
    );
    const data = await res.json();

    setDetalleVenta(data);
    setDetalleProductos(data.detalle || []);
  };

  fetchData();
}, [idVenta, show]);

const generarTicket = async () => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: [80, 150], // tamaño típico de ticket
    });

    let y = 10;
   //   const qrData = `${process.env.REACT_APP_QR}/api/ventas/ver/${detalleVenta.id_venta}`; // ejemplo: URL de la venta
  //const qrCodeDataURL = await QRCode.toDataURL(qrData);

  // doc.addImage(qrCodeDataURL, "PNG", 25, 95, 30, 30); // x, y, ancho, alto

    // Encabezado
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("La casa de los perfumes", 40, y, { align: "center" });
    y += 6;
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("RFC: XXXXXXXXXX", 40, y, { align: "center" });
    y += 5;
    doc.text("Calle Altamirano, Colonia centro, CP: 24200", 40, y, { align: "center" });
    y += 5;
    doc.text("Tel: XXXXXXX", 40, y, { align: "center" });
    y += 7;

    doc.setLineWidth(0.1);
    doc.line(5, y, 75, y);
    y += 4;

    // Datos del cliente
    doc.text(`Cliente: ${detalleVenta.cliente || "N/A"}`, 5, y);
    y += 4;
    doc.text(`Fecha: ${fechaConHora(detalleVenta.fecha)}`, 5, y);
    y += 6;
    doc.line(5, y, 75, y);
    y += 4;

    // Productos
      // Encabezado de productos
  doc.setFont("helvetica", "bold");
  doc.text("Productos", 5, y);
  doc.text("Cantidad", 52, y, { align: "right" });
  doc.text("Precio", 75, y, { align: "right" });
  y += 4;
  doc.setFont("helvetica", "normal");

  // Productos
  detalleProductos.forEach((item) => {
    doc.text(item.nombre.toString(), 5, y);
    doc.text(item.cantidad.toString(), 48, y, { align: "right" });
    doc.text(`$${item.precio.toString()}`, 75, y, { align: "right" });
    y += 4;
  });

    y += 2;
    doc.line(5, y, 75, y);
    y += 4;

    // Total
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL: $${detalleVenta.total || 0}`, 50, y, { align: "right" });
    y += 6;

    // Pie de página
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.text("¡Gracias por su compra!", 40, 145, { align: "center" });

    // Abrir ventana de impresión directamente
      // Abrir ventana de impresión
    const pdfBlob = doc.output("bloburl");
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = pdfBlob;
    document.body.appendChild(iframe);
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    //doc.save("ticket_venta_"+detalleVenta.id_venta)

  };

  return (
    <>
    <Modal size="lg" show={show} onHide={onHide}  backdrop='static'>
                <Modal.Header>
                    <Modal.Title>Detalle de la transacción</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={4}>
                            <Form.Group>
                                <Form.Label>Fecha Registro:</Form.Label>
                                <Form.Control bsSize="sm" disabled value={fechaConHora(detalleVenta.fecha)}/>
                            </Form.Group>
                        </Col>
                        <Col sm={4} className="mt-1">
                            <Form.Group>
                                <Form.Label>Numero Venta:</Form.Label>
                                <Form.Control bsSize="sm" disabled value={detalleVenta.id_venta}/>
                            </Form.Group>
                        </Col>
                        <Col sm={4} className="mt-1">
                            <Form.Group>
                                <Form.Label>Tipo Documento:</Form.Label>
                                <Form.Control bsSize="sm" disabled value={detalleVenta.tipo_documento} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4} className="mt-1">
                            <Form.Group>
                                <Form.Label>Vendedor:</Form.Label>
                                <Form.Control bsSize="sm" disabled value={detalleVenta.usuario}/>
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row>
                        <Col sm={4} className="mt-1">
                            <Form.Group>
                                <Form.Label>Sub Total:</Form.Label>
                                <Form.Control bsSize="sm" disabled value={detalleVenta.subTotal} />
                            </Form.Group>
                        </Col>
                        <Col sm={4} className="mt-1">
                            <Form.Group>
                                <Form.Label>IVA (16%):</Form.Label>
                                <Form.Control bsSize="sm" disabled value={detalleVenta.impuesto}/>
                            </Form.Group>
                        </Col>
                        <Col sm={4} className="mt-1">
                            <Form.Group>
                                <Form.Label>Total:</Form.Label>
                                <Form.Control bsSize="sm" disabled value={detalleVenta.total} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} className="mt-2">
                            <Table size="sm">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (detalleProductos.length === 0) ? (
                                            <tr><td colSpan={4}>Sin productos</td></tr>
                                        ) : (
                                            detalleProductos.map((item) => (
                                                <tr key={item.id_producto}>
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
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={onHide}>Cerrar</Button>
                    <Button variant="warning" onClick={generarTicket}>Imprimir</Button>
                </Modal.Footer>
            </Modal>
    
    
    </>
  )
}

export default ModalVerNota