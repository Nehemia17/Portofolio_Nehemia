import React, { useEffect, useRef } from "react"

const AnimatedBackground = () => {
	const blobRefs = useRef([])
	const initialPositions = [
		{ x: -4, y: 0 },
		{ x: -4, y: 0 },
		{ x: 20, y: -8 },
		{ x: 20, y: -8 },
	]

	useEffect(() => {
		let currentScroll = 0
		let requestId

		const handleScroll = () => {
			const newScroll = window.pageYOffset
			const scrollDelta = newScroll - currentScroll
			currentScroll = newScroll

			blobRefs.current.forEach((blob, index) => {
				const initialPos = initialPositions[index]

				// Calculating movement in both X and Y direction
				const xOffset = Math.sin(newScroll / 100 + index * 0.5) * 340 // Horizontal movement
				const yOffset = Math.cos(newScroll / 100 + index * 0.5) * 40 // Vertical movement

				const x = initialPos.x + xOffset
				const y = initialPos.y + yOffset

				// Apply transformation with smooth transition
				blob.style.transform = `translate(${x}px, ${y}px)`
				blob.style.transition = "transform 1.4s ease-out"
			})

			requestId = requestAnimationFrame(handleScroll)
		}

		window.addEventListener("scroll", handleScroll)
		return () => {
			window.removeEventListener("scroll", handleScroll)
			cancelAnimationFrame(requestId)
		}
	}, [])

	return (
		<div className="fixed inset-0 bg-[#020202]">
			<div className="absolute inset-0 overflow-hidden">
				<div
					ref={(ref) => (blobRefs.current[0] = ref)}
					className="absolute top-0 -left-4 md:w-[500px] md:h-[500px] w-72 h-72 bg-red-600/30 rounded-full mix-blend-screen filter blur-[120px] animate-pulse"></div>
				<div
					ref={(ref) => (blobRefs.current[1] = ref)}
					className="absolute top-1/4 -right-20 w-[450px] h-[450px] bg-orange-600/20 rounded-full mix-blend-screen filter blur-[120px] hidden sm:block"></div>
				<div
					ref={(ref) => (blobRefs.current[2] = ref)}
					className="absolute -bottom-32 left-[-10%] md:left-10 w-[600px] h-[600px] bg-red-700/20 rounded-full mix-blend-screen filter blur-[120px]"></div>
				<div
					ref={(ref) => (blobRefs.current[3] = ref)}
					className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-orange-500/20 rounded-full mix-blend-screen filter blur-[120px] hidden sm:block"></div>
			</div>
			<div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:32px_32px]"></div>
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
		</div>
	)
}

export default AnimatedBackground

