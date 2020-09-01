import React, {useEffect} from 'react';
import './ContactUs.css'

const ContactUs = () => {
    useEffect(() => {
        document.title = "Contact Us - Welkin International School"
}, [])

    return (
        <div>
            <h1>ContactUs</h1>
        </div>
    )
}

export default ContactUs