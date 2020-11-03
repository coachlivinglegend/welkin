import React, {useState, useEffect} from 'react';
import '../Admin.css'
import TextField from '@material-ui/core/TextField';
import logo from '../../../assets/logo.png'
import bcrypt from 'bcryptjs';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloClient, gql } from 'apollo-boost'

const httpLink = createHttpLink({
    uri: 'https://api-us-east-1.graphcms.com/v2/ckeiqswoc3k3y01z1eupfd36k/master'
})
  
  const cache = new InMemoryCache();
  
  const client = new ApolloClient({
    link: httpLink,
    cache,
})
  
const AdminRegister = () => {
    const [username, setName] = useState('')
    const [password, setPassword] = useState('')
    const [hashedPassword, setHashedPassword] = useState('')

    useEffect(() => {
            document.title = "Admin Login - Welkin International School";
    }, [])

    useEffect(() => {
        if (!hashedPassword) return
        client.mutate({
            mutation: gql`
                mutation {
                    createUserData(data: {
                        username: "${username}"
                        password: "${hashedPassword}"
                      }){
                            id
                            username
                            password
                        }
                }
            `
        }).then(response => console.log(response))
        setName('')
        setPassword('')
    }, [hashedPassword])

    const salt = bcrypt.genSaltSync(10);
    
    const formSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            return
        }
        const hash = bcrypt.hashSync(password, salt);
        setHashedPassword(hash)
    }
    
    return (
        <div className="adminContainer">
                <div className="adminWP">
                <div className="adminWrapper">
                    <img style={{height: 84}} src ={logo} alt = 'Welkin International School'/>
                    <form className="formAdmin" onSubmit={formSubmit}>
                        <TextField className="test" id="standard-basic" label="Username" required type="text" value={username} onChange={e => setName(e.target.value)}/>
                        <TextField className="test" id="standard-basic" label="Password" required type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                        <input className="btnn" type="submit" value="REGISTER"/>
                    </form>
                    <span style={{alignSelf: "flex-start"}}><i className="fa fa-arrow-left" aria-hidden="true"/> Back to Welkin International School</span>
                </div>
                </div>
        </div>
    )
}

export default AdminRegister