import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { repeat, shuffle } from "lodash";

import { words } from "../utils/words";


interface FormData {
  numberOfWords: number;
}

function replaceMiddleLetters(word: string): string {
  if (word.length <= 2) {
    return word;
  }
  const first = word[0];
  const last = word[word.length - 1];
  const middle = repeat(" _ ", word.length - 2);
  return first + middle + last;
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
    <div className="prose lg:prose-xl">
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
        <ol className="m-6 font-comic text-xl list-decimal">
          {displayedWords.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ol>

        <ol className="m-6 font-comic text-xl list-decimal">
          {shuffle(displayedWords).map((word, index) => (
            <li key={index}>{replaceMiddleLetters(word)}</li>
          ))}
        </ol>
      </form>
    </div>
  );
};

export default WordList;
