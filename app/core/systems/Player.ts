import { World } from "./World";
export class Player {
  spawn(world: World) {
    if (!world.isTerrainGenerated()) {
      throw new Error(
        "Error: No se puede spawnear al jugador sin terreno generado."
      );
    }
    return "Spawneando al jugador en el mundo.";
  }
}
