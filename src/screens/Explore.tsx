import { View, FlatList, StyleSheet } from 'react-native';
import { useInfiniteStockSearch } from '../hooks/useInfiniteStockSearch';
import ListFooter from '../components/ListFooter';
import Header from '../components/Header';
import StockCard from '../components/StockCard';
import { ActivityIndicator } from 'react-native-paper';
import { theme } from '../constants/theme';
import { useCallback } from 'react';
import { Stock } from '../types/stocks';

const ExploreScreen = () => {
  const {
    searchQuery,
    setSearchQuery,
    stocks,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteStockSearch();

  const renderItem = useCallback(
    ({ item }: { item: Stock }) => (
      <StockCard
        ticker={item?.ticker}
        name={item?.name}
        primaryExchange={item?.primary_exchange}
      />
    ),
    [],
  );
  const onEndReached = useCallback(async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const keyExtractor = useCallback(
    (item: Stock) => item.ticker + '' + Math.random(),
    [],
  );

  return (
    <View style={styles.screenContainer}>
      <Header
        placeholder="Search for stocks"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator
              size={'large'}
              animating={true}
              color={theme.colors.logoColor}
            />
          </View>
        ) : (
          <FlatList
            data={stocks}
            numColumns={2}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.2}
            ListFooterComponent={
              <ListFooter
                isFetchingNextPage={isFetchingNextPage}
                stocks={stocks}
                hasNextPage={hasNextPage}
              />
            }
          />
        )}
      </View>
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  screenContainer: { backgroundColor: 'white', flex: 1 },
  container: {
    flex: 1,
  },
  activityIndicatorContainer: {
    marginTop: 20,
  },

  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
});
