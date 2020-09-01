import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
    return (
        <div className="testimonyWrapper">
            <div className="testimony">
                <div className="ourteam">
                    <div className="teamwrap">
                        <h3>Testimonials</h3>
                        <p>A few people who know us have had some good things to say about us.</p>
                    </div>
                </div>
                <div className="teamrolewrapper">
                <div className="teamrole">
                        <div className="teamdata">
                                <div className="teamdatatext">
                                    <h3>Mrs. Victoria Joseph</h3>
                                    <p>"Welkin is a place where every child should go, they are educational per excellence and instill the fear of God which is the utmost priority of every man born of woman."</p>
                                </div>
                        </div>
                    </div>
                    <div className="teamrole">
                        <div className="teamdata">
                                <div className="teamdatatext">
                                    <h3>Mr. Mark Onichabor</h3>
                                    <p>"Welkin International School is a citadel of learning where moral, educational and imp artful knowledge is bestowed on every child. A visit will convince you."</p>
                                </div>
                        </div>
                    </div>
                    <div className="teamrole">
                        <div className="teamdata">
                                <div className="teamdatatext">
                                    <h3>Dr. Mrs. Obanla</h3>
                                    <p>"Welkin International School is a place for a every child."</p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials