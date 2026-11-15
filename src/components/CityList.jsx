import CityCard from './CityCard'

function CityList({ cities, onDelete, onUpdate, onRefresh }) {
  if (cities.length === 0) {
    return <p className="empty">표시할 도시가 없습니다.</p>
  }
  return (
    <div className="grid">
      {cities.map((c) => (
        <CityCard
          key={c.id}
          city={c}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onRefresh={onRefresh}
        />
      ))}
    </div>
  )
}

export default CityList
