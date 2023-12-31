import './App.css';
import React, { useRef} from 'react';
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

// the schema that will be used in the valifdatiob logic.
const schema = yup.object({
  fullname:yup.string().required("Fullname is Required"),
  email:yup.string().required("Email is a required field").email("Email is not valid"),
  username:yup.string().required("Username is Required"),
  password: yup.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Password must be a match")
}); 

function Signup() {

  // this is the validation logic that uses the schema that I made.
  // handleSubmit does the work of verifying the form first for validation before submission
  // register is for connecting the input fields to the form state
  // formstate is for getting the current error state of the input field
  const { 

    handleSubmit, 
    register, 
    formState: {errors}

  } = useForm({

    // i've used yup library for managing the validation 
    resolver: yupResolver(schema)

  });
  // will be used for navigating to another page
  const navigate = useNavigate();

  // capturing the values of the input components
  const inputFullname = useRef();
  const inputEmail = useRef();
  const inputUsername = useRef();
  const inputPassword = useRef();

  // the sign up logic
  const formSubmit = () => {
    // check if values are null
    if (inputFullname.current.value && inputEmail.current.value && inputUsername.current.value && inputPassword.current.value) {
      // storing each value in the local storage

      localStorage.setItem('Fullname', inputFullname.current.value)
      localStorage.setItem('Email', inputEmail.current.value)
      localStorage.setItem('Username', inputUsername.current.value)
      localStorage.setItem('Password', inputPassword.current.value)
      localStorage.setItem('signUp', inputEmail.current.value)
      
      // show success message
      alert('Successful sign up')
      // route to the dashboard page
      navigate('/Dashboard')

    } else {
      // show the unsuccessful message
      alert('Invalid sign up details')
      window.location.reload();
    }
  }

  return (
  <>
    <div className='App'>
      <div style={{display:'flex', flexDirection:'column', marginBottom:'1rem'}}>
        <span style={{fontWeight:'600', fontSize:'200%'}}>Sign up</span>
        <span style={{color:'grey', fontSize:'80%', marginTop:'0.2rem'}}>Enter the details below.</span>
      </div>

      {/* the sign up form */}
      <form onSubmit={handleSubmit(formSubmit)}>
        {/* the input tags, each having their label and error message */}
        {/* once validation is not met, then the message appears */}

        <div className="formInput">
          <label htmlFor='fullname'>Fullname</label>
          <input type='text' id='fullname' placeholder='Fullname' ref={inputFullname} {...register}/>
          <span className='errorMsg'>{errors.fullname?.message}</span> 
        </div>

        <div className="formInput">
          <label htmlFor='email'>Email</label>
          <input type='text' id='email' placeholder='Email' ref={inputEmail} {...register}/>
          <span className='errorMsg'>{errors.email?.message}</span> 
        </div>

        <div className="formInput">
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' placeholder='Username' ref={inputUsername} {...register}/>
          <span className='errorMsg'>{errors.username?.message}</span> 
        </div>
        
        <div className="formInput">
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' placeholder='Password' ref={inputPassword} {...register}/>
          <span className='errorMsg'>{errors.password?.message}</span> 
        </div>

        <div className="formInput">
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input type='password' id='confirmPassword' placeholder='Confirm Password' {...register}/>
          <span className='errorMsg'>{errors.confirmPassword?.message}</span> 
        </div>

        {/* the submit button and login route */}
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
          <button style={{padding:'0.4rem 0', borderRadius:'0.3rem', border:'none', backgroundColor:'blue', color:'white', fontWeight:'600', cursor:'pointer'}} onClick={formSubmit}>Sign up</button>
          <span style={{paddingTop:'0.4rem'}}>Already have an account? <Link to='/Login' style={{textDecoration:'none', color:'blue'}}>Login</Link></span>
        </div>
          
      </form>
      
    </div>      
  </>
  );
}

export default Signup;