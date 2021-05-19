import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utilities/axiosWithAuth'

const Friend = (props) => {
    return (
        <div>
            <h2>{props.friend.name}</h2>
            <p>{props.friend.age}</p>
            <p>{props.friend.email}</p>
        </div>
    )
}

const initialFormValues = {
    name: '',
    age: '',
    email: ''
}


const FriendsList = () => {
    const [friends, setFriends] = useState([])
    const [fromValues, setFormValues] = useState(initialFormValues)

    useEffect(() => {
        axiosWithAuth().get('/friends')
        .then(res => {
            console.log(res.data)
            setFriends(res.data)
            console.log(friends)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues({
            ...fromValues,
            [name]:value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axiosWithAuth().post('/friends', fromValues)
        .then(res => {
            console.log(res)
            axiosWithAuth().get('/friends')
            .then(setFriends(res.data))
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
        setFormValues(initialFormValues)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Add new friend</h2>
                <label>
                    Name:&nbsp;
                    <input
                    type='text'
                    name='name'
                    onChange={handleChange}
                    value={fromValues.name}
                    />
                </label>
                <label>
                    Age:&nbsp;
                    <input
                    type='text'
                    name='age'
                    onChange={handleChange}
                    value={fromValues.age}
                    />
                </label>
                <label>
                    Email:&nbsp;
                    <input
                    type='text'
                    name='email'
                    onChange={handleChange}
                    value={fromValues.email}
                    />
                </label>
                <button>Add</button>
            </form>
            {
                friends.map(friend => {
                    return <Friend key={friend.id} friend={friend} />
                })
            }
        </div>
    )
}

export default FriendsList;