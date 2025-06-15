import { MdDelete } from "react-icons/md"


import styles from './styles.module.scss'


const Comentary = () => {


  return (
    <>
     
      <main className={styles.container}>

        <section className={styles.container__coment}>
          <textarea placeholder="teste"></textarea>

          <h2>
            Deixar um comentario
          </h2>

          <div className={styles.container__coment__text}>
            <textarea placeholder="teste"></textarea>
          </div>

          <button>
            Enviar comentario
          </button>

        </section>

        <section className={styles.container__list}>
          <h2>
            Todos os comentarios
          </h2>

          <ul>
            <li>
              <p>
                paulo sergio
              </p>

              <div className={styles.container__list__li}>
                <span>
                  Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Ex commodi error, eaque voluptates omnis dolor,
                  minima iusto laboriosam maiores facilis porro
                </span>

                <p>
                  <MdDelete size={28} />
                </p>
              </div>
            </li>
          </ul>
        </section>
      </main>
    </>
  )
}

export default Comentary