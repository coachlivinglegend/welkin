import React from 'react'
import "./Description.css";
import { ReactComponent as Comm } from '../../assets/Library.svg'
import { ReactComponent as Excel } from '../../assets/Trophy.svg'
import { ReactComponent as Que } from '../../assets/StudentQuestion.svg'
import { ReactComponent as Disc } from '../../assets/DiscussionClass.svg'
import dl from '../../assets/decleft.jpg'
import dr from '../../assets/decright.jpg'


const Description = () => {
    return (
        <div className="descriptionWrapper">
            <div className="descriptionContainer">
                <div className='descriptionDesign'>
                    <div className="descrip">
                        <div className="dicon">
                            <Comm/>
                        </div>
                        <div>
                            <h3>Committed</h3>
                            <p>to our work</p>
                        </div>
                    </div>
                    <div className="descrip">
                        <div className="dicon">
                            <Excel/>
                        </div>
                        <div>
                            <h3>Excellence</h3>
                            <p>is our goal</p>
                        </div>
                    </div>
                    <div className="descrip">
                        <div className="dicon">
                            <Que/>
                        </div>
                        <div>
                            <h3>Student</h3>
                            <p>centred learning</p>
                        </div>
                    </div>
                    <div className="descrip">
                        <div className="dicon">
                            <Disc/>
                        </div>
                        <div>
                            <h3>Disciplined</h3>
                            <p>all year round</p>
                        </div>
                    </div>
                </div>
                <div className="descriptionTextWrap">
                    <div style={{backgroundImage:`url(${dl})`, backgroundPosition: "center", backgroundReapeat: "no-repeat",  backgroundSize: "cover"}} className="descriptionSide"/>
                    <div style={{backgroundImage:`url(${dr})`, backgroundPosition: "center", backgroundReapeat: "no-repeat",  backgroundSize: "cover"}} >
                        <div className="descriptionText">
                            <div>
                                <h3>Who are we ?</h3>
                                <span className="excellence">Everything about us is EXCELLENCE</span>
                            </div>


                            <span>The citadel of learning is located within Onse Olose Village, near Ajibawo, Atan, 
                            Ado-Oda/Ota local Government Area in the outskirt of the city of Ota in Ogun State, Nigeria.</span>

                            <span>It is a 20 minutes drive from Bells University and Covenant University. 
                            It is on an expansion of 3 Acres of land.</span>

                            <span>The college benefits from the ample acreage that it occupies,
                            providing playing fields and physical expansion.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Description