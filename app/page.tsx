"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import MinecraftLogo from "./assets/minecraft.png";
import Window from "./assets/window.png";
import Background from "./assets/Background.jpg";
import Experience from "./assets/experience_bar_background.png";
import styles from "./page.module.css";

// Importar los sistemas individuales o GameFacade aquí
import { GameFacade } from "./core/GameFacade";

export default function HomePageNoFacade() {
  const [currentLine, setCurrentLine] = useState<string>("");
  const delay = 2000;

  useEffect(() => {
    async function simulateGameStart() {
      setCurrentLine("");
      let lines: string[] = [];

      // Usar GameFacade o las clases para iniciar el juego
      const facade = new GameFacade();
      lines = facade.startGame();

      for (const line of lines) {
        setCurrentLine(line);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      setCurrentLine("¡Listo!");
    }

    simulateGameStart();
  }, []);

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
          className={styles.window}
          loading="eager"
        />

        <h2 className={styles.loadingText}>Loading with Facade</h2>

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
