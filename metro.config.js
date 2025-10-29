const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Добавляем поддержку web платформы
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Настройка для web с алиасами
config.resolver.alias = {
  'react-native$': 'react-native-web',
  'expo-modules-core': path.resolve(__dirname, 'expo-modules-core.web.js'),
};

module.exports = config;