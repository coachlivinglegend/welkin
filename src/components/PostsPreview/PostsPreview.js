import React from 'react'
import { Link } from 'react-router-dom'
import './PostsPreview.css'

const PostsPreview = () => {
    return (
        <div className="newsPreviewWrapper">
            <div className="newsPreview">
                <div className='newsUpdate'>
                    <h3>News and Updates</h3>
                </div>
                <Link className="readAll" to='/news'>Read All News</Link>
                <div className="postContainer">
                <div className="postWrapper">
                        <div className="postPicture">
                            PICTURE GOES HERE
                        </div>
                        <div>
                            <span className="postDate">February 10, 2020</span>
                            <div className="postTitle">
                                <Link className="titleStyle" to=''><span>Welkin makes record in 2019/2020 Math Olympiads</span></Link>
                            </div>
                        </div>
                    </div>
                    <div className="postWrapper">
                        <div className="postPicture">
                            PICTURE GOES HERE
                        </div>
                        <div>
                            <span className="postDate">February 10, 2020</span>
                            <div className="postTitle">
                                Welkin makes record in 2019/2020 Math Olympiads
                            </div>
                        </div>
                    </div>
                    <div className="postWrapper">
                        <div className="postPicture">
                            PICTURE GOES HERE
                        </div>
                        <div>
                            <span className="postDate">February 10, 2020</span>
                            <div className="postTitle">
                                Welkin makes record in 2019/2020 Math Olympiads
                            </div>
                        </div>
                    </div>
                    <div className="postWrapper">
                        <div className="postPicture">
                            PICTURE GOES HERE
                        </div>
                        <div>
                            <span className="postDate">February 10, 2020</span>
                            <div className="postTitle">
                                Welkin makes record in 2019/2020 Math Olympiads
                            </div>
                        </div>
                    </div>
                    <div className="postWrapper">
                        <div className="postPicture">
                            PICTURE GOES HERE
                        </div>
                        <div>
                            <span className="postDate">February 10, 2020</span>
                            <div className="postTitle">
                                Welkin makes record in 2019/2020 Math Olympiads
                            </div>
                        </div>
                    </div>
                    <div className="postWrapper">
                        <div className="postPicture">
                            PICTURE GOES HERE
                        </div>
                        <div>
                            <span className="postDate">February 10, 2020</span>
                            <div className="postTitle">
                                Welkin makes record in 2019/2020 Math Olympiads
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostsPreview