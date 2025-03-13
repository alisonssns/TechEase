import styles from '../../styles/AdminDashboard.module.css'
import { MdDashboard as Dashboard } from "react-icons/md"
import Box from './Box'
import LineGraph from './LineGraph'
import PizzaGraph from './PizzaGraph';
import BarsGraph from './BarsGraph';

const response = [
    { name: 'Jan', value: 4000 },
    { name: 'Fev', value: 3000 },
    { name: 'Mar', value: 5000 },
];

const response2 = [
    { name: 'Jan', value: 4000 },
    { name: 'Fev', value: 3000 },
    { name: 'Mar', value: 5000 },
];

const response3 = [
    { name: 'Jan', value: 4000 },
    { name: 'Fev', value: 3000 },
    { name: 'Mar', value: 5000 },
];

export default function DashBoard() {
    return (
        <>
            <section className={styles.page}>
                <div className={styles.scrollHolder}>
                    <div className={styles.title}><h2>Dashboard</h2> <Dashboard /></div>
                    <div className={styles.boxesHolder}>
                        <Box title='# Vendas' value={387} percentage={-48.54} />
                        <Box title='$ Faturamento' value={6506.35} valueSymbol='R$' percentage={10.39} />
                        <Box title='# Receita Liquida' value={51221.22} valueSymbol='R$' />
                    </div>
                    <div className={styles.boxesHolder}>
                        <LineGraph name='Vendas do mês' data={response} span={3} />
                        <div className={styles.box_1}>
                            <h3>Produtos mais vendidos</h3>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </div>
                        <PizzaGraph data={response2} span={2} />
                        <BarsGraph name='Produtos vendidos' data={response3} span={2} />
                    </div>
                </div>
            </section>
        </>
    )
}