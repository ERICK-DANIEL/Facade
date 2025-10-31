// app/facade-example/modules.ts

/** * Clase 1: Sistema de Inicialización 
 */
export class InitSystem {
  public initialize(): string {
    return "✅ Inicializando sistema de mundo...";
  }

  public shutdown(): string {
    return "🛑 Apagando sistema de inicialización.";
  }
}

/** * Clase 2: Generador de Terreno 
 */
export class TerrainGenerator {
  public generateBiomes(): string {
    return "🌍 Generando biomas y estructuras...";
  }

  public buildTerrain(): string {
    return "⛏️ Construyendo terreno y elevaciones...";
  }
}

/** * Clase 3: Gestor de Recursos 
 */
export class ResourceManager {
  public loadAssets(): string {
    return "📦 Cargando texturas y modelos...";
  }

  public checkDependencies(): string {
    return "🔗 Verificando dependencias del motor...";
  }
}

/**
 * Patrón FACADE: Fachada de Carga de Mundo
 * Proporciona una interfaz simple y única para interactuar con el subsistema.
 */
export class WorldLoaderFacade {
  private initSystem: InitSystem;
  private terrainGenerator: TerrainGenerator;
  private resourceManager: ResourceManager;

  constructor() {
    this.initSystem = new InitSystem();
    this.terrainGenerator = new TerrainGenerator();
    this.resourceManager = new ResourceManager();
  }

  /**
   * MÉTODOS SIMPLIFICADOS (EL BUEN USO)
   */
  public loadWorld(): string[] {
    const log: string[] = [];
    log.push("--- FACADE: INICIO DE CARGA DE MUNDO ---");
    log.push(this.initSystem.initialize());
    log.push(this.resourceManager.loadAssets());
    log.push(this.resourceManager.checkDependencies());
    log.push(this.terrainGenerator.generateBiomes());
    log.push(this.terrainGenerator.buildTerrain()); // Esta es la fase clave que queremos mostrar
    log.push("--- FACADE: CARGA COMPLETA ---");
    return log;
  }

  public unloadWorld(): string[] {
    const log: string[] = [];
    log.push("--- FACADE: INICIO DE DESCARGA ---");
    log.push(this.initSystem.shutdown());
    log.push("--- FACADE: DESCARGA COMPLETA ---");
    return log;
  }
}