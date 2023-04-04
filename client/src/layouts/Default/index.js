const DefaultLayout = (props) => {
  return (
    <div>
      <div>Side Menu</div>
      {props.children}
    </div>
  );
}

export default DefaultLayout;