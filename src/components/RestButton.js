import React from 'react'
import './RestButton.css'
function RestButton({ resetBoard }) {
    return (
        <button className='reset-btn' onClick={resetBoard}>Reset</button>
    )
}

export default RestButton
