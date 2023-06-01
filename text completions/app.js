const API_KEY = "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"

async function fetchData() {
    const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "aplication/json"
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: "hello, how are you today?",
            max_tokens: 7
        })
    })
    const data = await response.json()
    console.log(data)
}

fetchData()
