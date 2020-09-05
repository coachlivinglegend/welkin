import React from 'react';
import './Hero.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import { Query } from 'react-apollo';
import { gql } from 'apollo-boost'
import { SpinnerBig } from '../Spinner/Spinner'

const GET_MARQUEE = gql`
    {
        homeGalleries(orderBy: createdAt_DESC) {
            id
            imageDescription
                image {
                id
                url
            }
        }
    }
`

const Hero = () => {
    return (
        <Query query={GET_MARQUEE}>
            {
                ({loading, data}) => {
                    if (loading) return <SpinnerBig/>
                    return (
                        <div>
                            <Carousel autoPlay infiniteLoop interval={5000}>
                            {
                                data.homeGalleries.map(({ id, imageDescription, image: { url }}) => {
                                    return (
                                        <div style={{backgroundColor: "#cfc8d0", display:"flex", alignItems: "center", justifyContent: "center"}} key={id}>
                                            <img src={url} alt=''/>
                                            <p className="legend">{imageDescription}</p>
                                        </div>
                                    )
                                })
                            }
                            </Carousel>
                        </div>
                    )
                }
            }
        </Query>
                
    )
}

export default Hero