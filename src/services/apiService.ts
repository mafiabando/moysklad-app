import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '../utils/polyfills';
import { 
  ApiConfig, 
  ApiResponse, 
  Product, 
  Counterparty, 
  Demand, 
  Supply, 
  Organization, 
  Store,
  QueryFilters,
  ApiError,
  DemandPosition,
  SupplyPosition
} from '../types/api';

class MoySkladApiService {
  private api: AxiosInstance;
  private config: ApiConfig | null = null;

  constructor() {
    this.api = axios.create();
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Запрос интерцептор для добавления авторизации
    this.api.interceptors.request.use(
      async (config: any) => {
        if (this.config) {
          // Для React Native используем base64 encoding
          const credentials = `${this.config.username}:${this.config.password}`;
          const auth = btoa(credentials);
          config.headers = config.headers || {};
          config.headers.Authorization = `Basic ${auth}`;
          config.headers['Accept-Encoding'] = 'gzip';
          config.headers['Content-Type'] = 'application/json';
        }
        return config;
      },
      (error: any) => Promise.reject(error)
    );

    // Ответ интерцептор для обработки ошибок
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: any) => {
        if (error.response?.data) {
          const apiError: ApiError = error.response.data;
          throw new Error(apiError.error?.error || 'API Error');
        }
        throw error;
      }
    );
  }

  // Инициализация сервиса
  async initialize(config: ApiConfig): Promise<void> {
    this.config = config;
    this.api.defaults.baseURL = config.baseURL;
    this.api.defaults.timeout = config.timeout || 30000;
    
    // Сохраняем конфигурацию
    await AsyncStorage.setItem('apiConfig', JSON.stringify(config));
  }

  // Загрузка сохраненной конфигурации
  async loadSavedConfig(): Promise<boolean> {
    try {
      const savedConfig = await AsyncStorage.getItem('apiConfig');
      if (savedConfig) {
        this.config = JSON.parse(savedConfig);
        if (this.config) {
          this.api.defaults.baseURL = this.config.baseURL;
          this.api.defaults.timeout = this.config.timeout || 30000;
          return true;
        }
      }
    } catch (error) {
      console.error('Error loading saved config:', error);
    }
    return false;
  }

  // Проверка подключения
  async testConnection(): Promise<boolean> {
    try {
      await this.api.get('/entity/organization');
      return true;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }

  // Базовый метод для GET запросов
  private async get<T>(endpoint: string, params?: QueryFilters): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await this.api.get(endpoint, { params });
    return response.data;
  }

  // Базовый метод для POST запросов
  private async post<T>(endpoint: string, data: any): Promise<T> {
    const response: AxiosResponse<T> = await this.api.post(endpoint, data);
    return response.data;
  }

  // Базовый метод для PUT запросов
  private async put<T>(endpoint: string, data: any): Promise<T> {
    const response: AxiosResponse<T> = await this.api.put(endpoint, data);
    return response.data;
  }

  // Базовый метод для DELETE запросов
  private async delete(endpoint: string): Promise<void> {
    await this.api.delete(endpoint);
  }

  // ТОВАРЫ

  // Получить список товаров
  async getProducts(filters?: QueryFilters): Promise<ApiResponse<Product>> {
    return this.get<Product>('/entity/product', filters);
  }

  // Получить товар по ID
  async getProduct(id: string): Promise<Product> {
    const response: AxiosResponse<Product> = await this.api.get(`/entity/product/${id}`);
    return response.data;
  }

  // Создать товар
  async createProduct(product: Partial<Product>): Promise<Product> {
    return this.post<Product>('/entity/product', product);
  }

  // Обновить товар
  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    return this.put<Product>(`/entity/product/${id}`, product);
  }

  // Удалить товар
  async deleteProduct(id: string): Promise<void> {
    return this.delete(`/entity/product/${id}`);
  }

  // КОНТРАГЕНТЫ

  // Получить список контрагентов
  async getCounterparties(filters?: QueryFilters): Promise<ApiResponse<Counterparty>> {
    return this.get<Counterparty>('/entity/counterparty', filters);
  }

  // Получить контрагента по ID
  async getCounterparty(id: string): Promise<Counterparty> {
    const response: AxiosResponse<Counterparty> = await this.api.get(`/entity/counterparty/${id}`);
    return response.data;
  }

  // Создать контрагента
  async createCounterparty(counterparty: Partial<Counterparty>): Promise<Counterparty> {
    return this.post<Counterparty>('/entity/counterparty', counterparty);
  }

  // Обновить контрагента
  async updateCounterparty(id: string, counterparty: Partial<Counterparty>): Promise<Counterparty> {
    return this.put<Counterparty>(`/entity/counterparty/${id}`, counterparty);
  }

  // ОТГРУЗКИ (ПРОДАЖИ)

  // Получить список отгрузок
  async getDemands(filters?: QueryFilters): Promise<ApiResponse<Demand>> {
    return this.get<Demand>('/entity/demand', filters);
  }

  // Получить отгрузку по ID
  async getDemand(id: string): Promise<Demand> {
    const response: AxiosResponse<Demand> = await this.api.get(`/entity/demand/${id}?expand=positions`);
    return response.data;
  }

  // Создать отгрузку
  async createDemand(demand: Partial<Demand>): Promise<Demand> {
    return this.post<Demand>('/entity/demand', demand);
  }

  // Обновить отгрузку
  async updateDemand(id: string, demand: Partial<Demand>): Promise<Demand> {
    return this.put<Demand>(`/entity/demand/${id}`, demand);
  }

  // Получить позиции отгрузки
  async getDemandPositions(demandId: string): Promise<ApiResponse<DemandPosition>> {
    return this.get<DemandPosition>(`/entity/demand/${demandId}/positions`);
  }

  // Добавить позицию в отгрузку
  async addDemandPosition(demandId: string, position: Partial<DemandPosition>): Promise<DemandPosition> {
    return this.post<DemandPosition>(`/entity/demand/${demandId}/positions`, position);
  }

  // ПРИЕМКИ

  // Получить список приемок
  async getSupplies(filters?: QueryFilters): Promise<ApiResponse<Supply>> {
    return this.get<Supply>('/entity/supply', filters);
  }

  // Получить приемку по ID
  async getSupply(id: string): Promise<Supply> {
    const response: AxiosResponse<Supply> = await this.api.get(`/entity/supply/${id}?expand=positions`);
    return response.data;
  }

  // Создать приемку
  async createSupply(supply: Partial<Supply>): Promise<Supply> {
    return this.post<Supply>('/entity/supply', supply);
  }

  // Обновить приемку
  async updateSupply(id: string, supply: Partial<Supply>): Promise<Supply> {
    return this.put<Supply>(`/entity/supply/${id}`, supply);
  }

  // Получить позиции приемки
  async getSupplyPositions(supplyId: string): Promise<ApiResponse<SupplyPosition>> {
    return this.get<SupplyPosition>(`/entity/supply/${supplyId}/positions`);
  }

  // Добавить позицию в приемку
  async addSupplyPosition(supplyId: string, position: Partial<SupplyPosition>): Promise<SupplyPosition> {
    return this.post<SupplyPosition>(`/entity/supply/${supplyId}/positions`, position);
  }

  // ОРГАНИЗАЦИИ

  // Получить список организаций
  async getOrganizations(filters?: QueryFilters): Promise<ApiResponse<Organization>> {
    return this.get<Organization>('/entity/organization', filters);
  }

  // СКЛАДЫ

  // Получить список складов
  async getStores(filters?: QueryFilters): Promise<ApiResponse<Store>> {
    return this.get<Store>('/entity/store', filters);
  }

  // Поиск по всем сущностям
  async search(query: string, entityTypes?: string[]): Promise<any> {
    const searchParams = {
      search: query,
      limit: 20
    };

    if (entityTypes && entityTypes.length > 0) {
      // Поиск по конкретным типам сущностей
      const results = await Promise.all(
        entityTypes.map(async (type) => {
          try {
            const response = await this.get(`/entity/${type}`, searchParams);
            return { type, data: response };
          } catch (error) {
            console.error(`Error searching ${type}:`, error);
            return { type, data: { rows: [] } };
          }
        })
      );
      return results;
    } else {
      // Поиск только по товарам по умолчанию
      return this.getProducts(searchParams);
    }
  }
}

// Создаем единственный экземпляр сервиса
export const apiService = new MoySkladApiService();
export default apiService;