import React from "react";
import TextArea from "../ui/TextArea";
import Input from "../ui/Input";

const InputGroup = ({name,placeholder,text,handleChange,error,handleFocus,handleBlur,}) => {
    
  return (
    <div>
      <TextArea htmlFor={name}>{text}</TextArea>
      <Input placeholder={placeholder} id={name} name={name} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} error={error} />
      {
        error&&<small style={{color:'red'}}>{error}</small>
      }
    </div>
  );
};

export default InputGroup;
