import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#4CAF50', '#2196F3']; // Commission = green, Revshare = blue
const PLACEHOLDER_COLOR = ['#ccc']; // Light gray fallback

const formatter = (value) => `$${value.toLocaleString()}`;

export default function RevshareGraph({ commissionTotal, revshareTotal }) {
  const data = [
    { name: 'Commission', value: commissionTotal },
    { name: 'Revshare', value: revshareTotal },
  ];

  const hasData = commissionTotal > 0 || revshareTotal > 0;
  const placeholderData = [{ name: 'No data', value: 1 }];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
      <PieChart width={530} height={300}>
        <Pie
          data={hasData ? data : placeholderData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="55%"
          outerRadius={100}
          label={({ name, value, percent }) =>
            hasData
              ? `${name}: $${value.toLocaleString()}`
              : ''
          }
        >
          {(hasData ? data : placeholderData).map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={hasData ? COLORS[index % COLORS.length] : PLACEHOLDER_COLOR[0]}
            />
          ))}
        </Pie>
        {hasData && <Tooltip formatter={formatter} />}
        <Legend formatter={(value, entry) => entry.payload.name} />
      </PieChart>
    </div>
  );
}

