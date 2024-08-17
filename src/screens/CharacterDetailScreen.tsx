import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacterDetails } from '../store/characterThunks';
import { RootState } from '../store';
import { CharacterDetailScreenNavigationProp } from '../types/navigation';
import { useTranslation } from 'react-i18next';
import { convertToHttps } from '../utils';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Props = {
  navigation: CharacterDetailScreenNavigationProp;
  route: {
    params: {
      characterId: number;
    };
  };
};

const CharacterDetailScreen: React.FC<Props> = ({ route }) => {
  const { characterId } = route.params;
  const dispatch = useDispatch();
  const { characterDetails, loading, theme } = useSelector((state: RootState) => state.characters);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchCharacterDetails(characterId));
  }, [dispatch, characterId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (!characterDetails) {
    return (
      <View style={styles.container}>
        <Text style={[styles.text, themeStyles[theme].text]}>{t('characterNotFound')}</Text>
      </View>
    );
  }

  const renderComicItem = (item: { name: string }) => (
    <View style={[styles.comicItemContainer, themeStyles[theme].comicItemContainer]} key={item.name}>
      <Text style={[styles.comicItemText, themeStyles[theme].text]}>{item.name}</Text>
    </View>
  );

  return (
    <ScrollView style={[styles.container, themeStyles[theme].container]}>
      <Image
        source={{
          uri: `${convertToHttps(`${characterDetails.thumbnail.path}.${characterDetails.thumbnail.extension}`)}`,
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={[styles.detailsContainer, themeStyles[theme].detailsContainer]}>
        <Text style={[styles.name, themeStyles[theme].text]}>{characterDetails.name}</Text>
        <Text style={[styles.description, themeStyles[theme].text]}>
          {characterDetails.description || t('noDescriptionAvailable')}
        </Text>
        <Text style={[styles.comicsTitle, themeStyles[theme].text]}>{t('comics')}</Text>
        <View>{characterDetails.comics.items.map((item) => renderComicItem(item))}</View>
      </View>
    </ScrollView>
  );
};

const themeStyles = {
  light: StyleSheet.create({
    container: {
      backgroundColor: '#FFF',
    },
    detailsContainer: {
      backgroundColor: '#F9F9F9',
    },
    text: {
      color: '#000',
    },
    comicItemContainer: {
      backgroundColor: '#E5E5E5',
    },
  }),
  dark: StyleSheet.create({
    container: {
      backgroundColor: '#1E1E1E',
    },
    detailsContainer: {
      backgroundColor: '#333',
    },
    text: {
      color: '#FFF',
    },
    comicItemContainer: {
      backgroundColor: '#444',
    },
  }),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.75,
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'justify',
  },
  comicsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  comicItemContainer: {
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
  },
  comicItemText: {
    fontSize: 16,
  },
});

export default CharacterDetailScreen;
