import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { filter, max, min, range, repeat, shuffle } from 'lodash';

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

const writing_practice_lines = [
	{ label: 'None', value: '' },
	{ label: 'Baseline', value: 'base' },
	{ label: 'Mid + Baseline', value: 'mid' },
	{ label: 'Triple', value: 'triple' }
];

const writing_practice_width = [
	{ label: 'Min', value: 'w-32' },
	{ label: '1/3', value: 'w-48' },
	{ label: '1/2', value: 'w-64' },
	{ label: '2/3', value: 'w-72' },
	{ label: 'Full', value: 'w-96' }
];

const gap_size_options = [
	{ label: 'Min', value: 'gap-2' },
	{ label: '4', value: 'gap-4' },
	{ label: '6', value: 'gap-6' },
	{ label: '8', value: 'gap-8' },
	{ label: '10', value: 'gap-10' },
	{ label: '12', value: 'gap-12' },
	{ label: '14', value: 'gap-14' },
	{ label: '16', value: 'gap-16' },
	{ label: 'Max', value: 'gap-20' }
];

const min_letter = range(1, 15);

const max_letter = range(1, 15);

const font_options = [
	{ label: 'Comic', value: 'font-comic' },
	{ label: 'Sans', value: 'font-sans' },
	{ label: 'Serif', value: 'font-serif' },
	{ label: 'Mono', value: 'font-mono' },
	{ label: 'Cursive', value: 'font-cursive' }
	// { label: 'Dyslexic', value: 'font-dyslexic' }
];

const color_options = [
	{ label: 'Black', value: '' },
	{ label: 'Blue', value: 'text-blue-900 marker:text-blue-900' },
	{ label: 'Red', value: 'text-red-900 marker:text-red-900' },
	{ label: 'Green', value: 'text-green-900 marker:text-green-900' },
	{ label: 'Gray', value: 'text-gray-600 marker:text-gray-600' }
	// { label: 'Dyslexic', value: 'font-dyslexic' }
];

// tracking-tighter	letter-spacing: -0.05em;
// tracking-tight	letter-spacing: -0.025em;
// tracking-normal	letter-spacing: 0em;
// tracking-wide	letter-spacing: 0.025em;
// tracking-wider	letter-spacing: 0.05em;
// tracking-widest	letter-spacing: 0.1em;
const letter_spacing_options = [
	{ label: 'Tight', value: 'tracking-tight' },
	{ label: 'Normal', value: '' },
	{ label: 'Wide', value: 'tracking-wide' },
	{ label: 'Widest', value: 'tracking-widest' }
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
	gapSize: string;
	font: string;
	size: string;
	color: string;
	lineHeight: string;
	letterSpacing: string;
	minLetter: string;
	maxLetter: string;
	writingPracticeLines: string;
	writingPracticeWidth: string;
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
	const [borderType, setBorderType] = useState<string>('');

	const font = watch('font');
	const lineHeight = watch('lineHeight');
	const gapSize = watch('gapSize');
	const size = watch('size');
	const color = watch('color');
	const letterSpacing = watch('letterSpacing');
	const minLetter = watch('minLetter');
	const maxLetter = watch('maxLetter');
	const writingPracticeLines = watch('writingPracticeLines');
	const writingPracticeWidth = watch('writingPracticeWidth');

	useEffect(() => {
		// console.log({writingPracticeLines})
		let bt = '';
		if (['base', 'mid'].includes(writingPracticeLines)) {
			bt = 'border-b';
			// } else if (['mid', 'triple'].includes(writingPracticeLines)) {
		} else if (writingPracticeLines == 'triple') {
			bt = 'border-b border-t';
		}
		setBorderType(bt);
	}, [writingPracticeLines]);

	const onSubmit = (data: FormData) => {
		const minL = parseInt(data.minLetter);
		const maxL = parseInt(data.maxLetter);
		setDisplayedWords(
			shuffle(
				filter(words, (word) => {
					return word.length >= minL && word.length <= maxL;
				})
			).slice(0, data.numberOfWords)
		);
	};

	return (
		<div className="max-w-none prose md:prose-lg lg:prose-xl w-full p-6 text-gra">
			<form className="block" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-wrap ml-auto print:hidden">
					<div className="mx-2">
						Column Gap
						<select
							className="form-select"
							{...register('gapSize')}
						>
							{gap_size_options.map(({ value, label }) => (
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
								<option
									key={value}
									value={value}
									className={value}
								>
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
						Color
						<select className="form-select" {...register('color')}>
							{color_options.map(({ value, label }) => (
								<option
									key={value}
									value={value}
									className={`text-white ${value}`}
								>
									{label}
								</option>
							))}
						</select>
					</div>
					<div className="mx-2">
						Letter Spacing
						<select
							className="form-select"
							{...register('letterSpacing')}
							defaultValue=""
						>
							{letter_spacing_options.map(({ value, label }) => (
								<option
									key={value}
									value={value}
									className={value}
								>
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
					<div className="mx-2">
						Writing Practice Lines
						<select
							className="form-select"
							{...register('writingPracticeLines')}
						>
							{writing_practice_lines.map(({ value, label }) => (
								<option key={value} value={value}>
									{label}
								</option>
							))}
						</select>
					</div>
					<div className="mx-2">
						Writing Practice Width
						<select
							className="form-select"
							{...register('writingPracticeWidth')}
						>
							{writing_practice_width.map(({ value, label }) => (
								<option key={value} value={value}>
									{label}
								</option>
							))}
						</select>
					</div>
					<div className="mx-2">
						Min Letter
						<select
							className="form-select"
							{...register('minLetter')}
							defaultValue={min(min_letter)}
						>
							{min_letter.map((value) => (
								<option key={value} value={value}>
									{value}
								</option>
							))}
						</select>
					</div>
					<div className="mx-2">
						Max Letter
						<select
							className="form-select"
							defaultValue={max(max_letter)}
							{...register('maxLetter')}
						>
							{max_letter.map((value) => (
								<option key={value} value={value}>
									{value}
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

			<div className={`flex text-lg justify-between m-6 ${color}`}>
				<div>Name: ____________ </div>
				<div>
					Quiz - {new Intl.DateTimeFormat('en-US').format(new Date())}
				</div>
				<div>Score: ____________ </div>
			</div>
			<div
				className={`flex justify-center w-full ${font} ${size} ${color} ${lineHeight} ${letterSpacing}`}
			>
				<div
					className={`grid grid-cols-${
						writingPracticeLines ? 3 : 2
					} ${gapSize || ''} mx-auto`}
				>
					<ol className="mt-6 list-decimal">
						{displayedWords.map((word, index) => (
							<li
								key={index}
								className={`${borderType} border-transparent`}
							>
								{word}
							</li>
						))}
					</ol>

					<ol className="mt-6 list-decimal">
						{shuffle(displayedWords).map((word, index) => (
							<li
								key={index}
								className={`${borderType} border-transparent`}
							>
								{replaceMiddleLetters(word)}
							</li>
						))}
					</ol>
					{writingPracticeLines && (
						<ul
							className={`mt-6 list-none ${writingPracticeWidth}`}
						>
							{range(0, displayedWords.length).map((index) => (
								<div key={index}>
									{['mid', 'triple'].includes(
										writingPracticeLines
									) && (
										<div
											className={`translate-y-1/2 border-t border-dashed border-gray-600 z-10 absolute ${writingPracticeWidth}`}
										>
											&#8203;
										</div>
									)}
									<li
										key={index}
										className={`${borderType} ${writingPracticeWidth}`}
									>
										&#8203;
									</li>
								</div>
							))}
						</ul>
					)}
				</div>
				<div className="grid-cols-2 grid-cols-3"></div>{' '}
				{/* make sure tailwind pre-processes these*/}
			</div>
		</div>
	);
};

export default WordList;
