import React from 'react';
import './Hero.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import p1 from '../../assets/hero/1.png';
import p2 from '../../assets/hero/2.jpg'
import p3 from '../../assets/hero/3.jpg'

import { Query } from 'react-apollo';
import { gql } from 'apollo-boost'

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
                    if (loading) return 'HOLD ON WE GOING HOME'
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