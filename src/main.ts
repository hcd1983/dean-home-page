import 'normalize.css'
// import 'material-icons/iconfont/material-icons.css';
import 'material-icons/iconfont/filled.css';
import './style.css'


const menuButton = document.querySelector('.menu-button')
const closeButton = document.querySelector('.close-button')
const header = document.querySelector('#header')
const navLinks = document.querySelectorAll('#header nav ul li a')
const main = document.querySelector('main') as HTMLElement;


// debounce
const debounce = (func: () => void, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
};

const openMenu = () => {
  header?.classList.add('open')
}

const closeMenu = () => {
  header?.classList.remove('open')
}

menuButton?.addEventListener('click', openMenu)
closeButton?.addEventListener('click', closeMenu)

navLinks.forEach((link) => {
  link.addEventListener('click', closeMenu)
})

const createDebouncedScrollHandler = () => {
  let lastScroll = 0;
  const triggerPx = 50;
  return debounce(() => {
    let currentScroll = main.scrollTop;
    if (currentScroll > lastScroll && currentScroll > triggerPx) {
      header?.classList.add('minimized')
    } else {
      header?.classList.remove('minimized')
    }
    lastScroll = currentScroll;
  }, 10)
}

const debouncedScroll = createDebouncedScrollHandler();
main?.addEventListener('scroll', debouncedScroll)

// const debouncedScroll = debounce(() => {
//   // const triggerPx = 50;
//   // header?.classList.toggle('minimized', main.scrollTop  > triggerPx || false)
//   let currentScroll = main.scrollTop;
//   if (currentScroll > lastScroll && currentScroll > 50) {
//     header?.classList.add('minimized')
//   } else {
//     header?.classList.remove('minimized')
//   }
//   lastScroll = currentScroll;
// }, 100);


// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
