import UserList from './UserList';
import UserCreate from './UserCreate';
import UserEdit from './UserEdit';
import UserShow from './UserShow';
import PeopleIcon from '@material-ui/icons/People';

export default {
  name: 'users',
  list: UserList,
  create: UserCreate,
  edit: UserEdit,
  show: UserShow,
  icon: PeopleIcon
}