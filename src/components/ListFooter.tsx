import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import {FetchStocksResponse} from '../types/stocks';

interface ListFooterProps {
  isFetchingNextPage: boolean;
  isLoading: boolean;
  hasNextPage?: boolean;
  stocks: FetchStocksResponse['stocks'];
}

const ListFooter = ({
  isFetchingNextPage,
  isLoading,
  hasNextPage,
  stocks,
}: ListFooterProps) => {
  if (isFetchingNextPage || isLoading) {
    return <ActivityIndicator size="large" />;
  }
  if (!hasNextPage && stocks?.length === 0) {
    return <Text style={styles.endText}>No More Results</Text>;
  }
  return null;
};

export default ListFooter;

const styles = StyleSheet.create({
  endText: {
    textAlign: 'center',
    padding: 10,
    color: 'gray',
  },
});
