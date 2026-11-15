function SearchBar({ keyword, onChange, filter, onFilter, sortBy, onSort }) {
  return (
    <div className="card searchbar">
      <input
        value={keyword}
        onChange={(e) => onChange(e.target.value)}
        placeholder="도시 / 메모 검색"
      />
      <select value={filter} onChange={(e) => onFilter(e.target.value)}>
        <option>전체</option>
        <option>높음</option>
        <option>보통</option>
        <option>낮음</option>
      </select>
      <select value={sortBy} onChange={(e) => onSort(e.target.value)}>
        <option>최신순</option>
        <option>우선순위순</option>
        <option>이름순</option>
      </select>
    </div>
  )
}

export default SearchBar
