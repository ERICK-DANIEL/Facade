export class World {
  private terrainGenerated: boolean = false;

  generateTerrain() {
    this.terrainGenerated = true;
    return "Generando terreno.";
  }

  isTerrainGenerated() {
    return this.terrainGenerated;
  }
}
