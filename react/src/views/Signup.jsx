import React from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <h1 className="title">Sign up for free</h1>
        <form action="" onSubmit={onSubmit}>
          <input type="email" className="" placeholder='Full Name' />
          <input type="email" className="" placeholder='Email' />
          <input type="password" className="" placeholder='Password' />
          <input type="password" className="" placeholder='Password Confirmation' />
          <button className="btn btn-block">Sign up</button>
          <p className="message">
            Already registered? <Link to="/login">Sign in an account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
