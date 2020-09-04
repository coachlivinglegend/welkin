import React, {useEffect} from 'react';
import { Route } from 'react-router-dom'

// import PostPagePreview from '../../components/PostPagePreview/PostPagePreview'

import NewsOverview from './NewsOverview/NewsOverview'
import NewsPage from './NewsPage/NewsPage'

const News = ({ match }) => {
    useEffect(() => {
        document.title = "News - Welkin International School"
}, [])


    return (
        <div>
            <Route exact path={`${match.path}`} component={NewsOverview}/>
            <Route path={`${match.path}/:slug`} component={NewsPage}/>
        </div>
    )
}

export default News