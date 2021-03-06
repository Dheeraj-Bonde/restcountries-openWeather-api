document.body.setAttribute("style","background-color: #ffebcc;");
var p = myElement("p");
p.setAttribute("style","text-align:center; font-weight:800; font-size: 60px; color:#b35900; background-color:#ffb3ec;");
p.innerText = "All Country Information";
document.body.append(p);

//Fetching rest countries data
var restCountriesData = fetch("https://restcountries.eu/rest/v2/all");

restCountriesData
.then(function(response){
    return response.json();
})
.then(function(response){
    card(response);
})
.catch(function(err){
    console.log(err);
})

//Weather function trigerred on clicking the "Click for weather button"
function currentWeather(value){
    let latlonname = value.split(" ");
    let lat = latlonname[0];
    let lon = latlonname[1];
    let name = latlonname[2]
    let api = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=d0b28c71df2a81bb828885755e06db9a";
    let openWeather = fetch(api);
    
    //Fetching data from open weather through api by latlng method
    openWeather
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        let temperature = response.main.temp;
        let weatherInfo = "The Current Temperature of"+" "+name+" "+ "is"+" "+Math.round((temperature-273)*100)/100+" "+"degree celcius";
        alert(weatherInfo);
    })
    .catch(function(err){
        console.log(err);
    })
}

//Creating the container to fill cards
var divmain = myElement("div","container");
var row = myElement("div","row mt-4");
row.setAttribute("style","border: 1px solid black;");
var j = 0;

//Function for creating the card with information and append it to the container
function card(data){
    for(let i=0 ; i<data.length ; i++){
        var image = data[i].flag;
        if(j===3){
            row = myElement("div","row mt-4");
            row.setAttribute("style","border: 1px solid black");
            j = 0;
        }
          
        var col = myElement("div","col-lg-4 col-sm-12");
        var divcard = myElement("div","card text-center");
        
        //Image
        var img = myElement("img","card-img-top p-2");
        img.setAttribute("src",image);
        
        //Heading with country name
        var head = myElement("div","card-header bg-dark text-white");
        head.setAttribute("style","font-weight:600; font-size:20px;")
        head.innerText = data[i].name;
        
        //List with capital,region, latlng, countrycode, population
        var ul = myElement("ul","list-group list-group-flush");
        var li1 = myElement("li","list-group-item font-weight-bold");
        li1.innerText = "Capital:"+" "+data[i].capital;
        var li2 = myElement("li","list-group-item font-weight-bold");
        li2.innerText = "Region:"+" "+data[i].region;
        var li3 = myElement("li","list-group-item font-weight-bold");
        li3.innerText = "Lat Long:"+" "+data[i].latlng[0]+" "+data[i].latlng[1];
        var li4 = myElement("li","list-group-item font-weight-bold");
        li4.innerText = "Country Codes:"+" "+data[i].alpha3Code;
        var li5 = myElement("li","list-group-item font-weight-bold");
        li5.innerText = "Population:"+" "+data[i].population;
        
        //Button for getting weather condition
        let lat = data[i].latlng[0];
        let lon = data[i].latlng[1];
        let name = data[i].name;
        var button = myElement("button","btn btn-primary");
        button.innerText = "Click for Weather";
        button.setAttribute("onclick","currentWeather(value)");
        button.setAttribute("value","");
        button.value = lat+" "+lon+" "+name;
        
        //appending all
        ul.append(li1,li2,li3,li4,li5);
        divcard.append(head,img,ul,button);
        col.append(divcard);
        row.append(col);
        divmain.append(row);
        document.body.append(divmain);
        j++; 
    }
}
    

//common function for creating element
function myElement(tag,className,idName,add){
    let element = document.createElement(tag);
    element.setAttribute("class",className);
    element.setAttribute("id",idName);
    element.setAttribute("style",add);
    return element;
}