# 3. Escala de cores

Convenção **50→950** (50 claro → 950 escuro), base da marca no **500**. Gerada em HCT, verificada em APCA.

## Categorias
- **Primária/Secundária (marca):** `magenta` (500 = `#F10081`) · `acid` (lime)
- **Neutros:** `neutral` 50 (quase branco) → 950 (quase preto)
- **Semânticas (ramps próprias, separadas da marca):** `success` (verde) · `warning` (âmbar) · `error` (vermelho)

## Paleta

| step | magenta | acid | neutral | success | warning | error |
|--|--|--|--|--|--|--|
| **50** | `#FFFFFF` | `#B9FFA6` | `#FFF4F5` | `#B2FFC9` | `#FFF6D9` | `#FFFAF7` |
| **100** | `#FFEEF6` | `#83FF62` | `#F4E8EA` | `#73FFA7` | `#FFE8B9` | `#FFEAE5` |
| **200** | `#FFD0E2` | `#52F617` | `#E0D4D6` | `#4DF390` | `#FFCE7C` | `#FFCEC5` |
| **300** | `#FFA7C7` | `#32DC00` | `#C6BCBD` | `#26D97A` | `#FFAA00` | `#FFA79A` |
| **400** | `#FF64A4` | `#00B800` | `#A59B9D` | `#00B75C` | `#E38A00` | `#FF685B` |
| **500** | `#F10081` | `#009200` | `#837A7B` | `#009143` | `#B86A00` | `#DD463D` |
| **600** | `#CF006A` | `#007800` | `#6C6465` | `#007736` | `#9C5400` | `#BE3029` |
| **700** | `#AD0057` | `#006100` | `#585052` | `#00602A` | `#844000` | `#A21A18` |
| **800** | `#870042` | `#004900` | `#433C3D` | `#00481E` | `#692C00` | `#830006` |
| **900** | `#63002E` | `#003205` | `#2F282A` | `#003113` | `#4D1B00` | `#640000` |
| **950** | `#45001C` | `#001F03` | `#1E1819` | `#001E0A` | `#311100` | `#450000` |

## Notas
- `magenta-50` = `#FFFFFF` (gamut no tom mais claro); fundos usam `neutral-50` levemente tintado.
- Verde semântico (`success`) é independente do `acid` da marca, para não confundir feedback com brand.
- Decorativo/iridescente usa magenta/acid livremente; nunca atrás de texto.
