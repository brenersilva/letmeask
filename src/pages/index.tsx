import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FiLogIn } from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from '../components/Button';

import illustrationImg from '../../public/images/illustration.svg';
import logoImg from '../../public/images/logo.svg';

import styles from './Home.module.scss';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

export default function Home() {
  const router = useRouter();
  const { user, signInWithGoogle } = useAuth();
  const[roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {      
    if (!user) {
      await signInWithGoogle();
    }
    
    router.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      toast.error('Room does not exists...');
      return;
    }
    router.push(`/rooms/${roomCode}`);
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
        <ToastContainer />
        <div className={styles.mainContent}>
          <Image
            className={styles.logo}
            height={70}
            src={logoImg}
            alt="Letmeask"
            objectFit="contain"
          />
          <button className={styles.createRoom} onClick={handleCreateRoom}>
            <FaGoogle color="#FEFEFE" />
            Crie sua sala com o Google
          </button>
          <div className={styles.separator}>ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={e => setRoomCode(e.target.value)}
              value={roomCode}
              />
            <Button type="submit">
              <FiLogIn color="#FEFEFE" />
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}
