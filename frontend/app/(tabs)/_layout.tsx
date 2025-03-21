import { router, Tabs } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthContext } from '@/providers/AuthContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const auth = useContext(AuthContext);

  useEffect(() => {
      if (!auth || !auth.token || auth.token === "") {
        router.push("/sign-in");
      } else {
        router.push("/(tabs)");
      }
    }, [auth]);
    
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { 
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Лизинг',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="banknote" color={color} />,
        }}
      />
      <Tabs.Screen
        name="arenda"
        options={{
          title: 'Аренда',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="banknote.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
