//Variable definieren und Default Werte setzen
//Mit echten Werten gefüllt werden diese in der Funktion gotWeather
let weathertoday={};  //in dieses Objekt füllen wir die Wettervorschau des jetzigen Tages
let key='876567d83c77464990d92055191101'; // signup https://www.apixu.com/signup.aspx

let input, button;

let rain=[];//Array
let raindrops={
    x:1,
    y:1
}//Objekt
let drops;
let stadt='';
let tageszeit;
let zustand='';

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);


    let url = 'https://api.apixu.com/v1/current.json?key='+key+'&q=Zürich';


    //Orte wechseln
    input = createInput();//https://p5js.org/examples/dom-input-and-button.html
    input.position(615, 65);

    button = createButton('submit');
    button.position(input.x + input.width, 65);
    button.mousePressed(reloadJson);


   loadJSON(url, gotWeather);//nachdem das json File geladen ist, rufen wir die Funktion gotWeather auf
   let ort = input.value();
}

function draw() {
    randomSeed(2);//mit randomSeed stellst du sicher, dass du immer die gleichen Werte in der gleichen Reihenfolge bekommst bei random.
    //sonst springen die Punkte wild herum

    let time = map(tageszeit, 3600000,86400000,0,255);
    background(time*10);

    // drawRain();
    drawHumidity();

    textSize(150);
    fill(0, 0, 0, 50);
    textStyle(BOLD);
    textFont('futura');
    textAlign(CENTER);
    text(zustand, windowWidth/2, windowHeight/2+50);

      

    textSize(150);
    fill(0, 0, 0, 100);
    textStyle(BOLD);
    textFont('futura');
    textAlign(CENTER);
    text(stadt, windowWidth/2, windowHeight/2+250);
   

}


function gotWeather(weather) {
    stadt = weather.location.name; 
    zustand = weather.current.condition.text;
    tageszeit = weather.location.localtime_epoch;

    weathertoday=weather.current;
    //circles ist luftfeuchtigkeit im quadrat
    let circles=weathertoday.humidity*3 ;
    drops=weathertoday.precip_mm*10;
    
    rain=[raindrops.x];
    //hier füllst du dein array rain mit den objekten raindrops, die haben eine startposition

    for(let x = 0 ; x < circles ; x++){ //Humidity = anzahl Punkte
        let abst=random(0,circles);
        abst=map(abst,0,circles,0,height);//verteilen y position
        rain.push({
            x:map(x,0,circles,0,width),//hier verteilst du die startposition x
            y:abst
        });
    }

}

function reloadJson(){

    let ort = input.value();
    let url = 'https://api.apixu.com/v1/current.json?key='+key+'&q='+ort+'&';
    loadJSON(url, gotWeather);
}

//Kreise zeichnen
    function drawHumidity(){


    //hier gehst du nun durch dein rain array
        noStroke();

        // let from = color(0, 0, 110);
        let from = color(0, 140, 255);
        let to = color(255, 142, 30);
        // let to = color(255, 20, 0);
        let maxtemp = weathertoday.temp_c;

        let stufe = map(maxtemp, -10, 25, 0, 1);

        let farbe = lerpColor(from, to, stufe);

        fill(farbe);

        // console.log(maxtemp);


        
        let rainfall = drops;

        for(let r=1;r<rain.length;r++){
            rain[r].y+=rainfall;//hier greifst du auf das objekt zu und veränderst seine y position
            if(rain[r].y>height+8){
                rain[r].y=-8;//wenn der Tropfen unten rausfällt, wieder auf 0 setzen, d.h. -20 wegen radius
            }

        ellipse(rain[r].x, rain[r].y, 16, 16);
        }




    



}