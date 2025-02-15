import { renderHook, act } from '@testing-library/react-native';
import { useInfiniteStockSearch } from '../useInfiniteStockSearch';
import { useInfiniteStocks } from '../../api/useInfiniteStocks';
import useDebounce from '../../hooks/useDebounce';
import { Stock } from '../../types/index';

// Mock dependencies
jest.mock('../../api/useInfiniteStocks');
jest.mock('../../hooks/useDebounce');

describe('useInfiniteStockSearch Hook', () => {
  const mockFetchNextPage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    (useDebounce as jest.Mock).mockReturnValue({ debouncedValue: '' });
    (useInfiniteStocks as jest.Mock).mockReturnValue({
      data: { pages: [] },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
    });

    const { result } = renderHook(() => useInfiniteStockSearch());

    expect(result.current.searchQuery).toBe('');
    expect(result.current.stocks).toEqual([]);
    expect(result.current.hasNextPage).toBe(false);
    expect(result.current.isFetchingNextPage).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  it('should update searchQuery state', () => {
    (useDebounce as jest.Mock).mockReturnValue({ debouncedValue: '' });
    (useInfiniteStocks as jest.Mock).mockReturnValue({
      data: { pages: [] },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
    });

    const { result } = renderHook(() => useInfiniteStockSearch());

    act(() => {
      result.current.setSearchQuery('Apple');
    });

    expect(result.current.searchQuery).toBe('Apple');
  });

  it('should call useInfiniteStocks with debounced search query', () => {
    (useDebounce as jest.Mock).mockReturnValue({ debouncedValue: 'Apple' });
    (useInfiniteStocks as jest.Mock).mockReturnValue({
      data: { pages: [] },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
    });

    renderHook(() => useInfiniteStockSearch());

    expect(useInfiniteStocks).toHaveBeenCalledWith('Apple');
  });

  it('should flatten stock pages into stocks array', () => {
    const mockStocks: Stock[] = [
      { id: 1, name: 'Stock A' },
      { id: 2, name: 'Stock B' },
    ];

    (useDebounce as jest.Mock).mockReturnValue({ debouncedValue: '' });
    (useInfiniteStocks as jest.Mock).mockReturnValue({
      data: {
        pages: [
          { stocks: mockStocks },
          { stocks: [{ id: 3, name: 'Stock C' }] },
        ],
      },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
      isLoading: false,
    });

    const { result } = renderHook(() => useInfiniteStockSearch());

    expect(result.current.stocks).toEqual([
      { id: 1, name: 'Stock A' },
      { id: 2, name: 'Stock B' },
      { id: 3, name: 'Stock C' },
    ]);
  });

  it('should call fetchNextPage when triggered', async () => {
    (useDebounce as jest.Mock).mockReturnValue({ debouncedValue: '' });
    (useInfiniteStocks as jest.Mock).mockReturnValue({
      data: { pages: [] },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
      isLoading: false,
    });

    const { result } = renderHook(() => useInfiniteStockSearch());

    await act(async () => {
      await result.current.fetchNextPage();
    });

    expect(mockFetchNextPage).toHaveBeenCalled();
  });
});
