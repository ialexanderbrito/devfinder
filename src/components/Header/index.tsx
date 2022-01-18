import MoonIcon from 'assets/icon-moon.svg';
import SunIcon from 'assets/icon-sun.svg';

import { useTheme } from 'contexts/Theme';

import styles from './Header.module.scss';

export function Header() {
  const { switchTheme, theme } = useTheme();

  return (
    <>
      <header className={styles.header}>
        <h1>devfinder</h1>
        <div
          className={styles.mode}
          onClick={() => {
            switchTheme();
          }}
        >
          {theme === 'light' ? (
            <>
              <p className={styles.theme}>dark</p>
              <img src={MoonIcon} alt="Lua" />
            </>
          ) : (
            <>
              <p className={styles.theme}>light</p>
              <img src={SunIcon} alt="Sol" />
            </>
          )}
        </div>
      </header>
    </>
  );
}
