import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";
import { FormEvent, useState } from "react";
import { MdDelete } from "react-icons/md"

import styles from './styles.module.scss'
import { db } from "@/service/db";

type taskProps = {
  item: {
    tarefas: string,
    public: boolean,
    user: string,
    created: string,
    id: string
  },

  list: commentsProps[]
}

type commentsProps = {
  id: string,
  name: string,
  user: string,
  created: string,
  comment: string
}

const Comentary = ({ item, list }: taskProps) => {

  const { data: session } = useSession()

  const [input, setInput] = useState('')
  const [coment, setComent] = useState<commentsProps[]>(list)




  const handleComment = async (e: FormEvent) => {
    e.preventDefault()

    if(input === ''){
      return 
    }

    if (!session?.user?.email || !session?.user?.name) {
      return;
    }


    try {
      await addDoc(collection(db, 'comments'), {
        comment: input,
        created: new Date().toLocaleDateString(),
        user: session?.user?.email,
        name: session?.user?.name,
        id: item.id
      })

      const data = {
        comment: input,
        created: new Date().toLocaleDateString(),
        user: session?.user?.email,
        name: session?.user?.name,
        id: item.id
      }
      setComent((items) =>
        [...items, data]
      )

      setInput('')
    } catch (error) {
      console.log(error)
    }

  }

  const handleDelete = async (id: string) => {
    try {
      const docRef = doc(db, 'comments', id)

      await deleteDoc(docRef)

      const Delete = coment.filter(item => item.id !== id)

      setComent(Delete)
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <>
      <head>
        <title>Detalhes da tarefa</title>
      </head>
      <main className={styles.container}>

        <form className={styles.container__coment} onSubmit={handleComment}>
          <textarea>{item?.tarefas}</textarea>

          <h2>
            Deixar um comentario
          </h2>

          <div className={styles.container__coment__text}>
            <textarea placeholder='Digite seu comentario'
              value={input} onChange={e => setInput(e.target.value)}
            ></textarea>
          </div>

          <button disabled={!session?.user}>
            Enviar comentario
          </button>

        </form>

        <section className={styles.container__list}>
          <h2>
            Todos os comentarios
          </h2>

          <ul>
            {coment.map((item) => (
              <>
                <li key={item.id}>
                  <p>
                    {item.name}
                  </p>

                  <div className={styles.container__list__li}>
                    <span>
                      {item.comment}
                    </span>

                    {item.user === session?.user?.email && (
                      <p>
                        <MdDelete size={28} onClick={() => handleDelete(item.id)} />
                      </p>
                    )}
                  </div>
                </li>
              </>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}

export default Comentary;



export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const id = params?.id as string

  const docRef = doc(db, "tarefas", id)

  const taskId = await getDoc(docRef)

  if (taskId.data() === undefined) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  if (!taskId.data()?.public) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const formaterDate = taskId.data()?.created?.seconds * 1000;

  const task = {

    tarefas: taskId.data()?.tarefas,
    public: taskId.data()?.public,
    user: taskId.data()?.user,
    created: new Date(formaterDate).toLocaleDateString(),
    id: taskId.id
  }

  const comentRef = query(collection(db, 'comments'), where('id', '==', id))
  const ref = await getDocs(comentRef)



  let listComments = [] as commentsProps[]

  ref.forEach((doc) => {
    listComments.push({
      comment: doc.data().comment,
      name: doc.data().name,
      user: doc.data().user,
      id: doc.id,
      created: doc.data().created
    })

  })


  return {
    props: {

      item: task,
      list: listComments

    }
  }
}
