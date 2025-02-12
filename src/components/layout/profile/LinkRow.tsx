import { Link } from 'react-router-dom'
import { FaArrowsRotate as Icon, FaArrowRight as Arrow } from 'react-icons/fa6'
import styles from '../../styles/Profile.module.css'

function LinkRow({ name, content, dest }: { name: string, content?: string, dest: string }) {
    return (
        <Link to={`/change?${dest}`} className={styles.linkRow}>
            <h3>{name}</h3>
            {content ? (
                <>
                    <p>{content}</p>
                    <Icon className={styles.rotate}/>
                </>
            ) : (
                <Arrow className={styles.arrow}/>
            )}

        </Link>
    )
}

export default LinkRow