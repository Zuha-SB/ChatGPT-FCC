import { useState, useEffect } from 'react'

const App = () => {
  const [ value, setValue] = useState(null)
  const [ message, setMessage] = useState(null)
  const [previousChats, setPreviousChats] = useState([])
  const [ currentTitle, setCurrentTitle] = useState(null)

  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      const response = await fetch('http://localhost:8000/completions', options)
      const data = await response.json()
      setMessage(data.choices[0].message)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log(currentTitle, value, message)
    if (!currentTitle && value && message) {
      setCurrentTitle(value)
    }
    if (currentTitle && value && message) {
      setPreviousChats(prevChats => (
        [...prevChats,
          {
            title: currentTitle,
            role: "user",
            content: value
          },
          {
            title: currentTitle,
            role: message.role,
            content: message.content
          }
        ]
      ))
    }
  }, [message, currentTitle])

  console.log(previousChats)

  return (
    <div className="app">
      <section className="side-bar">
        <button>+ New chat</button>
        <ul className="history"></ul>
        <nav>
          <p>Made by Zuha</p>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1>ZuhaGPT</h1>}
        <ul className="feed">
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)}/>
            <div id="submit" onClick={getMessages}>➢</div>
          </div>
          <p className="info">
            Chat GPT version number and goal statement. 
            This is a filler statement to take up space 
            for testing and viewing purposes. Hopefully 
            this works.
          </p>
        </div>
      </section>
    </div>
  )
}

export default App
