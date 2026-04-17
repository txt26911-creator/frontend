
import Pagination from "react-bootstrap/Pagination";

const PagiantionBootstrap = ({ totalPages, currentPage, onPageChange }) => {
  const items = [];

  // Botón "Anterior"
  items.push(
    <Pagination.Prev
      key="prev"
      onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    />
  );

  // Botones de página
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => onPageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  // Botón "Siguiente"
  items.push(
    <Pagination.Next
      key="next"
      onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    />
  );

  return <Pagination>{items}</Pagination>;
};

export default PagiantionBootstrap;