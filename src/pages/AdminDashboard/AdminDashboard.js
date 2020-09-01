import React, {useState} from 'react';
import './AdminDashboard.css';
import schoolban from '../../assets/wclogofull.png';
import HomeHeader from './HomeHeader/HomeHeader'
import HomeGallery from './HomeGallery/HomeGallery'
import GalleryPage from './GalleryPage/GalleryPage'
import BlogPosts from './BlogPosts/BlogPosts'


const AdminDashboard = () => {
    const [navRoute, setNavRoute] = useState('')
    const [isSelected, setIsSelected] = useState(0)


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
            case "blog":
                return (
                    <div>
                        <BlogPosts/>
                    </div>
                )
            default: 
                return (
                    <div>
                    sdfghjklkjhgfdfghjkl;kjhgf
                    </div>
                )
        }
    }

    const handleNavClick = (route, selected) => {
        setNavRoute(route)
        setIsSelected(selected)
    }


    return (
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
                        <div onClick={() => handleNavClick('header', 5)} className={`adminMenuItem ${isSelected === 5 ? 'adminActive' : '' }`}>
                            HOME HEADER
                        </div>
                    </div>
            </div>
                <div className="adminMain">
                    { 
                        navRenderSwitch(navRoute)
                    } 
                </div>
        </div>
    )
}

export default AdminDashboard