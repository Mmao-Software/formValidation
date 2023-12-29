import React from 'react'

export default function LoginInput({
    id,
    label,
    placeholder,
    type,
    value,
    errorMessage
}) {
  return (
    <div className='formInput'>
        <label htmlFor={id}>{label}</label>
        <input type={type} id={id} placeholder={placeholder} />
        <span className='errorMsg'>{errorMessage}</span>    
    </div>
  )
}
