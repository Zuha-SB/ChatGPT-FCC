const API_KEY = "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"

async function fetchData() {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                content: "Hello!"
            }]
        })
    })
    const data = await response.json()
    console.log(data)
}

fetchData()
