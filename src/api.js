// Open-Meteo 무료 API (API 키 필요 없음)
const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast'

// 도시 이름으로 좌표 검색
export async function searchCity(name) {
  const res = await fetch(`${GEO_URL}?name=${encodeURIComponent(name)}&count=1&language=ko`)
  if (!res.ok) throw new Error('도시 검색에 실패했습니다.')
  const data = await res.json()
  if (!data.results || data.results.length === 0) {
    throw new Error('도시를 찾을 수 없습니다. 다른 이름으로 검색해 보세요.')
  }
  const r = data.results[0]
  return { name: r.name, country: r.country || '', lat: r.latitude, lon: r.longitude }
}

// 좌표로 현재 날씨 가져오기
export async function fetchWeather(lat, lon) {
  const res = await fetch(`${WEATHER_URL}?latitude=${lat}&longitude=${lon}&current_weather=true`)
  if (!res.ok) throw new Error('날씨 정보를 가져오지 못했습니다.')
  const data = await res.json()
  return {
    temp: data.current_weather.temperature,
    wind: data.current_weather.windspeed,
    code: data.current_weather.weathercode,
  }
}

// weathercode -> 한글 설명
export function weatherText(code) {
  if (code === 0) return '맑음'
  if (code <= 3) return '구름 조금'
  if (code <= 48) return '안개'
  if (code <= 67) return '비'
  if (code <= 77) return '눈'
  if (code <= 82) return '소나기'
  return '뇌우'
}
