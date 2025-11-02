import { World } from "./systems/World";
import { Player } from "./systems/Player";
import { Enemy } from "./systems/Enemy";
import { SoundSystem } from "./systems/SoundSystem";

export function gameWithoutFacade(): string[] {
  const world = new World();
  const player = new Player();
  const enemies = new Enemy();
  const sound = new SoundSystem();

  return [
    world.generateTerrain(),
    player.spawn(world),
    enemies.spawnEnemies(),
    sound.playBackgroundMusic(),
  ];
}
