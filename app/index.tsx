import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HomeScreen() {
  const menuItems = [
    {
      id: 'products',
      title: 'Товары',
      subtitle: 'Управление товарами',
      icon: 'cube-outline',
      color: '#4CAF50',
      route: '/products'
    },
    {
      id: 'counterparties',
      title: 'Контрагенты',
      subtitle: 'Клиенты и поставщики',
      icon: 'people-outline',
      color: '#2196F3',
      route: '/counterparties'
    },
    {
      id: 'sales',
      title: 'Продажи',
      subtitle: 'Отгрузки товаров',
      icon: 'arrow-up-circle-outline',
      color: '#FF9800',
      route: '/sales'
    },
    {
      id: 'purchases',
      title: 'Приемки',
      subtitle: 'Поступление товаров',
      icon: 'arrow-down-circle-outline',
      color: '#9C27B0',
      route: '/purchases'
    },
    {
      id: 'settings',
      title: 'Настройки',
      subtitle: 'Подключение к API',
      icon: 'settings-outline',
      color: '#607D8B',
      route: '/settings'
    }
  ];

  const handleMenuPress = (item: typeof menuItems[0]) => {
    if (item.id === 'settings') {
      router.push('/settings');
    } else {
      Alert.alert(
        'В разработке',
        `Модуль "${item.title}" находится в разработке`,
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#1976D2" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Мой Склад</Text>
        <Text style={styles.headerSubtitle}>Мобильное приложение</Text>
      </View>

      {/* Menu Grid */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.menuGrid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuItem, { borderLeftColor: item.color }]}
              onPress={() => handleMenuPress(item)}
              activeOpacity={0.8}
            >
              <View style={styles.menuItemContent}>
                <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                  <Ionicons name={item.icon as any} size={32} color={item.color} />
                </View>
                <View style={styles.menuItemText}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#CCC" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Подключение к API МойСклад для управления товарами и документами
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#1976D2',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  menuGrid: {
    gap: 16,
  },
  menuItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
});