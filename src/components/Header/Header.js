import React, { useEffect } from 'react'
import './Header.css'
import schoolban from '../../assets/wclogofull.png' 
import { Link } from 'react-router-dom'
import HamburgerMenu from 'react-hamburger-menu'
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost'
import {SpinnerSmall } from '../Spinner/Spinner'

const GET_HEADER = gql`
    {
        homeHeaders {
            id
            header
        }
    }
`
// mutation {
//     createHomeHeader(data: {
//       header: "Yeah, it is indeed Welkin."
//     }){
//       id
//       header
//       createdAt
//     }
//   }
//   mutation {
//     deleteHomeHeader(where: {
//       id: "ckeiwimwo1e8f0184gccrgaxy"
//     }){
//       id
//     }
//   }
const Header = () => {
    useEffect(() => {
        if (!document.querySelector('.landingPageContent').innerHTML) {
            document.querySelector('.landingPageInfo').style.display = "none"
        }
    }, [])

    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 90) {
            document.querySelector('.topHeaderWrapper').style.display = 'none';
                document.querySelector('.navWrapper').classList.add('navFixed')
        }

        if (window.pageYOffset < 90) {
            document.querySelector('.topHeaderWrapper').style.display = 'block'
                document.querySelector('.navWrapper').classList.remove('navFixed')
        }
      });
    
    const handleOpen = () => {
        document.getElementById("mySidenav").style.width = "60%";
    }

    const handleClose = () => {
        document.getElementById("mySidenav").style.width = "0";
    }
    
    // mutation {
    //     updateHomeHeader(
    //       where: {
    //         id: "ckeirawf41bom0184t8efmq51"
    //       },
    //       data: {
    //       header: "COWBELLPEDIA WINNERS."
    //     }){
    //       id
    //       header
    //       createdAt
    //     }
    //   }

    return (
        <header className="homeHeader">
            <div className="topHeaderWrapper">
                <div className="topHeader">
                    <div className="topContact">
                        <span> info@welkincollege.com </span>
                        <span> +234 810 947 9237 </span>
                    </div>
                    <div className="navInfo">
                        <span className="navInfoText">
                            <Query query={GET_HEADER}>
                                {
                                    ({ loading, data}) => {
                                        if (loading) return <SpinnerSmall/>
                                        return data.homeHeaders[0].header.toUpperCase()
                                    }
                                }
                            </Query>
                        </span>
                    </div>
                    <div className="findUs">
                        <a href="#map">FIND US</a>
                    </div>
                </div>
            </div>
            <div className="navWrapper">
                <nav className="mainHeader">
                    <div className="logo">
                        <Link className='linkhead' to ='/'>
                        <div className="logoPicture">
                            <img src={schoolban} alt="Welkin International School"/>
                        </div>
                        </Link>
                        <div className="hamburger"><HamburgerMenu isOpen={false} menuClicked={handleOpen} className="menu" width={18} height={15} color='#7a457d'/> </div>
                    </div>
                        <ul className="navLinks">
                        <Link className='links' to ='/'><li>Home</li></Link>
                        <Link className='links' to ='/aboutus'><li>About Us</li></Link>
                        <Link className='links' to ='/awards'><li>Awards</li></Link>
                        <Link className='links' to ='/admissions'><li>Admissions</li></Link>
                        <Link className='links' to ='/gallery'><li>Gallery</li></Link>
                        <Link className='links' to ='/news'><li>News</li></Link>
                        <Link className='links' to ='/careers'><li>Careers</li></Link>
                        <Link className='links' to ='/welkinpedia'><li>Welkinpedia</li></Link>
                        <Link className='links' to ='/contactus'><li>Contact Us</li></Link>
                        <Link className='links' to ='/portal'><li>Portal</li></Link>
                        </ul>
                </nav> 
            </div>

            <div className="sidenav" id="mySidenav">
            <HamburgerMenu isOpen={true} menuClicked={handleClose} className="closeButton" width={18} height={15} color='#7a457d'/>
            <div>
                <ul className="sidebarNav">
                    <Link className='linksm' to ='/'><li onClick={handleClose}>Home</li></Link>
                    <Link className='linksm' to ='/aboutus'><li onClick={handleClose}>About Us</li></Link>
                    <Link className='linksm' to ='/awards'><li onClick={handleClose}>Awards</li></Link>
                    <Link className='linksm' to ='/admissions'><li onClick={handleClose}>Admissions</li></Link>
                    <Link className='linksm' to ='/gallery'><li onClick={handleClose}>Gallery</li></Link>
                    <Link className='linksm' to ='/news'><li onClick={handleClose}>News</li></Link>
                    <Link className='linksm' to ='/careers'><li onClick={handleClose}>Careers</li></Link>
                    <Link className='linksm' to ='/welkinpedia'><li onClick={handleClose}>Welkinpedia</li></Link>
                    <Link className='linksm' to ='/contactus'><li onClick={handleClose}>Contact Us</li></Link>
                    <Link className='linksm' to ='/portal'><li onClick={handleClose}>Portal</li></Link>
                </ul>
            </div>
            </div>
            <div className="landingPageInfo">
                <div>
                    <div className="landingClose"><span onClick={() => document.querySelector('.landingPageInfo').style.display = "none"}>CLOSE</span></div>
                    <div className="landingPageContent"></div>
                </div>
            </div>
        </header>
    )
}

export default Header