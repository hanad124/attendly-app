import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem,  } from "@react-navigation/drawer";
import {
  Feather,
  AntDesign,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { router, useNavigation, usePathname } from "expo-router";
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { DrawerActions } from '@react-navigation/native';


const CustomDrawerContent = (props) => {
  const pathname = usePathname();

  const {bottom} = useSafeAreaInsets();
  const navigation = useNavigation();

  const closeDrawer = ()=>{
      navigation.dispatch(DrawerActions.closeDrawer())
  }

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <View
    style={{flex: 1}}
>
  <DrawerContentScrollView {...props} scrollEnabled={false}>
    <View style={{padding: 20}} className='mb-4'>
        <Image style={{height: 35}} resizeMode='contain' source={require('../../assets/images/logo.png')} />
    </View>
    <View className="flex-1">
      
    </View>
  </DrawerContentScrollView>

  <Pressable onPress={closeDrawer} style={{padding: 20, paddingBottom: bottom+10}}>
    <Text>Logout</Text>
  </Pressable>
</View>
  );
};

export default function Layout() {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{headerShown: false}}>
      <Drawer.Screen name="home" options={{headerShown: true}} />
      <Drawer.Screen name="profile" options={{headerShown: true}} />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  navItemLabel: {
    marginLeft: -20,
    fontSize: 18,
  },
  userInfoWrapper: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  userImg: {
    borderRadius: 40,
  },
  userDetailsWrapper: {
    marginTop: 25,
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize:16,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  }
});