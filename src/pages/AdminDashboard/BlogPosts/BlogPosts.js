import React, { useState } from 'react';
import './BlogPosts.css'
import { Editor } from '@tinymce/tinymce-react'
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost'
import * as filestack from 'filestack-js'


const BlogPosts = () => {
    
    const [filename, setFilename] = useState('')
    const [mimetype, setMimeType] = useState('')
    const [url, setUrl] = useState('')
    const [handle, setHandle] = useState('')
    const [postHeader, setPostHeader] = useState('')
    const [postBody, setPostBody] = useState('')
    
    const handleEditorChange = (content, editor) => {
        console.log('Content was updated:', content);
        setPostBody(content);
        console.log(postBody)
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
        <div className="blogPostsWrap">
            BlogPosts
            <div className="blogPostsMainWrap">
                <div className="blogEditor">
                <div>
                    <input type="text" name="description" placeholder="Enter the title of the post." onChange={(e) => setPostHeader(e.target.value)}/>
                    <button onClick={handleUpload} className="saveHeader">ADD A PICTURE</button>
                    <div className="homeImageMini" style={{backgroundColor: "black"}}/>
                </div>
                    <Editor 
                        apiKey="0hhpdi62djsc781d5zgqv10pv9ygae1tceqvxsfptoqb8xrv"
                        initialValue="<p>This is the initial content of the editor</p>"
                        init={{
                        height: 500,
                        menubar: true,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help'
                        }}
                        onEditorChange={handleEditorChange}
                    />
                </div>
                <div className="postsPreview">
                    THIS IS WHERE A PREVIEW OF THE BLOGPOSTS WILL BE DISPLAYED
                </div>
            </div>
        </div>
    )
}

export default BlogPosts