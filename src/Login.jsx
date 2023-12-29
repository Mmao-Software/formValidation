import React, { useState, CSSProperties } from 'react'
import './App.css'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import LoginInput from './components/LoginInput';
import ClipLoader from "react-spinners/ClipLoader";




export default function Login() {

    // for loading states..
    const [loading, setLoading] = useState(true)
    const [color, setColor] = useState("#ffffff");

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const [clientID, setclientID] = useState('')
    const [password, setPassword] = useState('')

    const {
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        setLoading(!loading)
        const userData = JSON.parse(localStorage.getItem(data.email));
        if (userData) {
            if (userData.password === data.password) {
                setIsLoggedIn(true);
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
                    value={clientID}
                    onChange = {(data) => setclientID(data.target.value)}
                    
                /> 

                <LoginInput 
                    label='Password'
                    type='password'
                    id='password'
                    placeholder='Enter New Password'
                    onChange={(data) => setPassword(data.target.value)}
                    
                /> 

                <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                    <input type='submit' value='submit'/>
                    <span style={{paddingTop:'0.4rem'}}>Already have an account? <Link to='/Signup' style={{textDecoration:'none', color:'blue'}}>Sign up</Link></span>
                </div>
                
            </form>
        </div>
    </div>
  )
}
