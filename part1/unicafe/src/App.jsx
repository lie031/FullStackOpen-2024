import { useState } from "react";

const StatisticLine = ({title,value})=>{
    return(
        <tr>
            <td>{title}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({good,bad,neutral,all}) =>{

    const average = (good*1+bad*(-1)+neutral*0)/all
    const positive = good/all

    if(all ===0){
        return(
            <p>No feedback given</p>
        )
    }

    return(
        <table>
             <tbody> 
            <StatisticLine value={good} title ="good"/>
            <StatisticLine value={neutral} title ="neutral"/>
            <StatisticLine value={bad} title ="bad"/>
            <StatisticLine value={all} title ="all"/>
            <StatisticLine value={average} title="average"/>
            <StatisticLine value={positive} title="positive"/>
            </tbody>    
        </table>
               
    )
        
}

const Button = (props)=> {
    return(
        <button onClick={props.onClick}>{props.text}</button>
    )
}


const App = () =>{

    const [good,setGood] = useState(0) 
    const [neutral,setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all,setAll] = useState(0)

    const handleGoodClick = ()=>{
        const newValue = good+1
        setGood(newValue)
        setAll(newValue+neutral+bad)
    }

    const handleNeutralClick = ()=>{
        const newValue = neutral+1
        setNeutral(newValue)
        setAll(newValue+good+bad)
    }

    const handleBadClick = ()=>{
        const newValue = bad+1
        setBad(newValue)
        setAll(newValue+neutral+good)
    }

    return(
        <div>
            <h2>give feedback</h2>
            <Button onClick={handleGoodClick} text ="good"/>
            <Button onClick={handleNeutralClick} text = "neutral" />
            <Button onClick={handleBadClick} text="bad"/>
            <h2>Statistics</h2>
            <Statistics good={good} neutral ={neutral} bad={bad} all={all}></Statistics>
        </div>
    )
}

export default App

