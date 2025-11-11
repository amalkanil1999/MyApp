import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { Colorscheme } from '../constants/Colors';
import Strings from '../constants/Strings';
import { Fonts } from '../constants';
import CustomButton from '../components/CustomButton';

import {
  nameValidator,
  emailValidator,
  passwordValidator,
} from '../helpers/Validators';
import { getIcon } from '../utils/iconutils/IconUtility';

export default function SignUpScreen({ navigation }) {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');

  const isFormValid =
    firstName.length >= 3 &&
    lastName.length >= 3 &&
    emailValidator(email) &&
    passwordValidator(password) &&
    passwordValidator(confirmPass);

  const handleContinue = () => {
    if (password !== confirmPass) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    console.log('Form Submitted!');
  };

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.wrapperContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.mainHeading}>{Strings.authStrings.signUp}</Text>
            <Text style={styles.subHeading}>
              {Strings.authStrings.enterPersonalData}
            </Text>
          </View>
          <View style={styles.middleContainer}>
            <View style={styles.nameContainer}>
              <View style={styles.nameFormContainer}>
                <Text style={styles.labelText}>
                  {Strings.authStrings.firstName}
                </Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    maxLength={15}
                    placeholder="eg John"
                    style={styles.input}
                    value={firstName}
                    onChangeText={txt =>
                      nameValidator(txt) && setFirstName(txt)
                    }
                  />
                </View>
              </View>
              <View style={styles.nameFormContainer}>
                <Text style={styles.labelText}>
                  {Strings.authStrings.lastName}
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    maxLength={15}
                    placeholder="eg Fransisco"
                    style={styles.input}
                    value={lastName}
                    onChangeText={txt => nameValidator(txt) && setLastName(txt)}
                  />
                </View>
              </View>
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.labelText}>{Strings.authStrings.email}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  maxLength={30}
                  placeholder="eg john@example.com"
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.labelText}>
                {Strings.authStrings.password}
              </Text>

              <View style={[styles.inputContainer, styles.passwordBox]}>
                <TextInput
                  maxLength={12}
                  placeholder="Enter your password"
                  secureTextEntry={!isPassVisible}
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setIsPassVisible(!isPassVisible)}
                >
                  <View style={styles.iconContaioner}>
                    {getIcon('PasswordHide', '100%', '100%')}
                  </View>
                </TouchableOpacity>
              </View>

              <Text style={styles.passwordWarning}>
                {Strings.authStrings.mustBeAtLeast}
              </Text>
            </View>
            <View style={[styles.formContainer,{marginTop:20,}]}>
              <Text style={styles.labelText}>
                {Strings.authStrings.confirmPassword}
              </Text>

              <View style={[styles.inputContainer, styles.passwordBox]}>
                <TextInput
                  maxLength={12}
                  placeholder="Confirm password"
                  secureTextEntry={!isConfirmVisible}
                  style={styles.input}
                  value={confirmPass}
                  onChangeText={setConfirmPass}
                />
                <TouchableOpacity
                  onPress={() => setIsConfirmVisible(!isConfirmVisible)}
                >
                  <View style={styles.iconContaioner}>
                    {getIcon('PasswordHide', '100%', '100%')}
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {error !== '' && <Text style={styles.errorText}>{error}</Text>}
          </View>
          <View style={styles.bottomButtonWrapper}>
            <CustomButton
              title="Continue"
              onPress={handleContinue}
              disabled={!isFormValid}
            />
          </View>
          <View style={styles.switchtext}>
            <Text allowFontScaling={false} style={styles.underText}>
              {Strings.authStrings.haveAccount}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('SignIn');
              }}
            >
              <Text allowFontScaling={false} style={styles.underTextRight}>
                {Strings.authStrings.login}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colorscheme.MAINTHEME,
  },
  scrollContainer: {
    paddingHorizontal: 40,
    paddingTop: 40,
    paddingBottom: 60,
  },
  wrapperContainer: {
    gap: 40,
  },
  topContainer: {
    gap: 8,
    alignItems: 'center',
  },
  mainHeading: {
    fontSize: 24,
    fontFamily: Fonts.medium,
  },
  subHeading: {
    fontSize: 14,
    fontFamily: Fonts.regular,
  },
  middleContainer: {
    gap: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  nameFormContainer: {
    flex: 1,
    gap: 8,
  },
  formContainer: {
    gap: 8,
  },
  labelText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
  },
  inputContainer: {
    backgroundColor: Colorscheme.PLACEHOLDERGRAY,
    borderRadius: 10,
    paddingHorizontal: 16,
    minHeight: 48,
    justifyContent: 'center',
  },
  input: {
    fontFamily: Fonts.regular,
    fontSize: 14,
  },
  passwordWarning: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colorscheme.TEXTGRAY,
    opacity: 0.7,
  },
  errorText: {
    color: 'red',
    fontFamily: Fonts.regular,
    fontSize: 13,
  },
  bottomButtonWrapper: {},
  switchtext: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  underText: {
    fontFamily: Fonts.regular,
    Fontsize: 14,
    lineHeight: 20,
  },
  underTextRight: {
    color: Colorscheme.BLACKLITE,
    fontFamily: Fonts.semiBold,
    Fontsize: 14,
    lineHeight: 20,
  },
  passwordBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContaioner: {
    width: 18,
    height: 18,
  },
});
