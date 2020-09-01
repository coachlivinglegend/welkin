import React, {useEffect} from 'react';
import './News.css'

const News = () => {
    useEffect(() => {
        document.title = "News - Welkin International School"
}, [])

    return (
        <div>
            <h1>News</h1>
        </div>
    )
}

export default News