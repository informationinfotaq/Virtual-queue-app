export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  QueueScreen: { shop: { id: string; name: string; estWait: number } };
};

export type HomeTabParamList = {
  Home: undefined;
  Settings: undefined;
};

export type DrawerParamList = {
  HomeTabs: undefined;
  Profile: undefined;
};
