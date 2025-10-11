import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  ReferenceField,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  DateInput,
  SelectInput,
  ReferenceInput,
  required,
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
import ReceiptIcon from '@mui/icons-material/Receipt';

const expenseFilters = [
  <SearchInput source="q" alwaysOn />,
  <SelectInput
    source="category"
    choices={[
      { id: 'food', name: 'Food' },
      { id: 'transport', name: 'Transport' },
      { id: 'utilities', name: 'Utilities' },
      { id: 'entertainment', name: 'Entertainment' },
      { id: 'healthcare', name: 'Healthcare' },
      { id: 'other', name: 'Other' },
    ]}
  />,
  <ReferenceInput source="userId" reference="users">
    <SelectInput optionText="username" />
  </ReferenceInput>,
];

const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

const ExpenseBulkActionButtons = () => (
  <>
    <BulkDeleteButton />
  </>
);

export const ExpenseList = () => (
  <List
    filters={expenseFilters}
    actions={<ListActions />}
    sort={{ field: 'date', order: 'DESC' }}
  >
    <Datagrid
      bulkActionButtons={<ExpenseBulkActionButtons />}
      rowClick="show"
    >
      <TextField source="id" />
      <TextField source="title" />
      <NumberField
        source="cost"
        options={{ style: 'currency', currency: 'USD' }}
      />
      <TextField source="category" />
      <DateField source="date" />
      <ReferenceField source="userId" reference="users" link="show">
        <TextField source="username" />
      </ReferenceField>
      <EditButton />
      <ShowButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const ExpenseEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="title" validate={[required()]} fullWidth />
      <NumberInput source="cost" validate={[required()]} min={0} />
      <DateInput source="date" validate={[required()]} />
      <SelectInput
        source="category"
        choices={[
          { id: 'food', name: 'Food' },
          { id: 'transport', name: 'Transport' },
          { id: 'utilities', name: 'Utilities' },
          { id: 'entertainment', name: 'Entertainment' },
          { id: 'healthcare', name: 'Healthcare' },
          { id: 'other', name: 'Other' },
        ]}
        validate={[required()]}
      />
      <TextInput source="description" multiline rows={3} fullWidth />
      <ReferenceInput source="userId" reference="users">
        <SelectInput optionText="username" validate={[required()]} />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const ExpenseCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" validate={[required()]} fullWidth />
      <NumberInput source="cost" validate={[required()]} min={0} defaultValue={0} />
      <DateInput source="date" validate={[required()]} defaultValue={new Date()} />
      <SelectInput
        source="category"
        choices={[
          { id: 'food', name: 'Food' },
          { id: 'transport', name: 'Transport' },
          { id: 'utilities', name: 'Utilities' },
          { id: 'entertainment', name: 'Entertainment' },
          { id: 'healthcare', name: 'Healthcare' },
          { id: 'other', name: 'Other' },
        ]}
        defaultValue="other"
        validate={[required()]}
      />
      <TextInput source="description" multiline rows={3} fullWidth />
      <ReferenceInput source="userId" reference="users">
        <SelectInput optionText="username" validate={[required()]} />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const ExpenseShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" />
      <NumberField
        source="cost"
        options={{ style: 'currency', currency: 'USD' }}
      />
      <TextField source="category" />
      <DateField source="date" />
      <TextField source="description" />
      <ReferenceField source="userId" reference="users" link="show">
        <TextField source="username" />
      </ReferenceField>
      <DateField source="createdAt" showTime />
      <DateField source="updatedAt" showTime />
    </SimpleShowLayout>
  </Show>
);

export const expenseResource = {
  list: ExpenseList,
  edit: ExpenseEdit,
  create: ExpenseCreate,
  show: ExpenseShow,
  icon: ReceiptIcon,
  recordRepresentation: 'title',
};
