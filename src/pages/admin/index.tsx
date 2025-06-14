import { MdDelete } from "react-icons/md";
import { FaShare } from "react-icons/fa";




import HeaderUser from '@/Components/HeaderUser'

import styles from './styles.module.scss'
const Admin = () => {
  return (
    <>
      <HeaderUser />
      <section className={styles.container}>
        <div >
          <h1>
            Qual a sua tarefa ?
          </h1>
          <textarea placeholder='Digite sua tarefa' required ></textarea>

          <div className={styles.container__checkbox}>
            <input type="checkbox" />
            <label>Deixar tarefa publica</label>
          </div>

          <button>
            Registrar
          </button>
        </div>


      </section>
      <div className={styles.container_tasks}>

        <div className={styles.container_tasks__list}>
          <h2>Minhas tarefas</h2>

          <ul>
            <li>
              estudar java script
              <p>
                <MdDelete size={28} />
              </p>
            </li>

            <li>
              <div>
                <span className={styles.container_tasks__list__public}>
                  <p>
                    Publico
                  </p>

                  <FaShare size={18} color="#3183FF" />

                </span>
                estudar java script
              </div>
              <p>
                <MdDelete size={28} />
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Admin