import { Card, CardContent, CardHeader } from '@mui/material';
import { Title } from 'react-admin';

export const Dashboard = () => (
  <Card>
    <Title title="Dashboard" />
    <CardHeader title="Welcome to React Admin Demo" />
    <CardContent>
      <h2>Modern Stack</h2>
      <ul>
        <li><strong>Frontend:</strong> React 19 + React Admin 5.x + Material UI 6 + Vite</li>
        <li><strong>Backend:</strong> Express + MongoDB + JWT Authentication</li>
        <li><strong>Features:</strong> Full CRUD operations, filtering, sorting, pagination</li>
      </ul>
      <h3>Test Credentials</h3>
      <p><strong>Admin:</strong> username: admin, password: *1234#</p>
      <p><strong>User:</strong> username: john, password: password123</p>
      <h3>Resources</h3>
      <ul>
        <li>Users - Manage system users</li>
        <li>Expenses - Track expenses with categories</li>
        <li>Incomes - Record income sources</li>
      </ul>
    </CardContent>
  </Card>
);
