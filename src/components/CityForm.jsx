import { useState } from 'react'

function CityForm({ onAdd, loading }) {
  const [name, setName] = useState('')
  const [memo, setMemo] = useState('')
  const [priority, setPriority] = useState('보통')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onAdd({ name: name.trim(), memo, priority })
    setName('')
    setMemo('')
    setPriority('보통')
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>가고 싶은 도시 추가</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="도시 이름 (예: Sydney, 도쿄)"
      />
      <input
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="메모 (가고 싶은 이유)"
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>높음</option>
        <option>보통</option>
        <option>낮음</option>
      </select>
      <button disabled={loading}>{loading ? '검색 중...' : '추가'}</button>
    </form>
  )
}

export default CityForm
