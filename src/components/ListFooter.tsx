import { StyleSheet, Text, View } from 'react-native';
import { Stock } from '../types/stocks';
import { theme } from '../constants/theme';
import { ActivityIndicator } from 'react-native-paper';
interface ListFooterProps {
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
  stocks: Stock[];
}

const ListFooter = ({
  isFetchingNextPage,
  hasNextPage,
  stocks,
}: ListFooterProps) => {
  if (isFetchingNextPage) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          size={'large'}
          animating={true}
          color={theme.colors.logoColor}
        />
      </View>
    );
  }
  if (!hasNextPage && stocks?.length === 0) {
    return <Text style={styles.endText}>No Results Found</Text>;
  }
  return null;
};

export default ListFooter;

const styles = StyleSheet.create({
  loaderContainer: {
    marginBottom: 25,
  },
  endText: {
    textAlign: 'center',
    padding: 10,
    color: 'gray',
    fontSize: 14,
  },
});
