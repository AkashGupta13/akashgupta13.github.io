window.addEventListener('load', () => {
    let longitude;
    let latitude;
    let timezoneElement = document.querySelector('.timezone');
    let temperatureElement = document.querySelector('.temperature');
    let symbolElement = document.querySelector('.symbol');
    let summaryElement = document.querySelector('.summary');
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`
            const api = `${proxy}https://api.darksky.net/forecast/35432017de0ca15a77bf56aa8d537b04/${latitude},${longitude}`;

            fetch(api)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const {temperature,summary,icon} = data.currently;
                    const temperatureInC = Math.round(((temperature - 32) / 1.8) * 100) / 100;
                    temperatureElement.textContent = temperatureInC;
                    timezoneElement.textContent = data.timezone;
                    summaryElement.textContent = summary;
                    setIcons(icon,document.querySelector('.icon'));
                    temperatureElement.addEventListener('click', () => {
                        if(symbolElement.textContent === ' F'){
                            temperatureElement.textContent = temperatureInC;
                            symbolElement.textContent = ' C';
                        }
                        else {
                            temperatureElement.textContent = temperature;
                            symbolElement.textContent = ' F';
                        }
                    })
                });
        });
    }

    function setIcons(icon, iconId){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g,'_').toUpperCase();
        skycons.play();
        return skycons.set(iconId,Skycons[currentIcon]);
    }

    function change () {
        
    }

});