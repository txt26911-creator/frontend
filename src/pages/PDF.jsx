import {jsPDF} from "jspdf"

const PDF = () => {
    const generarTicket = () => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: [80, 150], // tamaño típico de ticket: 80mm ancho
    });

    let y = 10; // posición vertical inicial

    // **Encabezado**
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Mi Tienda", 40, y, { align: "center" });
    y += 6;
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("RUC: 1234567890", 40, y, { align: "center" });
    y += 5;
    doc.text("Dirección: Calle Falsa 123", 40, y, { align: "center" });
    y += 5;
    doc.text("Tel: (555) 123-456", 40, y, { align: "center" });
    y += 7;

    doc.setLineWidth(0.1);
    doc.line(5, y, 75, y); // línea horizontal
    y += 4;

    // **Datos del cliente**
    doc.text("Cliente: Juan Pérez", 5, y);
    y += 4;
    doc.text("Fecha: 23/02/2026 14:30", 5, y);
    y += 6;
    doc.line(5, y, 75, y);
    y += 4;

    // **Tabla de productos**
    const productos = [
      { desc: "Producto A", cant: 2, precio: 10 },
      { desc: "Producto B", cant: 1, precio: 25 },
      { desc: "Producto C", cant: 3, precio: 5 },
    ];

    productos.forEach((item) => {
      doc.text(item.desc, 5, y);
      doc.text(`${item.cant} x $${item.precio}`, 60, y, { align: "right" });
      y += 4;
    });

    y += 2;
    doc.line(5, y, 75, y);
    y += 4;

    // **Total**
    const total = productos.reduce((sum, p) => sum + p.cant * p.precio, 0);
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL: $${total}`, 60, y, { align: "right" });
    y += 6;

    // **Pie de página**
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.text("Gracias por su compra!", 40, y, { align: "center" });

    // Guardar o imprimir
    doc.save("ticket.pdf");
  };

  return (
    <>
    <div>
      <h2>Factura</h2>
      <button onClick={generarTicket}>Generar PDF</button>
    </div>
    </>
  )
}

export default PDF