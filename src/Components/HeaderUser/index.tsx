import styles from './style.module.scss'
const HeaderUser = () => {
    return (
        <div>
            <header className={styles.container}>
                <div className={styles.container__logo}>
                    <p>
                        Tarefas <span>+</span>
                    </p>

                    <button>
                        Meu painel
                    </button>
                </div>

                <div className={styles.container__saudation}>
                    <p>
                        Olá Paulo
                    </p>
                </div>
            </header>
        </div>
    )
}

export default HeaderUser