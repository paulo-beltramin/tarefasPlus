import styles from './style.module.scss'
const Header = () => {
  return (
    <>
      <header className={styles.container}>
        <p>
            Tarefas <span>+</span>
        </p>

        <div className={styles.container__saudation}>
            <p>
                Olá paulo
            </p>
        </div>
      </header>
    </>
  )
}

export default Header