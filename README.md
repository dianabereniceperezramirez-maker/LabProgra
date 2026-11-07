[README.md](https://github.com/user-attachments/files/34509300/README.md)
*ClimaApp - Miniaplicación Web consumiendo una API REST*

Proyecto desarrollado para la Actividad 4: Miniaplicación Web consumiendo una API REST de la materia Laboratorio de Programación Web.

Esta aplicación web permite consultar en tiempo real las condiciones meteorológicas actuales y el pronóstico extendido de distintas ciudades del mundo, consumiendo datos directamente de la API pública de Open-Meteo.

*Requisitos y Objetivos Cumplidos*

- Consumo de API REST: Uso de fetch() y la sintaxis moderna async/await para obtener datos dinámicos en formato JSON.

- Manipulación del DOM: Procesamiento y renderizado dinámico del clima actual y las tarjetas de pronóstico extendido de 7 días.

- Interacción del usuario: Selección interactiva de ciudades a través de controles desplegables en la interfaz.

- Manejo de estados: Gestión transparente de estados de carga (loading), tarjetas dinámicas y captura de errores de conexión o HTTP con mensajes comprensibles para el usuario.

- Interfaz moderna: Estilizado mediante CSS3 utilizando variables globales, tipografía personalizada (DM Sans y Manrope) y un panel decorativo de paisaje.

*API Utilizada*

- Nombre: Open-Meteo REST API

- Documentación: https://open-meteo.com

- Endpoint Principal:

https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_mean&timezone=auto


*Tecnologías y Herramientas*

- HTML5: Estructura semántica de la aplicación.

- CSS3: Estilos responsivos, flexbox, grid y variables de diseño.

- JavaScript ES6+: Peticiones asíncronas con fetch(), manipulación dinámica del DOM y lógica de filtrado.

- Git & GitHub: Control de versiones con commits descriptivos y despliegue público en GitHub Pages.

*Instrucciones de Uso Local*

- Clona este repositorio o descarga el código fuente:

- git clone https://github.com/TU-USUARIO/miniaplicacion-clima-api.git

- Abre la carpeta del proyecto en tu editor de código (por ejemplo, Visual Studio Code).

- Inicia un servidor local (por ejemplo, utilizando la extensión Live Server de VS Code) para abrir el archivo index.html en tu navegador.

- Selecciona cualquier ciudad del desplegable para actualizar automáticamente la información del clima en tiempo real.

*Reflexión Técnica Breve*

El desarrollo de esta miniaplicación permitió poner en práctica el flujo completo de consumo de servicios web modernos en el cliente. El uso de async/await facilita la lectura del código asíncrono y asegura una gestión adecuada de errores antes de intentar renderizar los datos. Asimismo, separar la lógica de consumo de la lógica de presentación en el DOM ayuda a mantener un código modular, mantenible y escalable.
