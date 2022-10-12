import { createContext, useState, useRef } from 'react'

export const FormContext = createContext();

export const FormProvider = ({ children }) => {

  const tmpDataRef = useRef();

  const [ formData, setFormData ] = useState({
    data: {},
    sent: false, 
    sending: false, 
    serverError: false,
    hasErrors: false,
    success: false,
  });


  const registerFormData = (name, message, valid) => {
    if(!name) return;

    tmpDataRef.current = {
      ...tmpDataRef.current,
      [name]: {
        message: message,
        valid: valid
      }
    }

    setFormData({
      ...formData,
      data: tmpDataRef.current
    })
  }


  const updateFormData = (e, valid) => {
    let message,
        name, 
        value,
        checked,
        isCheckBox;

    if(e.target) {
      name = e.target.name;
      value = e.target.value;
      checked = e.target.checked;
      isCheckBox = e.target.hasOwnProperty('checked');
    } 
    else if(Array.isArray(e.value)) { // Join multi select results
      name = e.name;
      value = e.value.join(', ');
      isCheckBox = false;
    }
    else if (typeof e === 'object') { // if result doesnt come from input
      name = e.name,
      value = e.value,
      isCheckBox = false;
    }
    
    if(isCheckBox) {
      message = checked
    } else {
      message = value
    }

    if(name) {
      setFormData({
        ...formData,
        data: {
          ...formData.data,
          [name]: {
            ...formData.data[name],
            message: isCheckBox ? checked : value,
            valid: valid
          },
        },
      })
    }
  }


  return (

    <FormContext.Provider 
      value={{ 
        formData,
        setFormData,
        registerFormData,
        updateFormData
      }} 
    >
      
      {children}

    </FormContext.Provider>
  );
};