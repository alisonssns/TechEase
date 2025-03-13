import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import styles from '../../styles/AdminDashboard.module.css'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
const renderLabel = ({ name, percent }: { name: string, percent: number }) => `${name} ${(percent * 100).toFixed(1)}%`;

export default function PizzaGraph({ data, span }: { data: object[], span?: number }) {
    return (
        <div className={styles.graph} style={{ gridColumn: `span ${span}` }}>
            <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        innerRadius={10}
                        fill="#8884d8"
                        dataKey="value"
                        label={renderLabel}
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}