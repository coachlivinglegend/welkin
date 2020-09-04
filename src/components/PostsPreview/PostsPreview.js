import React from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost'
import PostPagePreview from '../../components/PostPagePreview/PostPagePreview'
import './PostsPreview.css'

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


const PostsPreview = ({ match }) => {
    return (
        <div className="newsPreview">
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
    )
}

export default PostsPreview