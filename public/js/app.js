let lat = '52.520008';
let lon = '13.404954';
let url = 'api/fetch?lat='+lat+'&lon='+lon;

window.addEventListener('load', fetchAPI(url));

// FOR REFRESH DATA EVERY MIN
/*
let fetchDataEvery = setInterval(function(){
    fetchAPI(url);
}, 60000)
*/

function fetchAPI(url)
{
    fetch(url)
    .then(response => response.json())
    .then(data => {
        $('#boxweather').empty();
        let list = data.list;
        for (let i = 0; i < 5; i++)
        {
            let mainData = list[i].main;
            let weather = list[i].weather;
            let Temp = Math.round(mainData.temp/10);
            let dateTime = new Date(list[i].dt_txt);
            let Hours = getTime(dateTime);
            // if(!isToday(dateTime))
            //     continue;
            let seperator = (i < 4) ? 'seperator' : '';
            // TIME WEATHER
            let boxBody = '';
            boxBody += '<div class="day '+seperator+'">';
            boxBody += '    <div class="row row1"><img class="img-fluid" src="'+icon(weather[0].icon)+'" /></div>';
            boxBody += '    <div class="row row2">'+Hours+'</div>';
            boxBody += '    <div class="row row3">'+Temp+'&deg;</div>';
            boxBody += '</div>';
            // APPEND
            $('#boxweather').append(boxBody);
        }
    })
    .catch(error => {
        alert(error);
    })
}

function icon(icon, size = '2x')
{
    return "https://openweathermap.org/img/wn/"+icon+"@"+size+".png";
}

function isToday(date)
{
    const today = new Date();
    // Today's date
    if (today.toDateString() === date.toDateString())
    {
        return true;
    }
    return false;
}

function getTime(dateTime)
{
    return new Intl.DateTimeFormat('default',
    {
        hour12: true,
        hour: 'numeric',
        minute: 'numeric'
    }).format(dateTime);
}
