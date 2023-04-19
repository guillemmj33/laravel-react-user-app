import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <h1 className="title">Login into your account</h1>
        <form action="" onSubmit={onSubmit}>
          <input type="email" className="" placeholder='Email' />
          <input type="password" className="" placeholder='Password' />
          <button className="btn btn-block">Login</button>
          <p className="message">
            Not registered? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
