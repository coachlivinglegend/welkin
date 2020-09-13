import React, { useState, useEffect } from "react";
import './GalleryPage.css'
import Gallery from 'react-grid-gallery';
import { SpinnerBig } from '../../../components/Spinner/Spinner'
  
const GalleryPage = () => {
  const [imagesToLoop, setImagesToLoop] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
      fetch('https://morning-wildwood-23550.herokuapp.com/')
      .then(response => response.json())
      .then(data => {
        console.log(data.resources)
          const imagesArray = data.resources.map(resource => {
              return ({
                  src: resource.url,
                  thumbnail: resource.url,
                  thumbnailWidth: 250,
                  thumbnailHeight: 250
              })
          })
          setImagesToLoop(imagesArray)
          setIsLoading(false)
      })
}, [])


  const myWidget = window.cloudinary.createUploadWidget({
    cloudName: 'dk0k3povu', 
    uploadPreset: 'rikpyjpk'}, (error, result) => { 
      if (!error && result && result.event === "success") { 
        console.log('Done! Here is the image info: ', result.info); 
      }
    }
  )

  const openWidget = () => {
    myWidget.open()
  }
  return (
      <div>
        <div style={{margin: "0 auto", display: "flex"}}>
          <button onClick={openWidget} id="upload_widget" className="cloudinary-button cloudButton">ADD TO GALLERY</button>
        </div>
          <div className="galeryPP">
            These are the current pictures in your gallery.
            {
              isLoading
                ?
                <SpinnerBig/>
                :
                <Gallery images={imagesToLoop}/>
            }
          </div>
      </div>
  )
}

export default GalleryPage