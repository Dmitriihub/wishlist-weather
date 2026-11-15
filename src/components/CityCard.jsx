import { useState } from 'react'
import { weatherText } from '../api'

function CityCard({ city, onDelete, onUpdate, onRefresh }) {
  const [editing, setEditing] = useState(false)
  const [memo, setMemo] = useState(city.memo)
  const [priority, setPriority] = useState(city.priority)

  const save = () => {
    onUpdate(city.id, { memo, priority })
    setEditing(false)
  }

  return (
    <div className="card city">
      <div className="city-head">
        <h3>
          {city.name} <small>{city.country}</small>
        </h3>
        <span className={'badge ' + city.priority}>{city.priority}</span>
      </div>

      {city.weather ? (
        <p className="weather">
          {city.weather.temp}°C · {weatherText(city.weather.code)} · 바람 {city.weather.wind}km/h
        </p>
      ) : (
        <p className="weather">날씨 정보 없음</p>
      )}

      {editing ? (
        <div className="edit">
          <input value={memo} onChange={(e) => setMemo(e.target.value)} />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option>높음</option>
            <option>보통</option>
            <option>낮음</option>
          </select>
          <button onClick={save}>저장</button>
          <button className="gray" onClick={() => setEditing(false)}>취소</button>
        </div>
      ) : (
        <>
          <p className="memo">{city.memo || '(메모 없음)'}</p>
          <div className="btns">
            <button onClick={() => setEditing(true)}>수정</button>
            <button className="gray" onClick={() => onRefresh(city)}>날씨 새로고침</button>
            <button className="red" onClick={() => onDelete(city.id)}>삭제</button>
          </div>
        </>
      )}
    </div>
  )
}

export default CityCard
