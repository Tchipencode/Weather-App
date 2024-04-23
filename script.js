const search=document.querySelector("#search-city");
const btn=document.querySelector("#submit");
const form=document.querySelector("#form")
const cityValue=document.querySelector(".city+span");
const countryValue=document.querySelector(".country+span");
const conditionValue=document.querySelector(".condition+span");
const tempValue=document.querySelector(".temp+span");
const humValue=document.querySelector(".hum+span");
const windValue=document.querySelector(".wind+span");
const btnToggle=document.querySelector("#toggle");

class Weather {
   constructor(cityName, country, condition, tempC, tempF, hum, wind) {
      this.cityName=cityName,
      this.country=country,
      this.condition=condition,
      this.tempC=tempC,
      this.tempF=tempF,
      this.hum=hum,
      this.wind=wind;
         
   }
}

async function getWeather(city){
   try {
      const response= await fetch(`http://api.weatherapi.com/v1/current.json?key=20a1fc707b85408583a133738242204&q=${city}`, {mode :'cors'});
      if(!response.ok){
         throw new Error("Network response has issue");
      }
      const getData= await response.json();
      // const cityName= getData.location.name;
      // const country= getData.location.country;
      // const condition=getData.current.condition.text;
      // const tempC=getData.current.temp_c;
      // const tempF=getData.current.temp_f;
      // const hum=getData.current.humidity;
      // const wind=getData.current.wind_kph;
      
      // weatherObject(cityName, country, condition, tempC,tempF, hum, wind);
      showWeather(getData);
      console.log(getData);
      
   } catch (error) {
      if(error==200){
         console.error("there is a problem with your fetch operation:",error);
      }
      
   }
}
// getWeather();
// btn.addEventListener("click", ()=>{
   
// });
form.addEventListener("submit", (e)=>{
   const city=search.value;
   getWeather(city);
   
   console.log(city);
   e.preventDefault();
})
// function weatherObject(cityName, country, condition, tempC, tempF, hum, wind){
//    const weather=new Weather(cityName, country, condition, tempC, tempF, hum, wind);
//    console.log(weather);
// }
let isCelsius=true;
let currentTemp=null;
let tempUnit=null;
function showWeather(getData){
   tempUnit='°C';
   currentTemp=getData.current.temp_c;
   cityValue.textContent=getData.location.name;
   countryValue.textContent=getData.location.country;
   conditionValue.textContent=getData.current.condition.text;
   tempValue.textContent= currentTemp+tempUnit;
   humValue.textContent=`${getData.current.humidity}%`;
   windValue.textContent=`${getData.current.wind_kph}kph`;
   btnToggle.addEventListener("click",()=>{
      cfSwitch(getData);
   });
   
}
function cfSwitch(currentTemp, getData){
   if(currentTemp===getData.current.temp_c){
      currentTemp=getData.current.temp_c;
      tempUnit='°F';
   }else{
      currentTemp=getData.current.temp_c;
      tempUnit='°C';
   }

}
