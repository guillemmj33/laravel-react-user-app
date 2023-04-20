import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client'

export default function Signup() {
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmationRef = useRef()

  const {setUser, setToken} = useStateContext()

  const onSubmit = (e) => {
    e.preventDefault()
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value
    }
    axiosClient.post('/signup', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token)
      })
      .catch((err) => {
        const response = err.response
        if (response && response.status === 422){
          console.log(response.data.errors)
        }
      })
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <h1 className="title">Sign up for free</h1>
        <form action="" onSubmit={onSubmit}>
          <input ref={nameRef} className="" placeholder='Full Name' />
          <input ref={emailRef} type="email" className="" placeholder='Email' />
          <input ref={passwordRef} type="password" className="" placeholder='Password' />
          <input ref={passwordConfirmationRef}type="password" className="" placeholder='Password Confirmation' />
          <button className="btn btn-block">Sign up</button>
          <p className="message">
            Already registered? <Link to="/login">Sign in an account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
