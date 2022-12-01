import React, { useState } from "react"

// Button comp (refactored)
const Button = ({onClick, text}) => (<button onClick={onClick}>{text}</button>)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  console.log(votes)

  const genRandomInt = () => setSelected((Math.floor(Math.random() * anecdotes.length)))

  const voteCount = () => {
    const copy = [...votes]
    copy[selected] += 1 // increase value of a pos by 1
    setVotes(copy)
  }

  const getMaxVote = () => {
    let max = 0
    for (let i=1; i<anecdotes.length; i++) {
      if (votes[i] > votes[max]) {
        max = i
      }
    }
    return max
  }

  // const getMaxVote = () => {
  //   let max = 0
  //   let i = 1
  //   votes.forEach((max, i) => {
  //     if (votes[i] > votes[max]) {
  //       max = i
  //     }
  //   })
  //   return max
  // }

  
  return (
    <>
      <h2>Anecdotes of the day</h2>
      <p>{anecdotes[selected]} has {votes[selected]} votes</p>
      <Button onClick={voteCount} text="vote" />
      <Button onClick={genRandomInt} text="next anecdote" />
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[getMaxVote()]} has {votes[getMaxVote()]} votes</p>
    </>
  )
}

export default App;




