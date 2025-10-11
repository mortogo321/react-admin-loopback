import { Admin, Resource } from 'react-admin';
import { dataProvider } from './providers/dataProvider';
import { authProvider } from './providers/authProvider';
import { Dashboard } from './components/Dashboard';
import { userResource } from './pages/users';
import { expenseResource } from './pages/expenses';
import { incomeResource } from './pages/incomes';

const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    dashboard={Dashboard}
    title="React Admin Demo"
  >
    <Resource name="users" {...userResource} />
    <Resource name="expenses" {...expenseResource} />
    <Resource name="incomes" {...incomeResource} />
  </Admin>
);

export default App;
