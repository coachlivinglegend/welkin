import React, {useEffect} from 'react';
import { ReactComponent as Con } from '../../assets/undraw_under_construction_46pa.svg'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'



import './Welkinpedia.css'

const Welkinpedia = () => {
    useEffect(() => {
        document.title = "Welkinpedia - Welkin International School"
    }, [])

    return (
        <div>
        <Header/>

        <div style={{display:"flex", flexDirection:"column", alignItems: "center"}}>
            <h1 style={{color: "#814888", textAlign: "center", marginBottom: 0 }}>This page is under construction.</h1>
            <Con className="con"/>
        </div>
        <Footer/>
        </div>

    )
}

export default Welkinpedia