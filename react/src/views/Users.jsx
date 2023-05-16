import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getUsers()
  }, [])

  const onDelete = (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      axiosClient.delete(`/users/${user.id}`)
        .then(() => {
          getUsers()
        })
        .catch(() => {
          setLoading(false)
        })
    }
  }

  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/users')
      .then(({data}) => {
        setLoading(false)
        setUsers(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Users</h1>
        <Link to='/users/new' className="btn-add">Add new</Link>
      </div>

      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.created_at}</td>
                <td>
                  <Link to={`/users/${user.id}`} className="btn-edit">Edit</Link>
                  &nbsp;
                  <button onClick={e => onDelete(user)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  )
}
