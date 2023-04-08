import Leftbar from '../../pages/Dashboard/Leftbar';
import SideMenu from './SideMenu';

const DefaultLayout = (props) => {
  return (
    <div className="main">
      <SideMenu />
      {props.children}
    </div>
  );
}

export default DefaultLayout;