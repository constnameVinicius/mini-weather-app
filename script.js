const $ = elem => document.querySelector(elem)

const container = $('.container')
const search = $('.search-box button')
const weatherBox = $('.weather-box')
const weatherDetails = $('.weather-details')

const temperature = $('.weather-box .temperature')
const description = $('.weather-box .description')
const humidity = $('.weather-details .humidity span')
const wind = $('.weather-details .wind span')
const cityHide = $('.city-hide')

const error404 = $('.not-found') 

search.addEventListener('click', ()=>{
    

    const APIKey = 'da92e6251a4fd5c61d276b3c57b8157e'
    const city = $('.search-box input').value

    if(city == '')
        return

    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json()).then(data => {
        if(data.cod == '404'){
            cityHide.textContent = city
            container.style.height = '400px';
            weatherBox.classList.remove('active')
            weatherDetails.classList.remove('active')
            error404.classList.add('active')
            return;
        }
        const image = $('.weather-box img')
        


        if(cityHide == city){
            return
        }
        else{
            cityHide.textContent = city


            container.style.height = '555px';
            weatherBox.classList.add('active')
            weatherDetails.classList.add('active')
            error404.classList.remove('active')


            setTimeout(() => {
                container.classList.remove('active')
            }, 4500);

            switch (data.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png'
                    break;
    
                case 'Rain':
                    image.src = 'images/rain.png'
                    break;
    
                case 'Snow':
                    image.src = 'images/snow.png'
                    break;
    
                case 'Clouds':
                    image.src = 'images/cloud.png'
                    break;
    
                case 'Mist':
                    image.src = 'images/mist.png'
                    break;
    
                case 'Haze':
                    image.src = 'images/mist.png'
                    break;
    
                default:
                    image.src = 'images/cloud.png'
            }
    
            
            console.log(data)
            temperature.innerHTML = `${data.main.temp}<span>ºC</span>`
            description.innerHTML = `${data.weather[0].description}`
            wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`
            humidity.innerHTML = `${data.main.humidity}%`
        }


    })

        
})