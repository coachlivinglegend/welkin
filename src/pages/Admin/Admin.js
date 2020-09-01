import React, {useState, useEffect} from 'react';
import './Admin.css'
import TextField from '@material-ui/core/TextField';
import AdminDashboard from '../AdminDashboard/AdminDashboard'

const Admin = () => {
    const [username, setName] = useState('')
    const [password, setPassword] = useState('')
    const [isCorrect, setIsCorrect] = useState(true)
    useEffect(() => {
            document.title = "Admin Login - Welkin International School";
    }, [])

    
    const formSubmit = (e) => {
        e.preventDefault();
        if (username === "admin" && password === "admin") {
            alert('thanks g')
            setIsCorrect(true);
            document.title = "Admin Dashboard - Welkin International School"

        } else {
            alert('??, boy get back!')
        }
    }
    
    
    return (
        <div className="adminContainer">
            {  isCorrect 
                ?
                <div className="adminDashWrapper">
                    <AdminDashboard/>
                </div>

                :
                <div className="adminWrapper">
                ADMIN LOG IN
                    <form className="formAdmin" onSubmit={formSubmit}>
                        <TextField className="test" id="standard-basic" label="Username" required type="text" value={username} onChange={e => setName(e.target.value)}/>
                        <TextField className="test" id="standard-basic" label="Password" required type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                        <input className="btnn" type="submit" value="LOG IN"/>
                    </form>
                </div>
    
            }

        </div>
    )
}

export default Admin