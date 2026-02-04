import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Ene', ventas: 4000, ingresos: 2400 },
  { name: 'Feb', ventas: 3000, ingresos: 1398 },
  { name: 'Mar', ventas: 2000, ingresos: 9800 },
  { name: 'Abr', ventas: 2780, ingresos: 3908 },
  { name: 'May', ventas: 1890, ingresos: 4800 },
];

function Chart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="ventas" stroke="#8884d8" />
        <Line type="monotone" dataKey="ingresos" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}