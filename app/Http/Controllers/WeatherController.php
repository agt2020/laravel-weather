<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Weather;

class WeatherController extends Controller
{
    protected $key;
    protected $apiUrl;

    public function __construct()
    {
        // API KEY Open Weather Map
        $this->key = 'bf65d8b174418831a16055a19f50144f';
        // API URL
        $this->apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    }

    public function fetchWeatherFromOpenWeather(Request $request)
    {
        // DEFINE LAT AND LONG
        $lat = $request->input('lat');
        $lon = $request->input('lon');
        // CHECK
        if(is_null($lat) || is_null($lon))
        {
            return $this->fail('Lat and Lon are Required !', 400);
        }
        // FETCH DATA
        $response = file_get_contents("{$this->apiUrl}?lat={$lat}&lon={$lon}&appid={$this->key}");

        return json_decode($response, true);
    }

    protected function fail($message, $status = 400): array
    {
        return [
            'cod' => $status,
            'message' => $message,
            'list' => []
        ];
    }
}
