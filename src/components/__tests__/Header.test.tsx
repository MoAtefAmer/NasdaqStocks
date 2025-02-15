import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Header from '../Header';

// Mock `useSafeAreaInsets` globally
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 10, left: 0, right: 0, bottom: 10 }),
}));

describe('Header Component', () => {
  const mockProps = {
    placeholder: 'Search stocks...',
    searchQuery: 'AAPL',
    setSearchQuery: jest.fn(),
  };

  it('renders correctly with logo and search bar', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Header {...mockProps} />,
    );

    expect(getByPlaceholderText('Search stocks...')).toBeTruthy();
    expect(getByTestId('header-logo')).toBeTruthy();
  });

  it('calls setSearchQuery when text is entered', () => {
    const { getByPlaceholderText } = render(<Header {...mockProps} />);
    const searchInput = getByPlaceholderText('Search stocks...');

    fireEvent.changeText(searchInput, 'MSFT');
    expect(mockProps.setSearchQuery).toHaveBeenCalledWith('MSFT');
  });
});
