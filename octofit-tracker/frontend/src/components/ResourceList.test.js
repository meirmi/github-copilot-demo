import { render, screen, fireEvent } from '@testing-library/react';
import ResourceList from './ResourceList';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'members', label: 'Members' },
];
const items = [
  { _id: '1', name: 'Alpha', members: ['ann', 'bob'] },
  { _id: '2', name: 'Beta', members: [] },
];

test('filters rows with the search form', () => {
  render(<ResourceList title="Teams" items={items} columns={columns} loading={false} error={null} onRefresh={() => {}} />);
  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'alp' } });
  expect(screen.getByText('Alpha')).toBeInTheDocument();
  expect(screen.queryByText('Beta')).not.toBeInTheDocument();
});

test('opens and closes the details modal', () => {
  render(<ResourceList title="Teams" items={items} columns={columns} loading={false} error={null} onRefresh={() => {}} />);
  fireEvent.click(screen.getAllByRole('button', { name: 'View' })[0]);
  expect(screen.getByRole('dialog')).toHaveTextContent('ann, bob');
  fireEvent.click(screen.getByText('Close', { selector: 'button.btn-secondary' }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
