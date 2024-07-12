import { useAtom } from "jotai"
import { gameReducerAtom, getCountSeries } from "../utils"

export const ResultCardLineSerie = () => {
	const [game] = useAtom(gameReducerAtom)
	const count = getCountSeries(game.counts)
	return (
		<tr>
			<td className="text-center border">{count.blanc}</td>
			<td className="text-center border">{count.blanc * 5}</td>
			<td className="text-center border">Series</td>
			<td className="text-center border">{count.noir * 5}</td>
			<td className="text-center border">{count.noir}</td>
		</tr>
	)
}
