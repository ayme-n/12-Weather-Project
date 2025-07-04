accessKey = "jRZRmKVonWgup9KNU6XWthFw9LF-5aY8jhIIRd0iot4"





async function GetWeather(location){

    try{
        const respone = await (fetch( `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=Q2KBDVNRBAM7UKPH53YC3EXCA&contentType=json `
        , {mode: 'cors'}))

        const data = await(respone.json())

 
        return data
    }
    catch(error){
        
       errorLocation.textContent = "Location doesn't exist";
     

    }
    

}

async function changebackground(location){

    

    const container = document.querySelector(".container")
    const overlay = document.querySelector(".overlay")
        const overlay_body = document.querySelector(".overlay_body")

    const body = document.querySelector("body")


overlay.style.display = "none"
overlay_body.style.display = "none"

    const url = `https://api.unsplash.com/search/photos?query=${location}&orientation=portrait&client_id=${accessKey}`;

    const respone = await (fetch(url))

    const data = await  (respone.json())

    const random_image = data.results[Math.floor(Math.random()*data.results.length)
                                        ].urls.full

    container.style["backgroundImage"] = `url('${random_image}')`;

    body.style["backgroundImage"] = `url('${random_image}')`;

            
    setTimeout(()=>{
            overlay.style.display = "block"
            overlay_body.style.display = "block"

    },3000)


}

function Display(data){



        myform.style.display="none"

        const adress  = document.getElementById("adress")
        const temp  = document.getElementById("temp")
        const humidity  = document.getElementById("humidity")
        const windspeed  = document.getElementById("windspeed")



    console.log(data)

        adress.textContent =  data.address
        temp.textContent = "temp  "  + data.currentConditions.temp + "F"
        humidity.textContent =  "humidity  " + data.currentConditions.humidity
        windspeed.textContent = "windspeed  "  + data.currentConditions.windspeed
  



}

const myform = document.getElementById('myform')

const errorLocation = document.getElementById('error')


myform.addEventListener("submit", async (event)=>{

   event.preventDefault();

   const formData = new FormData(myform)

   const location = formData.get("location")

   if(location){

        const Data = await GetWeather(location)

        myform.reset()

        if(Data){
            error.textContent=""


            changebackground(location)


            Display(Data)
        
        
        } //can receive respone (Data) empty + error cleared

        

        
   }
   else{
        
        error.textContent="It's empty"
        
   }

 
})


