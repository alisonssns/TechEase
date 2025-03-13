import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from '../../styles/AdminDashboard.module.css'

export default function LineGraph({ data, name, span }: { data: object[], name: string, span?: number }) {
  return (
    <div className={styles.graph} style={{ gridColumn: `span ${span}` }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" name={name} stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
