import React, {useEffect, useState} from 'react';
import { SpinnerBig } from '../../components/Spinner/Spinner'
import './Gallery.css'
import Gallery from 'react-grid-gallery';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'


const GalleryPage = () => {
    const [imagesToLoop, setImagesToLoop] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {

        document.title = "Gallery - Welkin International School";
        function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        fetch('https://morning-wildwood-23550.herokuapp.com/')
        .then(response => response.json())
        .then(data => {
            const imagesArray = data.resources.map(resource => {
                return ({
                    src: resource.url,
                    thumbnail: resource.url,
                    thumbnailWidth: randomIntFromInterval(200, 300),
                    thumbnailHeight: randomIntFromInterval(200, 300)
                })
            })
            setImagesToLoop(imagesArray)
            setIsLoading(false)
        })
}, [])

    return (
        <div>
        <Header/>
        <div className="galleryWrapper">
            <h1>Gallery</h1>
            {
                isLoading
                ?
                <SpinnerBig/>
                :
                <Gallery images={imagesToLoop}/>
            }
        </div>
        <Footer/>
        </div>

    )
}

export default GalleryPage