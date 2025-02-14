import { Image, StyleSheet, View, StatusBar } from 'react-native';
import { theme } from '../constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMemo } from 'react';
import { Searchbar } from 'react-native-paper';

interface HeaderProps {
  placeholder: string;
  searchQuery: string;
  setSearchQuery?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  placeholder,
  searchQuery,
  setSearchQuery,
}: HeaderProps) => {
  const insets = useSafeAreaInsets();

  const headerContainerStyle = useMemo(
    () => [styles.header, { paddingTop: insets.top }],
    [insets.top],
  );

  return (
    <View style={headerContainerStyle}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Image
        source={require('../assets/nasdaqlogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.searchbarContainer}>
        <Searchbar
          placeholder={placeholder}
          onChangeText={setSearchQuery}
          value={searchQuery ?? ''}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchbarContainer: {
    marginHorizontal: 15,
    paddingBottom: 10,
  },
  headerContainer: {
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 10,
  },
  logo: {
    height: 40,
    width: 120,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
});

export default Header;
