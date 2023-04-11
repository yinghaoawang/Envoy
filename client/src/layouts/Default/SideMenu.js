import { useEffect, useRef } from 'react';
import { Tooltip } from 'bootstrap';
import { BsExplicitFill as LogoIcon } from 'react-icons/bs';

import { useRedux } from '../../hooks';
import { logoutUser } from '../../redux/auth/login/actions';
import { tabs } from '../../data';
import { switchTab } from '../../redux/layout/actions';

const MenuHeader = (props) => {
  return (
    <div className='d-flex flex-column'>
      <a
        href={props.href || '#'}
        className='d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none justify-content-center'
      >
        {props.children}
      </a>
      <hr className='sidebar-divider' />
    </div>
  );
};

const MenuTabItem = (props) => {
  const { dispatch, useAppSelector } = useRedux();
  const { activeTab } = useAppSelector((state) => ({
    activeTab: state.Layout.activeTab
  }));

  const tooltipTriggerElement = useRef();
  const { tab } = props;

  useEffect(() => {
    const tooltip = new Tooltip(tooltipTriggerElement.current, {
      trigger: 'hover'
    });
  }, []);
  const IconComponent = tab.icon.component;

  return (
    <li className='nav-item'>
      <a
        ref={tooltipTriggerElement}
        href={props.href || '#'}
        className='nav-link py-3 justify-content-center hover-dim'
        aria-current='page'
        title={props.title}
        data-bs-toggle='tooltip'
        data-bs-placement='right'
        onClick={() => {
          console.log('hey');
          dispatch(switchTab(tab));
        }}
      >
        <IconComponent
          size={tab.icon.size}
          color={activeTab?.id === tab.id ? '#0a58ca' : 'white'}
        />
      </a>
    </li>
  );
};

const MenuDropdown = (props) => {
  const { dispatch } = useRedux();
  const onLogout = () => {
    dispatch(logoutUser());
  };

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
          <button className='dropdown-item' onClick={onLogout}>
            Sign out
          </button>
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
        <LogoIcon color='#0a58ca' size={34} />
      </MenuHeader>
      <ul className='nav nav-pills nav-flush flex-column mb-auto text-center'>
        {tabs.map((tab) => {
          return <MenuTabItem title={tab.title} tab={tab} />;
        })}
      </ul>
      <MenuDropdown />
    </div>
  );
};

export default SideMenu;
