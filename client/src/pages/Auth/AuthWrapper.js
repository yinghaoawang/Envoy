const AuthWrapper = (props) => {
  return (
    <div className='vh-100 d-flex justify-content-center align-items-center bg-gray-300'>
      <div className='container'>
        <div className='row d-flex justify-content-center'>
          <div className='col-12 col-md-8 col-lg-6'>
            <div className='card bg-gray-800 text-white'>{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
