import React from 'react'
import './PostPage.css'

const PostPage = ({ date, title, imageUrl, body }) => {
    const newDate = new Date((`${date}`).slice(0,10))
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(newDate)
    const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(newDate)
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(newDate)

    return (
        <main className="site-main">
            <div className="inner">
                <article>
                    <header className="postFullHeader">
                        <section className="postDateFull"><time dateTime={newDate}>{`${day} ${month} ${year}`} / Management</time></section>
                        <h1 className="postFullTitle">{title}</h1>
                    </header>
                    <figure className="postFullImage">
                        <img src={imageUrl} alt={title}/>
                    </figure>
                    <section className="postFullContent">
                        <div dangerouslySetInnerHTML={{__html: body}} className='postContent'/>
                    </section>
                </article>
            </div>
        </main>
    )
}

export default PostPage