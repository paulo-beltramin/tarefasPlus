import { getDocs, collection, getDoc } from 'firebase/firestore';
import { db } from '@/service/db';

import logo from '../../public/logo_tasks.png'
import Image from "next/image";
import styles from '@/styles/Home.module.scss'
import { GetStaticProps } from 'next';


type HomeProps = {
  task: number,
  coment: number,
}

export default function Home({ task, coment }: HomeProps) {

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
            <button>+ {task} posts</button>
            <button>+ {coment} comentários</button>
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {


  const taskRef = collection(db, 'tarefas')
  const comentsRef = collection(db, 'comments')

  const posts = await getDocs(taskRef)
  const coment = await getDocs(comentsRef)


  return {
    props: {
      task: posts.size || 0,
      coment: coment.size || 0,

    }
  }
}
