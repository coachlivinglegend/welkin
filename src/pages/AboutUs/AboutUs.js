import React, {useState, useEffect} from 'react';
import './AboutUs.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import found from '../../assets/founder.jpg'

const AboutUs = () => {
    useEffect(() => {
        document.title = "About Us - Welkin International School"
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
                                    <p style={{marginTop: 0}}>Welkin International school is a co-educational institution located in a serene and 
                                    conducive learning environment, providing high quality education that is inspired by Christian 
                                    values built on the solid rock of honesty, accountability and trust.  Welkin is built upon a strong 
                                    Christian values, that provide a framework for every child to feel valued and gain confidence. Children are encouraged 
                                    to pursue their individual talents and grow fully as individuals prepared for the demands of ever-changing world.</p>
                                    
                                    <p>Welkin is an e-learning school which has the digital capacity to promote 21st century learning in an increasingly networked world.  
                                    This includes the necessary infrastructure and devices; the capability of students and teachers and the culture of the school including 
                                    the support of the school community for e-learning.  E-learning is an integral part of our school wide planning and the Board, teachers and
                                    parents understands the importance of e-learning to achieving our school wide vision.</p>

                                    
                                    <p>Our teachers and students are using digital technologies in the classroom in ways that promote student outcomes and enrich the learning 
                                    experience of students.  All our teachers have access to the digital technologies they need for effective teaching and learning in the
                                    21st century (e.g. personal devices, presentation devices, network access in the classroom.  Students have access to the digital
                                    technologies they need to achieve their potential in all areas of their schooling.</p>

                                    <h3>WHAT MAKES US UNIQUE?</h3>
                                    <ul>
                                        <li>An integrated curriculum that aims to meet global needs of the students.</li>
                                        <li>Experienced, seasoned and self motivated staff.</li>
                                        <li>An e-Learning platform with a laptop for each student.</li>
                                        <li>Excellent classrooms and laboratories with interactive smartboards.</li>
                                        <li>Excellent boarding facilities, with home-away from home outlook</li>
                                    </ul>
                                </div>

                            :
                                <div className="aboutText">
                                    <div className="aboutFoundPic">
                                        <img src={found} alt='Our Founder'/>
                                    </div>
                                    <p>Mr. Beckley Francis Adebayo is the chairman of Welkin Intenational School, he holds a B.Sc in Banking and Finance, Chatered Acoountant, 
                                    Chartered Banker and M.Sc Finance(Unilag).</p>
                                    <p>He has vast experience in Mortgage Banking, a former University Don, Director of Fabulous Properties Ltd, At Thy WOrd Farm Food and Agriculaytural
                                    Services Limited, Ota, Ogun state.
                                    As a financial expert heh held the position of AGM(Finance) in Lagos State Lottereirs Board where he ehlped rge board to generate and manage over a billion naira
                                    in revenue in a six year period.</p>
                                    <p>He recently retired from the dervice to serve his MAker, family and pursue his passion - giving quality education to the youths.
                                    He is happily married ti Mrs. Beckley Victoria Olubunmi, they are blessed with children.</p>
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