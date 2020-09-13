import React, {useState} from 'react';
import './AdminDashboard.css';
import schoolban from '../../assets/wclogofull.png';
import HomeHeader from './HomeHeader/HomeHeader'
import HomeGallery from './HomeGallery/HomeGallery'
import GalleryPage from './GalleryPage/GalleryPage'
import BlogPosts from './BlogPosts/BlogPosts'
import LandingPageInfo from './LandingPageInfo/LandingPageInfo'
import HamburgerMenu from 'react-hamburger-menu'
import { Link } from 'react-router-dom'




const AdminDashboard = () => {
    const [navRoute, setNavRoute] = useState('header')
    const [isSelected, setIsSelected] = useState(1)
    const [isOpen, setIsOpen] = useState(false)


    const navRenderSwitch = (navRoute) => {
        switch(navRoute) {
            case "header":
                return (
                    <div>
                        <HomeHeader/>
                    </div>
                )
            case "marquee":
                return (
                    <div>
                        <HomeGallery/>
                    </div>
                )
            case "gallery":
                return (
                    <div>
                        <GalleryPage/>
                    </div>
                )
            case "land":
                return (
                    <div>
                        <LandingPageInfo/>
                    </div>
                )
            case "blog":
                return (
                    <div>
                        <BlogPosts/>
                    </div>
                )
            default: 
                return (
                    <div/>
                )
        }
    }

    const handleNavClick = (route, selected) => {
        setNavRoute(route)
        setIsSelected(selected)
    }

    const handleOpen = () => {
        setIsOpen(!isOpen);
        document.querySelector('.adminNav').classList.toggle('toggleMenu')
        document.querySelector('.adminLogo').classList.toggle('toggleAdminLogo')
        document.querySelector('.adminMain').classList.toggle('toggleAdminMain')
    }


    return (
        <div>
            <div className="adminNavMobile">
                <nav className="mainHeader mainHeaderForMob">
                    <div className="logo">
                        <div className="hamburger"><HamburgerMenu isOpen={isOpen} menuClicked={handleOpen} className="menu" width={18} height={15} color='#7a457d'/> </div>
                        <Link className='linkhead' to ='/'>
                        <div className="logoPicture">
                            <img src={schoolban} alt="Welkin International School"/>
                        </div>
                        </Link>
                    </div>
                </nav>
            </div>
            <div className="dashWrap">
                <div className="adminNav">
                    <div className="adminLogo">
                        <div className="logoPicture">
                            <img src={schoolban} alt="Welkin International School"/>
                        </div>
                    </div>
                        <div className="adminMenu">
                            <div onClick={() => handleNavClick('header', 1)} className={`adminMenuItem ${isSelected === 1 ? 'adminActive' : '' }`}>
                                HOME HEADER
                            </div>
                            <div onClick={() => handleNavClick('marquee', 2)} className={`adminMenuItem ${isSelected === 2 ? 'adminActive' : '' }`}>
                                HOME GALLERY
                            </div>
                            <div onClick={() => handleNavClick('gallery', 3)} className={`adminMenuItem ${isSelected === 3 ? 'adminActive' : '' }`}>
                                SCHOOL GALLERY
                            </div>
                            <div onClick={() => handleNavClick('blog', 4)} className={`adminMenuItem ${isSelected === 4 ? 'adminActive' : '' }`}>
                                BLOG POSTS
                            </div>
                            <div onClick={() => handleNavClick('land', 5)} className={`adminMenuItem ${isSelected === 5 ? 'adminActive' : '' }`}>
                                LANDING PAGE INFO
                            </div>
                        </div>
                </div>
                <div className="adminMain">
                    { 
                        navRenderSwitch(navRoute)
                    } 
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard