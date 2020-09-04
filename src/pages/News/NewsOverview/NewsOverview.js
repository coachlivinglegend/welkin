import React, {useEffect} from 'react';
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost'
import '.././News.css'
import PostPagePreview from '../../../components/PostPagePreview/PostPagePreview'


const GET_ALLNEWS = gql`
    {
        blogs (orderBy: createdAt_DESC){
            id
            createdAt
            slug
            postTitle
          	postPicture {
                id
                url
            }
            postBody {
                html
            }
        }
    }
`

const NewsOverview = ({ match }) => {
    useEffect(() => {
        document.title = "News - Welkin International School"
}, [])


    return (
        <div className="newsContainer">
            <div className="newsWrapper">
                <div className="newsContentMain">
                    <Query query={GET_ALLNEWS}>
                        {
                            ({ loading, data }) => {
                                if (loading) return "I'M COMING"
                                return (
                                    data.blogs.map(({ id, createdAt, postTitle, slug, postPicture: { url }, postBody: { html }}) => {
                                        return (
                                            <PostPagePreview key={id} match={match} date={createdAt} slug={slug} title={postTitle} imageUrl={url} body={html}/>
                                        )
                                    })
                                )
                            }
                        }
                    </Query>
                </div>
            </div>
        </div>
    )
}

export default NewsOverview