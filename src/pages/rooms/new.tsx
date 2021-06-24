import { FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import illustrationImg from '../../../public/images/illustration.svg';
import logoImg from '../../../public/images/logo.svg';

import { Button } from '../../components/Button';

import styles from './new.module.scss';

export default function NewRoom() {
  const router = useRouter();
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');

  useEffect(() => {
    if (user) {
      toast(`Welcome ${user?.name}`);
      return;
    }
  }, [])


  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    router.push(`/rooms/${firebaseRoom.key}`);
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
          <h2>Crie uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={e => setNewRoom(e.target.value)}
              value={newRoom}
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
