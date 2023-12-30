import React from 'react'
import './App.css'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import LoginInput from './components/LoginInput';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

const schema = yup.object({
    usernameEmail:yup.string().required("Username or Email is Required"),
    password: yup.string().required("Password is Required"),
  });


export default function Login() {
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        const userData = JSON.parse(localStorage.getItem(data.email));
        if (userData) {
            if (userData.password === data.password) {
                navigate('/Dashboard')
                console.log(userData.name + "You are successfully logged in")
            } else {
                console.log('Email or password is wrong')
            }
        }
    };

    return (
    <div>
        <div className='App'>
            <div style={{display:'flex', flexDirection:'column', marginBottom:'1rem'}}>
                <span style={{fontWeight:'600', fontSize:'200%'}}>Login</span>
                <span style={{color:'grey', fontSize:'80%', marginTop:'0.2rem'}}>Welcome back.</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
            
                <LoginInput 
                    label='Username or Email'
                    type='text'
                    id='usernameEmail'
                    placeholder='Enter Username or Email'
                    register={{ ...register('usernameEmail') }}
                    errorMessage={errors.usernameEmail?.message}
                /> 

                <LoginInput 
                    label='Password'
                    type='password'
                    id='password'
                    placeholder='Enter New Password'
                    register={{ ...register('password') }}
                    errorMessage={errors.password?.message}
                /> 

                <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                    <input style={{padding:'0.4rem 0', borderRadius:'0.3rem', border:'none', backgroundColor:'blue', color:'white', fontWeight:'600', cursor:'pointer'}} type='submit' value='Login'/>
                    <span style={{paddingTop:'0.4rem'}}>Already have an account? <Link to='/Signup' style={{textDecoration:'none', color:'blue'}}>Sign up</Link></span>
                </div>
                
            </form>
        </div>
    </div>
  )
}
