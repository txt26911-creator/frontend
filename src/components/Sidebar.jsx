import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const name = localStorage.getItem("name");
  const lastname = localStorage.getItem("lastname");
  const rol = localStorage.getItem("rol");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <>
      {rol === "Administrador" ? (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            
            <span className="navbar-brand">
              <img alt="logo" src="logo.png" width="80px" /> {name} {lastname}
            </span>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">

                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Pedidos</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/inventario">Inventario</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Apartados</Link>
                </li>

                <li className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    role="button"
                    aria-expanded="false"
                  >
                    Ventas
                  </span>

                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/ventas">Nueva venta</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/hventas">Historial de ventas</Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/arqueo">
                    Arqueo de cajas
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/administracion">
                    Administración
                  </Link>
                </li>

                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </li>

              </ul>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">

            <span className="navbar-brand">
              <img alt="logo" src="logo.png" width="80px" /> {name} {lastname}
            </span>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">

                <li className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    role="button"
                    aria-expanded="false"
                  >
                    Ventas
                  </span>

                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/ventas">Nueva venta</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/hventas">Historial de ventas</Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Configuración
                  </Link>
                </li>

                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </li>

              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Sidebar;