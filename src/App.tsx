import { CountCard } from "./components/CountCard"
import { ResultCard } from "./components/ResultCard"
import { ScoreFinal } from "./components/ScoreFinal"

export const App = () => {
	return (
		<main className="w-screen h-screen flex flex-col gap-y-4 py-4">
			<h1 className="text-center text-2xl font-bold">District Noir</h1>
			<div className="flex-1 flex items-center">
				<CountCard />
			</div>
			<div className="flex-1 flex items-center">
				<ResultCard />
			</div>
			<div>
				<ScoreFinal />
			</div>
		</main>
	)
}
