'use client'

import { Api } from '@/services/api-clients'
import { Ingredient } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useSet } from 'react-use'

interface ReturnProps {
	ingredients: Ingredient[]
	loading: Boolean
	selectedIds: Set<string>
	onSelect: (id: string) => void
}

export const useIngredients = (defaultIds: Array<string>): ReturnProps => {
	const [ingredients, setIngredients] = useState<Ingredient[]>([])
	const [loading, setLoading] = useState(true)

	const [selectedIds, { toggle }] = useSet(new Set<string>(defaultIds || []))

	useEffect(() => {
		Api.ingredients
			.getAll()
			.then(data => setIngredients(data))
			.catch(e => {
				console.error(e)
			})
			.finally(() => setLoading(false))
	}, [])

	return { ingredients, loading, selectedIds, onSelect: toggle }
}
