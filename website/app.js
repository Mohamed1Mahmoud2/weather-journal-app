let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
// Personal API Key for OpenWeatherMap API
const apiKey = '6f2579c41bf559afdaa64a3ade159c7a'
/* Global Variables */
const zpEle = document.getElementById("zip");
const feelELe = document.getElementById("feelings");
const genertBtn = document.getElementById("generate");

// Create a new date instance dynamically with JS
let date = new Date();
let today = date.getMonth() + 1 + '.' + date.getDate() + '.' + date.getFullYear();

// data sub
genertBtn.addEventListener('click', callSubmt);

function callSubmt() {
    getWeathrCelTm(baseURL, zpEle.value, apiKey)
        .then(data => sendDataServr({
            data: today,
            temp: data.main.temp,
            feeling: feelELe.value
        }))
        .then((data) => {
            console.log(data);
            uptatingUI();
        })

}


//get weather 
async function getWeathrCelTm(url, zipcode, apikey) {
    const request = await fetch(`${url}${zipcode}&appid=${apikey}&units=imperial`);
    try {
        const response = await request.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}
// to send data to server
async function sendDataServr(data = {}) {
    const request = await fetch(`/sendData`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const response = await request.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}

// to updating UI
async function uptatingUI() {
    const request = await fetch('/all');
    try {
        const response = await request.json();
        document.getElementById("date").innerHTML = response.dete;
        document.getElementById("temp").innerHTML = response.temp;
        document.getElementById("content").innerHTML = response.feeling;
    } catch (error) {
        console.log(error);
    }
}







