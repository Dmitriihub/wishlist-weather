import { useState, useEffect } from 'react'
import { searchCity, fetchWeather } from './api'
import CityForm from './components/CityForm'
import SearchBar from './components/SearchBar'
import CityList from './components/CityList'
import './App.css'

const STORAGE_KEY = 'trip-wishlist'

function App() {
  // 로컬 저장소에서 처음 한 번만 불러오기
  const [cities, setCities] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    } catch {
      return []
    }
  })
  const [keyword, setKeyword] = useState('')
  const [filter, setFilter] = useState('전체')
  const [sortBy, setSortBy] = useState('최신순')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // cities가 바뀔 때마다 저장
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cities))
  }, [cities])

  // 등록 (Create) - 외부 API로 좌표와 날씨를 가져옴
  const addCity = async ({ name, memo, priority }) => {
    setLoading(true)
    setError('')
    try {
      const found = await searchCity(name)
      // 같은 도시 중복 등록 방지
      if (cities.some((c) => c.lat === found.lat && c.lon === found.lon)) {
        throw new Error('이미 등록된 도시입니다.')
      }
      const weather = await fetchWeather(found.lat, found.lon)
      const newCity = { id: Date.now(), ...found, memo, priority, weather }
      setCities((prev) => [newCity, ...prev])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  // 수정 (Update)
  const updateCity = (id, changes) => {
    setCities((prev) => prev.map((c) => (c.id === id ? { ...c, ...changes } : c)))
  }

  // 삭제 (Delete)
  const deleteCity = (id) => {
    if (window.confirm('정말 삭제할까요?')) {
      setCities((prev) => prev.filter((c) => c.id !== id))
    }
  }

  // 날씨 새로고침
  const refreshWeather = async (city) => {
    try {
      const weather = await fetchWeather(city.lat, city.lon)
      updateCity(city.id, { weather })
    } catch (e) {
      setError(e.message)
    }
  }

  // 검색 + 우선순위 필터
  const shown = cities.filter((c) => {
    const text = (c.name + c.country + c.memo).toLowerCase()
    const okKeyword = text.includes(keyword.toLowerCase())
    const okFilter = filter === '전체' || c.priority === filter
    return okKeyword && okFilter
  })

  // 정렬
  const order = { 높음: 0, 보통: 1, 낮음: 2 }
  const sorted = [...shown].sort((a, b) => {
    if (sortBy === '우선순위순') return order[a.priority] - order[b.priority]
    if (sortBy === '이름순') return a.name.localeCompare(b.name)
    return b.id - a.id
  })

  return (
    <div className="app">
      <h1>여행 위시리스트</h1>
      <p className="sub">가고 싶은 도시를 저장하고 현재 날씨를 확인하세요.</p>

      <CityForm onAdd={addCity} loading={loading} />
      {error && <p className="error">{error}</p>}

      <SearchBar keyword={keyword} onChange={setKeyword} filter={filter} onFilter={setFilter} sortBy={sortBy} onSort={setSortBy} />
      <p className="count">총 {cities.length}개 / 표시 {shown.length}개</p>

      <CityList
        cities={sorted}
        onDelete={deleteCity}
        onUpdate={updateCity}
        onRefresh={refreshWeather}
      />
    </div>
  )
}

export default App
