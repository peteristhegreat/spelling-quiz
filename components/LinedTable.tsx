interface TableProps {
	numRows: number;
	widthStyle: string;
	heightPx: number;
	color: string;
}

export function LinedTable({
	numRows,
	widthStyle,
	heightPx,
	color
}: TableProps) {
	const rows = Array.from(Array(numRows).keys()); // create an array of rows

	return (
		<table
			className={`border-y-[1px] border-${color}-400 ${widthStyle} not-prose h-auto`}
		>
			<tbody>
				{rows.map((row, index) => (
					<tr
						key={index}
						className={
							index % 2 === 0
								? `border-dashed border-${color}-300 border-b-[1px]`
								: `border-solid border-${color}-400 border-b-[1px]`
						}
					>
						<td
							className={`${widthStyle} h-[${
								heightPx / 2
							}px] min-h-[${heightPx / 2}px]`}
						></td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
