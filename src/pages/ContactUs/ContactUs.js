import React, {useState, useEffect} from 'react';
import { ReactComponent as Tact } from '../../assets/undraw_contact_us_15o2.svg'
import './ContactUs.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { ReactComponent as Call } from '../../assets/contact/call.svg'
import { ReactComponent as Email } from '../../assets/contact/mail.svg'
import { ReactComponent as Location } from '../../assets/contact/location.svg'


const ContactUs = () => {
    useEffect(() => {
        document.title = "Contact Us - Welkin International School"
}, [])
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [subject, setSubject] = useState('')
const [body, setBody] = useState('')


    return (
        <div>
        <Header/>
        <div>
            <div className="contactUsWrapper">
                <div className="contactTop">
                    <div className="contactTopImage">
                        <Tact className="tact"/>
                    </div>
                    <div className="contactTopInfo">
                    <div className="contactTopWrap">
                            <div className="contactTopIcon">
                                <Call height="40px" width="40px"/>
                            </div>
                            <div className="contactTopHead">
                                <h2>Phone</h2>
                            </div>
                            <div className="contactTopBody">
                                <p>You can reach out to us on any of the following phone lines.</p>
                            </div>
                            <div className="contactTopMain">
                                <p>
                                    0802 327 4058 <br/>
                                    0810 947 9237
                                </p>
                            </div>
                        </div>
                        <div className="contactTopWrap">
                            <div className="contactTopIcon">
                                <Email height="40px" width="40px"/>
                            </div>
                            <div className="contactTopHead">
                                <h2>Email</h2>
                            </div>
                            <div className="contactTopBody">
                                <p>If you prefer to send us an e-mail, you can direct it to any of the following addresses.</p>
                            </div>
                            <div className="contactTopMain">
                                <p>
                                    info@welkininternationalschool.com <br/>
                                    admin@welkininternationalschool.com
                                </p>
                            </div>
                        </div>
                        <div className="contactTopWrap">
                            <div className="contactTopIcon">
                                <Location height="40px" width="40px"/>
                            </div>
                            <div className="contactTopHead">
                                <h2>Location</h2>
                            </div>
                            <div className="contactTopBody">
                                <p>Onse Road, Ajibawo, Atan, Ado-Odo, Ota, Ogun State, Nigeria.</p>
                            </div>
                            <div className="contactTopMain">
                                <p><a href="#map">Get directions to Welkin</a> <br/>
                                <div>
                                    {/* asdfg */}
                                </div>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="formWrap contactFormWrap">
                    <h2 style={{marginLeft: 20, color: "white"}}>We want to hear from you</h2>
                    <div className="formDiv">
                        <form className="feedbackForm contactForm" onSubmit={e => e.preventDefault()}>
                            <input name='name' type='type' value={name} placeholder="Full Name" required onChange={e => setName(e.target.value)}/>
                            <input  name='email' type='email' value={email} placeholder="Email" required onChange={e => setEmail(e.target.value)}/>
                            <input name='subject' type='text' value={subject} placeholder="Subject" required onChange={e => setSubject(e.target.value)}/>
                            <textarea name='body' value={body} placeholder="Message" required onChange={e => setBody(e.target.value)}/>
                            <input type='submit' value='Submit'/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </div>

    )
}

export default ContactUs