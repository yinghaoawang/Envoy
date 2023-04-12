const PlaceholderSidebar = (props) => {
  return (
    <div>
      <a
        href='/'
        className='d-flex align-items-center mb-3 mb-md-0 ms-2 me-md-auto text-white text-decoration-none'
      >
        <span className='fs-4'>Sidebar</span>
      </a>
      <hr />
      <ul className='nav nav-pills flex-column mb-auto'>
        <li className='nav-item'>
          <a href='#!' className='nav-link active' aria-current='page'>
            Home
          </a>
        </li>
        <li>
          <a href='#!' className='nav-link text-white'>
            Dashboard
          </a>
        </li>
        <li>
          <a href='#!' className='nav-link text-white'>
            Orders
          </a>
        </li>
        <li>
          <a href='#!' className='nav-link text-white'>
            Products
          </a>
        </li>
        <li>
          <a href='#!' className='nav-link text-white'>
            Customers
          </a>
        </li>
      </ul>
    </div>
  );
};

export default PlaceholderSidebar;
