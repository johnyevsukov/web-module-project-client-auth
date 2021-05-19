import React, {useState} from 'react'
import axios from 'axios'

const initialFormValues = {
    username: 'Lambda School',
    password: 'i<3Lambd4'
}

const Login = (props) => {
    const [formValues, setFormValues] = useState(initialFormValues)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues({
            ...formValues,
            [name]:value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        axios.post('http://localhost:5000/api/login', formValues)
        .then(res => {
            console.log(res.data.payload)
            localStorage.setItem("token", res.data.payload)
            setIsLoading(false)
            props.history.push('/friendslist')
        })
        .catch(err => {
            console.log(err)
            setIsLoading(false)
        })
        setFormValues(initialFormValues)
    }

    return (
        <div>
            {isLoading ? <h1>⚙️ Loading ⚙️</h1> : null}
            <form onSubmit={handleSubmit}>
                <label>
                    Username:&nbsp;
                    <input 
                    type='text'
                    name='username'
                    value={formValues.username}
                    onChange={handleChange}
                    />
                </label>
                <label>
                    Password:&nbsp;
                    <input 
                    type='text'
                    name='password'
                    value={formValues.password}
                    onChange={handleChange}
                    />
                </label>
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login