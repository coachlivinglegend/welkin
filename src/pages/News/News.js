import React, {useEffect} from 'react';
import { Route } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'


// import PostPagePreview from '../../components/PostPagePreview/PostPagePreview'

import NewsOverview from './NewsOverview/NewsOverview'
import NewsPage from './NewsPage/NewsPage'

const News = ({ match }) => {
    useEffect(() => {
        document.title = "News - Welkin International School"
}, [])


    return (
        <div>
        <Header/>

        <div>
            <Route exact path={`${match.path}`} component={NewsOverview}/>
            <Route path={`${match.path}/:slug`} component={NewsPage}/>
        </div>
        <Footer/>
        </div>

    )
}

export default News