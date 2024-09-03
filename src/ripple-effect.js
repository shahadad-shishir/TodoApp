export const ripple = {
  init() {
    document.querySelectorAll('.ripple').forEach(el => {
      el.addEventListener('click', e => {
        this.add(el, e);
      });
    });
  },

  add(el, e) {
    if (el.querySelector('.ripple-span')) return;
    const rgbClr = getComputedStyle(el).color;
    const rgbaClr = rgbClr.replace('rgb', 'rgba').replace(')', ', 0.3)');
    const rect = el.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.style.background = rgbaClr;
    ripple.classList.add('ripple-span');
  
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
  
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
  
    el.style.overflow = 'hidden';
    el.appendChild(ripple);
  
    ripple.addEventListener('animationend', () => {
        ripple.remove();
        el.style.overflow = 'visible';
    });
  }
};