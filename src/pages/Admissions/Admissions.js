import React, {useEffect} from 'react';
import './Admissions.css'

const Admissions = () => {
    useEffect(() => {
        document.title = "Admissions - Welkin International School"
}, [])

    return (
        <div>
            <h1>Admissions</h1>
        </div>
    )
}

export default Admissions