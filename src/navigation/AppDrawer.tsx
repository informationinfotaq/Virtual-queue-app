import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeTabs from './HomeTabs';
import ProfileScreen from '../screens/ProfileScreen';
import { DrawerParamList } from './types';

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function AppDrawer() {
  return (
    <Drawer.Navigator initialRouteName="HomeTabs">
      <Drawer.Screen name="HomeTabs" component={HomeTabs} options={{ title: 'Home' }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}
