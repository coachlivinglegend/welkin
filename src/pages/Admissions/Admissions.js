import React, {useEffect} from 'react';
import './Admissions.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'


const Admissions = () => {
    useEffect(() => {
        document.title = "Admissions - Welkin International School"
}, [])

    return (
        <div>
        <Header/>

        <div className="admissHeader">
            <div>
                <div className="admissHeaderText">
                    <h3>Admission Criteria</h3>
                    <p>
                    To be admitted into our primary school classes, pupils will have to pass
                    the school’s private entrance examination consisting of assessment 
                    in written English, Mathematics and General Science.
                    </p>
                    <p>
                    To be admitted into Year 7 or Year 8, Students will have to pass
                    the college’s private entrance examination consisting of assessment 
                    in written English, Mathematics and Baisc Science and Technology.
                    </p>
                    <p>
                    To be admitted into Year 10 or Year 11, Students will have to pass
                    the college’s private entrance examination consisting of assessment 
                    in written English, Mathematics and one combined paper consisting of
                    the core subjects in the student's desired department.
                    </p>
                    <p>We do not offer admission into Year 9 and Year 12.</p>
                </div>
                <div>

                </div>
            </div>
            <div className="admissLogo">
                <div></div>
                <div>
                    <h3>Admssion in Progress(2020/2021 Academic Session)</h3>
                    <p>Admission is currently open into J.S.S 1 (2020-2021 Academic Session). Details for the examinations are as follows.</p>
                    <p>1. 1ST Batch: Saturday, March 7, 2020</p>
                    <p>2. 2ND Batch: Saturday, May 16, 2020</p>
                       <h3>Entrance Exams For Transfer Students (J.S.S 2 – S.S.S 2)</h3>
                    <p>1. 1ST Batch: Saturday, July 25, 2020</p>
                    <h4><b>Venue</b>: Welkin International School </h4>
                    <h4><b>Time</b>: 9:00 AM </h4>
                    <h4>For more information, kindly contact 08109479237, 08023274058</h4>
                </div>
            </div>
        </div>
        <Footer/>
        </div>
    )
}

export default Admissions