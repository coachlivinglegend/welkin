import React, {useEffect} from 'react';
import './ContactUs.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'


const ContactUs = () => {
    useEffect(() => {
        document.title = "Contact Us - Welkin International School"
}, [])

    return (
        <div>
        <Header/>

        <div>
            <h1>ContactUs</h1>
        </div>
        <Footer/>
        </div>

    )
}

export default ContactUs