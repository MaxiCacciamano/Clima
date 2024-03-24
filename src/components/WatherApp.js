import React, { useState, useEffect } from 'react';
import '../assets/css/WatherApp.css'
import { Link } from 'react-router-dom';

const WeatherApp = () => {
  const [countriesWeather, setCountriesWeather] = useState([]);

  useEffect(() => {
    const fetchCountriesWeather = async () => {
      try {
        const apiKey = 'TU_CLAVE_DE_API'; // Reemplaza con tu propia clave de API
        const countries = ['España', 'Italia', 'Francia', 'Alemania', 'Inglaterra', 'Portugal', 'Grecia', 'Netherlands', 'Belgica', 'Switzerland', 'Sweden', 'Norway', 'Austria', 'Irlanda', 'Dinamarca', 'Finlandia', 'Polonia', 'Czech Republic', 'Hungary', 'Romania'];
        const promises = countries.map(country =>
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=6ff95d89212b6b0ab5dbeca1da40228e`)
            .then(response => {
              if (!response.ok) {
                throw new Error(`Network response was not ok for ${country}`);
              }
              return response.json();
            })
            .then(data => ({ country, weather: data }))
            .catch(error => {
              console.error(`Error fetching weather data for ${country}:`, error);
              return { country, weather: null };
            })
        );

        const countriesWeatherData = await Promise.all(promises);
        setCountriesWeather(countriesWeatherData);
      } catch (error) {
        console.error('Error fetching countries weather data:', error);
      }
    };

    fetchCountriesWeather();
  }, []);

  const getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  };

  return (
    <div>
      <div className='list-countries'>
        {countriesWeather.map(({ country, weather }) => (
          <ul key={country} className="list-card mb-3 mx-auto text-light">
            {weather ? (
                <li className="card-body">
                  <h2>{country}</h2>
                <p>Descripción: {weather.weather[0].description}</p>
                <p>Temperatura: {(weather.main.temp - 273.15).toFixed(1)}°C</p>
                <img src={getWeatherIconUrl(weather.weather[0].icon)} alt="Icono del clima" />

              </li>
            ) : (
              <p>No hay datos climáticos disponibles</p>
            )}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default WeatherApp;


// import React, { useState, useEffect } from 'react';
// import '../assets/css/WatherApp.css'
// import { Link } from 'react-router-dom';

// const WeatherApp = () => {
//   const [countriesWeather, setCountriesWeather] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCountriesWeather = async () => {
//       try {
//         const apiKey = 'TU_CLAVE_DE_API'; // Reemplaza con tu propia clave de API
//         const countries = ['Spain', 'Italy', 'France', 'Germany', 'England', 'Portugal', 'Greece', 'Netherlands', 'Belgium', 'Switzerland', 'Sweden', 'Norway', 'Austria', 'Ireland', 'Denmark', 'Finland', 'Poland', 'Czech Republic', 'Hungary', 'Romania'];
//         const promises = countries.map(country =>
//           fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=6ff95d89212b6b0ab5dbeca1da40228e`)
//             .then(response => {
//               if (!response.ok) {
//                 throw new Error(`Network response was not ok for ${country}`);
//               }
//               return response.json();
//             })
//             .then(data => ({ country, weather: data }))
//             .catch(error => {
//               console.error(`Error fetching weather data for ${country}:`, error);
//               return { country, weather: null };
//             })
//         );

//         const countriesWeatherData = await Promise.all(promises);
//         setCountriesWeather(countriesWeatherData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching countries weather data:', error);
//       }
//     };

//     fetchCountriesWeather();
//   }, []);

//   const getWeatherIconUrl = (iconCode) => {
//     return `http://openweathermap.org/img/w/${iconCode}.png`;
//   };

//   const numberOfCountriesToShow = 5; // Número de países a mostrar si no se ha realizado ninguna búsqueda

//   return (
//     <div>
//       <div className='list-countries'>
//         {loading ? (
//           <p>Cargando...</p>
//         ) : (
//           <ul className="list-card mb-3 mx-auto text-light">
//             {countriesWeather.slice(0, numberOfCountriesToShow).map(({ country, weather }) => (
//               <li key={country} className="card-body">
//                 <h2>{country}</h2>
//                 {weather ? (
//                   <>
                          
//                     {/* <p>Descripción: {weather.weather[0].description}</p>
//                     <p>Temperatura: {(weather.main.temp - 273.15).toFixed(1)}°C</p>
//                     <img src={getWeatherIconUrl(weather.weather[0].icon)} alt="Icono del clima" /> */}
//                   </>
//                 ) : (
//                   <p>No hay datos climáticos disponibles</p>
//                 )}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WeatherApp;
