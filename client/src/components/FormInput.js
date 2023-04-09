const FormInput = (props) => {
  return (
    <>
      <label htmlFor={props.name} className='form-label '>
        {props.label}
      </label>
      <input
        placeholder={props.placeholder}
        type={props.type ? props.type : 'text'}
        id={props.name}
        className={'form-control ' + (props.className || '')}
        {...(props.register ? props.register(props.name) : {})}
      />
    </>
  );
};

export default FormInput;