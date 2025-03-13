import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from '../../styles/AdminDashboard.module.css'

export default function BarsGraph({ data, name, span }: { data: object[], name:string, span?:number }) {
    return (
        <div className={styles.graph}  style={{ gridColumn: `span ${span}` }}>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey={'name'} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name={name} fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
