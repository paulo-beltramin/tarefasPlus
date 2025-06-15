
import logo from '../../public/logo_tasks.png'
import Image from "next/image";
import styles from '@/styles/Home.module.scss'

export default function Home() {
  return (
    <>
   

      <head>
        <title>Home</title>
      </head>

      <main className={styles.container}>
            <Image
            src={logo}
            alt="logo da pagina home"
          />

            <div>
               <p>
                Sistema feito para você organizar seus estudos e terefas
               </p>

               <div className={styles.container__btn}>
                <button>+ 7mil posts</button>
                <button>+ 1 mil comentários</button>
               </div>
            </div>
      </main>
    </>
  );
}
