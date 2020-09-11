import React, {useState} from 'react';
import './HomeHeader.css'
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost'
import { SpinnerSmall } from '../../../components/Spinner/Spinner'

const GET_HEADER = gql`
    {
        homeHeaders {
            id
            header
        }
    }
`

const HomeHeader = () => {
    const [newHeader, setNewHeader] = useState('')

    const UPDATE_HEADER = gql`
    mutation {
        updateHomeHeader(
            where: {
            id: "ckeirawf41bom0184t8efmq51"
        },
          data: {
          header: "${newHeader}"
        }){
          id
          header
          createdAt
        }
    }
    `  
    
    return (
        <div className="homeHeadWrap">
            <div>
                <h1>HOMEPAGE HEADER TEXT</h1>
            </div>
            <div className="currentHeader">
                <h3> This is the current homepage header </h3>
                <h4 style={{
                    border: "1px solid #7a457d", padding: "10px", boxShadow: "0 0.5rem 3.125rem -0.75rem rgba(37,55,110,0.2)"
                }}> 
                    <Query query={GET_HEADER}>
                        {
                            ({ loading, data}) => {
                                if (loading) return <SpinnerSmall/>
                                return data.homeHeaders[0].header.toUpperCase()
                            }
                        }
                    </Query>                   
                </h4>
            </div>
            <div className="newHeader">
                <h3>Input the new header you want below</h3>
                <textarea value={newHeader} onChange={(event) => setNewHeader(event.target.value)} className="inputHeader"/>
                <Mutation mutation={UPDATE_HEADER}>
                        {
                            ( updateHeader ) => (                                
                                <button 
                                onClick={(event) => {
                                    event.preventDefault();
                                    updateHeader ();
                                    setTimeout(() => { setNewHeader('') }, 2500)
                                }} 
                                className="saveHeader"
                                >
                                    SAVE
                                </button>
                            )
                        }
                </Mutation>
            </div>
        </div>
    )
}

export default HomeHeader


//GRAPHQL YATO SI GRAPHCMS
// const UPDATE_HEADER = gql`
//     mutation updateHomeHeader($id: String!, $header: String!) {
//         updateHomeHeader(id: $id, header: $header) {
//             id
//             header
//             createdAt
//         }
//     }
// `

/* <Mutation mutation={UPDATE_HEADER}>
{
    ( updateHeader, { data } ) => (                                
        <button 
        onClick={(event) => {
            event.preventDefault();
            updateHeader ({
                variables: { id: "ckeirawf41bom0184t8efmq51", header: newHeader}
            })
        }} 
        className="saveHeader"
        >
            SAVE
        </button>
    )
}
</Mutation> */
