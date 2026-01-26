# Saian Sushi - Landing Page

Página de aterrizaje premium para Saian Sushi con Constructor de Rolls personalizado e integración con WhatsApp.

## Características

- 🎨 Diseño Dark Mode Premium (#0a0a0a)
- 🍣 Constructor de Rolls Personalizado
- 🛒 Sistema de Carrito Inteligente
- 📱 Optimizado Mobile-First
- 💬 Integración con WhatsApp
- ✨ Animaciones con Framer Motion
- 🎯 Experiencia tipo App de Delivery

## Tecnologías

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React Icons

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

```
sushi/
├── app/
│   ├── layout.tsx       # Layout principal
│   ├── page.tsx         # Página principal con Hero y lógica del carrito
│   └── globals.css      # Estilos globales y utilidades
├── components/
│   ├── Menu.tsx         # Grid del menú con productos
│   ├── RollBuilder.tsx  # Modal de personalización de rolls
│   └── Cart.tsx         # Carrito lateral con checkout
└── public/             # Imágenes estáticas
```

## Menú de Productos

- **Hand Roll** (1 ud): $4.000
- **Hand Roll XL** (1 ud): $5.000
- **Promo Saian 1** (48 pzs): $18.500
- **Promo Super Saian 2** (60 pzs): $22.500
- **Promo Super Saian 3** (70 pzs): $25.500
- **Delivery**: $1.000 (fijo)

## Personalización de Rolls

### Proteínas
- Pollo
- Carne Mechada
- Camarón
- Salmón
- Kanikama

### Vegetales (máx. 2)
- Palta
- Cebollín
- Queso Crema
- Champignon

### Coberturas
- Panko
- Tempura
- Sésamo
- Palta
- Ciboulette

## WhatsApp

Los pedidos se envían automáticamente al número configurado con el formato:

```
Hola Saian Sushi! 🍣 Quiero pedir:
- 1x Hand Roll XL (Pollo, Palta, Cebollín, Panko) - $5.000
- 1x Promo Saian 1 - $18.500
Delivery: $1.000
Total: $24.500

Datos: Diego, Calle Falsa 123, +56 9 1234 5678
```

## Licencia

Privado - Saian Sushi © 2026
