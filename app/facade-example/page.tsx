// app/facade-example/page.tsx
"use client";

import { useState } from 'react';
import { WorldLoaderFacade, InitSystem, TerrainGenerator, ResourceManager } from './modules';
import styles from './styles.module.css';

// ------------------------------------
// 1. MAL USO (Sin Facade) - Alto Acoplamiento
// El cliente interactúa directamente con múltiples clases del subsistema.
// ------------------------------------
function badUsageLoadWorld(): string[] {
  const log: string[] = [];
  log.push(styles.title, "--- MAL USO: CARGA DIRECTA ---");
  try {
    const initSystem = new InitSystem();
    const generator = new TerrainGenerator();
    const resources = new ResourceManager();

    log.push(initSystem.initialize());
    log.push(resources.loadAssets());
    log.push(resources.checkDependencies());
    log.push(generator.generateBiomes());
    log.push(generator.buildTerrain()); // La lógica de orden está en el cliente
    log.push("--- MAL USO: CARGA COMPLETA ---");
  } catch (error) {
    log.push(styles.error, "ERROR en el subsistema (¡Lógica compleja!)");
  }
  return log;
}

// ------------------------------------
// 2. BUEN USO (Con Facade) - Bajo Acoplamiento
// El cliente interactúa solo con WorldLoaderFacade.
// ------------------------------------
function goodUsageLoadWorld(): string[] {
  const facade = new WorldLoaderFacade();
  const log: string[] = [];
  log.push(styles.title, "--- BUEN USO: CARGA CON FACADE ---");
  try {
    const facadeLog = facade.loadWorld(); // Una simple llamada
    log.push(...facadeLog);
  } catch (error) {
    log.push(styles.error, "ERROR en el Fachada");
  }
  return log;
}


export default function FacadeExamplePage() {
  const [log, setLog] = useState<string[]>([]);
  const [isFacade, setIsFacade] = useState<boolean>(true);

  const handleLoad = () => {
    setLog([]); // Limpiar log
    setTimeout(() => {
      const newLog = isFacade ? goodUsageLoadWorld() : badUsageLoadWorld();
      setLog(newLog);
    }, 100);
  };

  const currentStatus = log.includes("⛏️ Construyendo terreno y elevaciones...") ? "Building terrain" : "Generating world";

  return (
    <div className={styles.container}>
      <h1 className={styles.minecraftLogo}>MINECRAFT</h1>
      
      <div className={styles.loadingBox}>
        <div className={styles.loadingHeader}>
          {currentStatus === "Generating world" ? "Generating world" : currentStatus}
        </div>
        
        <div className={styles.loadingContent}>
          <p className={styles.title}>Simulación de Patrón Facade</p>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '20px' }}>
              <input 
                type="radio" 
                checked={isFacade} 
                onChange={() => setIsFacade(true)} 
                style={{ marginRight: '5px' }}
              />
              **BUEN USO (Facade)**
            </label>
            <label>
              <input 
                type="radio" 
                checked={!isFacade} 
                onChange={() => setIsFacade(false)} 
                style={{ marginRight: '5px' }}
              />
              **MAL USO (Directo)**
            </label>
          </div>
          
          <button 
            onClick={handleLoad} 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#555555', 
              color: 'white', 
              border: '2px solid #333333', 
              cursor: 'pointer', 
              boxShadow: '2px 2px 0px 0px #333333',
              marginBottom: '15px'
            }}
          >
            {isFacade ? "Cargar Mundo con Fachada" : "Cargar Mundo Directamente"}
          </button>
          
          <div className={styles.title}>Registro de Procesos:</div>
          {log.map((item, index) => (
            <p key={index} className={item.includes("ERROR") ? styles.error : styles.logItem}>
              {item.includes(styles.title) ? item.replace(styles.title, '') : item}
            </p>
          ))}
          {log.length === 0 && <p className={styles.logItem}>Presiona el botón para iniciar la carga.</p>}

        </div>
      </div>
      
      <p style={{ marginTop: '20px', fontSize: '0.85rem' }}>
        El **Facade** (Buen Uso) oculta la complejidad, el **Mal Uso** expone las 3 clases (`InitSystem`, `TerrainGenerator`, `ResourceManager`) al cliente.
      </p>
    </div>
  );
}