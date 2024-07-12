import { useAtom } from "jotai"
import { gameReducerAtom, cards, getScoreByLine } from "../utils"
import { cn } from "../lib/utils"

interface CardLineProps {
	indexInCards: number
}

export const ResultCardLine = (props: CardLineProps) => {
	const card = cards[props.indexInCards]
	const [game] = useAtom(gameReducerAtom)
	const score = getScoreByLine(card, game.counts[props.indexInCards])
	return (
		<tr
			className={cn(
				"w-full",
				game.cursor === props.indexInCards &&
					"bg-secondary text-secondary-foreground",
			)}
		>
			<td className="text-center border">
				{game.counts[props.indexInCards].blanc}
			</td>
			<td className="text-center border">{score.blanc}</td>
			<td className="text-center border">
				{card.type} {card.value}
			</td>
			<td className="text-center border">{score.noir}</td>
			<td className="text-center border">
				{game.counts[props.indexInCards].noir}
			</td>
		</tr>
	)
}
