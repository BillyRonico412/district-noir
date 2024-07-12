import { useAtom } from "jotai"
import { gameReducerAtom, type JoueurType } from "../utils"
import { useSwipeable } from "react-swipeable"

interface BadgeNbCardProps {
	joueur: JoueurType
}

export const BadgeNbCard = (props: BadgeNbCardProps) => {
	const [game, dispatch] = useAtom(gameReducerAtom)
	const swipeableProps = (() => {
		if (game.counts[game.cursor][props.joueur] === 0) {
			return {}
		}
		return {
			onSwipedLeft: () => {
				if (props.joueur !== "noir") {
					return
				}
				dispatch({
					type: "decrement",
					joueur: props.joueur,
				})
			},
			onSwipedRight: () => {
				if (props.joueur !== "blanc") {
					return
				}
				dispatch({
					type: "decrement",
					joueur: props.joueur,
				})
			},
		}
	})()
	const handlers = useSwipeable(swipeableProps)
	return (
		<div
			{...handlers}
			className="flex flex-col justify-center items-center flex-grow"
		>
			<span>{props.joueur}</span>
			<div>{game.counts[game.cursor][props.joueur]}</div>
		</div>
	)
}
