import React from 'react'
import './Footer.css'
import schoolban from '../../assets/wclogofull.png'
import { Link } from 'react-router-dom'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Iframe from 'react-iframe'
import { ReactComponent as IcoG } from '../../assets/socials/google-plus.svg'
import { ReactComponent as IcoF } from '../../assets/socials/facebook.svg'
import { ReactComponent as IcoI } from '../../assets/socials/instagram.svg'
import { ReactComponent as IcoT } from '../../assets/socials/twitter.svg'
import { ReactComponent as IcoY } from '../../assets/socials/youtube.svg'



const Footer = ({ google }) => {
    const mapStyles = {
        width: '290px',
        height: '350px',
    };
    const containerStyle = {
        position: 'relative',  
        width: '290px',
        height: '350px'
    }
    const titleStyle = {
        borderBottom: "1px solid #e0e0e2",
        paddingBottom: "5px"
    }

    return (
        <footer>
        <div className="topFooterWrapper">
            <div className="topFooter">
                <div className="schoolDetails">
                    <div className="logoPicture"><img alt='Welkin International School' src={schoolban}/></div>
                    <span>Atan-Ota, Ogun State, Nigeria.</span>
                    <span>info@welkinintlschool.com.ng</span>
                    <span>admissions@welkinintlschool.com.ng</span>
                    <span>+234 8109479237</span>
                    <span>+234 8023274058</span>
                    <div>
                        <p>Connect With Us</p>
                        <span style={{display: "flex", justifyContent: "space-between", height: 40}}>
                        <a href='#' target="_blank"><IcoG/></a>
                        <a href='#' target="_blank"><IcoF/></a>
                        <a href='#' target="_blank"><IcoI/></a>
                        <a href='#' target="_blank"><IcoT/></a>
                        <a href='#' target="_blank"><IcoY/></a>
                        </span>
                    </div>
                </div>
                <div className="mapWidget">
                    <p style={titleStyle}>Locate Us</p>
                    <div id="map">
                    <Map
                        google={google}
                        zoom={15}
                        containerStyle={containerStyle}
                        style={mapStyles}
                        initialCenter={{ lat: 6.682700, lng: 3.063112}}
                    >
                    <Marker position={{lat: 6.682700, lng: 3.063112}} />
                    </Map>
                    </div>
                </div>
                <div className="facebookWidget">
                    <p style={titleStyle}>Facebook Feed</p>
                    <Iframe url="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fwelkinschools&tabs=timeline&width=290&height=350&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                        width="290px"
                        height="350px"
                        id="myId"
                        className="myClassname"
                        display="initial"
                        position="relative"
                    />
                </div>
                <div className="usefulLinks">
                    <p style={titleStyle}>Useful Links</p>
                    <ul className="usefulLinksList">
                    <Link className='uselinks' to ='/aboutus'><li>About Us</li></Link>
                    <Link className='uselinks' to ='/awards'><li>Awards</li></Link>
                    <Link className='uselinks' to ='/admissions'><li>Admissions</li></Link>
                    <Link className='uselinks' to ='/gallery'><li>Gallery</li></Link>
                    <Link className='uselinks' to ='/contactus'><li>Contact Us</li></Link>
                    </ul>
                </div>
            </div>

        </div>
        <div className="bottomFooterWrapper">
            <div className="bottomFooter">
                <div className="botLeft">
                    <p>&copy; 2020, Welkin International School</p>
                </div>
                <div className="botRight">
                    <p>designed by Daniel Beckley</p>
                </div>
            </div>
        </div>
        </footer>
    )
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAAaaAxX7qRsUQRu_2B33C3AB1UhN7XnCk"
  })(Footer);