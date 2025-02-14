import {Appbar} from 'react-native-paper';
import {Image, StyleSheet, View, Dimensions} from 'react-native';
import {theme} from '../constants/theme';
import SearchBar from './SearchBar';

const {width} = Dimensions.get('window');

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
  return (
    <View style={styles.headerContainer}>
      <Appbar.Header style={styles.header}>
        <Image
          source={require('../assets/nasdaqlogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Appbar.Header>
      <View style={styles.searchbarContainer}>
        <SearchBar
          placeholder={placeholder}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchbarContainer: {
    marginHorizontal: 10,
    paddingBottom: 10,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: width,
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: theme.colors.primary,
    elevation: 0,
    borderBottomWidth: 0,
    width: '100%',
    height: 100,
    justifyContent: 'flex-start',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logo: {
    height: 40,
    width: 120,
    alignSelf: 'center',
  },
});

export default Header;
