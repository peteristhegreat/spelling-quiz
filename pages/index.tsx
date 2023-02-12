import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { shuffle } from "lodash";

import { words } from "../utils/words";

interface FormData {
  numberOfWords: number;
}

const WordList: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);

  const onSubmit = (data: FormData) => {
    setDisplayedWords(shuffle(words).slice(0, data.numberOfWords));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="numberOfWords">Number of Words:</label>
      <input
        type="number"
        min="1"
        max={words.length}
        {...register("numberOfWords")}
      />
      {errors?.numberOfWords && <p>This field is required</p>}
      <button type="submit">Submit</button>
      <ol>
        {displayedWords.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ol>

      <ol>
        {shuffle(displayedWords).map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ol>
    </form>
  );
};

export default WordList;

// import styles from '../styles/Home.module.css'

// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <main className={styles.main}>
//         <h1 className={styles.title}>
//           Welcome to <a href="https://nextjs.org">Next.js!</a>
//         </h1>

//         <p className={styles.description}>
//           Get started by editing{' '}
//           <code className={styles.code}>pages/index.js</code>
//         </p>

//         <div className={styles.grid}>
//           <a href="https://nextjs.org/docs" className={styles.card}>
//             <h3>Documentation &rarr;</h3>
//             <p>Find in-depth information about Next.js features and API.</p>
//           </a>

//           <a href="https://nextjs.org/learn" className={styles.card}>
//             <h3>Learn &rarr;</h3>
//             <p>Learn about Next.js in an interactive course with quizzes!</p>
//           </a>

//           <a
//             href="https://github.com/vercel/next.js/tree/canary/examples"
//             className={styles.card}
//           >
//             <h3>Examples &rarr;</h3>
//             <p>Discover and deploy boilerplate example Next.js projects.</p>
//           </a>

//           <a
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//             className={styles.card}
//           >
//             <h3>Deploy &rarr;</h3>
//             <p>
//               Instantly deploy your Next.js site to a public URL with Vercel.
//             </p>
//           </a>
//         </div>
//       </main>

//       <footer className={styles.footer}>
//         <a
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by{' '}
//           <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
//         </a>
//       </footer>
//     </div>
//   )
// }
