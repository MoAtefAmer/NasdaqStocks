import { View, FlatList, StyleSheet } from 'react-native';
import { useInfiniteStockSearch } from '../hooks/useInfiniteStockSearch';
import ListFooter from '../components/ListFooter';
import Header from '../components/Header';
import StockCard from '../components/StockCard';
import { ActivityIndicator } from 'react-native-paper';
import { theme } from '../constants/theme';

const ExploreScreen = () => {
  const {
    searchQuery,
    setSearchQuery,
    stocks,
    isSearching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteStockSearch();

  return (
    <View style={styles.screenContainer}>
      <Header
        placeholder="Search for stocks"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <View style={styles.container}>
        {isSearching ? (
          <ActivityIndicator
            size={'large'}
            animating={true}
            color={theme.colors.logoColor}
          />
        ) : (
          <FlatList
            data={stocks}
            numColumns={2}
            keyExtractor={item => item.ticker + '' + Math.random()}
            renderItem={({ item }) => (
              <StockCard
                ticker={item?.ticker}
                name={item?.name}
                primaryExchange={item?.primary_exchange}
              />
            )}
            onEndReached={async () => {
              if (hasNextPage && !isFetchingNextPage) {
                await fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              <ListFooter
                isFetchingNextPage={isFetchingNextPage}
                isLoading={isLoading}
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

  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
});
