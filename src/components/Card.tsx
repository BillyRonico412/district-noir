import { useAtom } from "jotai"
import { useSwipeable } from "react-swipeable"
import { cards, gameReducerAtom } from "../utils"

interface CardProps {
	indexInCards: number
	isSwipeable?: boolean
}

export const Card = (props: CardProps) => {
	const [game, dispatch] = useAtom(gameReducerAtom)
	const swipeableProps = (() => {
		if (!props.isSwipeable || game.cursor !== props.indexInCards) {
			return {}
		}
		if (
			game.counts[game.cursor].blanc + game.counts[game.cursor].noir >=
			cards[game.cursor].nb
		) {
			return {}
		}
		return {
			onSwipedLeft: () => {
				dispatch({
					type: "increment",
					joueur: "blanc",
				})
			},
			onSwipedRight: () => {
				dispatch({
					type: "increment",
					joueur: "noir",
				})
			},
		}
	})()
	const handlers = useSwipeable(swipeableProps)
	return (
		<div {...handlers}>
			<div className="w-32 aspect-[1/2] bg-gray-600 flex flex-col items-center justify-center bg-primary text-primary-foreground">
				<p>{cards[props.indexInCards].type}</p>
				<p>{cards[props.indexInCards].value}</p>
				<p>
					nb restant:{" "}
					{cards[props.indexInCards].nb -
						game.counts[props.indexInCards].blanc -
						game.counts[props.indexInCards].noir}
				</p>
			</div>
		</div>
	)
}
