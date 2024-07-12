import { useAtom } from "jotai"
import {
	cards,
	type CountScoreType,
	gameReducerAtom,
	getCountSeries,
	getScoreByLine,
} from "../utils"
import { Button } from "./ui/button"

export const ScoreFinal = () => {
	const [game, dispatch] = useAtom(gameReducerAtom)
	const score = ((): CountScoreType => {
		const score: CountScoreType = {
			blanc: 0,
			noir: 0,
		}
		for (let i = 0; i < cards.length; i++) {
			const scoreByLine = getScoreByLine(cards[i], game.counts[i])
			score.blanc += scoreByLine.blanc
			score.noir += scoreByLine.noir
		}
		const count = getCountSeries(game.counts)
		score.blanc += count.blanc * 5
		score.noir += count.noir * 5
		return score
	})()
	return (
		<div className="flex flex-col items-center gap-y-2">
			<table className="table-auto mx-auto">
				<thead>
					<tr>
						<th className="border">Blanc</th>
						<th className="border">Noir</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="text-center px-8 border">{score.blanc}</td>
						<td className="text-center px-8 border">{score.noir}</td>
					</tr>
				</tbody>
			</table>
			<Button
				onClick={() => {
					dispatch({ type: "reset" })
				}}
			>
				Reset
			</Button>
		</div>
	)
}
