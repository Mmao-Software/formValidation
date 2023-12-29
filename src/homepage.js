import { Link } from 'react-router-dom'
import React  from 'react';

function HomePage() {
    return (
        <>
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', backgroundColor:'#fffff', height:'100vh'}} className=''>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem', border:''}} className=''>
                    <span style={{fontSize:'130%'}}>Welcome to this site!</span>
                    <div style={{display:'flex', gap:'0.5rem'}}> 
                        <Link to='/Signup' style={{background:'none', border:'1px solid grey', padding:'0.5rem 1rem', borderRadius:'0.4rem', display:'flex', alignItems:'center', justifyContent:'center', color:'black', cursor:'pointer', textDecoration:'none'}} >Signup </Link>
                        <Link to='/Login' style={{background:'none', border:'1px solid grey', padding:'0.5rem 1rem', borderRadius:'0.4rem', display:'flex', alignItems:'center', justifyContent:'center', color:'black', cursor:'pointer', textDecoration:'none'}}>Login</Link>
                    </div>
                </div>
            </div> 
        </>
    )
}

export default HomePage