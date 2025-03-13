import styles from '../../styles/AdminDashboard.module.css'
import { PiChartLineDownBold as Down, PiChartLineUpBold as Up } from 'react-icons/pi'

export default function Box({ title, value, valueSymbol, percentage, span }: { title: string, value: number, valueSymbol?: string, percentage?: number, span?: number }) {
    return (
        <div className={styles.box_1} style={{ gridColumn: `span ${span}` }}>
            <h3>{title}</h3>
            <div className={styles.row}>
                <h1>{valueSymbol && valueSymbol} {value}</h1>
                {percentage && <p><b style={percentage > 0 ? {filter:'invert(100%)'} : {}}>{percentage > 0 ? <Up /> : <Down />}{percentage}%</b></p>}
            </div>
        </div>
    )
}