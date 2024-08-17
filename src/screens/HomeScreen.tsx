import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, toggleLanguage } from '../store/characterSlice';
import { fetchCharacters } from '../store/characterThunks';
import { RootState } from '../store'; // Assuming you have a RootState type
import { Character } from '../types/marvel';
import { useTranslation } from 'react-i18next';
import { convertToHttps } from '../utils';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useDispatch();
  const characters = useSelector((state: RootState) => state.characters.characters);
  const loading = useSelector((state: RootState) => state.characters.loading);
  const theme = useSelector((state: RootState) => state.characters.theme);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const { t, i18n } = useTranslation();

  // Fetch characters on page change
  useEffect(() => {
    dispatch(fetchCharacters({ limit: 10, offset: page * 10 }));
    console.log(`Fetching page: ${page}, offset: ${page * 10}`);
  }, [dispatch, page]); // Include page in the dependency array

  const loadMoreCharacters = useCallback(() => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading]);

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderFooter = () => {
    return <>
      {loading && page > 0 ? <View style={styles.footerLoader}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View> : null}
    </>
  }

  const renderCharacterItem = ({ item }: { item: Character }) => (
    <TouchableOpacity
      key={`${item.id}${item.name}`}
      style={[styles.itemContainer, themeStyles[theme].itemContainer]}
      onPress={() => navigation.navigate('CharacterDetailScreen', { characterId: item.id })}
    >
      <Image
        source={{ uri: `${convertToHttps(item.thumbnail.path)}.${item.thumbnail.extension}` }}
        style={styles.thumbnail}
      />
      <Text style={[styles.name, themeStyles[theme].text]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, themeStyles[theme].container]}>
      <TextInput
        style={[styles.searchBar, themeStyles[theme].searchBar]}
        placeholder={t('searchPlaceholder')}
        placeholderTextColor={theme === 'dark' ? '#CCC' : '#666'}
        onChangeText={handleSearch}
        value={search}
      />
      {loading && page === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007BFF" />
        </View>
      ) : (
        <FlatList
          data={filteredCharacters}
          renderItem={renderCharacterItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          onEndReached={loadMoreCharacters}
          onEndReachedThreshold={0.9}
          ListFooterComponent={renderFooter}
        />
      )}



      <TouchableOpacity
        style={styles.themeToggleButton}
        onPress={() => dispatch(toggleTheme())}
      >
        <Text style={themeStyles[theme].text}>
          {t('toggleTheme')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.languageToggleButton}
        onPress={() => i18n.language === 'en' ? i18n.changeLanguage('ar') : i18n.changeLanguage('en')}
      >
        <Text style={themeStyles[theme].text}>
          {t('toggleLanguage')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  footerLoader: {
    paddingVertical: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchBar: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  themeToggleButton: {
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#007BFF',
  },
  languageToggleButton: {
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#007BFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
});

const themeStyles = {
  light: StyleSheet.create({
    container: {
      backgroundColor: '#FFF',
    },
    itemContainer: {
      backgroundColor: '#F9F9F9',
    },
    text: {
      color: '#000',
    },
    searchBar: {
      backgroundColor: '#FFF',
      borderColor: '#CCC',
    },
  }),
  dark: StyleSheet.create({
    container: {
      backgroundColor: '#1E1E1E',
    },
    itemContainer: {
      backgroundColor: '#333',
    },
    text: {
      color: '#FFF',
    },
    searchBar: {
      backgroundColor: '#333',
      borderColor: '#444',
    },
  }),
};

export default HomeScreen;
