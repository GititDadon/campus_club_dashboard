import styles from './FilterBar.module.css'

export default function FilterBar({
  showOnlyActive,
  onToggleActive,
  layout,
  onLayoutChange,
  searchTerm,
  onSearchChange,
}) {
  return (
    <div className={styles.filterBar}>
      <label className={styles.toggle}>
        <input
          type="checkbox"
          checked={showOnlyActive}
          onChange={onToggleActive}
        />
        Show only active members
      </label>

      <input
        className={styles.search}
        type="text"
        placeholder="Search members..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <div className={styles.layoutSwitch}>
        <button
          type="button"
          className={layout === 'list' ? styles.active : ''}
          onClick={() => onLayoutChange('list')}
        >
          List
        </button>

        <button
          type="button"
          className={layout === 'grid' ? styles.active : ''}
          onClick={() => onLayoutChange('grid')}
        >
          Grid
        </button>
      </div>
    </div>
  )
}
