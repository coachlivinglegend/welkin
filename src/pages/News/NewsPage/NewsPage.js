import React from 'react'
import './NewsPage.css'
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost'
import PostPage from '../../../components/PostPage/PostPage'
import { SpinnerBig } from '../../../components/Spinner/Spinner'

const GET_ONEPOST = gql`
    query blog($slug: String!) {
        blog(where: {slug: $slug}){
            id
            createdAt
            postTitle
            slug
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

const NewsPage = ({ match }) => {
    return (
        <div>
            <Query query={GET_ONEPOST} variables={{ slug: match.params.slug }}>
                {
                    ({ loading, data, error }) => {
                        if (loading) return <SpinnerBig/>
                        if (error) return "ERROR"
                        const {  id, createdAt, postTitle, postPicture: { url }, postBody: { html } } = data.blog
                        document.title = postTitle
                        return (
                            <PostPage key={id} date={createdAt} title={postTitle} imageUrl={url} body={html}/>

                        )
                    }
                }
            </Query>
        </div>
    )
}

export default NewsPage