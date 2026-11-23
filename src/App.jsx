import { useState } from 'react'
import { initialMembers, initialTasks } from './data.js'
import styles from './App.module.css'

import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import MemberCard from './components/MemberCard/MemberCard.jsx'
import FilterBar from './components/FilterBar/FilterBar.jsx'
import TasksPanel from './components/TasksPanel/TasksPanel.jsx'
import Notice from './components/Notice/Notice.jsx'

export default function App() {
  const [showOnlyActive, setShowOnlyActive] = useState(false)
  const [layout, setLayout] = useState('list')
  const [selectedMemberId, setSelectedMemberId] = useState(null)
  const [tasks, setTasks] = useState(initialTasks)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMembers = initialMembers.filter((member) => {
    const matchesActive = !showOnlyActive || member.isActive

    const matchesSearch = member.name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase())

    return matchesActive && matchesSearch
  })

  const selectedMember =
    initialMembers.find((member) => member.id === selectedMemberId) || null

  const memberTasks = selectedMember
    ? tasks.filter((task) => task.assignedTo === selectedMember.id)
    : []

  function handleToggleTask(taskId) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task,
      ),
    )
  }

  function handleAddTask(title) {
    const trimmedTitle = title.trim()

    if (!selectedMember || !trimmedTitle) return

    const newTask = {
      id: Math.max(0, ...tasks.map((task) => task.id)) + 1,
      title: trimmedTitle,
      done: false,
      assignedTo: selectedMember.id,
    }

    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.main}>
        <FilterBar
          showOnlyActive={showOnlyActive}
          onToggleActive={() => setShowOnlyActive((prev) => !prev)}
          layout={layout}
          onLayoutChange={setLayout}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <div className={styles.content}>
          <section className={styles.membersSection}>
            <h2 className={styles.sectionTitle}>Team Members</h2>

            {filteredMembers.length === 0 ? (
              <Notice type="info">No members found</Notice>
            ) : (
              <div className={layout === 'grid' ? styles.grid : styles.list}>
                {filteredMembers.map((member) => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    isSelected={selectedMemberId === member.id}
                    onSelect={setSelectedMemberId}
                  />
                ))}
              </div>
            )}
          </section>

          <aside className={styles.sidebar}>
            {selectedMember && !selectedMember.isActive && (
              <Notice type="warning">This member is inactive.</Notice>
            )}

            <TasksPanel
              member={selectedMember}
              tasks={memberTasks}
              onToggleTask={handleToggleTask}
              onAddTask={handleAddTask}
            />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
