const main= document.querySelector(".main-content");
const body=document.querySelector("body");
const search=document.querySelector("#location");
const btnSubmit=document.querySelector("#submit");
const form=document.querySelector("#form")
const cityValue=document.querySelector(".city>span");
const countryValue=document.querySelector(".country>span");
const conditionValue=document.querySelector(".condition>span");
const icon=document.querySelector("#icon");
const tempValue=document.querySelector(".temp>span");
const humValue=document.querySelector(".hum>span");
const windValue=document.querySelector(".wind>span");
const btnToggle=document.querySelector("#toggle");
const weatherContent=document.querySelector(".weather-content");
const loader=document.querySelector(".loader");
const result=document.querySelector(".result");
let getData=null;
let currentTemp="";
let tempUnit="";

async function getWeather(city){
   try {
      const response= await fetch(`http://api.weatherapi.com/v1/current.json?key=20a1fc707b85408583a133738242204&q=${city}`, {mode :'cors'});
      if(!response.ok){
         throw new Error("Network response has issue:",response.status);
      }
      getData= await response.json();

      showWeather(getData);
      console.log(getData);
      
   } catch (error) {
      console.error("there is a problem with your fetch operation:",error);
      
   }
}
async function getWeatherIcon(getData){
   try{
      const iconText=getData.current.condition.text;
      const response= await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=RNFYTt4qXKZHJvdgmUa1EVXYa7NXcLCs&s=${iconText}&g=g`, {mode: 'cors'});
      if(!response.ok){
         throw new Error("Network response has issue:",response.status);
      }
      const dataImg= await response.json();
      // const titleIcon=dataImg.filter(gif=>gif.data.title.includes(`${iconText}`));
      body.style.backgroundImage=`url(${dataImg.data.images.original.url})`;
      console.log(response, dataImg,body.style.backgroundImage);
      

   } catch (error) {
      console.error("there is a problem with your fetch operation:",error);
      
   }
   
}

btnSubmit.addEventListener("click", async()=>{
   const city=search.value;
   result.style.display="none";
   loader.textContent="Loading...";
   await getWeather(city);
   await getWeatherIcon(getData)
   loader.style.display="none";
   result.style.display="block";

   console.log(loader.textContent);
   
});
form.addEventListener("submit", (e)=>{
   e.preventDefault();
  
})

function showWeather(getData){
   tempUnit='°C';
   currentTemp=getData.current.temp_c;
   cityValue.textContent=getData.location.name;
   countryValue.textContent=getData.location.country;
   conditionValue.textContent=getData.current.condition.text;
   icon.src=`https:${getData.current.condition.icon}`;
   tempValue.textContent= currentTemp+tempUnit;
   humValue.textContent=`${getData.current.humidity}%`;
   windValue.textContent=`${getData.current.wind_kph}kph`;  
}

btnToggle.addEventListener("click",cfSwitch);

function cfSwitch(){
   if(currentTemp===getData.current.temp_c){
      currentTemp=getData.current.temp_f;
      tempUnit='°F';
      tempValue.textContent= currentTemp+tempUnit;
   }
   else{
      currentTemp=getData.current.temp_c;
      tempUnit='°C';
      tempValue.textContent= currentTemp+tempUnit;
   }
}
