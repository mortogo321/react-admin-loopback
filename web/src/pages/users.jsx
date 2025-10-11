import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
  email,
  Show,
  SimpleShowLayout,
  EditButton,
  ShowButton,
  DeleteButton,
  BulkDeleteButton,
  SearchInput,
  TopToolbar,
  CreateButton,
  ExportButton,
  FilterButton,
} from 'react-admin';
import PeopleIcon from '@mui/icons-material/People';

const userFilters = [
  <SearchInput source="q" alwaysOn />,
  <SelectInput
    source="role"
    choices={[
      { id: 'admin', name: 'Admin' },
      { id: 'user', name: 'User' },
    ]}
  />,
];

const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

const UserBulkActionButtons = () => (
  <>
    <BulkDeleteButton />
  </>
);

export const UserList = () => (
  <List
    filters={userFilters}
    actions={<ListActions />}
    sort={{ field: 'createdAt', order: 'DESC' }}
  >
    <Datagrid
      bulkActionButtons={<UserBulkActionButtons />}
      rowClick="show"
    >
      <TextField source="id" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="role" />
      <DateField source="createdAt" showTime />
      <EditButton />
      <ShowButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="username" validate={[required()]} />
      <TextInput source="email" type="email" validate={[required(), email()]} />
      <TextInput source="password" type="password" helperText="Leave empty to keep current password" />
      <SelectInput
        source="role"
        choices={[
          { id: 'admin', name: 'Admin' },
          { id: 'user', name: 'User' },
        ]}
        validate={[required()]}
      />
    </SimpleForm>
  </Edit>
);

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="username" validate={[required()]} />
      <TextInput source="email" type="email" validate={[required(), email()]} />
      <TextInput source="password" type="password" validate={[required()]} />
      <SelectInput
        source="role"
        choices={[
          { id: 'admin', name: 'Admin' },
          { id: 'user', name: 'User' },
        ]}
        defaultValue="user"
        validate={[required()]}
      />
    </SimpleForm>
  </Create>
);

export const UserShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="role" />
      <DateField source="createdAt" showTime />
      <DateField source="updatedAt" showTime />
    </SimpleShowLayout>
  </Show>
);

export const userResource = {
  list: UserList,
  edit: UserEdit,
  create: UserCreate,
  show: UserShow,
  icon: PeopleIcon,
  recordRepresentation: 'username',
};
