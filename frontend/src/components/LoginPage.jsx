import React from 'react';
export default function LoginPage({login,setLogin,signIn,error}) {
 return <div className="login-bg"><div className="login"><div className="mark">IT</div><h1>IT Incident Hub</h1><p>Accede al centro de soporte técnico.</p><form onSubmit={signIn}><label>Correo electrónico<input type="email" required value={login.email} onChange={e=>setLogin({...login,email:e.target.value})}/></label><label>Contraseña<input type="password" required value={login.password} onChange={e=>setLogin({...login,password:e.target.value})}/></label><button className="primary">Iniciar sesión</button></form>{error&&<p className="error">{error}</p>}<small>Cuenta de prueba: admin@demo.local</small></div></div>;
}
