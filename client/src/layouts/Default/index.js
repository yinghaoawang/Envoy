import Leftbar from './Leftbar';

const DefaultLayout = (props) => {
  return (
    <div className="d-flex">
      <Leftbar />
      {props.children}
    </div>
  );
}

export default DefaultLayout;