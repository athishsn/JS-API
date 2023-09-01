const API_KEY = "YOUR_API_KEY";
const submitBtn = document.querySelector('#submit');
const outputElement = document.querySelector('#output');
const inputElement = document.querySelector("input");
const historyElement = document.querySelector('.history')
const button = document.querySelector('button');


function changeInput(value){
    const inputElement = document.querySelector('input');
    inputElement.value = value
}


async function getMessage() {
    console.log('clicked');
    const options = {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${API_KEY}`,  // Removed extra space here
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: inputElement.value }],
            max_tokens: 100
        })
    };
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        console.log(data);
        outputElement.textContent = data.choices[0].message.content;
        if(data.choices[0].message.content && inputElement.value){
            const pElement = document.createElement('p')
            pElement.textContent = inputElement.value
            pElement.addEventListener('click', ()=>changeInput(pElement.textContent))
            historyElement.append(pElement);
        }
    } catch (error) {
        console.log(error);
    }
}

submitBtn.addEventListener('click', getMessage);

function clearInput(){
    inputElement.value = ""
}

button.addEventListener('click', clearInput);