import React, {useEffect} from 'react';
import './Careers.css'

const Careers = () => {
    useEffect(() => {
        document.title = "Careers - Welkin International School"
}, [])

    return (
        <div>
            <h1>Careers</h1>
        </div>
    )
}

export default Careers