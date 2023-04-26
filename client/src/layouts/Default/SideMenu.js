import { useEffect, useRef } from 'react';
import { Tooltip } from 'bootstrap';

import { useProfile, useRedux } from '../../hooks';
import { logoutUser } from '../../redux/auth/actions';
import { rootTab, tabs } from '../../data';
import { switchTab } from '../../redux/layout/actions';

const MenuHeader = (props) => {
  const { dispatch } = useRedux();
  const { tab } = props;
  const IconComponent = tab.icon.component;
  return (
    <div className='d-flex flex-column'>
      <a
        href={props.href || '#!'}
        className='d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none justify-content-center hover-dim'
        onClick={() => {
          dispatch(switchTab(tab));
        }}
      >
        <IconComponent {...(tab.icon.props || {})} color={'#0a58ca'} />
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
        href={props.href || '#!'}
        className='nav-link py-3 justify-content-center hover-dim'
        aria-current='page'
        title={props.title}
        data-bs-toggle='tooltip'
        data-bs-placement='right'
        onClick={() => {
          dispatch(switchTab(tab));
        }}
      >
        <IconComponent
          {...(tab.icon.props || {})}
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

  const { userProfile } = useProfile();

  const profileTab = tabs.find((t) => t.title.toLowerCase() === 'profile');
  const settingsTab = tabs.find((t) => t.title.toLowerCase() === 'settings');

  return (
    <div className='dropdown border-top border-gray-300'>
      <a
        href='#!'
        className='d-flex align-items-center justify-content-center py-2 link-dark text-decoration-none'
        id='dropdownUser'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        <img
          src={
            userProfile.profileImgUrl ||
            'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp'
          }
          alt='mdo'
          width='40'
          height='40'
          className='avatar'
        />
      </a>
      <ul
        className='dropdown-menu dropdown-menu-dark text-small shadow'
        aria-labelledby='dropdownUser'
      >
        <li>
          <a
            onClick={() => {
              dispatch(switchTab(profileTab));
            }}
            className='dropdown-item'
            href='#!'
          >
            Profile
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              dispatch(switchTab(settingsTab));
            }}
            className='dropdown-item'
            href='#!'
          >
            Settings
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
      <MenuHeader tab={rootTab}></MenuHeader>
      <ul className='nav nav-pills nav-flush flex-column mb-auto text-center'>
        {tabs.map((tab, idx) => {
          return <MenuTabItem key={idx} title={tab.title} tab={tab} />;
        })}
      </ul>
      <MenuDropdown />
    </div>
  );
};

export default SideMenu;
