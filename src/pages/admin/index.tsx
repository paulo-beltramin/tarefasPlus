import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState, useEffect, } from "react";
import {
  addDoc,
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
  deleteDoc,
  doc
}
  from 'firebase/firestore'

import { db } from "@/service/db";
import { MdDelete } from "react-icons/md";
import { FiShare2 } from "react-icons/fi";

import styles from './styles.module.scss'
import Link from "next/link";

type userProps = {
  user: {
    email: string
  }
}

type tasksProps = {
  id: string,
  created: Date,
  user: string,
  tarefas: string,
  public: boolean,

}


export default function Admin({ user }: userProps) {

  const [input, setInput] = useState('')
  const [check, setCheck] = useState(false)
  const [tasks, setTasks] = useState<tasksProps[]>([])


  const handlePublic = (e: ChangeEvent<HTMLInputElement>) => {

    setCheck(e.target.checked)
  }

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()

    if (input === '') {
      return
    }

    try {
      await addDoc(collection(db, "tarefas"), {
        tarefas: input,
        created: new Date(),
        user: user?.email,
        public: check
      })

      setInput('')
      setCheck(false)
    } catch (error) {
      console.log(error)
    }
  }

  const getTasks = () => {

    const docRef = collection(db, 'tarefas')
    const queryRef = query(docRef,
      orderBy('created', "desc"),
      where('user', "==", user?.email)
    )

    onSnapshot(queryRef, (task) => {
      let list = [] as tasksProps[]
      task.forEach((doc) => {
        list.push({
          tarefas: doc.data().tarefas,
          public: doc.data().public,
          user: doc.data().user,
          created: doc.data().created,
          id: doc.id
        })
        setTasks(list)
      })

    })

  }

  useEffect(() => {
    getTasks()
  }, [])


  const handleDelete = async (id: string) => {
    const docRef = doc(db, 'tarefas', id)
    await deleteDoc(docRef)

    const DeleteTasks = tasks.filter((item) => item.id !== id)

    setTasks(DeleteTasks)

  }


  return (
    <>
      <head>
        <title>Admin</title>
      </head>


      <section className={styles.container}>
        <form onSubmit={handleRegister}>
          <h1>
            Qual a sua tarefa ?
          </h1>
          <textarea placeholder='Digite sua tarefa' required
            value={input} onChange={e => setInput(e.target.value)} ></textarea>

          <div className={styles.container__checkbox}>
            <input type="checkbox" checked={check} onChange={handlePublic} />
            <label>Deixar tarefa publica</label>
          </div>

          <button>
            Registrar
          </button>
        </form>


      </section>
      <div className={styles.container_tasks}>

        <div className={styles.container_tasks__list}>
          <h2>Minhas tarefas</h2>

          <ul>
            {tasks.map((item) => (
              <li key={item.id}>
                <div>
                  <span className={styles.container_tasks__list__public}>
                    {item.public === true ? (
                      <>
                        <p>
                          Publico
                        </p>
                        <FiShare2 size={18} color="#3183FF" />
                      </>
                    ) : (
                      <></>
                    )}
                  </span>
                  {item.public ? (

                    <Link href={`/comentary/${item.id}`}>
                      <p>
                        {item.tarefas}
                      </p>
                    </Link>

                  ) : (
                    <p>
                      {item.tarefas}
                    </p>
                  )}
                </div>
                <p>
                  <MdDelete size={28} onClick={() => handleDelete(item.id)} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ req }) => {

  const session = await getSession({ req })

  if (!session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      user: {
        email: session?.user?.email
      }
    }
  }
}



