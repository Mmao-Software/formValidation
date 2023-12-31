import React, { useRef } from 'react'
import './App.css'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

// the yup schema which is used in validating the input fields..here is where the errors are defined incase the validation is not met.
const schema = yup.object({
    usernameEmail:yup.string().required("Username or Email is Required"),
    password: yup.string().required("Password is Required")
  });


export default function Login() {

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

//   will be used for routing to another page.
  const navigate = useNavigate();

//   getting the values of the input fields
  const loginEmail = useRef();
  const loginPassword = useRef();

//   the login logic
  const handleLogin = () => {
    // check if the email and password values match with the stored credentials in local storage
    if (loginEmail.current.value === localStorage.getItem('Email') && loginPassword.current.value === localStorage.getItem('Password')) {
        // show the success message
        alert('Login Successful')
        // navigate the user to the dashboard page
        navigate('/Dashboard')
    } else {
    // show the unsuccessful message
        alert('Invalid Login Credentials')
        // reload the page
        window.location.reload();
    }
  }

    return (
    <div>
        <div className='App'>
            <div style={{display:'flex', flexDirection:'column', marginBottom:'1rem'}}>
                <span style={{fontWeight:'600', fontSize:'200%'}}>Login</span>
                <span style={{color:'grey', fontSize:'80%', marginTop:'0.2rem'}}>Welcome back.</span>
            </div>

            {/* the login form */}
            <form onSubmit={handleSubmit(handleLogin)}>
                {/* the input tags, each having the label and the error message */}
                <div className='formInput'>
                    <label htmlFor='email'>Email</label>
                    <input type='text' id='email' placeholder='Email' ref={loginEmail} {...register}/>
                    <span className='errorMsg'>{errors.loginEmail?.message}</span>    
                </div>

                <div className='formInput'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' placeholder='Password' ref={loginPassword} {...register}/>
                    <span className='errorMsg'>{errors.password?.message}</span>    
                </div>

                {/* the login button and the route to go to the sign up page */}
                <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                    <button style={{padding:'0.4rem 0', borderRadius:'0.3rem', border:'none', backgroundColor:'blue', color:'white', fontWeight:'600', cursor:'pointer'}} onClick={handleLogin}>Login</button>
                    <span style={{paddingTop:'0.4rem'}}>Already have an account? <Link to='/Signup' style={{textDecoration:'none', color:'blue'}}>Sign up</Link></span>
                </div>
                
            </form>
        </div>
    </div>
  )
}
