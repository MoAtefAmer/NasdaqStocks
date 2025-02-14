import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useInfiniteStockSearch} from '../hooks/useInfiniteStockSearch';
import ListFooter from '../components/ListFooter';
import Header from '../components/Header';

const ExploreScreen = () => {
  const {
    query,
    setQuery,
    stocks,
    isSearching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteStockSearch(1500);

  return (
    <>
      <Header
        placeholder="Search for stocks"
        searchQuery={query}
        setSearchQuery={setQuery}
      />

      <View style={styles.container}>
        {isSearching ? (
          <ActivityIndicator size="large" style={{marginVertical: 10}} />
        ) : (
          <FlatList
            data={stocks}
            keyExtractor={item => item.ticker + '' + Math.random()}
            renderItem={({item}) => (
              <View style={{padding: 20, height: 200}}>
                <Text style={{padding: 10}}>
                  ticker : {item.ticker}, {item.name}
                </Text>
              </View>
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
    </>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 200,
  },

  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
});
