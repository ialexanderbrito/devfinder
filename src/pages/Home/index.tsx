import { Header } from 'components/Header';

import CompanyIcon from 'assets/icon-company.svg';
import LocationIcon from 'assets/icon-location.svg';
import TwitterIcon from 'assets/icon-twitter.svg';
import LinkIcon from 'assets/icon-website.svg';

import { useGithub } from 'contexts/Github';
import { useTheme } from 'contexts/Theme';

import styles from './Home.module.scss';

export function Home() {
  const { theme } = useTheme();
  const {
    user,
    handleChangeUsername,
    handlePressEnter,
    username,
    getUserGithub,
  } = useGithub();

  return (
    <>
      <div className={styles.container} data-theme={theme}>
        <Header />
        <div className={styles.pesquisar}>
          <label className={styles.pesquisarLabel} htmlFor="input">
            <input
              type="text"
              className={styles.input}
              placeholder="Pesquise um usuário do Github"
              onChange={handleChangeUsername}
              value={username}
              onKeyPress={(e) => {
                handlePressEnter(e);
              }}
            />
          </label>
          <button
            type="button"
            className={styles.pesquisarButton}
            onClick={() => {
              getUserGithub();
            }}
          >
            Pesquisar
          </button>
        </div>

        <div className={styles.userContainer}>
          <div className={styles.user}>
            <div key={user?.id} className={styles.userHeader}>
              <img
                src={user?.avatar_url}
                alt={user?.login}
                className={styles.avatar}
              />
              <div className={styles.infoWrapper}>
                <div className={styles.profileName}>
                  <h2>
                    {user?.login}
                    {user?.type === 'Organization' ? (
                      <img src={CompanyIcon} alt="Organização" />
                    ) : null}
                  </h2>
                  <p>{user?.name}</p>
                </div>
                <p>
                  Entrou{' '}
                  {user?.created_at
                    ? new Intl.DateTimeFormat(navigator.language).format(
                        new Date(user.created_at),
                      )
                    : ''}
                </p>
              </div>
            </div>
            {user?.bio ? (
              <p className={styles.bio}>{user?.bio}</p>
            ) : (
              <p className={styles.bio}>Este perfil não tem biografia</p>
            )}

            <div className={styles.userStatsContainer}>
              <div className={styles.userStats}>
                <p className={styles.statsTitle}>Repos</p>
                <p className={styles.statsValue}>{user?.public_repos}</p>
              </div>
              <div className={styles.userStats}>
                <p className={styles.statsTitle}>Seguidores</p>
                <p className={styles.statsValue}>{user?.followers}</p>
              </div>
              <div className={styles.userStats}>
                <p className={styles.statsTitle}>Seguindo</p>
                <p className={styles.statsValue}>{user?.following}</p>
              </div>
            </div>
            <div className={styles.userBottom}>
              <div className={styles.userInfo}>
                <div className={styles.iconBottom}>
                  <img src={LocationIcon} alt="Localidade" />
                </div>
                <p>{user?.location ? user?.location : 'Sem localidade'}</p>
              </div>
              <div className={styles.userInfo}>
                <div className={styles.iconBottom}>
                  <img src={LinkIcon} alt="Site" />
                </div>
                <p>
                  {user?.blog ? (
                    <a
                      href={user.blog}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.blog.replace(/https?:\/\//i, '')}
                    </a>
                  ) : (
                    'Sem site'
                  )}
                </p>
              </div>
              <div className={styles.userInfo}>
                <div className={styles.iconBottom}>
                  <img src={TwitterIcon} alt="Twitter" />
                </div>
                <p>
                  {user?.twitter_username
                    ? `@${user?.twitter_username}`
                    : 'Sem twitter'}
                </p>
              </div>
              <div className={styles.userInfo}>
                <div className={styles.iconBottom}>
                  <img src={CompanyIcon} alt="Company" />
                </div>
                <p>{user?.company ? user?.company : 'Sem empresa'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
