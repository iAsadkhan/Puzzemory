import React, {useState,useEffect} from 'react'

function ScoreBox({score,setScore,tries,setTries,starting,setStarting}) {
    console.log(starting)
    return (
        <div className="Side">
            <div className="Side_element">
                <h1>Score</h1>
                <p><h5>{score}/{starting}</h5></p>
                <div className="Side_element_score">

                </div>
                <div className="Side_element_form">
                <h1>Option</h1>
                    <form >
                        <label>Size</label>
                        <select value={starting} onChange={e=>setStarting(parseInt(e.target.value))}>
                            <option value="6" >6 Pairs</option>
                            <option value="8">8 Pairs</option>
                            <option value="10" onChange={e=>setStarting(e.target.value)} >10 Pairs</option>
                            <option value="12" onChange={e=>setStarting(e.target.value)}>12 Pairs</option>
                            <option value="15" onChange={e=>setStarting(e.target.value)}>15 Pairs</option>
                            <option value="18" onChange={e=>setStarting(e.target.value)}>18 Pairs</option>
                            <option value="21" onChange={e=>setStarting(e.target.value)}>21 Pairs</option>
                        </select>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ScoreBox
