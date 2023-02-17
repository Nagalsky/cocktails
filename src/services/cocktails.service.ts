import {BASE_URL} from '../api'
import {ICocktail} from '../models/cocktail.interface'

export async function fetchCocktails(queries: string): Promise<ICocktail[]> {
  const res = await fetch(`${BASE_URL}?name=${queries}`, {
    headers: {
      'X-Api-Key': import.meta.env.VITE_API_KEY,
    },
  })

  if (!res.ok) throw new Error('Failed to fetch Cocktails!')

  return res.json()
}
