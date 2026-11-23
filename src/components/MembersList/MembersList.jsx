import styles from './MembersList.module.css'
import MemberCard from '../MemberCard/MemberCard.jsx'

export default function MembersList({
  members,
  layout,
  selectedMemberId,
  onSelect,
}) {
  return (
    <div className={`${styles.membersList} ${styles[layout]}`}>
      {members.length === 0 ? (
        <p className={styles.empty}>No members to show</p>
      ) : (
        members.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            isSelected={selectedMemberId === member.id}
            onSelect={onSelect}
          />
        ))
      )}
    </div>
  )
}
