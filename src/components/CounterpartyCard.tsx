import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Counterparty } from '../types/api';

interface CounterpartyCardProps {
  counterparty: Counterparty;
  onPress?: () => void;
  onEdit?: () => void;
}

export const CounterpartyCard: React.FC<CounterpartyCardProps> = ({ 
  counterparty, 
  onPress, 
  onEdit 
}: CounterpartyCardProps) => {
  const getCompanyTypeText = (type: string) => {
    switch (type) {
      case 'legal': return 'Юридическое лицо';
      case 'individual': return 'Физическое лицо';
      case 'entrepreneur': return 'ИП';
      default: return 'Не указано';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'legal': return '#2196F3';
      case 'individual': return '#4CAF50';
      case 'entrepreneur': return '#FF9800';
      default: return '#999';
    }
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {/* Company Type Icon */}
        <View style={[styles.iconContainer, { backgroundColor: getTypeColor(counterparty.companyType) + '20' }]}>
          <Ionicons 
            name={counterparty.companyType === 'legal' ? 'business' : 'person'} 
            size={24} 
            color={getTypeColor(counterparty.companyType)} 
          />
        </View>

        {/* Counterparty Info */}
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={2}>
            {counterparty.name}
          </Text>
          
          <View style={styles.typeContainer}>
            <Text style={[styles.companyType, { color: getTypeColor(counterparty.companyType) }]}>
              {getCompanyTypeText(counterparty.companyType)}
            </Text>
          </View>

          {counterparty.inn && (
            <Text style={styles.details}>ИНН: {counterparty.inn}</Text>
          )}

          {counterparty.email && (
            <View style={styles.contactRow}>
              <Ionicons name="mail-outline" size={14} color="#666" />
              <Text style={styles.contactText}>{counterparty.email}</Text>
            </View>
          )}

          {counterparty.phone && (
            <View style={styles.contactRow}>
              <Ionicons name="call-outline" size={14} color="#666" />
              <Text style={styles.contactText}>{counterparty.phone}</Text>
            </View>
          )}

          {counterparty.actualAddress && (
            <View style={styles.contactRow}>
              <Ionicons name="location-outline" size={14} color="#666" />
              <Text style={styles.contactText} numberOfLines={1}>
                {counterparty.actualAddress}
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

      {/* Tags */}
      {counterparty.tags && counterparty.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {counterparty.tags.slice(0, 3).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
          {counterparty.tags.length > 3 && (
            <Text style={styles.moreTagsText}>
              +{counterparty.tags.length - 3} еще
            </Text>
          )}
        </View>
      )}

      {/* Additional Info */}
      <View style={styles.additionalInfo}>
        {counterparty.accounts && counterparty.accounts.length > 0 && (
          <View style={styles.infoItem}>
            <Ionicons name="card-outline" size={14} color="#666" />
            <Text style={styles.infoText}>
              {counterparty.accounts.length} счет{counterparty.accounts.length > 1 ? 'а' : ''}
            </Text>
          </View>
        )}

        {counterparty.contactpersons && counterparty.contactpersons.length > 0 && (
          <View style={styles.infoItem}>
            <Ionicons name="people-outline" size={14} color="#666" />
            <Text style={styles.infoText}>
              {counterparty.contactpersons.length} контакт{counterparty.contactpersons.length > 1 ? 'а' : ''}
            </Text>
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
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  typeContainer: {
    marginBottom: 8,
  },
  companyType: {
    fontSize: 12,
    fontWeight: '500',
  },
  details: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  contactText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
    flex: 1,
  },
  editButton: {
    padding: 8,
    alignSelf: 'flex-start',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  tag: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 11,
    color: '#1976D2',
  },
  moreTagsText: {
    fontSize: 11,
    color: '#999',
    alignSelf: 'center',
  },
  additionalInfo: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  infoText: {
    fontSize: 11,
    color: '#666',
    marginLeft: 4,
  },
});

export default CounterpartyCard;