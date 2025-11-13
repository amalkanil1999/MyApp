import React, { useEffect, useState, useRef } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../redux/authSlice';
import { Colorscheme } from '../../constants/Colors';
import { getIcon } from '../../utils/iconutils/IconUtility';
import { Fonts } from '../../constants';

const LIMIT = 10;

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const status = useSelector(state => state.auth.status);

  // Local States
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  // Ref to prevent multiple calls
  const isFetching = useRef(false);

  // Categories config
  const categories = [
    { name: 'Hotel', label: 'Hotels' },
    { name: 'Train', label: 'Train' },
    { name: 'Bus', label: 'Bus' },
    { name: 'Flight', label: 'Flights' },
    { name: 'Ship', label: 'Ferry' },
  ];

  // Fetch function - removed from useCallback to avoid circular dependency
  const fetchProducts = async (pageNum) => {
    if (isFetching.current || !hasMore) return;
    
    isFetching.current = true;
    setLoading(true);
    
    try {
      console.log(`Fetching page ${pageNum}...`);
      const res = await fetch(
        `https://api.escuelajs.co/api/v1/products?offset=${pageNum * LIMIT}&limit=${LIMIT}`
      );
      const json = await res.json();

      if (json.length === 0) {
        console.log('No more data');
        setHasMore(false);
      } else {
        console.log(`Loaded ${json.length} items`);
        setData(prev => [...prev, ...json]);
      }
    } catch (err) {
      console.error('API fetch failed:', err);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchProducts(0);
  }, []);

  // Handle load more
  const handleLoadMore = () => {
    console.log('handleLoadMore called', { loading, hasMore, page });
    if (!loading && hasMore && !isFetching.current) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProducts(nextPage);
    }
  };

  const handleLogout = async () => {
    const result = await dispatch(signOut());
    if (!signOut.fulfilled.match(result)) {
      console.log('Logout failed:', result.payload || result.error);
    }
  };

  // Render Card
  const renderExploreCard = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.images?.[0] }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.cardSubtitle} numberOfLines={1}>
          {item.category?.name || 'Unknown'}
        </Text>
        <View style={styles.ratingRow}>
          {getIcon('Star', 14, 14, '#FFD700')}
          <Text style={styles.ratingText}>4.8</Text>
        </View>
        <View style={styles.bottom}>
          <View style={styles.priceRow}>
            <Text style={styles.priceText}>Starts from</Text>
            <Text style={styles.priceValue}>${item.price}</Text>
          </View>
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>3D2N</Text>
          </View>
        </View>
      </View>
    </View>
  );

  // Render footer
  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={Colorscheme.BLACK} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar backgroundColor={Colorscheme.BLUE} barStyle="light-content" />
      <View style={styles.mainContainer}>
        {/* Top Section */}
        <View style={styles.topContainer}>
          <View style={styles.blueContainer}>
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome</Text>
              <TouchableOpacity style={styles.imageContainer}>
                <Image
                  resizeMode="cover"
                  style={styles.image}
                  source={require('../../assets/images/PNG/Rectangle.png')}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <View style={styles.logoContainer}>
                {getIcon('Search', 20, 20, '#999')}
              </View>
              <TextInput
                placeholder="Where to go?"
                placeholderTextColor="#999"
                style={styles.input}
              />
            </View>
          </View>

          {/* Categories */}
          <View style={styles.listContainer}>
            {categories.map((item, index) => (
              <View style={styles.singleContainer} key={index}>
                <TouchableOpacity style={styles.roundContainer}>
                  <View style={styles.iconContainer}>
                    {getIcon(item.name, '100%', '100%')}
                  </View>
                </TouchableOpacity>
                <Text style={styles.amenities}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Explore Section */}
        <View style={styles.exploreContainer}>
          <Text style={styles.exploreTitle}>Explore</Text>
          <FlatList
            data={data}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={renderExploreCard}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.3}
            ListFooterComponent={renderFooter}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            windowSize={5}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: Colorscheme.BLUE 
  },
  mainContainer: { 
    flex: 1, 
    backgroundColor: Colorscheme.MAINTHEME 
  },
  topContainer: {},
  blueContainer: {
    backgroundColor: Colorscheme.BLUE,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 70,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 30,
    gap: 16,
  },
  welcomeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontFamily: Fonts.semiBold,
    color: Colorscheme.MAINTHEME,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colorscheme.MAINTHEME,
    overflow: 'hidden',
  },
  image: { 
    width: '100%', 
    height: '100%' 
  },
  searchContainer: {
    backgroundColor: Colorscheme.MAINTHEME,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 48,
  },
  logoContainer: { 
    height: 20, 
    width: 20, 
    marginRight: 10 
  },
  input: { 
    flex: 1, 
    fontSize: 16, 
    color: '#333', 
    padding: 0 
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colorscheme.MAINTHEME,
    position: 'absolute',
    top: 160,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingVertical: 28,
    borderRadius: 11,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
    width: '90%',
  },
  singleContainer: { 
    alignItems: 'center', 
    gap: 6 
  },
  roundContainer: {
    backgroundColor: Colorscheme.LIGHTBLUE,
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: { 
    height: 20, 
    width: 20 
  },
  amenities: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colorscheme.BLACK,
    textAlign: 'center',
  },
  exploreContainer: {
    marginTop: 100,
    paddingLeft: 20,
  },
  exploreTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colorscheme.BLACK,
    marginBottom: 6,
  },
  flatListContainer: {
    paddingRight: 20,
    paddingBottom: 4,
  },
  card: {
    width: 150,
    backgroundColor: Colorscheme.MAINTHEME,
    borderRadius: 18,
    marginRight: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  cardContent: {
    padding: 7,
  },
  cardTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    color: Colorscheme.BLACK,
  },
  cardSubtitle: {
    fontFamily: Fonts.regular,
    fontSize: 9,
    color: Colorscheme.GRAY,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 4,
  },
  ratingText: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: Colorscheme.RATING,
  },
  priceRow: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  priceText: {
    fontFamily: Fonts.regular,
    fontSize: 10,
    color: Colorscheme.GRAY,
  },
  priceValue: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colorscheme.BLACK,
  },
  durationBadge: {
    backgroundColor: Colorscheme.BLACK,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  durationText: {
    color: Colorscheme.MAINTHEME,
    fontSize: 12,
    fontFamily: Fonts.medium,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLoader: {
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


{
  /* <TouchableOpacity>
          <Text onPress={handleLogout}>Logout</Text>
        </TouchableOpacity> */
}
