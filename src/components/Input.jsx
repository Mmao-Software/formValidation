import React from 'react';

export default function Input({ 
  id, 
  label, 
  placeholder, 
  type, 
  register, 
  errorMessage
}) {
  return (
    <div className="formInput">
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} placeholder={placeholder}  {...register}/>
      <span className='errorMsg'>{errorMessage}</span> 
    </div>
  );
}