import React, { createContext, useContext, useState, useEffect } from 'react';
import { IUserDTO } from '../dtos/IUserDTO';
import * as Google from 'expo-google-app-auth';
import * as Apple from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextProps {
  user: IUserDTO;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUserDTO>({} as IUserDTO);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await AsyncStorage.getItem('@gofinances:user');
      const dataFormatted: IUserDTO = JSON.parse(data) || {};
      setUser(dataFormatted);
      setLoading(false);
    })();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId:
          '229580808363-jsp106d1evghvgs9vhi4bbddsulg9ml5.apps.googleusercontent.com',
        androidClientId:
          '229580808363-v6kt8bgg71ddoc80mjpt2i6cuhhlgu5n.apps.googleusercontent.com',
        scopes: ['email', 'profile'],
      });

      if (result.type === 'success') {
        const userLogged: IUserDTO = {
          id: result.user.id!,
          name: result.user.name!,
          email: result.user.email!,
          photo: result.user.photoUrl!,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(
          '@gofinances:user',
          JSON.stringify(userLogged),
        );
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  const signInWithApple = async () => {
    try {
      const credentials = await Apple.signInAsync({
        requestedScopes: [
          Apple.AppleAuthenticationScope.EMAIL,
          Apple.AppleAuthenticationScope.FULL_NAME,
        ],
      });

      if (credentials) {
        const userLogged: IUserDTO = {
          id: String(credentials.user),
          email: String(credentials.email!),
          name: String(credentials.fullName!.givenName!),
        };

        setUser(userLogged);
        await AsyncStorage.setItem(
          '@gofinances:user',
          JSON.stringify(userLogged),
        );
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  const signOut = async () => {
    setUser({} as IUserDTO);
    await AsyncStorage.removeItem('@gofinances:user');
  };

  return (
    <AuthContext.Provider
      value={{ user, signOut, loading, signInWithGoogle, signInWithApple }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider.');
  }

  return context;
};
