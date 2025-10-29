// Shim для expo-modules-core в веб-среде
export const registerWebModule = (moduleName, moduleObject) => {
  console.log(`Registering web module: ${moduleName}`);
  return moduleObject;
};

// Другие методы которые могут понадобиться
export const EventEmitter = class {
  addListener() {}
  removeListener() {}
  emit() {}
};

export const NativeModulesProxy = {};
export const requireNativeViewManager = () => null;