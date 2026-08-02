/**
 * Bloqueo de scroll compartido y con contador.
 *
 * Varios componentes (loader de arranque, menú móvil) necesitan bloquear el
 * scroll del `body` a la vez. Si cada uno guarda/restaura `overflow` por su
 * cuenta, sus ciclos de vida se solapan y uno puede restaurar `'hidden'` en
 * lugar del valor original → el scroll queda bloqueado hasta refrescar.
 *
 * Con un único contador global: solo se aplica `overflow:hidden` en el primer
 * lock y solo se restaura el valor original cuando se liberan TODOS los locks.
 */

let lockCount = 0;
let savedOverflow = '';

export function lockScroll() {
  if (typeof document === 'undefined') return;
  if (lockCount === 0) {
    savedOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  lockCount += 1;
}

export function unlockScroll() {
  if (typeof document === 'undefined') return;
  if (lockCount === 0) return;
  lockCount -= 1;
  if (lockCount === 0) {
    document.body.style.overflow = savedOverflow;
  }
}
