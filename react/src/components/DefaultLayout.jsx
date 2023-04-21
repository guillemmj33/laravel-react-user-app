import React, { useEffect } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'

export default function DefaultLayout() {
  const {user, token, setUser, setToken} = useStateContext()

  if (!token) {
    return <Navigate to="/login" />
  }

  const onLogout = async (e) => {
    e.preventDefault()
    try {
      await axiosClient.post('/logout')
      setUser({})
      setToken(null)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axiosClient.get('/user')
        setUser(data)
      } catch (err) {
        console.log(err)
      }
    }
    getUser()
  }, [])


  return (
    <div id='defaultLayout'>
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside>
      <div className="content">
        <header>
          <div>
            Header
          </div>
          <div>
            {user.name}
            <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
          </div>
        </header>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
