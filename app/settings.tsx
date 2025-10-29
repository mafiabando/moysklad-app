import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { apiService } from '../src/services/apiService';

export default function SettingsScreen() {
  const [formData, setFormData] = useState({
    baseURL: 'https://api.moysklad.ru/api/remap/1.2',
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  useEffect(() => {
    loadSavedSettings();
  }, []);

  const loadSavedSettings = async () => {
    setIsLoading(true);
    try {
      const hasConfig = await apiService.loadSavedConfig();
      if (hasConfig) {
        // Проверяем подключение при загрузке
        const connected = await apiService.testConnection();
        setIsConnected(connected);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
    setIsConnected(false);
  };

  const testConnection = async () => {
    if (!formData.username || !formData.password) {
      Alert.alert('Ошибка', 'Заполните логин и пароль');
      return;
    }

    setIsTestingConnection(true);
    try {
      await apiService.initialize({
        baseURL: formData.baseURL,
        username: formData.username,
        password: formData.password,
        timeout: 30000,
      });

      const connected = await apiService.testConnection();
      
      if (connected) {
        setIsConnected(true);
        Alert.alert('Успешно', 'Подключение к API установлено');
      } else {
        setIsConnected(false);
        Alert.alert('Ошибка', 'Не удалось подключиться к API. Проверьте данные.');
      }
    } catch (error: any) {
      setIsConnected(false);
      Alert.alert('Ошибка подключения', error.message || 'Неизвестная ошибка');
    } finally {
      setIsTestingConnection(false);
    }
  };

  const saveSettings = async () => {
    if (!isConnected) {
      Alert.alert('Ошибка', 'Сначала проверьте подключение к API');
      return;
    }

    try {
      Alert.alert('Успешно', 'Настройки сохранены', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error: any) {
      Alert.alert('Ошибка', error.message || 'Не удалось сохранить настройки');
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#1976D2" />
        <Text style={styles.loadingText}>Загрузка настроек...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#1976D2" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Настройки API</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Connection Status */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Ionicons 
              name={isConnected ? "checkmark-circle" : "close-circle"} 
              size={24} 
              color={isConnected ? "#4CAF50" : "#F44336"} 
            />
            <Text style={[styles.statusText, { color: isConnected ? "#4CAF50" : "#F44336" }]}>
              {isConnected ? "Подключено" : "Не подключено"}
            </Text>
          </View>
          {isConnected && (
            <Text style={styles.statusDescription}>
              API МойСклад готов к использованию
            </Text>
          )}
        </View>

        {/* API Settings Form */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Настройки подключения</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>URL API</Text>
            <TextInput
              style={styles.input}
              value={formData.baseURL}
              onChangeText={(value: string) => handleInputChange('baseURL', value)}
              placeholder="https://api.moysklad.ru/api/remap/1.2"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Логин</Text>
            <TextInput
              style={styles.input}
              value={formData.username}
              onChangeText={(value: string) => handleInputChange('username', value)}
              placeholder="Ваш логин"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Пароль</Text>
            <TextInput
              style={styles.input}
              value={formData.password}
              onChangeText={(value: string) => handleInputChange('password', value)}
              placeholder="Ваш пароль"
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Test Connection Button */}
          <TouchableOpacity
            style={[styles.button, styles.testButton]}
            onPress={testConnection}
            disabled={isTestingConnection}
          >
            {isTestingConnection ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Ionicons name="wifi" size={20} color="white" />
                <Text style={styles.buttonText}>Проверить подключение</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Save Button */}
          <TouchableOpacity
            style={[
              styles.button,
              styles.saveButton,
              !isConnected && styles.disabledButton
            ]}
            onPress={saveSettings}
            disabled={!isConnected}
          >
            <Ionicons name="save" size={20} color="white" />
            <Text style={styles.buttonText}>Сохранить настройки</Text>
          </TouchableOpacity>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color="#2196F3" />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Как получить доступ к API</Text>
            <Text style={styles.infoText}>
              1. Войдите в ваш аккаунт МойСклад{'\n'}
              2. Перейдите в Настройки → Пользователи и права{'\n'}
              3. Создайте или выберите пользователя{'\n'}
              4. Включите доступ к API{'\n'}
              5. Используйте логин и пароль пользователя
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#1976D2',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  statusCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  statusDescription: {
    fontSize: 14,
    color: '#666',
    marginLeft: 36,
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
  },
  testButton: {
    backgroundColor: '#FF9800',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  disabledButton: {
    backgroundColor: '#CCC',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoContent: {
    flex: 1,
    marginLeft: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});