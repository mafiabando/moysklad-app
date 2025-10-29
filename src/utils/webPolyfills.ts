// Polyfill для registerWebModule в Expo 51 web
declare global {
  interface Window {
    ExpoModulesCore?: any;
  }
}

// Создаем mock для registerWebModule если его нет
if (typeof window !== 'undefined') {
  // Создаем объект ExpoModulesCore если его нет
  if (!window.ExpoModulesCore) {
    window.ExpoModulesCore = {
      registerWebModule: (moduleName: string, moduleObject: any) => {
        console.log(`Registering web module: ${moduleName}`);
        return moduleObject;
      }
    };
  }
  
  // Добавляем registerWebModule если его нет
  if (!window.ExpoModulesCore.registerWebModule) {
    window.ExpoModulesCore.registerWebModule = (moduleName: string, moduleObject: any) => {
      console.log(`Registering web module: ${moduleName}`);
      return moduleObject;
    };
  }

  // Создаем глобальный объект для expo-modules-core
  (window as any)['expo-modules-core'] = window.ExpoModulesCore;
}

export {};