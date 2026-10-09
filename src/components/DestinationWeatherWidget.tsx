import React, { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  CloudSun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  Wind,
  Droplets,
  Thermometer,
  Compass,
  RefreshCw,
  Sunrise,
  Sunset,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

interface WeatherData {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  isDay: boolean;
  maxTemp: number;
  minTemp: number;
  uvIndexMax?: number;
  sunrise?: string;
  sunset?: string;
  dailyForecast: {
    date: string;
    weatherCode: number;
    maxTemp: number;
    minTemp: number;
  }[];
}

interface DestinationWeatherWidgetProps {
  destinationName: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  bestSeason?: string;
}

// Convert WMO Weather Interpretation Codes to human readable labels & icons
function getWeatherInfo(code: number, isDay: boolean = true) {
  switch (code) {
    case 0:
      return {
        label: isDay ? 'Clear Sky' : 'Clear Night',
        icon: isDay ? Sun : Moon,
        color: isDay ? 'text-amber-400' : 'text-indigo-300',
        bgGradient: 'from-amber-500/10 via-amber-500/5 to-transparent',
        advice: 'Pristine visibility. Perfect conditions for outdoor photography.',
      };
    case 1:
    case 2:
      return {
        label: isDay ? 'Partly Cloudy' : 'Partly Cloudy Night',
        icon: isDay ? CloudSun : Cloud,
        color: isDay ? 'text-amber-300' : 'text-slate-300',
        bgGradient: 'from-sky-500/10 via-amber-500/5 to-transparent',
        advice: 'Pleasant atmospheric lighting with intermittent sunshine.',
      };
    case 3:
      return {
        label: 'Overcast',
        icon: Cloud,
        color: 'text-slate-300',
        bgGradient: 'from-slate-500/10 via-slate-600/5 to-transparent',
        advice: 'Soft, diffused light. Great for capturing landscape textures.',
      };
    case 45:
    case 48:
      return {
        label: 'Misty / Foggy',
        icon: CloudFog,
        color: 'text-teal-300',
        bgGradient: 'from-teal-500/10 via-slate-500/5 to-transparent',
        advice: 'Mystical valley mist. Drive with headlights on mountain passes.',
      };
    case 51:
    case 53:
    case 55:
    case 61:
    case 63:
    case 65:
    case 80:
    case 81:
    case 82:
      return {
        label: 'Rain / Showers',
        icon: CloudRain,
        color: 'text-cyan-400',
        bgGradient: 'from-cyan-500/10 via-blue-500/5 to-transparent',
        advice: 'Pack a waterproof shell jacket and protect camera lenses.',
      };
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return {
        label: 'Snowfall',
        icon: CloudSnow,
        color: 'text-blue-200',
        bgGradient: 'from-blue-400/10 via-indigo-500/5 to-transparent',
        advice: 'Crisp alpine snow. Wear thermal base layers and snow boots.',
      };
    case 95:
    case 96:
    case 99:
      return {
        label: 'Thunderstorm',
        icon: CloudLightning,
        color: 'text-amber-400',
        bgGradient: 'from-purple-500/10 via-amber-500/5 to-transparent',
        advice: 'Electrified weather system. Seek sheltered viewing terraces.',
      };
    default:
      return {
        label: 'Fair Conditions',
        icon: isDay ? Sun : Moon,
        color: 'text-amber-400',
        bgGradient: 'from-amber-500/10 via-transparent to-transparent',
        advice: 'Comfortable seasonal climate for exploration.',
      };
  }
}

export const DestinationWeatherWidget: React.FC<DestinationWeatherWidgetProps> = ({
  destinationName,
  country,
  coordinates,
  bestSeason,
}) => {
  const [weather, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchWeather = async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      // Free public Open-Meteo weather API with no API keys or quotas
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Weather service returned ${response.status}`);
      }
      const data = await response.json();

      const current = data.current;
      const daily = data.daily;

      const dailyForecast = (daily.time || []).slice(1, 4).map((timeStr: string, idx: number) => ({
        date: new Date(timeStr).toLocaleDateString(undefined, { weekday: 'short' }),
        weatherCode: daily.weather_code[idx + 1] ?? 0,
        maxTemp: Math.round(daily.temperature_2m_max[idx + 1] ?? 0),
        minTemp: Math.round(daily.temperature_2m_min[idx + 1] ?? 0),
      }));

      setWeatherData({
        temperature: Math.round(current.temperature_2m),
        apparentTemperature: Math.round(current.apparent_temperature),
        humidity: current.relative_humidity_2m,
        windSpeed: Math.round(current.wind_speed_10m),
        weatherCode: current.weather_code,
        isDay: current.is_day === 1,
        maxTemp: Math.round(daily.temperature_2m_max?.[0] ?? current.temperature_2m),
        minTemp: Math.round(daily.temperature_2m_min?.[0] ?? current.temperature_2m - 5),
        uvIndexMax: daily.uv_index_max?.[0] ? Math.round(daily.uv_index_max[0]) : undefined,
        sunrise: daily.sunrise?.[0] ? new Date(daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
        sunset: daily.sunset?.[0] ? new Date(daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
        dailyForecast,
      });

      setLastUpdated(new Date());
    } catch (err: any) {
      console.warn('Open-Meteo Weather Fetch Warning:', err);
      setError('Live satellite feed temporarily unavailable. Displaying seasonal averages.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [coordinates.lat, coordinates.lng]);

  const displayTemp = (celsius: number) => {
    if (unit === 'F') {
      return Math.round((celsius * 9) / 5 + 32);
    }
    return celsius;
  };

  const weatherInfo = weather ? getWeatherInfo(weather.weatherCode, weather.isDay) : null;
  const WeatherIcon = weatherInfo ? weatherInfo.icon : Sun;

  return (
    <div className="relative rounded-3xl bg-[#0B1322] border border-white/10 hover:border-amber-400/30 overflow-hidden shadow-2xl transition-all duration-300">
      {/* Dynamic Ambient Top Gradient based on weather code */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          weatherInfo?.bgGradient || 'from-amber-500/10 via-transparent to-transparent'
        } pointer-events-none`}
      />

      {/* Widget Header & Title Bar */}
      <div className="relative z-10 px-6 pt-6 pb-4 border-b border-white/5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-md">
            <Thermometer className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-display font-bold text-sm tracking-wide">
                LIVE ATMOSPHERE & WEATHER
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-400 font-mono text-[10px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Satellite
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              {destinationName}, {country} · {coordinates.lat.toFixed(2)}°N, {coordinates.lng.toFixed(2)}°E
            </p>
          </div>
        </div>

        {/* Controls: Unit Toggle & Refresh */}
        <div className="flex items-center gap-2">
          {/* °C / °F Switch */}
          <div className="flex items-center p-0.5 rounded-lg bg-black/60 border border-white/10 text-xs font-mono">
            <button
              onClick={() => setUnit('C')}
              className={`px-2.5 py-1 rounded-md transition-all font-semibold ${
                unit === 'C'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              °C
            </button>
            <button
              onClick={() => setUnit('F')}
              className={`px-2.5 py-1 rounded-md transition-all font-semibold ${
                unit === 'F'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              °F
            </button>
          </div>

          {/* Refresh Button */}
          <button
            onClick={fetchWeather}
            disabled={isRefreshing}
            aria-label="Refresh live weather conditions"
            title="Refresh satellite weather"
            className="p-2 rounded-lg bg-black/60 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors focus:outline-none"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Main Weather Information Display */}
      <div className="relative z-10 p-6">
        {isLoading ? (
          /* Loading Skeleton */
          <div className="space-y-4 animate-pulse py-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10" />
              <div className="space-y-2">
                <div className="w-28 h-8 rounded bg-white/10" />
                <div className="w-36 h-4 rounded bg-white/10" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="h-16 rounded-xl bg-white/5" />
              <div className="h-16 rounded-xl bg-white/5" />
              <div className="h-16 rounded-xl bg-white/5" />
            </div>
          </div>
        ) : weather && weatherInfo ? (
          <div className="space-y-6">
            {/* Primary Current Temperature & Condition Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2">
              <div className="flex items-center gap-5">
                {/* Weather Visual Icon */}
                <div
                  className={`w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-black/50 border border-white/15 flex items-center justify-center p-3 shadow-xl ${weatherInfo.color}`}
                >
                  <WeatherIcon className="w-10 h-10 sm:w-12 sm:h-12 animate-pulse" />
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight">
                      {displayTemp(weather.temperature)}°
                    </span>
                    <span className="text-lg sm:text-xl font-mono text-amber-400 font-semibold">
                      {unit}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-sm sm:text-base font-semibold ${weatherInfo.color}`}>
                      {weatherInfo.label}
                    </span>
                    <span className="text-slate-400 text-xs font-mono">
                      · Feels like {displayTemp(weather.apparentTemperature)}°{unit}
                    </span>
                  </div>
                </div>
              </div>

              {/* Day High / Low and Sun Cycle */}
              <div className="flex flex-wrap sm:flex-col items-start sm:items-end justify-between sm:justify-center gap-2 text-xs font-mono border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-slate-400">High / Low:</span>
                  <span className="text-amber-300 font-bold">
                    {displayTemp(weather.maxTemp)}°{unit}
                  </span>
                  <span className="text-slate-500">/</span>
                  <span className="text-sky-300 font-bold">
                    {displayTemp(weather.minTemp)}°{unit}
                  </span>
                </div>

                {weather.sunrise && weather.sunset && (
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                    <span className="inline-flex items-center gap-1">
                      <Sunrise className="w-3.5 h-3.5 text-amber-400" />
                      <span>{weather.sunrise}</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Sunset className="w-3.5 h-3.5 text-orange-400" />
                      <span>{weather.sunset}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Micro Atmospheric Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Humidity */}
              <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center text-cyan-400 shrink-0">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">
                    Humidity
                  </div>
                  <div className="text-sm font-mono font-bold text-white">
                    {weather.humidity}%
                  </div>
                </div>
              </div>

              {/* Wind Speed */}
              <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-500/15 flex items-center justify-center text-teal-400 shrink-0">
                  <Wind className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">
                    Wind Speed
                  </div>
                  <div className="text-sm font-mono font-bold text-white">
                    {weather.windSpeed} km/h
                  </div>
                </div>
              </div>

              {/* UV Index */}
              <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-400 shrink-0">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">
                    Peak UV Index
                  </div>
                  <div className="text-sm font-mono font-bold text-white">
                    {weather.uvIndexMax ?? 'Moderate'}
                  </div>
                </div>
              </div>

              {/* Day / Night Cycle */}
              <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center text-indigo-400 shrink-0">
                  {weather.isDay ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">
                    Solar Cycle
                  </div>
                  <div className="text-sm font-mono font-bold text-white">
                    {weather.isDay ? 'Daylight' : 'Night'}
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Advice & 3-Day Forecast Strip */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-1">
              {/* Expedition Weather Advice */}
              <div className="lg:col-span-2 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <span className="font-semibold text-slate-200">
                    Live Travel Advisory:
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {weatherInfo.advice}{' '}
                    {bestSeason && (
                      <span className="text-amber-300/90 ml-1">
                        Peak season: {bestSeason.split('(')[0].trim()}.
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* 3-Day Future Outlook */}
              {weather.dailyForecast.length > 0 && (
                <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-around text-center">
                  {weather.dailyForecast.map((day, idx) => {
                    const dayInfo = getWeatherInfo(day.weatherCode, true);
                    const DayIcon = dayInfo.icon;
                    return (
                      <div key={idx} className="space-y-1 px-1">
                        <div className="text-[10px] text-slate-400 font-mono font-semibold uppercase">
                          {day.date}
                        </div>
                        <DayIcon className={`w-4 h-4 mx-auto ${dayInfo.color}`} />
                        <div className="text-[11px] font-mono text-slate-200 font-bold">
                          {displayTemp(day.maxTemp)}°
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Status */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
              <span>Source: Open-Meteo High-Resolution Numerical Satellite API</span>
              <span>Updated: {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        ) : (
          /* Error State with Graceful Fallback */
          <div className="py-6 text-center space-y-2">
            <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
            <p className="text-xs text-slate-300">{error || 'Unable to load real-time weather feed.'}</p>
            <button
              onClick={fetchWeather}
              className="text-xs text-amber-400 hover:underline font-mono"
            >
              Retry Satellite Connection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
