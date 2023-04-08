import { BootstrapFill, HouseFill, GridFill, PeopleFill } from 'react-bootstrap-icons';

const MenuHeader = (props) => {
  return (
    <a
      href={props.href || '#'}
      className='d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom border-gray-300 justify-content-center'
    >
      {props.children}
    </a>
  );
};

const MenuItem = (props) => {
  return (
    <li className='nav-item'>
      <a
        href={props.href || '#'}
        className='nav-link py-3 border-bottom border-gray-300 justify-content-center'
        aria-current='page'
        title={props.title}
        data-bs-toggle='tooltip'
        data-bs-placement='right'
      >
        {props.children}
      </a>
    </li>
  );
};

const SideMenu = (props) => {
  return (
    <div
      className='d-flex flex-column flex-shrink-0 text-white bg-gray-800 vh-100'
      style={{ width: '4.5rem' }}
    >
      <MenuHeader href={'/'}>
        <BootstrapFill color='white' size={30} />
      </MenuHeader>
      <ul className='nav nav-pills nav-flush flex-column mb-auto text-center'>
        <MenuItem>
          <HouseFill color='white' size={26} />
        </MenuItem>

        <MenuItem>
          <GridFill color='white' size={26} />
        </MenuItem>
        <MenuItem>
          <PeopleFill color='white' size={26} />
        </MenuItem>
      </ul>
      <div className='dropdown border-top border-gray-300'>
        <a
          href='#'
          className='d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle'
          id='dropdownUser3'
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          <img
            src='https://github.com/mdo.png'
            alt='mdo'
            width='24'
            height='24'
            className='rounded-circle'
          />
        </a>
        <ul
          className='dropdown-menu text-small shadow'
          aria-labelledby='dropdownUser3'
        >
          <li>
            <a className='dropdown-item' href='#'>
              New project...
            </a>
          </li>
          <li>
            <a className='dropdown-item' href='#'>
              Settings
            </a>
          </li>
          <li>
            <a className='dropdown-item' href='#'>
              Profile
            </a>
          </li>
          <li>
            <hr className='dropdown-divider' />
          </li>
          <li>
            <a className='dropdown-item' href='#'>
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
