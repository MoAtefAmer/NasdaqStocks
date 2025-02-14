import {StyleSheet, Text} from 'react-native';
import {FetchStocksResponse} from '../types/stocks';
import {theme} from '../constants/theme';
import {ActivityIndicator} from 'react-native-paper';
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
    return (
      <ActivityIndicator
        size={'large'}
        animating={true}
        color={theme.colors.logoColor}
      />
    );
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
    fontSize: 14,
  },
});
