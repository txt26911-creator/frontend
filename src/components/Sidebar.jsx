import { Link, Outlet, useNavigate } from 'react-router-dom'


const Sidebar = () => {
  const name = localStorage.getItem("name");
  const lastname = localStorage.getItem("lastname");
  const rol = localStorage.getItem("rol");
  const navigate = useNavigate();

  const handleLogout = () => {
   
    localStorage.clear()

    
    navigate("/", { replace: true });
  }

  return (
    <>
    {rol === "Administrador" ? (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand"> <img src='logo.png' width={'80px'}/> {name} {lastname}</a>
    
   
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <Link class="nav-link" aria-current="page" to="/dashboard">Pedidos</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to='/inventario'>Inventario</Link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Apartados</a>
        </li>
            <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Ventas</a>
            <ul class="dropdown-menu">
              <li><Link class="dropdown-item" to='/ventas'>Nueva venta</Link></li>
              <li><Link class="dropdown-item" to='/hventas'>Historial de ventas</Link></li>
            </ul>
          </li>
    
        <li class="nav-item">
          <a class="nav-link" href='/arqueo'>Arqueo de cajas</a>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to='/administracion'>Administración</Link>
        </li>
        <li class="nav-item">
          <button className='nav-link btn btn-link' onClick={handleLogout}>Cerrar sesión</button>
        </li>
      </ul>
    </div>
  </div>
</nav>

    ): (        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand"> <img src='logo.png' width={'80px'}/> {name} {lastname}</a>
    
   
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        
            <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Ventas</a>
            <ul class="dropdown-menu">
              <li><Link class="dropdown-item" to='/ventas'>Nueva venta</Link></li>
              <li><Link class="dropdown-item" to='/hventas'>Historial de ventas</Link></li>
            </ul>
          </li>
        
        <li class="nav-item">
          <a class="nav-link" href='#'>Configuración</a>
        </li>
        <li class="nav-item">
          <Link class="nav-link" onClick={() => handleLogout()}>Cerrar sesión</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>)}
        
</>
    
    )
    
};

export default Sidebar