import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../redux/authSlice';
import { Colorscheme } from '../../constants/Colors';
import { getIcon } from '../../utils/iconutils/IconUtility';
import { Fonts } from '../../constants';

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  

  const handleLogout = async () => {
    const result = await dispatch(signOut());
    if (!signOut.fulfilled.match(result)) {
      console.log('Logout failed:', result.payload || result.error);
    }
  };

  const settingsOptions = [
    {
      id: 1,
      icon: 'Work',
      label: 'Your Card',
      // onPress: () => navigation.navigate('YourCard'),
    },
    {
      id: 2,
      icon: 'Security',
      label: 'Security',
      // onPress: () => navigation.navigate('Security'),
    },
    {
      id: 3,
      icon: 'Notification',
      label: 'Notification',
      // onPress: () => navigation.navigate('Notification'),
    },
    {
      id: 4,
      icon: 'Internet',
      label: 'Languages',
      // onPress: () => navigation.navigate('Languages'),
    },
    {
      id: 5,
      icon: 'Info',
      label: 'Help and Support',
      // onPress: () => navigation.navigate('HelpSupport'),
    },
  ];

  const renderSettingItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.settingItem}
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingLeft}>
        <View style={styles.iconWrapper}>
          {getIcon(item.icon, 20, 20, Colorscheme.BLACK)}
        </View>
        <Text style={styles.settingLabel}>{item.label}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <Image
              source={require('../../assets/images/PNG/Rectangle.png')}
              style={styles.profileImage}
              resizeMode="cover"
            />
            <View style={styles.profileTextContainer}>
              <Text style={styles.profileName}>{user.username}</Text>
              <Text style={styles.profileEmail}>{user.email}</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.editButton}
            activeOpacity={0.7}
          >
            {getIcon('Edit', "100%", "100%", Colorscheme.BLACK)}
          </TouchableOpacity>
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Setting</Text>
          <View style={styles.settingsList}>
            {settingsOptions.map(item => renderSettingItem(item))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colorscheme.MAINTHEME,
  },
  container: {
    flex: 1,
    backgroundColor: Colorscheme.MAINTHEME,

  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 30,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
  },
  profileTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    color: Colorscheme.BLACK,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colorscheme.GRAY,
  },
  editButton: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsSection: {
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.medium,
    color: Colorscheme.GRAY,
    marginBottom: 16,
  },
  settingsList: {
    backgroundColor: Colorscheme.MAINTHEME,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    width: 24,
    height: 24,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colorscheme.BLACK,
  },
  chevronIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    marginHorizontal: 20,
    marginTop: 40,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: '#ff4444',
  },
});