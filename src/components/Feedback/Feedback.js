import React, {useState} from 'react';
import './Feedback.css'

const Feedback = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [body, setBody] = useState('')
    return (
        <div className="feedbackContainer">
            <div className="feedbackWrapper">
                <div className="feedbackOther">
                    skrrrrrrr
                </div>
                <div className="formWrap">
                    <h2>We want to hear from you</h2>
                    <div className="formDiv">
                        <form className="feedbackForm" onSubmit={e => e.preventDefault()}>
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
    )
}

export default Feedback