import React from "react"
import { Award, Calendar } from 'lucide-react'

const Certificate = ({ title, year }) => {
	return (
		<div className="relative group w-full">
			{/* Hover Effect Background */}
			<div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-500" />
			
			{/* Card Content */}
			<div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 overflow-hidden transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20 h-full flex flex-col justify-center">
				
				{/* Top Icon and Year */}
				<div className="flex justify-between items-start mb-6">
					<div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
						<Award className="w-6 h-6 text-red-400" />
					</div>
					
					<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
						<Calendar className="w-3.5 h-3.5 text-gray-400" />
						<span className="text-xs font-medium text-gray-300">{year || 'Unknown Year'}</span>
					</div>
				</div>

				{/* Title Area */}
				<div className="mt-auto">
					<h3 className="text-lg sm:text-xl font-bold text-white leading-tight line-clamp-3 group-hover:text-red-300 transition-colors duration-300">
						{title || 'Untitled Certificate'}
					</h3>
					
					{/* Decorative Line */}
					<div className="w-10 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mt-4 transform origin-left transition-transform duration-300 group-hover:scale-x-150" />
				</div>

				{/* Corner Decorative Gradient */}
				<div className="absolute -bottom-10 -right-10 w-32 h-32 bg-red-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
			</div>
		</div>
	)
}

export default Certificate
