import { atomWithReducer } from "jotai/utils"

export type CardType = "soutien" | "alliance" | "trahison"
export type JoueurType = "blanc" | "noir"
export interface CardInterface {
	type: CardType
	value: number
	nb: number
}
export const cards: CardInterface[] = [
	{ type: "soutien", value: 5, nb: 5 },
	{ type: "soutien", value: 6, nb: 6 },
	{ type: "soutien", value: 7, nb: 7 },
	{ type: "soutien", value: 8, nb: 8 },
	{ type: "alliance", value: 2, nb: 4 },
	{ type: "alliance", value: 3, nb: 2 },
	{ type: "alliance", value: 4, nb: 1 },
	{ type: "trahison", value: 1, nb: 3 },
	{ type: "trahison", value: 2, nb: 4 },
	{ type: "trahison", value: 3, nb: 2 },
]

export type CountScoreType = Record<JoueurType, number>

export interface CardCountReducerState {
	cursor: number
	counts: CountScoreType[]
}

export type CardCountReducerAction =
	| {
			type: "increment" | "decrement"
			joueur: JoueurType
	  }
	| {
			type: "next"
	  }
	| {
			type: "reset"
	  }
	| {
			type: "setCursor"
			cursor: number
	  }

export const gameReducer = (
	state: CardCountReducerState,
	action: CardCountReducerAction,
): CardCountReducerState => {
	switch (action.type) {
		case "increment":
		case "decrement": {
			const countInCursor = state.counts[state.cursor]
			const offset = (() => {
				switch (action.type) {
					case "increment":
						return 1
					case "decrement":
						return -1
				}
			})()
			countInCursor[action.joueur] += offset
			return {
				...state,
				counts: structuredClone(state.counts),
			}
		}
		case "next":
			return {
				...state,
				cursor: state.cursor + 1,
			}
		case "setCursor":
			return {
				...state,
				cursor: action.cursor,
			}
		case "reset":
			return {
				cursor: 0,
				counts: state.counts.map(() => ({
					blanc: 0,
					noir: 0,
				})),
			}
	}
}

const gameInitialState: CardCountReducerState = {
	cursor: 0,
	counts: cards.map(() => ({
		blanc: 0,
		noir: 0,
	})),
}

export const gameReducerAtom = atomWithReducer(gameInitialState, gameReducer)

export const getScoreByLine = (
	card: CardInterface,
	counts: CountScoreType,
): CountScoreType => {
	switch (card.type) {
		case "soutien":
			return {
				blanc: card.value * Math.max(0, counts.blanc - counts.noir),
				noir: card.value * Math.max(0, counts.noir - counts.blanc),
			}
		case "alliance":
			return {
				blanc: card.value * counts.blanc,
				noir: card.value * counts.noir,
			}
		case "trahison":
			return {
				blanc: -card.value * counts.noir,
				noir: -card.value * counts.blanc,
			}
	}
}

export const getCountSeries = (counts: CountScoreType[]): CountScoreType => {
	return {
		noir: Math.min(...counts.slice(0, 4).map((count) => count.noir)),
		blanc: Math.min(...counts.slice(0, 4).map((count) => count.blanc)),
	}
}
