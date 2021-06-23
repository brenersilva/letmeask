import { useRouter } from 'next/router';
import Image from 'next/image';

import { Button } from '../components/Button';

import illustrationImg from '../../public/images/illustration.svg';
import logoImg from '../../public/images/logo.svg';
import googleIconImg from '../../public/images/google-icon.svg';
import logInIconImg from '../../public/images/log-in.svg';

import styles from './Home.module.scss';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const router = useRouter();
  const { user, signInWithGoogle } = useAuth();

  async function handleCreateRoom() {      
    if (!user) {
      await signInWithGoogle();
    }
    
    router.push('/rooms/new');
  }

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
          <button className={styles.createRoom} onClick={handleCreateRoom}>
            <Image
              height={24}
              src={googleIconImg}
              alt="Logo do Google"
            />
            Crie sua sala com o Google
          </button>
          <div className={styles.separator}>ou entre em uma sala</div>
          <form>
            <input
              type="text"
              placeholder="Digite o código da sala"
              />
            <Button type="submit">
              <Image
                height={24}
                src={logInIconImg}
                alt="Log-in"
              />
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}
