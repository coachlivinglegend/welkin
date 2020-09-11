import React, {useState, useEffect} from 'react';
import './AboutUs.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import found from '../../assets/founder.jpg'
import axios from 'axios'


const AboutUs = () => {
    useEffect(() => {
        document.title = "About Us - Welkin International School";
    }, [])

    const [isSelected, setIsSelected] = useState(1)

    return (
        <div>
            <Header/>
                <div className="aboutUsWrapper">
                    <div className="aboutUs">
                        <div className="aboutMenu">
                            <div onClick={() => setIsSelected(1)} className={`aboutMenuItem item1 ${isSelected === 1 ? 'active' : 'inactive'}`}>
                                About Us
                            </div>
                            <div  onClick={() => setIsSelected(2)} className={`aboutMenuItem item2 ${isSelected === 2 ? 'active' : 'inactive'}`}>
                                Our Founder
                            </div>
                        </div>
                        <div className="aboutTextWrap" style={{backgroundColor: "white"}}>
                        {
                            isSelected === 1 

                            ?
                                <div className="aboutText">
                                    <p style={{marginTop: 0}}>Welkin International School is a co-educational institution located in a serene and 
                                    conducive learning environment, providing high quality education that is inspired by christian 
                                    values built on the solid rock of honesty, accountability and trust.  Welkin is built upon a strong 
                                    christian values, that provide a framework for every child to feel valued and gain confidence. Children are encouraged 
                                    to pursue their individual talents and grow fully as individuals prepared for the demands of ever-changing world.</p>
                                    
                                    <p>Welkin is an e-learning school which has the digital capacity to promote 21st century learning in an increasingly networked world.  
                                    This includes the necessary infrastructure and devices, the capability of students and teachers and the culture of the school including 
                                    the support of the school community for e-learning.  E-learning is an integral part of our school wide planning and the board, teachers and
                                    parents understands the importance of e-learning to achieving our school wide vision.</p>

                                    
                                    <p>Our teachers and students are using digital technologies in the classroom in ways that promote student outcomes and enrich the learning 
                                    experience of students.  All our teachers have access to the digital technologies they need for effective teaching and learning in the
                                    21st century (e.g. personal devices, presentation devices, network access in the classroom, etc.).  Students have access to the digital
                                    technologies they need to achieve their potential in all areas of their schooling.</p>

                                    <h3>WHAT MAKES US UNIQUE?</h3>
                                    <ul>
                                        <li>An integrated curriculum that aims to meet global needs of the students.</li>
                                        <li>Experienced, seasoned and self motivated staff.</li>
                                        <li>An e-learning platform.</li>
                                        <li>Excellent classrooms and laboratories with interactive smartboards.</li>
                                        <li>Excellent boarding facilities, with home-away from home outlook.</li>
                                    </ul>
                                </div>

                            :
                                <div className="aboutText">
                                    <div className="aboutFoundPic">
                                        <img src={found} alt='Our Founder'/>
                                    </div>
                                    <p>Mr. Beckley Francis Adebayo is the chairman of Welkin Intenational School, he holds a B.Sc in Banking and Finance, he is a Chatered Acoountant, 
                                    a Chartered Banker and also has a M.Sc in Finance (Unilag).</p>
                                    <p>He has vast experience in Mortgage Banking, a former University lecturer, Director of Fabulous Properties Ltd, At Thy Word Farm Food and Agricultural
                                    Services Limited, Ota, Ogun state. 
                                    As a financial expert he held the position of Assistant General Manager (Finance) in Lagos State Lottereirs Board where he helped the board to generate and manage over a billion naira
                                    in revenue in a six year period.</p>
                                    <p>He recently retired from the service to serve his Maker, family and pursue his passion - giving quality education to the youths.
                                    He is happily married to Mrs. Beckley Victoria Olubunmi, they are blessed with children.</p>
                                </div>

                        }


                        </div>
                    </div>
                </div>
            <Footer/>
        </div>
    )
}

export default AboutUs