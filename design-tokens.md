# Hexmet — Design Tokens & Assets

> Para usar en Antigravity o cualquier frontend.

---

## 1. Paleta de Colores

| Token | Hex | RGB | Uso |
|-------|-----|-----|-----|
| `--bg-dark` | `#0D0524` | `rgb(13, 5, 36)` | Fondo base, footer |
| `--bg-gradient-start` | `#1A0A3E` | `rgb(26, 10, 62)` | Gradiente fondo (tope) |
| `--gold-primary` | `#D4A843` | `rgb(212, 168, 67)` | Botones, bordes, acentos principales |
| `--gold-light` | `#F0D78C` | `rgb(240, 215, 140)` | Brillo, hover, reflejos |
| `--gold-dark` | `#B8922F` | `rgb(184, 146, 47)` | Sombras doradas |
| `--gold-shadow` | `#7A5E1E` | `rgb(122, 94, 30)` | Sombra profunda metálica |
| `--white` | `#FFFFFF` | `rgb(255, 255, 255)` | Texto principal |
| `--text-muted` | `#A0A0B0` | `rgb(160, 160, 176)` | Texto secundario |
| `--card-bg` | `#11072E` | `rgb(17, 7, 46)` | Fondo de tarjetas |
| `--border-subtle` | `#2A1A4E` | `rgb(42, 26, 78)` | Bordes suaves |

### Gradientes

**Fondo principal:**
```
background: linear-gradient(135deg, #1A0A3E 0%, #0D0524 100%);
```

**Dorado metálico (logos, acentos):**
```
background: linear-gradient(135deg, #FFFFFF 0%, #FFF5D6 10%, #D4A843 30%, #B8922F 70%, #7A5E1E 100%);
```

**Dorado sólido (botones):**
```
background: linear-gradient(135deg, #D4A843 0%, #F0D78C 100%);
```

---

## 2. Tipografía

| Elemento | Fuente | Peso | Tamaño | Color |
|----------|--------|------|--------|-------|
| Título hero | Montserrat | Black 900 | 3.5rem - 5rem | `#FFFFFF` |
| Títulos sección | Montserrat | Black 900 | 2rem - 3rem | `#FFFFFF` |
| Subtítulos | Montserrat | Light 300 | 1.1rem - 1.3rem | `#D4A843` |
| Cuerpo | Montserrat | Light 300 | 1rem | `#FFFFFF` / `#A0A0B0` |
| Botones | Montserrat | Bold 700 | 1rem - 1.1rem | `#0D0524` |
| Tags / Labels | Montserrat | SemiBold 600 | 0.75rem | `#D4A843` |

**Fallback:** Poppins, Arial, sans-serif

**Carga:** Google Fonts → `Montserrat:wght@300;600;700;900`

---

## 3. Botones

### Botón Primario (Dorado)
```
background: linear-gradient(135deg, #D4A843, #F0D78C);
color: #0D0524;
font-weight: 700;
padding: 14px 32px;
border-radius: 8px;
border: none;
cursor: pointer;
transition: all 0.3s;
```

**Hover:** Brillo adicional + sombra dorada
```
box-shadow: 0 0 20px rgba(212, 168, 67, 0.4);
transform: translateY(-2px);
```

### Botón Secundario (Outline)
```
background: transparent;
color: #D4A843;
border: 1.5px solid #D4A843;
padding: 14px 32px;
border-radius: 8px;
cursor: pointer;
transition: all 0.3s;
```

**Hover:**
```
background: rgba(212, 168, 67, 0.1);
box-shadow: 0 0 15px rgba(212, 168, 67, 0.2);
```

---

## 4. Tarjetas / Cards

```
background: #11072E;
border: 1px solid #2A1A4E;
border-radius: 12px;
padding: 2rem;
transition: all 0.3s;
```

**Hover:**
```
border-color: #D4A843;
box-shadow: 0 0 30px rgba(212, 168, 67, 0.1);
transform: translateY(-4px);
```

---

## 5. Efectos Visuales

### Sombra dorada (para logos, hexágonos, elementos destacados)
```
filter: drop-shadow(0 0 20px rgba(212, 168, 67, 0.3));
```

### Brillo dorado animado (para CTAs)
```
@keyframes goldPulse {
  0%, 100% { box-shadow: 0 0 15px rgba(212, 168, 67, 0.3); }
  50% { box-shadow: 0 0 30px rgba(212, 168, 67, 0.6); }
}
```

---

## 6. Layout

- **Max width contenido:** 1200px, centrado
- **Padding secciones:** 80px-120px vertical
- **Gap entre tarjetas:** 24px-32px
- **Border radius general:** 8px-12px
- **Transiciones:** 0.3s ease en hover, scroll reveal con fade-in + translateY(20px)

---

## 7. Assets (Logos)

| Archivo | Ubicación | Uso |
|---------|-----------|-----|
| `hexmet-icon.svg` | `~/hexmet/assets/` | Icono hexagonal sin texto (favicon, avatar, hero visual) |
| `hexmet-horizontal.svg` | `~/hexmet/assets/` | Logo + "HEXMET" horizontal (header, footer) |
| `hexmet-icon.png` | `~/hexmet/assets/` | Versión PNG del icono (2000px) |
| `hexmet-horizontal.png` | `~/hexmet/assets/` | Versión PNG del horizontal (2000px) |
| `hexmet-stacked.svg` | `~/hexmet/assets/` | Hexágono arriba + "HEXMET" abajo (recomendado para landing) |
| `hexmet-stacked.png` | `~/hexmet/assets/` | Versión PNG del stacked (1000px) |

**Nota:** Copiar los SVG directamente al proyecto. No requieren dependencias.

---

## 8. Animaciones Recomendadas

- **Scroll reveal:** Elementos aparecen con `opacity: 0 → 1` y `translateY(30px) → 0`
- **Hero:** Partículas hexagonales flotando (opcional, CSS puro o librería ligera)
- **Logo hero:** Rotación lenta infinita (10-15s por giro)
- **Tarjetas:** Hover con elevación + brillo en borde
- **Botones:** Pulse dorado sutil en CTA principal
