import {Searchbar} from 'react-native-paper';

interface SearchBarProps {
  placeholder: string;
  searchQuery?: string;
  setSearchQuery?: any;
}

const SearchBar = (props: SearchBarProps) => {
  const {placeholder, searchQuery, setSearchQuery} = props;

  return (
    <>
      <Searchbar
        placeholder={placeholder}
        onChangeText={setSearchQuery}
        value={searchQuery ?? ''}
      />
    </>
  );
};

export default SearchBar;
