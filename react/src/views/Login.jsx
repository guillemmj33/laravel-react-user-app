import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [errors, setErrors] = useState(null)
  const {setUser, setToken} = useStateContext()

  const onSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    setErrors(null)

    try {
      const { data } = await axiosClient.post('/login', payload);
      setUser(data.user)
      setToken(data.token)
    } catch (err) {
      if (err.response?.status === 422) {
        if(err.response.data.errors) {
          setErrors(err.response.data.errors)
        } else {
          setErrors({
            email: [
              'The email or password you entered is incorrect.'
            ]
          })
        }
      }
    }
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <h1 className="title">Login into your account</h1>
        {errors && <div className="alert alert-danger">
            {Object.keys(errors).map(key => (
              <div key={key}>{errors[key]}</div>
            ))}
          </div>
        }
        <form onSubmit={onSubmit}>
          <input ref={emailRef} type="email" className="" placeholder='Email' />
          <input ref={passwordRef} type="password" className="" placeholder='Password' />
          <button className="btn btn-block">Login</button>
          <p className="message">
            Not registered? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
