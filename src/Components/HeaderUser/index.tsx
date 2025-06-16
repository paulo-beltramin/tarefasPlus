import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

import styles from './style.module.scss'


const HeaderUser = () => {

    const { data: session, status } = useSession()

    return (
        <div>
            <header className={styles.container}>
                <div className={styles.container__logo}>
                    <div className={styles.container__logo__items}>

                        <p>
                            <Link href={'/'}>
                                Tarefas 
                            </Link>

                            <span>+</span>
                        </p>

                        {session?.user?.email && (
                            <Link href={'/admin'}>
                                <button >
                                    Meu painel
                                </button>
                            </Link>
                        )}

                    </div>
                </div>

                {status === 'loading' ? (
                    <div>

                    </div>
                ) : session ? (

                    <div className={styles.container__saudation} onClick={() => signOut()}>

                        <p title='Deslogar'>
                            Olá {session.user?.name}
                        </p>
                    </div>
                ) : (
                    <div className={styles.container__saudation} onClick={() => signIn("google")}>
                        <p title='Logar'>
                            Login
                        </p>
                    </div>
                )}
            </header>
        </div>
    )
}

export default HeaderUser

