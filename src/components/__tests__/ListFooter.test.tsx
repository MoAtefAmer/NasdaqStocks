import React from 'react';
import { render } from '@testing-library/react-native';
import ListFooter from '../ListFooter';

describe('ListFooter Component', () => {
  const mockStocks = [
    { ticker: 'AAPL', name: 'Apple Inc.', primaryExchange: 'NASDAQ' },
  ];

  it('renders loading indicator when fetching next page', () => {
    const { getByTestId } = render(
      <ListFooter
        isFetchingNextPage={true}
        hasNextPage={true}
        stocks={mockStocks}
      />,
    );

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders "No Results Found" when there are no stocks and no next page', () => {
    const { getByText } = render(
      <ListFooter isFetchingNextPage={false} hasNextPage={false} stocks={[]} />,
    );

    expect(getByText('No Results Found')).toBeTruthy();
  });

  it('returns null when there is a next page but not fetching', () => {
    const { toJSON } = render(
      <ListFooter
        isFetchingNextPage={false}
        hasNextPage={true}
        stocks={mockStocks}
      />,
    );

    expect(toJSON()).toBeNull();
  });

  it('matches snapshot', () => {
    const tree = render(
      <ListFooter
        isFetchingNextPage={true}
        hasNextPage={true}
        stocks={mockStocks}
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
