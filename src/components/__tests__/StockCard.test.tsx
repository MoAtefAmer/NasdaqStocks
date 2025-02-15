import React from 'react';
import { render } from '@testing-library/react-native';
import StockCard from '../StockCard';

describe('StockCard Component', () => {
  const mockProps = {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    primaryExchange: 'NASDAQ',
  };

  it('renders correctly', () => {
    const { getByText } = render(<StockCard {...mockProps} />);

    expect(getByText('AAPL')).toBeTruthy();
    expect(getByText('NASDAQ')).toBeTruthy();
    expect(getByText('Apple Inc.')).toBeTruthy();
  });

  it('truncates long text with ellipsis', () => {
    const longName =
      'This is a very long company name that should be truncated in the StockCard component';
    const { getByText } = render(<StockCard {...mockProps} name={longName} />);

    const textComponent = getByText(longName);
    expect(textComponent.props.numberOfLines).toBe(3);
    expect(textComponent.props.ellipsizeMode).toBe('tail');
  });

  it('memoizes cardStyle to avoid unnecessary re-renders', () => {
    const { rerender, getByTestId } = render(<StockCard {...mockProps} />);
    const firstRenderCard = getByTestId('card-container-outer-layer');

    rerender(<StockCard {...mockProps} />); // Re-render with the same props
    const secondRenderCard = getByTestId('card-container-outer-layer');

    expect(firstRenderCard.props.style).toBe(secondRenderCard.props.style);
  });

  it('matches snapshot', () => {
    const tree = render(<StockCard {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
