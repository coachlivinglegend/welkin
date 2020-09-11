import React, {useState} from 'react';
import './HomeGallery.css'
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost'
import * as filestack from 'filestack-js'
import { SpinnerBig } from '../../../components/Spinner/Spinner'

const GET_MARQUEE = gql`
    {
        homeGalleries(orderBy: createdAt_DESC) {
            id
            imageDescription
            createdAt
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


    // mutation {
    //     createHomeGallery(data: {
    //           imageDescription: "abc"
    //       image: {
    //         create: {
    //           handle: "4HDTOkwOQkOBdRBjXtcp"
    //           fileName: "daniella.jpg"
    //           mimeType: "image/jpeg"
    //         }
    //       }
    //     }){
    //      id
    //       image {
    //         id
    //         url
    //       }
    //     }
    //   }
    
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

    const afterDel = (id) => {
        const div = Array.from(document.querySelectorAll('.delTableRow'))
        console.log({id: id})
        console.log({div: div})
        for (const aDiv of div) {
            console.log(aDiv.dataset.id)
            console.log(aDiv)
            if (aDiv.dataset.id === id) {
                console.log(aDiv.dataset.id)
                aDiv.classList.add('afterDel')
            }
        }
    }

    return (
        <div className="homeGallWrap">
            <div>
                <h4>THESE ARE THE CURRENT PICTURES ON YOUR HOMEPAGE GALLERY</h4>
                <div className="homeImagesWrap">
                        <Query query={GET_MARQUEE}>
                            {
                                ({ loading, data }) => {
                                    if (loading) return <SpinnerBig/>
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
                            <input type="text" name="description" placeholder="Add a description for the picture" onChange={(e) => setDescription(e.target.value)}/>
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
                                <div className="tableImage head">IMAGE</div>
                                <div className="tableDesc head">DESCRIPTION</div>
                                <div className="tableCre head">CREATED AT</div>
                                <div className="tableDel head">DEL</div>
                            </div>
                            <Query query={GET_MARQUEE}>
                                {
                                    ({ loading, data }) => {
                                        if (loading) return <SpinnerBig/>
                                        return (
                                            data.homeGalleries.map(({ id, createdAt, imageDescription, image: { url }}) => {
                                                const DELETE_PICTURE = gql`
                                                    mutation {
                                                        deleteHomeGallery(
                                                            where: {
                                                            id: "${id}"
                                                            }){
                                                                id   
                                                    }
                                                    }
                                                `
                                                return (
                                                    <div className="delTableRow" data-id={id} key={id}>
                                                        <div className="tableImage" style={{backgroundImage:`url(${url})`}}/>
                                                        <div className="tableDesc">{imageDescription}</div>
                                                        <div className="tableCre">{(createdAt.slice(0, 19).split('T')).join(', ')}</div>
                                                        <div className="tableDel">
                                                            <Mutation mutation={DELETE_PICTURE}>
                                                                {
                                                                    ( deletePicture ) => (
                                                                        <i onClick={() => {
                                                                            // deletePicture();
                                                                            afterDel(id)
                                                                        }} class="fas fa-trash iconDel"></i>                                                                        
                                                                    )
                                                                }
                                                            </Mutation>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                    }
                                }
                            </Query>
                            </div>
                            <button onClick={() => window.location.reload()} className="saveHeader delPicButt">SAVE</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default HomeGallery