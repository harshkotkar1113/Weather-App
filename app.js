// Nodejs Work 


const http = require("http")
const fs = require("fs")
const requests = require('requests');


const homeFile = fs.readFileSync('index.html', "utf-8");

const replaceVal = (tempVal, orgVal) => {
    let temperature = tempVal.replace("{%tempval%}", (orgVal.main.temp - 273).toFixed(2))
    temperature = temperature.replace("{%tempmin%}", (orgVal.main.temp_min -273).toFixed(2))
    temperature = temperature.replace("{%tempmax%}", (orgVal.main.temp_max-273).toFixed(2))
    temperature = temperature.replace("{%loaction%}", orgVal.name)
    temperature = temperature.replace("{%country%}", orgVal.sys.country)
    temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main)
    temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main)
    return temperature;

}




let server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests(
                `http://api.openweathermap.org/data/2.5/weather?q=nashik&appid=cdcb745bd706057da370a8316bbfbd3b`
            )
            .on("data", (chunk) => {
                const objdata = JSON.parse(chunk);
                const arrData = [objdata];
                // console.log(arrData[0].main.temp-273);
                let realTimeData = arrData.map(val => replaceVal(homeFile, val))
                    .join("");
                res.write(realTimeData)

                // console.log(realTimeData);
            })
            .on("end", (err) => {
                if (err) return console.log("connection closed due to errors", err);
                res.end();
            });
    }

})

server.listen(3000, "127.0.0.1");