import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Demand, Supply } from '../types/api';

interface DocumentCardProps {
  document: Demand | Supply;
  type: 'demand' | 'supply';
  onPress?: () => void;
  onEdit?: () => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ 
  document, 
  type,
  onPress, 
  onEdit 
}: DocumentCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatSum = (sum: number) => {
    return `${sum.toLocaleString('ru-RU')} ₽`;
  };

  const getDocumentTypeInfo = () => {
    if (type === 'demand') {
      return {
        title: 'Отгрузка',
        icon: 'arrow-up-circle',
        color: '#FF9800',
        bgColor: '#FFF3E0'
      };
    } else {
      return {
        title: 'Приемка',
        icon: 'arrow-down-circle',
        color: '#9C27B0',
        bgColor: '#F3E5F5'
      };
    }
  };

  const typeInfo = getDocumentTypeInfo();

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {/* Document Type Icon */}
        <View style={[styles.iconContainer, { backgroundColor: typeInfo.bgColor }]}>
          <Ionicons 
            name={typeInfo.icon as any} 
            size={24} 
            color={typeInfo.color} 
          />
        </View>

        {/* Document Info */}
        <View style={styles.info}>
          <View style={styles.header}>
            <Text style={styles.name} numberOfLines={1}>
              {document.name}
            </Text>
            <Text style={[styles.type, { color: typeInfo.color }]}>
              {typeInfo.title}
            </Text>
          </View>
          
          <Text style={styles.date}>
            {formatDate(document.moment)}
          </Text>

          <View style={styles.sumContainer}>
            <Text style={styles.sum}>
              {formatSum(document.sum)}
            </Text>
            {document.vatIncluded && (
              <Text style={styles.vatIncluded}>с НДС</Text>
            )}
          </View>

          {/* Status indicators */}
          <View style={styles.statusContainer}>
            <View style={[
              styles.statusBadge,
              { backgroundColor: document.applicable ? '#E8F5E8' : '#FFEBEE' }
            ]}>
              <Text style={[
                styles.statusText,
                { color: document.applicable ? '#4CAF50' : '#F44336' }
              ]}>
                {document.applicable ? 'Проведен' : 'Не проведен'}
              </Text>
            </View>
          </View>

          {/* Positions count */}
          {document.positions && document.positions.length > 0 && (
            <View style={styles.positionsInfo}>
              <Ionicons name="list-outline" size={14} color="#666" />
              <Text style={styles.positionsText}>
                {document.positions.length} позиц{document.positions.length === 1 ? 'ия' : 'ий'}
              </Text>
            </View>
          )}
        </View>

        {/* Actions */}
        {onEdit && (
          <TouchableOpacity 
            style={styles.editButton}
            onPress={onEdit}
          >
            <Ionicons name="pencil" size={20} color="#2196F3" />
          </TouchableOpacity>
        )}
      </View>

      {/* Additional info bar */}
      <View style={styles.additionalInfo}>
        {document.organization && (
          <View style={styles.infoItem}>
            <Ionicons name="business-outline" size={12} color="#999" />
            <Text style={styles.infoLabel}>Организация</Text>
          </View>
        )}

        {document.agent && (
          <View style={styles.infoItem}>
            <Ionicons name="person-outline" size={12} color="#999" />
            <Text style={styles.infoLabel}>Контрагент</Text>
          </View>
        )}

        {document.store && (
          <View style={styles.infoItem}>
            <Ionicons name="storefront-outline" size={12} color="#999" />
            <Text style={styles.infoLabel}>Склад</Text>
          </View>
        )}

        {document.rate && document.rate.currency && (
          <View style={styles.infoItem}>
            <Ionicons name="card-outline" size={12} color="#999" />
            <Text style={styles.infoLabel}>Валюта</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginVertical: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    flexDirection: 'row',
    padding: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  type: {
    fontSize: 12,
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  sumContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  sum: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  vatIncluded: {
    fontSize: 11,
    color: '#666',
    marginLeft: 6,
  },
  statusContainer: {
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '500',
  },
  positionsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  positionsText: {
    fontSize: 11,
    color: '#666',
    marginLeft: 4,
  },
  editButton: {
    padding: 8,
    alignSelf: 'flex-start',
  },
  additionalInfo: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  infoLabel: {
    fontSize: 10,
    color: '#999',
    marginLeft: 4,
  },
});

export default DocumentCard;