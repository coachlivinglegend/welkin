import React, { useEffect } from 'react';
import './LandingPageInfo.css'

import { gql } from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory';

import { createHttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-boost'

const httpLink = createHttpLink({
  uri: 'https://api-us-east-1.graphcms.com/v2/ckeiqswoc3k3y01z1eupfd36k/master'
})

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
})


const LandingPageInfo = () => {
    const [landInfoHtml, setLandInfoHtml] = React.useState('')
    useEffect(() => {
        client.query({
            query: gql`
              {
                  homepageInfos{
                      id
                      information{
                          html
                      }
                  }
              }
            `
        }).then(response => setLandInfoHtml(response.data.homepageInfos[0].information.html))          
    }, [])

    return (
        <div>
            <div  style={{border: "1px solid #7a457d", maxHeight: "80vh", overflowY: "auto"}}>
                {
                    landInfoHtml === "<p></p>"
                    ?
                    <div>
                        nothing
                    </div>
                    :
                    <div>
                        <div dangerouslySetInnerHTML={{__html: landInfoHtml}} className="landingPageContent"/>
                    </div>
                }
            </div>
            <div>
                You can edit the content here : 
                
            </div>
        </div>
    )
}

export default LandingPageInfo