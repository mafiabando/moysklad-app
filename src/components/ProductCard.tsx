import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../types/api';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  onEdit?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onPress, 
  onEdit 
}: ProductCardProps) => {
  const formatPrice = (price?: number) => {
    if (!price) return 'Цена не указана';
    return `${price.toLocaleString('ru-RU')} ₽`;
  };

  const getMainPrice = () => {
    if (product.salePrices && product.salePrices.length > 0) {
      return product.salePrices[0].value;
    }
    return product.price;
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          {product.images && product.images.length > 0 ? (
            <Image 
              source={{ uri: product.images[0].filename }} 
              style={styles.productImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Ionicons name="cube-outline" size={32} color="#CCC" />
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={2}>
            {product.name}
          </Text>
          
          {product.article && (
            <Text style={styles.article}>Артикул: {product.article}</Text>
          )}
          
          {product.code && (
            <Text style={styles.code}>Код: {product.code}</Text>
          )}

          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              {formatPrice(getMainPrice())}
            </Text>
            
            {product.minimumBalance && (
              <Text style={styles.minBalance}>
                Мин. остаток: {product.minimumBalance}
              </Text>
            )}
          </View>

          {product.uom && (
            <Text style={styles.uom}>
              Ед. изм.: {product.uom.name}
            </Text>
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

      {/* Barcode indicator */}
      {product.barcodes && product.barcodes.length > 0 && (
        <View style={styles.barcodeIndicator}>
          <Ionicons name="barcode-outline" size={16} color="#666" />
          <Text style={styles.barcodeText}>Штрихкод</Text>
        </View>
      )}

      {/* Serial tracking indicator */}
      {product.isSerialTrackable && (
        <View style={styles.serialIndicator}>
          <Ionicons name="finger-print" size={16} color="#FF9800" />
          <Text style={styles.serialText}>Серийный учет</Text>
        </View>
      )}
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
  imageContainer: {
    marginRight: 16,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  placeholderImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
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
  article: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  code: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  priceContainer: {
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  minBalance: {
    fontSize: 11,
    color: '#FF9800',
    marginTop: 2,
  },
  uom: {
    fontSize: 12,
    color: '#999',
  },
  editButton: {
    padding: 8,
    alignSelf: 'flex-start',
  },
  barcodeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  barcodeText: {
    fontSize: 11,
    color: '#666',
    marginLeft: 4,
  },
  serialIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  serialText: {
    fontSize: 11,
    color: '#FF9800',
    marginLeft: 4,
  },
});

export default ProductCard;