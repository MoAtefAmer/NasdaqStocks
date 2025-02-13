import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  StyleSheet,
} from 'react-native';
import {useStocks} from '../hooks/useStocks';

const ExploreScreen = () => {
  const [query, setQuery] = useState('');
  const {data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading} =
    useStocks(query);

  const stocks = useMemo(
    () => data?.pages.flatMap(page => page.stocks) || [],
    [data],
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search stocks..."
        value={query}
        onChangeText={text => {
          setQuery(text);
        }}
        style={styles.searchInput}
      />

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
            console.log('fetch next page');
            await fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage || isLoading ? (
            <ActivityIndicator size="large" />
          ) : null
        }
      />
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
});
