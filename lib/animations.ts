export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const fadeIn = (direction: string, type: string, delay: number, duration: number) => ({
  hidden: {
    x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
    y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
    opacity: 0
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: type || 'spring',
      delay,
      duration: duration || 0.5,
      ease: 'easeOut',
      damping: 15,
      stiffness: 200
    }
  }
});

export const feature = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 250,
      damping: 18,
      mass: 0.8
    }
  }
};

export const slideIn = (direction: string, type: string, delay: number, duration: number) => ({
  hidden: {
    x: direction === 'left' ? '-50%' : direction === 'right' ? '50%' : 0,
    y: direction === 'up' ? '50%' : direction === 'down' ? '50%' : 0,
    opacity: 0
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: type || 'spring',
      delay,
      duration: duration || 0.5,
      ease: 'easeOut',
      damping: 15,
      stiffness: 150
    }
  }
});

export const scale = (delay: number, duration: number) => ({
  hidden: { scale: 0.9, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      delay: delay || 0,
      duration: duration || 0.5,
      ease: 'easeOut',
      damping: 15,
      stiffness: 250
    }
  }
});
