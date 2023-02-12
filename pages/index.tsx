import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { repeat, shuffle } from 'lodash';

import { words } from '../utils/words';

interface FormData {
	numberOfWords: number;
}

function replaceMiddleLetters(word: string): string {
	if (word.length <= 2) {
		return word;
	}
	const first = word[0];
	const last = word[word.length - 1];
	const middle = repeat(' _ ', word.length - 2);
	return first + middle + last;
}

const WordList: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue
	} = useForm<FormData>();
	const [displayedWords, setDisplayedWords] = useState<string[]>([]);

	const onSubmit = (data: FormData) => {
		setDisplayedWords(shuffle(words).slice(0, data.numberOfWords));
	};

	return (
		<div className="max-w-none prose md:prose-lg lg:prose-xl w-full m-6">
			<div className="flex justify-center w-full">
				<form className="w-full" onSubmit={handleSubmit(onSubmit)}>
					<div className="print:hidden">
						<label className="m-4" htmlFor="numberOfWords">
							Count
						</label>
						<input
							className="form-control
          w-24
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							type="number"
							defaultValue="10"
							min="1"
							max={words.length || 1000}
							{...register('numberOfWords')}
						/>
						{errors?.numberOfWords && <p>This field is required</p>}
						<button
							className="m-4 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
							type="submit"
						>
							Go
						</button>
					</div>
          <div className='text-lg text-center'>Quiz - {new Intl.DateTimeFormat('en-US').format(new Date())}</div>

					<div className="grid grid-cols-2 gap-4 mx-auto">
						<ol className="m-6 font-comic text-xl list-decimal">
							{displayedWords.map((word, index) => (
								<li key={index}>{word}</li>
							))}
						</ol>

						<ol className="m-6 font-comic text-xl list-decimal">
							{shuffle(displayedWords).map((word, index) => (
								<li key={index}>
									{replaceMiddleLetters(word)}
								</li>
							))}
						</ol>
					</div>
				</form>
			</div>
		</div>
	);
};

export default WordList;
