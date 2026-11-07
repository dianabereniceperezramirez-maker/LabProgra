// Catálogo de ciudades con sus coordenadas exactas para Open-Meteo
const cities = {
    monterrey: { name: "Monterrey", region: "Nuevo León, México", lat: 25.6866, lon: -100.3161, elevation: 540 },
    cdmx: { name: "Ciudad de México", region: "CDMX, México", lat: 19.4326, lon: -99.1332, elevation: 2240 },
    madrid: { name: "Madrid", region: "Comunidad de Madrid, España", lat: 40.4168, lon: -3.7038, elevation: 655 },
    tokyo: { name: "Tokio", region: "Región de Kanto, Japón", lat: 35.6762, lon: 139.6503, elevation: 40 },
    london: { name: "Londres", region: "Gran Londres, Reino Unido", lat: 51.5074, lon: -0.1278, elevation: 35 }
};

const citySelect = document.getElementById('citySelect');
const searchBtn = document.getElementById('searchBtn');
const statusMessage = document.getElementById('statusMessage');

const cityNameEl = document.getElementById('cityName');
const regionTextEl = document.getElementById('regionText');
const tempValueEl = document.getElementById('tempValue');
const weatherConditionEl = document.getElementById('weatherCondition');
const humidityValEl = document.getElementById('humidityVal');
const windValEl = document.getElementById('windVal');
const elevationValEl = document.getElementById('elevationVal');
const coordsInfoEl = document.getElementById('coordsInfo');
const daysContainer = document.getElementById('daysContainer');
const packingTipEl = document.getElementById('packingTip');

// Función principal asíncrona usando async/await y fetch()
async function fetchWeatherData(cityKey) {
    const selectedCity = cities[cityKey];
    
    // URL de la API de Open-Meteo incluyendo clima actual y pronóstico diario de 7 días
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.lat}&longitude=${selectedCity.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_mean&timezone=auto`;

    try {
        statusMessage.textContent = `Consultando datos meteorológicos para ${selectedCity.name}...`;
        searchBtn.disabled = true;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error en el servidor HTTP: ${response.status}`);
        }

        const data = await response.json();
        
        statusMessage.textContent = "";
        searchBtn.disabled = false;

        updateUI(selectedCity, data);

    } catch (error) {
        statusMessage.textContent = `Error al conectar con Open-Meteo: ${error.message}`;
        statusMessage.style.color = '#e74c3c';
        searchBtn.disabled = false;
    }
}

// Interpretar códigos de clima de Open-Meteo WMO
function getWeatherDescription(code) {
    const weatherMap = {
        0: { text: "Cielo despejado", icon: "☀️" },
        1: { text: "Mayormente despejado", icon: "🌤️" },
        2: { text: "Parcialmente nublado", icon: "⛅" },
        3: { text: "Nublado", icon: "☁️" },
        45: { text: "Neblina o bruma", icon: "🌫️" },
        51: { text: "Llovizna ligera", icon: "🌦️" },
        61: { text: "Lluvia moderada", icon: "🌧️" },
        63: { text: "Lluvia fuerte", icon: "🌧️" },
        71: { text: "Nevada ligera", icon: "❄️" },
        95: { text: "Tormenta eléctrica", icon: "⚡" }
    };
    return weatherMap[code] || { text: "Condiciones estables", icon: "🌡️" };
}

// Actualizar la interfaz (DOM) dinámicamente con los datos JSON recibidos
function updateUI(city, data) {
    // Clima Actual
    cityNameEl.textContent = city.name;
    regionTextEl.textContent = city.region;
    tempValueEl.textContent = Math.round(data.current.temperature_2m);
    
    const currentInfo = getWeatherDescription(data.current.weather_code);
    weatherConditionEl.innerHTML = `${currentInfo.icon} ${currentInfo.text} <small>Sensación térmica: ${Math.round(data.current.apparent_temperature)}°C</small>`;
    
    humidityValEl.textContent = `${data.current.relative_humidity_2m}%`;
    windValEl.textContent = `${data.current.wind_speed_2m} km/h`;
    elevationValEl.textContent = `${city.elevation} m`;
    coordsInfoEl.textContent = `Lat: ${city.lat} | Lon: ${city.lon}`;

    // Recomendación de equipaje dinámica
    const temp = data.current.temperature_2m;
    if (temp > 30) {
        packingTipEl.textContent = `Temperatura elevada en ${city.name}. Se recomienda usar ropa ligera, protector solar, gafas de sol y mantener una hidratación constante.`;
    } else if (temp < 15) {
        packingTipEl.textContent = `Ambiente fresco o frío en ${city.name}. Es aconsejable llevar chamarra abrigadora, suéter y protección contra el viento.`;
    } else {
        packingTipEl.textContent = `Clima agradable en ${city.name}. Ropa casual y cómoda será suficiente para tus activités al aire libre.`;
    }

    // Pronóstico de 7 días (Construcción dinámica en el DOM)
    daysContainer.innerHTML = '';
    
    const daily = data.daily;
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    for (let i = 0; i < 7; i++) {
        const dateObj = new Date(daily.time[i]);
        const dayName = i === 0 ? 'Hoy' : daysOfWeek[dateObj.getDay()];
        const codeInfo = getWeatherDescription(daily.weather_code[i]);
        
        const dayCard = document.createElement('div');
        dayCard.className = 'day';
        
        dayCard.innerHTML = `
            <h3>${dayName}</h3>
            <time>${daily.time[i]}</time>
            <span class="weather-icon">${codeInfo.icon}</span>
            <div class="range"><strong>${Math.round(daily.temperature_2m_max[i])}°</strong><small>${Math.round(daily.temperature_2m_min[i])}°</small></div>
            <p class="day-condition">${codeInfo.text}</p>
            <span class="rain">💧 ${daily.precipitation_probability_mean?.[i] || 0}%</span>
        `;
        
        daysContainer.appendChild(dayCard);
    }
}

// Event Listeners para la interacción del usuario
searchBtn.addEventListener('click', () => {
    const selectedKey = citySelect.value;
    fetchWeatherData(selectedKey);
});

citySelect.addEventListener('change', () => {
    const selectedKey = citySelect.value;
    fetchWeatherData(selectedKey);
});

// Cargar Monterrey por defecto al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData('monterrey');
});