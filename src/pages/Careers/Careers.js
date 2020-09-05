import React, {useEffect, useState} from 'react';
import './Careers.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'


const Careers = () => {
    useEffect(() => {
        document.title = "Careers - Welkin International School"
}, [])

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [position, setPosition] = useState('')
    const [body, setBody] = useState('')


    return (
        <div>
        <Header/>

        <div className="careerWrap">
            <div>
                <p>
                    From time to time, job openings and vacancies available will be posted here, and you are welcome 
                    to submit applications that suit your career profile.
                </p>
                <p>
                    <h4><b>What to do when jobs are posted here:</b></h4>

                    Review advertised job descriptions and details specified for eligibility of positions listed.
                    Send in your CV (with applicants detailed information) and cover letter using the form provided on this page.
                </p>
                <p>
                    <h4><b>What happens next?</b></h4>
                    CVs would be reviewed and qualified applicants invited to write an aptitude test.
                    Successful candidates would be invited to begin the interview process.
                    The last phase of the interview process is a meeting with the Chairman of the School.
                </p>
                <p>
                    <h4><b>Current Vacancies</b></h4>
                    1. Mathematics Teacher <br/>
                    2. English Teacher
                </p>

            </div>
            <div>
            <h2>Fill in the form below to submit your CV.</h2>
                <form className="careerForm" onSubmit={e => e.preventDefault()}>
                    <div className="formTop">
                        <input name='firstname' type='type' value={firstName} placeholder="First Name" required onChange={e => setFirstName(e.target.value)}/>
                        <input name='lastname' type='type' value={lastName} placeholder="Last Name" required onChange={e => setLastName(e.target.value)}/>
                        <input  name='email' type='email' value={email} placeholder="Email" required onChange={e => setEmail(e.target.value)}/>
                        <input  name='phone' type='tel' value={phoneNumber} placeholder="Phone Number" required onChange={e => setPhoneNumber(e.target.value)}/>
                        <input name='position' type='text' value={position} placeholder="Position Applied For" required onChange={e => setPosition(e.target.value)}/>
                    </div>
                    <div>
                        <textarea name='coverletter' value={body} placeholder="Cover Letter" required onChange={e => setBody(e.target.value)}/>
                    </div>
                    <span style={{marginLeft: 20}}>Submit your CV in doc, docx or pdf format and must not be more than 1MB in size.</span>
                    <input style={{marginTop: 0}} type="file"/>
                    <div style={{marginTop: 0}}>
                        <input type='submit' value='Submit'/>
                    </div>
                </form>
            </div>
        </div>


        <Footer/>
        </div>

    )
}

export default Careers