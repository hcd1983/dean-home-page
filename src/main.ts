import 'normalize.css';
// import 'material-icons/iconfont/material-icons.css';
import 'material-icons/iconfont/filled.css';
import './style.css';

const menuButton = document.querySelector('.menu-button');
const closeButton = document.querySelector('.close-button');
const header = document.querySelector('#header');
const navLinks = document.querySelectorAll('#header nav ul li a');
const main = document.querySelector('main') as HTMLElement;
const animationTexts = Array.from(
  document.querySelectorAll('.animation-text')
) as HTMLElement[];
// debounce
const debounce = (func: () => void, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
};

const getRandomChar = (char: string) => {
  // 如果是空格，直接返回空格
  if (char === ' ') return ' ';

  // 生成随机字母
  const randomIndex = Math.floor(Math.random() * 26);
  const randomChar = String.fromCharCode(
    char === char.toUpperCase() ? 65 + randomIndex : 97 + randomIndex
  );
  return randomChar;
};

const openMenu = () => {
  header?.classList.add('open');
};

const closeMenu = () => {
  header?.classList.remove('open');
};

menuButton?.addEventListener('click', openMenu);
closeButton?.addEventListener('click', closeMenu);

const createTextAnimation = (target: HTMLElement): number => {
  const originalText = (target.textContent || '').replace(/\s+/g, ' ');
  const textSyncStop = target.dataset.textSyncStop === 'true' || false;
  const changeTxtInterval = target.dataset.textInterval
    ? Number(target.dataset.textInterval)
    : 40;
  const minChangeTxtTimes = target.dataset.textMinChangeTimes
    ? Number(target.dataset.textMinChangeTimes)
    : 5;
  const dataTxtTimesOffset = target.dataset.textTimesOffset
    ? Number(target.dataset.textTimesOffset)
    : 3;
  const changeTxtTimesOffset = textSyncStop ? 0 : dataTxtTimesOffset;

  let textChangedTimes = 0;
  const randomTxtInterval = setInterval(() => {
    let text = '';
    for (let i = 0; i < originalText.length; i++) {
      if (
        textChangedTimes >= minChangeTxtTimes + i * changeTxtTimesOffset ||
        originalText[i] === ' '
      ) {
        text += originalText[i];
      } else {
        text += getRandomChar(originalText[i]);
      }
    }
    console.log('text', text);
    target.textContent = text;
    if (text === originalText) {
      clearInterval(randomTxtInterval);
    }
    textChangedTimes++;
  }, changeTxtInterval);
  return randomTxtInterval;
};

// detect animation text in view port and start animation
animationTexts.forEach((target) => {
  // add target property to observer
  let animationEnd = false;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!animationEnd) {
            createTextAnimation(target);
            animationEnd = true;
          }
        }
      });
    },
    { threshold: 1 }
  );
  observer.observe(target);
});

// navLinks.forEach((link) => {
//   link.addEventListener('click', closeMenu);
//   link.addEventListener('mouseenter', () => {
//     const originalTxt = link.textContent || '';
//     const interval = createTextAnimation(link as HTMLElement);
//     link.addEventListener('mouseleave', () => {
//       link.textContent = originalTxt;
//       clearInterval(interval);
//     });
//   });
// });

const onScrollEvents = (
  target: HTMLElement,
  options: {
    handleScroll?: () => void | null;
    handleStop?: () => void | null;
    handleScrollDown?: () => void | null;
    handleScrollUp?: () => void | null;
  }
) => {
  const { handleScroll, handleStop, handleScrollDown, handleScrollUp } =
    options;
  let isScrolling: number | null = null;
  let lastScroll = 0;
  target?.addEventListener('scroll', () => {
    let currentScroll = target.scrollTop;
    handleScroll && handleScroll();
    if (currentScroll > lastScroll) {
      handleScrollDown && handleScrollDown();
    } else {
      handleScrollUp && handleScrollUp();
    }
    lastScroll = currentScroll;
    if (isScrolling !== null) {
      clearTimeout(isScrolling);
    }
    isScrolling = setTimeout(() => {
      isScrolling = null;
      handleStop && handleStop();
    }, 300);
  });
};

onScrollEvents(main, {
  handleScroll: () => {
    header?.classList.add('minimized');
  },
  handleStop: () => {
    header?.classList.remove('minimized');
  },
});

// const createDebouncedScrollHandler = () => {
//   let lastScroll = 0;
//   const triggerPx = 50;
//   return debounce(() => {
//     let currentScroll = main.scrollTop;
//     if (currentScroll > lastScroll && currentScroll > triggerPx) {
//       header?.classList.add('minimized');
//     } else {
//       header?.classList.remove('minimized');
//     }
//     lastScroll = currentScroll;
//   }, 100);
// };

// const debouncedScroll = createDebouncedScrollHandler();
// main?.addEventListener('scroll', debouncedScroll)
