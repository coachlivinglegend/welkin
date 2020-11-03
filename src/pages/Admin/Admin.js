import React, {useState, useEffect} from 'react';
import './Admin.css'
import TextField from '@material-ui/core/TextField';
import AdminDashboard from '../AdminDashboard/AdminDashboard'
import logo from '../../assets/logo.png'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloClient, gql } from 'apollo-boost'
import bcrypt from 'bcryptjs';
import { Link } from 'react-router-dom';

const httpLink = createHttpLink({
    uri: 'https://api-us-east-1.graphcms.com/v2/ckeiqswoc3k3y01z1eupfd36k/master'
})
  
const cache = new InMemoryCache();
  
const client = new ApolloClient({
    link: httpLink,
    cache,
})
  
const Admin = () => {
    const [username, setName] = useState('')
    const [password, setPassword] = useState('')
    const [isCorrect, setIsCorrect] = useState(false)
    const [userArray, setUserArray] = useState([])
    const [currentUser, setCurrentUser] = useState([])
    useEffect(() => {
        document.title = "Admin Login - Welkin International School";
        client.query({
            query: gql`
                {
                    users{
                        id
                        username
                        password
                    }
                }
            `
        }).then(response => setUserArray(response.data.users))
    }, [])

    const formSubmit = (e) => {
        e.preventDefault();
        for (const user of userArray) {
            if (username === user.username && bcrypt.compareSync(password, user.password)) {
                setIsCorrect(true);
                document.title = "Admin Dashboard - Welkin International School"
                setCurrentUser(user)
                setName('')
                setPassword('')
                return
            }
        }
        alert('who goes there?')
    }

    return (
        <div className="adminContainer">
            {  isCorrect 
                ?
                <div className="adminDashWrapper">
                    <AdminDashboard user={currentUser}/>
                </div>
                :
                <div className="adminWP">
                <div className="adminWrapper">
                    <img style={{height: 84}} src ={logo} alt = 'Welkin International School'/>
                    <form className="formAdmin" onSubmit={formSubmit}>
                        <TextField className="test" id="standard-basic" label="Username" required type="text" value={username} onChange={e => setName(e.target.value)}/>
                        <TextField className="test" id="standard-basic" label="Password" required type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                        <input className="btnn" type="submit" value="LOG IN"/>
                    </form>
                    <Link to='/' className='readLink'>
                        <span style={{alignSelf: "flex-start"}}><i className="fa fa-arrow-left" aria-hidden="true"/> Back to Welkin International School</span>
                    </Link>
                </div>
                </div>    
            }
        </div>
    )
}

export default Admin