import { useAtom } from "jotai"
import { cards, gameReducerAtom } from "../utils"
import { Card } from "./Card"
import { BadgeNbCard } from "./BadgeNbCard"
import { Button } from "./ui/button"

export const CountCard = () => {
	const [game, dispatch] = useAtom(gameReducerAtom)
	return (
		<div className="w-full flex items-center gap-x-8">
			<BadgeNbCard joueur="blanc" />
			<div className="flex-grow-[2] flex flex-col items-center gap-y-2">
				<Card isSwipeable={true} indexInCards={game.cursor} />
				<Button
					onClick={() => {
						dispatch({ type: "next" })
					}}
					disabled={game.cursor === cards.length - 1}
				>
					Suivant
				</Button>
			</div>
			<BadgeNbCard joueur="noir" />
		</div>
	)
}
