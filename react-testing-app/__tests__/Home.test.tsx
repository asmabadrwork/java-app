import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../src/app/page';

// Mock fetch globally
global.fetch = jest.fn() as jest.Mock;

describe('Home Dashboard Component', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders the dashboard header', () => {
    render(<Home />);
    expect(screen.getByText('React Testing Dashboard')).toBeInTheDocument();
  });

  it('calls the GET /api/users endpoint when button is clicked', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ users: [{ id: 1, name: 'Test' }] }),
      status: 200,
    });

    render(<Home />);
    
    const getButton = screen.getByText('GET /api/users');
    fireEvent.click(getButton);

    expect(global.fetch).toHaveBeenCalledWith('/api/users', {
      method: 'GET',
      headers: undefined,
      body: undefined,
    });

    // Wait for state to update
    await waitFor(() => {
      expect(screen.getByText(/Test/)).toBeInTheDocument();
    });
  });

  it('handles simulated error endpoint', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ error: 'Internal Server Error' }),
      status: 500,
    });

    render(<Home />);
    
    const errorButton = screen.getByText('GET /api/error (Simulate Error)');
    fireEvent.click(errorButton);

    expect(global.fetch).toHaveBeenCalledWith('/api/error', {
      method: 'GET',
      headers: undefined,
      body: undefined,
    });

    await waitFor(() => {
      expect(screen.getByText(/Internal Server Error/)).toBeInTheDocument();
    });
  });
});
