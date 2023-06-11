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
        for (let i = 0; i < list.length; i++)
        {

            let mainData = list[i].main;
            let weather = list[i].weather;
            let weatherIcon = icon(weather[0].description);

            let boxBody = '<div class="col-md-3">';
            boxBody += '<div class="row row1">'+mainData.temp+'&deg;</div>';
            boxBody += '<div class="row row2"><img class="img-fluid" src="'+weatherIcon+'" /></div>';
            boxBody += '<div class="row row3">'+list[i].dt_txt+'</div>';
            boxBody += '</div>';
            // APPEND
            $('#boxweather').append(boxBody);
        }
    })
    .catch(error => {
        alert(error);
    })
}

function icon(params = 'clear sky', time = 'd')
{
    // DAY OR NIGHT
    const hr = (new Date()).getHours();
    if(hr > 17)
    {
        time = 'n';
    }
    // ICONS
    const icons = {
        'clear sky': '01',
        'few clouds': '02',
        'scattered clouds': '03',
        'broken clouds': '04',
        'shower rain': '09',
        'rain': '10',
        'thunderstorm': '11',
        'snow': '13',
        'mist': '50'
    };

    return "https://openweathermap.org/img/wn/"+(icons[params] ?? '01')+time+"@2x.png";
}
