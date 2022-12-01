import React, {useState} from "react";

// Button comp
const Button = ({onClick, text}) => (<button onClick={onClick}>{text}</button>)

// StatisticLine comp
const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

// Statistics comp
const Statistics = ({data: {good, neutral, bad}}) => {
  const sum = good + neutral + bad
  const average = (good - bad) / sum || 0
  const positive = (good / sum * 100 || 0) + ' %'

// conditional rerendering
  if(sum === 0) {
    return (
    <div>
      <p>No feedback given</p>
    </div>
    )
  }
  
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={sum} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table> 
    </div>
    )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodReview = () => setGood(good + 1)
  const neutralReview = () => setNeutral(neutral + 1)
  const badReview = () => setBad(bad + 1)
  

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={goodReview} text="good" />
      <Button onClick={neutralReview} text="neutral" />
      <Button onClick={badReview} text="bad" />
      <h1>statistics</h1>
      <Statistics data={{good, neutral, bad}} />
    </>
  )
}

export default App;
