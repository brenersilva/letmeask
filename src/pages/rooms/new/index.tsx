import Image from 'next/image';
import Link from 'next/link';

import illustrationImg from '../../../../public/images/illustration.svg';
import logoImg from '../../../../public/images/logo.svg';

import { Button } from '../../../components/Button';

import styles from './styles.module.scss';

export default function New() {
  return (
    <div className={styles.pageAuth}>
      <aside>
        <Image
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
          objectFit="contain"
          layout="responsive"
        />
        <strong>Toda pergunta tem uma resposta.</strong>
        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </aside>
      <main>
        <div className={styles.mainContent}>
          <Image
            className={styles.logo}
            height={70}
            src={logoImg}
            alt="Letmeask"
            objectFit="contain"
          />
          <h2>Crie uma nova sala</h2>
          <form>
            <input
              type="text"
              placeholder="Nome da sala"
              />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala já existente? <Link href="/"><a>Clique aqui</a></Link>
          </p>
        </div>
      </main>
    </div>
  )
}
