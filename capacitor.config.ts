import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.solopilah.app',
  appName: 'Solo Pilah',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
