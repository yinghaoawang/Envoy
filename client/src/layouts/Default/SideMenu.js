import { useEffect, useRef } from 'react';
import { Tooltip } from 'bootstrap';
import {
  Explicit as LogoIcon,
  HouseFill as HomeIcon,
  GridFill as DashboardIcon,
  PeopleFill as FriendsIcon
} from 'react-bootstrap-icons';

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
  const tooltipTriggerElement = useRef();

  useEffect(() => {
    const tooltip = new Tooltip(tooltipTriggerElement.current);
  }, []);

  return (
    <li className='nav-item'>
      <a
        ref={tooltipTriggerElement}
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

const MenuDropdown = (props) => {
  return (
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
        className='dropdown-menu dropdown-menu-dark text-small shadow'
        aria-labelledby='dropdownUser3'
      >
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
  );
};

const SideMenu = (props) => {
  return (
    <div
      className='d-flex flex-column flex-shrink-0 text-white bg-gray-800 vh-100'
      style={{ width: '4.5rem' }}
    >
      <MenuHeader href={'/'} title={'Bootstrap'}>
        <LogoIcon color='white' size={30} />
      </MenuHeader>
      <ul className='nav nav-pills nav-flush flex-column mb-auto text-center'>
        <MenuItem title={'Home'}>
          <HomeIcon color='white' size={26} />
        </MenuItem>

        <MenuItem title={'Dashboard'}>
          <DashboardIcon color='white' size={26} />
        </MenuItem>
        <MenuItem title={'Friends'}>
          <FriendsIcon color='white' size={26} />
        </MenuItem>
      </ul>
      <MenuDropdown />
    </div>
  );
};

export default SideMenu;
