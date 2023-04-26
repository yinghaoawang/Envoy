import { tabs } from '../data';
import { useRedux } from '../hooks';
import { switchTab } from '../redux/layout/actions';

const PlaceholderSidebar = (props) => {
  const { dispatch } = useRedux();
  return (
    <div>
      <p
        className='d-flex align-items-center mb-3 mb-md-0 ms-2 me-md-auto text-white'
      >
        <span className='fs-4'>Envoy</span>
      </p>
      <hr />
      <ul className='nav nav-pills flex-column mb-auto'>
        {tabs.map((tab, idx) => {
          return (
            <li key={idx} className='nav-item hover-dim'>
              <a
                href='#!'
                className='nav-link text-white'
                onClick={() => {
                  dispatch(switchTab(tab));
                }}
              >
                {tab.title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PlaceholderSidebar;
