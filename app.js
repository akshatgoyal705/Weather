//jshint esversion:6
const express=require("express");
const bodyParser=require("body-parser");
const ejs=require('ejs');

const app=express();
const https=require("https");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs');

app.get("/",function(req,res){
res.render("home");
});


app.post("/",function(req,res){
  var cityName=req.body.city;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&appid=2ba1838afbd7134f208dcddb753cb5f4";
  https.get(url,function(response){
    response.on("data",function(data){
      const weatherData=JSON.parse(data);
      if(weatherData.cod>=400&&weatherData.cod<500){
        res.render("weather",{weatherDescription:"",cityName:"City Not Found",temprature:"",imgURL:""});

      } else{
        var imgURL="http://openweathermap.org/img/wn/"+ weatherData.weather[0].icon+"@2x.png";
        var weatherDescription=weatherData.weather[0].description;
        var temprature=weatherData.main.temp;
        res.render("weather",{weatherDescription:weatherDescription,cityName:cityName,temprature:temprature,imgURL:imgURL});

      }
      });
  });

});
app.listen(process.env.PORT||3000,function(req,res) {
  console.log("Server started at port 3000");
});
