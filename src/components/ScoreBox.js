import React, {useState,useEffect} from 'react'

function ScoreBox({score,setScore,tries,setTries,starting,setStarting}) {
    function Restart(e)
    { e.preventDefault()
        setTries(5)
        setScore(0)
        setStarting(6)
    }
    console.log(starting)
    return (
        <div className="Side">
            <div className="Side_element">
                <h1>Score</h1>
                <div className="Side_element_score">
                <h5 style={{color:"#1890ff"}} >{score}</h5><h5> / {starting}</h5>
                <p>Tries : {tries}</p>
                </div>
                <div className="Side_element_form">
                <h1>Option</h1>
                    <form >
                        <label>Size</label>
                        <select value={starting} onChange={e=>setStarting(parseInt(e.target.value))}>
                            <option value="6" >6 Pairs</option>
                            <option value="8">8 Pairs</option>
                            <option value="10" >10 Pairs</option>
                            <option value="12" >12 Pairs</option>
                            <option value="15" >15 Pairs</option>
                            <option value="18" >18 Pairs</option>
                            <option value="21" >21 Pairs</option>
                        </select>
                    </form>
                    <button onClick={Restart}>Restart</button>
                </div>
            </div>
        </div>
    )
}

export default ScoreBox
