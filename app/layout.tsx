// app/layout.tsx
import type { Metadata } from "next";
import './globals.css'; // Importa tus estilos globales

export const metadata: Metadata = {
  title: "Ejemplo Patrón Facade con Next.js",
  description: "Demostración de Facade Pattern en TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {/* Aquí se renderizará tu componente page.tsx */}
        {children}
      </body>
    </html>
  );
}