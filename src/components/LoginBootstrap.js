import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';

const auth = getAuth(app);

const LoginBootstrap = () => {

  const [success, setSuccess] = useState(false);

  const handleSubmit = event => {
    setSuccess(false);
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password)
    signInWithEmailAndPassword(auth, email, password)
    .then( result => {
      const user = result.user;
      console.log(user);
      setSuccess(true);
      form.reset();
    })
    .catch( error => {
      console.error('error', error);
    })
    
  }
    return (
        <div className='w-50 mx-auto'>
            <h2 className='text-primary'>Please Log in</h2>
       <form onSubmit={handleSubmit}>
       <div className="mb-3">
  <label htmlFor="formGroupExampleInput" className="form-label">Email Address</label>
  <input type="email" name='email' className="form-control" id="formGroupExampleInput" placeholder="Your Email"/>
</div>
<div className="mb-3">
  <label htmlFor="formGroupExampleInput2" className="form-label">Password</label>
  <input type="password" name='password' className="form-control" id="formGroupExampleInput2" placeholder="Your Password"/>
  </div>
  {
    success && <p className='text-success'>Successfully log in</p>
  }
  <button type="submit" className="btn btn-primary">Login</button>
       </form>
       <p><small>New to this website? Please <Link to='/register'>Register</Link></small></p>
        </div>
    );
};    

export default LoginBootstrap;