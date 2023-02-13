import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { repeat, shuffle } from 'lodash';

import { words } from '../utils/words';

function replaceMiddleLetters(word: string): string {
	if (word.length <= 2) {
		return word;
	}
	const first = word[0];
	const last = word[word.length - 1];
	const middle = repeat(' _ ', word.length - 2);
	return first + middle + last;
}

const margin_options = [
	{ label: 'Min', value: 'mx-2' },
	{ label: '10', value: 'mx-10' },
	{ label: '20', value: 'mx-20' },
	{ label: '32', value: 'mx-32' },
	{ label: '44', value: 'mx-44' },
	{ label: '56', value: 'mx-56' },
	{ label: '64', value: 'mx-64' },
	{ label: '72', value: 'mx-72' },
	{ label: '80', value: 'mx-80' },
	{ label: 'Max', value: 'mx-96' }
];

const font_options = [
	{ label: 'Comic', value: 'font-comic' },
	{ label: 'Sans', value: 'font-sans' },
	{ label: 'Serif', value: 'font-serif' },
	{ label: 'Mono', value: 'font-mono' }
	// { label: 'Dyslexic', value: 'font-dyslexic' }
];

const size_options = [
	{ label: '14px', value: 'text-sm' },
	{ label: '16px', value: 'text-base' },
	{ label: '18px', value: 'text-lg' },
	{ label: '20px', value: 'text-xl' },
	{ label: '24px', value: 'text-2xl' },
	{ label: '30px', value: 'text-3xl' },
	{ label: '36px', value: 'text-4xl' },
	{ label: '48px', value: 'text-5xl' },
	{ label: '60px', value: 'text-6xl' },
	{ label: '72px', value: 'text-7xl' },
	{ label: '96px', value: 'text-8xl' },
	{ label: '128px', value: 'text-9xl' }
	// { label: "14px", value: "prose-sm" },
	// { label: "16px", value: "prose-base" },
	// { label: "18px", value: "prose-lg" },
	// { label: "20px", value: "prose-xl" },
	// { label: "24px", value: "prose-2xl" },
	// { label: "30px", value: "prose-3xl" },
	// { label: "36px", value: "prose-4xl" },
];

const line_height_options = [
	{ label: 'None', value: 'leading-none' },
	{ label: 'Tight', value: 'leading-tight' },
	{ label: 'Snug', value: 'leading-snug' },
	{ label: 'Normal', value: 'leading-normal' },
	{ label: 'Relaxed', value: 'leading-relaxed' },
	{ label: 'Loose', value: 'leading-loose' }
];

interface FormData {
	numberOfWords: number;
	margins: string;
	font: string;
	size: string;
	lineHeight: string;
}

const WordList: React.FC = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		setValue
	} = useForm<FormData>();
	const [displayedWords, setDisplayedWords] = useState<string[]>([]);

	const font = watch('font');
	const lineHeight = watch('lineHeight');
	const margins = watch('margins');
	const size = watch('size');

	const onSubmit = (data: FormData) => {
		setDisplayedWords(shuffle(words).slice(0, data.numberOfWords));
	};

	return (
		<div className="max-w-none prose md:prose-lg lg:prose-xl w-full m-6">
			<form className="block" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-wrap ml-auto print:hidden">
					<div className="mx-2">
						Margins
						<select
							className="form-select"
							{...register('margins')}
						>
							{margin_options.map(({ value, label }) => (
								<option key={value} value={value}>
									{label}
								</option>
							))}
						</select>
					</div>
					<div className="mx-2">
						Font
						<select className="form-select" {...register('font')}>
							{font_options.map(({ value, label }) => (
								<option key={value} value={value}>
									{label}
								</option>
							))}
						</select>
					</div>
					<div className="mx-2">
						Size
						<select className="form-select" {...register('size')}>
							{size_options.map(({ value, label }) => (
								<option key={value} value={value}>
									{label}
								</option>
							))}
						</select>
					</div>
					<div className="mx-2">
						Line Height
						<select
							className="form-select"
							{...register('lineHeight')}
						>
							{line_height_options.map(({ value, label }) => (
								<option key={value} value={value}>
									{label}
								</option>
							))}
						</select>
					</div>

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
					<button
						className="m-4 inline-block px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
						type="button"
						onClick={() => window.print()}
					>
						Print
					</button>
				</div>
			</form>

			<div className="flex text-lg justify-between">
				<div>Name: ____________ </div>
				<div>
					Quiz - {new Intl.DateTimeFormat('en-US').format(new Date())}
				</div>
				<div>Score: ____________ </div>
			</div>
			<div
				className={`flex justify-center w-full ${font} ${margins} ${size}  ${lineHeight}`}
			>
				<div className="grid grid-cols-2 gap-4 mx-auto">
					<ol className="m-6 list-decimal">
						{displayedWords.map((word, index) => (
							<li key={index}>{word}</li>
						))}
					</ol>

					<ol className="m-6 list-decimal">
						{shuffle(displayedWords).map((word, index) => (
							<li key={index}>{replaceMiddleLetters(word)}</li>
						))}
					</ol>
				</div>
			</div>
		</div>
	);
};

export default WordList;
