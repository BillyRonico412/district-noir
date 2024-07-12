import { cards } from "../utils"
import { ResultCardLine } from "./ResultCardLine"
import { ResultCardLineSerie } from "./ResultCardLineSerie"

export const ResultCard = () => {
	return (
		<table className="w-full">
			<thead>
				<tr>
					<th className="w-1/6 border">Blanc</th>
					<th className="w-1/6 border">Score B</th>
					<th className="w-2/6 border">Type</th>
					<th className="w-1/6 border">Score N</th>
					<th className="w-1/6 border">Noir</th>
				</tr>
			</thead>
			<tbody>
				<>
					{cards.slice(0, 4).map((_, i) => (
						<ResultCardLine key={i} indexInCards={i} />
					))}
					<ResultCardLineSerie />
					{cards.slice(4).map((_, i) => (
						<ResultCardLine key={i + 4} indexInCards={i + 4} />
					))}
				</>
			</tbody>
		</table>
	)
}
