import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ionic-crud',
  webDir: '../../dist/apps/ionic-crud',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
  },
};

export default config;
