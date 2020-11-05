import React, {useEffect, useState} from 'react';
import { SpinnerBig } from '../../components/Spinner/Spinner'
import './Gallery.css'
import Gallery from 'react-grid-gallery';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'


const GalleryPage = () => {
    const [imagesToLoop, setImagesToLoop] = useState([])
    const [allImages, setAllImages] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [manyPages, setManyPages] = useState(0)
    const [numPage, setNumPages] = useState([])

    useEffect(() => {
        document.title = "Gallery - Welkin International School";
        function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        fetch('http://localhost:3001/')
        // fetch('https://morning-wildwood-23550.herokuapp.com/')
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
            setAllImages(imagesArray)
            setIsLoading(false)
            setManyPages(Math.ceil(imagesArray.length / 20))
            const pages = Math.ceil(imagesArray.length / 20)
            const theA = []
            for (let i = 0; i < pages; i++) {
                theA.push({
                    page: `Page ${i+1}`,
                    start: 0 + 20*i,
                    end: 19 + 20*i
                })
            }
            setNumPages(theA)
        })
    }, [])
    
    const pagination = (start, end) => {
        const currentImg = allImages.filter((img, i) => {
            if (i >= start && i <=end) {
                return img
            }
            return
        })
        setImagesToLoop(currentImg)
    }
    useEffect(() => {
        pagination(0, 19)
    }, [allImages])

    
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
        <div className="pageNumber">
            {
                numPage.map(page => <div onClick={() => pagination(page.start, page.end)} className="pageNumberItem">{page.page}</div>)
            }
        </div>
        <Footer/>
        </div>
    )
}

export default GalleryPage