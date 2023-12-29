import './App.css';
import React from 'react';
import Input from './components/Input';
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

const schema = yup.object({
  firstname:yup.string().required("Firstname is Required"),
  lastname:yup.string().required("Lastname is Required"),
  email:yup.string().required("Email is a required field").email("Email is not valid"),
  username:yup.string().required("Username is Required"),
  password: yup.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Password must be a match")
}); 

function Signup() {

  const navigate = useNavigate();
  const { 
    handleSubmit, 
    register, 
    formState: {errors} 
  } = useForm({
    resolver: yupResolver(schema)
  });

  function formSubmit(data) {
    data.preventDefault();

    try {
      if (data) {
        // check for existing user
        const existingUser = localStorage.getItem(data.email);
        if (existingUser) {
          console.error(data.email, 'Already Exists!')
          return;
        }

        const userData = {
          firstname: data.firstname,
          lastname: data.lastname,
          username: data.username,
          password: data.password
        }

        // simulate server side storage
        localStorage.setItem(data.email, JSON.stringify(userData));

        // navigate to dashboard page when successful..
        console.log('success..')
        navigate('/Dashboard')
        console.log(JSON.parse(localStorage.getItem(data.email)));

      } else {
      // handle  any validation error
      console.error('Invalid signup details:');
      console.log('Invalid signup details:', data);
      }
    } catch (error) {
      // storage errors
      console.error('Signup error', error);
    }


    
  }

  return (
    <div className='App'>
      <div style={{display:'flex', flexDirection:'column', marginBottom:'1rem'}}>
        <span style={{fontWeight:'600', fontSize:'200%'}}>Sign up</span>
        <span style={{color:'grey', fontSize:'80%', marginTop:'0.2rem'}}>Enter the details below.</span>
      </div>

      <form onSubmit={handleSubmit(formSubmit)}>
        <Input 
          label='Fullname'
          type='text'
          id='fullname'
          placeholder='Enter Fullname'
          register={{ ...register("fullname") }}
          errorMessage={errors.fullname?.message}
        /> 

        <Input 
          label='Email'
          type='text'
          id='email'
          placeholder='Enter Email'
          register={{ ...register("email")}}
          errorMessage={errors.email?.message}
        /> 

        <Input 
          label='Username'
          type='text'
          id='username'
          placeholder='Enter Username'
          register={{ ...register("username")}}
          errorMessage={errors.username?.message}
        /> 

        <Input 
          label='Password'
          type='password'
          id='password'
          placeholder='Enter New Password'
          register={{ ...register("password")}}
          errorMessage={errors.password?.message}
        /> 

        <Input 
          label='Confirm Password'
          type='password'
          id='confirmPassword'
          placeholder='Confirm Password'
          register={{ ...register("confirmPassword")}}
          errorMessage={errors.confirmPassword?.message}
        />
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
          <input onClick={formSubmit} type='submit' value='Sign up'/>
          <span style={{paddingTop:'0.4rem'}}>Already have an account? <Link to='/Login' style={{textDecoration:'none', color:'blue'}}>Login</Link></span>
        </div>
          
      </form>
    </div>
  );
}

export default Signup;