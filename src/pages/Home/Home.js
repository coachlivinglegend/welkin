import React, {useEffect} from 'react';
import './Home.css'
import Hero from '../../components/Hero/Hero'
import PostsPreview from '../../components/PostsPreview/PostsPreview'
import Feedback from '../../components/Feedback/Feedback'
import Testimonials from '../../components/Testimonials/Testimonials'
import Description from '../../components/Descrption/Description'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'


const Home = ({ match }) => {
    useEffect(() => {
        document.title = "Welkin International School - The Future Is Now"
}, [])

    return (
        <div>
        <Header/>

        <div className="HomeWrapper">
            <Hero/>
            <Description/>
            <div className="abitAboutUsWrapper">
                <div className="abitAboutUs">
                    <div className="vision">
                        <h3 className="abitHeader">VISION</h3>
                        <span className="abitBody">
                            Welkin International School committed to providing complete and quality education 
                            with a view to turning out well-groomed scholars that will 
                            contribute immensely to our society with the fear of God.
                        </span>
                    </div>
                    <div className="mission">
                        <h3 className="abitHeader">MISSION</h3>
                        <span className="abitBody">
                            Creating an informal technology, conducive environment using modern equipments, 
                            facilities and also well experienced human resources with a view of turning out
                            up to date, well-groomed scholars that will contribute greatly to the 
                            development of our future.
                        </span>
                    </div>
                    <div className="values">
                        <h3 className="abitHeader">VALUES</h3>
                        <span className="abitBody">
                        Welkin International School is built upon strong Christian values, 
                        we provide a framework for every child to feel valued and gain confidence. 
                        Students are encouraged to pursue their individual talents and grow fully as 
                        individuals prepared for the demands of the ever-changing world.
                        </span>
                    </div>
                </div>
                
            </div>

            <div className="newsposthome">
                <h3 className="posth3">NEWS</h3>
                <PostsPreview classname="newshome" match={match}/>
            </div>
            <Testimonials/>
            <Feedback/>
        </div>
        <Footer/>
        </div>

    )
}

export default Home