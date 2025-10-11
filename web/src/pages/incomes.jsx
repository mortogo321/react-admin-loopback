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
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const incomeFilters = [
  <SearchInput source="q" alwaysOn />,
  <SelectInput
    source="source"
    choices={[
      { id: 'salary', name: 'Salary' },
      { id: 'freelance', name: 'Freelance' },
      { id: 'investment', name: 'Investment' },
      { id: 'business', name: 'Business' },
      { id: 'gift', name: 'Gift' },
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

const IncomeBulkActionButtons = () => (
  <>
    <BulkDeleteButton />
  </>
);

export const IncomeList = () => (
  <List
    filters={incomeFilters}
    actions={<ListActions />}
    sort={{ field: 'date', order: 'DESC' }}
  >
    <Datagrid
      bulkActionButtons={<IncomeBulkActionButtons />}
      rowClick="show"
    >
      <TextField source="id" />
      <TextField source="title" />
      <NumberField
        source="amount"
        options={{ style: 'currency', currency: 'USD' }}
      />
      <TextField source="source" />
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

export const IncomeEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="title" validate={[required()]} fullWidth />
      <NumberInput source="amount" validate={[required()]} min={0} />
      <DateInput source="date" validate={[required()]} />
      <SelectInput
        source="source"
        choices={[
          { id: 'salary', name: 'Salary' },
          { id: 'freelance', name: 'Freelance' },
          { id: 'investment', name: 'Investment' },
          { id: 'business', name: 'Business' },
          { id: 'gift', name: 'Gift' },
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

export const IncomeCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" validate={[required()]} fullWidth />
      <NumberInput source="amount" validate={[required()]} min={0} defaultValue={0} />
      <DateInput source="date" validate={[required()]} defaultValue={new Date()} />
      <SelectInput
        source="source"
        choices={[
          { id: 'salary', name: 'Salary' },
          { id: 'freelance', name: 'Freelance' },
          { id: 'investment', name: 'Investment' },
          { id: 'business', name: 'Business' },
          { id: 'gift', name: 'Gift' },
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

export const IncomeShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" />
      <NumberField
        source="amount"
        options={{ style: 'currency', currency: 'USD' }}
      />
      <TextField source="source" />
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

export const incomeResource = {
  list: IncomeList,
  edit: IncomeEdit,
  create: IncomeCreate,
  show: IncomeShow,
  icon: AttachMoneyIcon,
  recordRepresentation: 'title',
};
