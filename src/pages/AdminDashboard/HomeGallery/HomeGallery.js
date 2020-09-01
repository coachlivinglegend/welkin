import React, {useState} from 'react';
import './HomeGallery.css'
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost'
import * as filestack from 'filestack-js'

const GET_MARQUEE = gql`
    {
        homeGalleries(orderBy: createdAt_DESC) {
            id
            imageDescription
                image {
                id
                url
            }
        }
    }
`


const HomeGallery = () => {
    const [imageRoute, setImageRoute] = useState()
    const [filename, setFilename] = useState('')
    const [mimetype, setMimeType] = useState('')
    const [url, setUrl] = useState('')
    const [handle, setHandle] = useState('')
    const [description, setDescription] = useState('')
    
    const UPLOAD_MARQUEE = gql`
        mutation {
            createAsset(
                data: {
                handle: "${handle}"
                fileName: "${filename}"
                mimeType: "${mimetype}"
                homeGalleryImage: {
                    create: {
                        imageDescription: "${description}"
                   }
                }
            }){
                id
                url
            }
        }
    `

    const handleAddDel = (rou) => {
        setImageRoute(rou)
        document.querySelector('.homeGallButt').style.display = "none";
        document.querySelector('.gallAction').style.display = "flex";
    }

    const handleClose = () => {
        document.querySelector('.homeGallButt').style.display = "flex";
        document.querySelector('.gallAction').style.display = "none";
    }

    const handleUpload = () => {
        const client = filestack.init('APVtbrtiShOQCtyCSy3tAz');
        const options = {
            onUploadDone: function(file) {
                const { filesUploaded } = file
                const uploadedFile = filesUploaded[0]
                setFilename(uploadedFile.filename);
                setHandle(uploadedFile.handle);
                setMimeType(uploadedFile.mimetype)
                setUrl(uploadedFile.url)
            },
            accept: ["image/*"],
        }
        client.picker(options).open();
    }

    return (
        <div className="homeGallWrap">
            <div>
                <h4>THESE ARE THE CURRENT PICTURES ON YOUR HOMEPAGE GALLERY</h4>
                <div className="homeImagesWrap">
                        <Query query={GET_MARQUEE}>
                            {
                                ({ loading, data }) => {
                                    if (loading) return 'HANG IN THERE BABYYYYY'
                                    return (
                                        data.homeGalleries.map(({ id, image: { url }}) => {
                                            return (
                                                <div className="homeImage" key={id}>
                                                    <div className="homeImageMini" style={{backgroundImage: `url(${url})`}}/>
                                                </div>
                                            )
                                        })
                                    )
                                }
                            }

                        </Query>
                </div>
            </div>
            <div style={{height: "500px"}}>
                <div className="homeGallButt">
                <button onClick={() => handleAddDel(1)} className="hgButt">ADD IMAGES</button>
                <button onClick={() => handleAddDel(2)} className="hgButt">DELETE IMAGES</button>
                </div>
                <div className="gallAction">
                    <div>
                        <button className="close" onClick={() => handleClose()}>CLOSE</button>
                    </div>
                    {
                        imageRoute === 1 
                        
                        ?
                        <div className="addImage">
                            ADD IMAGE
                            <button onClick={handleUpload} className="saveHeader">ADD A PICTURE</button>
                            <div className="homeImageMini" style={{backgroundImage: `url(${url})`}} />
                            <input type="text" name="description" placeholder="describe the picture" onChange={(e) => setDescription(e.target.value)}/>
                            {/* <input onChange={} type="file" name="file" id="file" className="inputfile" accept=".jpg, .jpeg, .png"/>
                            <label className="" htmlFor="file">Upload a picture</label> */}
                            <Mutation mutation={UPLOAD_MARQUEE}>
                                {
                                    ( updateMarquee ) => (
                                        <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            updateMarquee()
                                        }

                                        }
                                        className="saveHeader">SAVE</button>
                                    )
                                }
                            </Mutation>
                        </div>
                        :
                        <div className="removeImage">
                            REMOVE IMAGE
                            <div className="delTable">
                                <div className="delTableRow">
                                <div></div>
                                <div>IMAGE</div>
                                <div>DESCRIPTION</div>
                                <div>CREATED AT</div>
                                <div>DEL</div>
                                </div>
                            </div>
                            <button className="saveHeader">SAVE</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default HomeGallery