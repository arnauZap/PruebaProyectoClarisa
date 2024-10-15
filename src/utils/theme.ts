import COLORS from "../constants/COLORS"
import { Theme } from "../interfaces/Theme"

// Función para obtener el tema según la luminosidad de un color dado
export function getThemeByColor(color: string): Theme {
    // Convierte el color hexadecimal a RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    // Calcula la luminosidad del color
    const luminosity = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  
    // Si la luminosidad es baja, devuelve el tema oscuro, de lo contrario, devuelve el tema claro
    return luminosity < 128 ? COLORS.dark : COLORS.light;
  }