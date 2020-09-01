import React, {useEffect} from 'react';
import { ReactComponent as Con } from '../../assets/undraw_under_construction_46pa.svg'
import './Portal.css'

const Portal = () => {
    useEffect(() => {
        document.title = "Portal - Welkin International School"
}, [])

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems: "center"}}>
            <h1 style={{color: "#814888", textAlign: "center", marginBottom: 0 }}>This page is under construction.</h1>
            <Con className="con"/>
        </div>
    )
}

export default Portal