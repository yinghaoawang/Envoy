const InputType = {
  TEXTFIELD: 'TEXTFIELD',
  TEXTAREA: 'TEXTAREA'
};

const FormInput = (props) => {
  let inputType = InputType.TEXTFIELD;
  if (props.type === 'textarea') inputType = InputType.TEXTAREA;

  const attributes = {
    ...props,
    type: props.type ? props.type : 'text',
    id: props.name,
    className: 'form-control ' + (props.className || '')
  };
  delete attributes.register;

  return (
    <>
      <label htmlFor={props.name} className='form-label '>
        {props.label}
      </label>
      {inputType === InputType.TEXTFIELD && (
        <input
          {...attributes}
          {...(props.register ? props.register(props.name) : {})}
        />
      )}
      {inputType === InputType.TEXTAREA && (
        <textarea
          {...attributes}
          {...(props.register ? props.register(props.name) : {})}
        />
      )}
    </>
  );
};

export default FormInput;
