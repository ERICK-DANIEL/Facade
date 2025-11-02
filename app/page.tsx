"use client";
import { useEffect, useState } from "react";
import { World } from "./core/systems/World";
import { Player } from "./core/systems/Player";
import { Enemy } from "./core/systems/Enemy";
import { SoundSystem } from "./core/systems/SoundSystem";
import { GameFacade } from "./core/GameFacade";

import Image from "next/image";
import MinecraftLogo from "./assets/minecraft.png";
import Window from "./assets/window.png";
import Background from "./assets/Background.jpg";
import Experience from "./assets/experience_bar_background.png";
import styles from "./page.module.css";

export default function HomePage() {
  const [currentLine, setCurrentLine] = useState<string>("");
  const delay = 2000;
  const USE_FACADE = false;

  useEffect(() => {
    async function simulateGameStart() {
      setCurrentLine("");

      let lines: string[] = [];

      if (USE_FACADE) {
        lines = new GameFacade().startGame();
      } else {
        const world = new World();
        const player = new Player();
        const enemies = new Enemy();
        const sound = new SoundSystem();

        lines = [
          world.generateTerrain(),
          player.spawn(world),
          enemies.spawnEnemies(),
          sound.playBackgroundMusic(),
        ];
      }

      for (const line of lines) {
        setCurrentLine(line);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      setCurrentLine("¡Listo!");
    }

    simulateGameStart();
  }, [USE_FACADE]);

  return (
    <main className={styles.container}>
      <Image
        src={Background}
        alt="Background"
        className={styles.background}
        loading="eager"
      />

      <span className={styles.logo}>
        <Image src={MinecraftLogo} alt="Minecraft Logo" loading="eager" />
      </span>

      <div className={styles.console}>
        <div className={styles.backgroundWindow}></div>
        <Image
          src={Window}
          alt="Window"
          loading="eager"
          className={styles.window}
        />

        <h2 className={styles.loadingText}>
          Loading with {USE_FACADE ? "facade" : "no facade"}
        </h2>

        <p key={currentLine} className={styles.line}>
          {currentLine}
        </p>
        <Image
          src={Experience}
          alt="Experience Bar"
          className={styles.experienceBar}
          loading="eager"
        />
      </div>
    </main>
  );
}
