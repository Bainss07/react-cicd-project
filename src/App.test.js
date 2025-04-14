import { render, screen } from '@testing-library/react';
import App from './App';

test('renders group number and team members', () => {
  render(<App />);
  const groupElement = screen.getByText(/Group Number: 15/i);
  expect(groupElement).toBeInTheDocument();
  const member1 = screen.getByText(/Tegvir Singh Bains/i);
  expect(member1).toBeInTheDocument();
  const member2 = screen.getByText(/Yuvraj Sidhu/i);
  expect(member2).toBeInTheDocument();
  const member3 = screen.getByText(/Parvesh Mann/i);
  expect(member3).toBeInTheDocument();
  const member4 = screen.getByText(/Tim Karachentsev/i);
  expect(member4).toBeInTheDocument();
});