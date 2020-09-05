import React from 'react'
import { Link } from 'react-router-dom'

import './PostPagePreview.css'

const PostPagePreview = ({ date, title, slug, imageUrl, body, match }) => {
    const newDate = new Date((`${date}`).slice(0,10))
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(newDate)
    const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(newDate)
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(newDate)
    return (
        <article className="newsPreviews">
            <div className="newsPictureWrap">
                <img className="newsPicture" src={imageUrl} alt={title}/>
            </div>
            <div className="newsContent">
                <div className="newsContentMini">
                    <header className="postTitle">
                        <span className="postDate">{`${day} ${month} ${year}`}</span>
                        <h2 className="postCardTitle">{title}</h2>
                    </header>
                    <section dangerouslySetInnerHTML={{__html: body.slice(0, 150)+"..."}} className="postExcerpt">
                        {/* <p>
                            {body.slice(0, 100)+"..."}
                        </p> */}
                    </section>
                    <footer className="postEnd">
                        <Link className="readLink" to={`news/${slug}`}><span className="readMore">Read More</span></Link>
                        <span className="readingTime">{Math.ceil(body.length/200)} MIN READ</span>
                    </footer>
                </div>
            </div>
        </article>
    )
}

export default PostPagePreview

{/* <article className="newsPreviews">
<div className="newsPictureWrap">
    <img className="newsPicture" src="https://res-2.cloudinary.com/hstxdo55f/image/upload/q_auto/v1/ghost-blog-images/First-Date-Questions-for-your-Landlord.png" alt=''/>
</div>
<div className="newsContent">
    <div className="newsContentMini">
        <header className="postTitle">
            <h2 className="postCardTitle">Essential Second-Date Questions You Need to Ask Your Landlord</h2>
        </header>
        <section className="postExcerpt">
            <p>
                The risk of signing yourself into an unpleasant situation is high in Lagos. But you can avoid having to tell stories that touch. This article shares essential questions for your landlord. The answers to which will help you make the best decisions.
            </p>
        </section>
        <footer className="postEnd"><span className="readingTime">4 MIN READ</span></footer>
    </div>
</div>
</article> */}
