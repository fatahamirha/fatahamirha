// script.js

// کلید API خود را اینجا قرار دهید
const apiKey = "79333dc52ac8b0593cab0a3520e4b22e"; // جایگزین YOUR_API_KEY با کلید API خودتان

// ارجاع به عناصر DOM
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherDataDiv = document.getElementById("weatherData");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weatherCondition = document.getElementById("weatherCondition");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");

// تابع برای دریافت داده‌های آب‌وهوا
async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("شهر مورد نظر یافت نشد.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error.message);
  }
}

// تابع برای نمایش داده‌ها
function displayWeather(data) {
  weatherDataDiv.classList.remove("hidden");
  cityName.textContent = data.name;
  temperature.textContent = data.main.temp;
  weatherCondition.textContent = data.weather[0].description;
  humidity.textContent = data.main.humidity;
  windSpeed.textContent = data.wind.speed;
}

// رویداد برای دکمه جستجو
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city !== "") {
    fetchWeather(city).then((data) => {
      if (data) {
        displayWeather(data);
      }
    });
  }
});

// اختیاری: اجازه دادن به کاربر برای فشار دادن کلید Enter
cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});
