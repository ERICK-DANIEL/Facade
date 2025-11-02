import { World } from "./systems/World";
import { Player } from "./systems/Player";
import { Enemy } from "./systems/Enemy";
import { SoundSystem } from "./systems/SoundSystem";

export class GameFacade {
  private world: World;
  private player: Player;
  private enemies: Enemy;
  private sound: SoundSystem;

  constructor() {
    this.world = new World();
    this.player = new Player();
    this.enemies = new Enemy();
    this.sound = new SoundSystem();
  }

  startGame(): string[] {
    return [
      this.world.generateTerrain(),
      this.player.spawn(this.world),
      this.enemies.spawnEnemies(),
      this.sound.playBackgroundMusic(),
    ];
  }
}
