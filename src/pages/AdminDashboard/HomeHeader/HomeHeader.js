import React, {useState} from 'react';
import './HomeHeader.css'
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost'

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
                <h4> 
                    <Query query={GET_HEADER}>
                        {
                            ({ loading, data}) => {
                                if (loading) return 'HOLD ON SMALL ABEG'
                                return data.homeHeaders[0].header.toUpperCase()
                            }
                        }
                    </Query>                   
                </h4>
            </div>
            <div className="newHeader">
                <h3>Input the new header you want below</h3>
                <textarea onChange={(event) => setNewHeader(event.target.value)} className="inputHeader"/>
                <Mutation mutation={UPDATE_HEADER}>
                        {
                            ( updateHeader ) => (                                
                                <button 
                                onClick={(event) => {
                                    event.preventDefault();
                                    updateHeader ()
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
