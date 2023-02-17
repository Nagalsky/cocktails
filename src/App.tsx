import {useQuery} from '@tanstack/react-query'
import {FC, useRef, useState} from 'react'
import logo from './assets/tequila.svg'
import {fetchCocktails} from './services/cocktails.service'

const App: FC = () => {
  const [cocktail, setCocktail] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)

  const {
    data: cocktails = [],
    isLoading,
    isError,
    isInitialLoading,
    isFetching,
    isSuccess,
  } = useQuery(['cocktails'], () => fetchCocktails(cocktail), {
    enabled: cocktail.length > 0,
    onSuccess: () => {
      if (inputRef && inputRef.current) {
        inputRef.current.value = ''
      }
      setCocktail('')
    },
  })

  const handleSubmit = () => {
    if (inputRef && inputRef.current) {
      setCocktail(inputRef.current.value)
    }
  }

  return (
    <section className="py-14">
      <div className="container">
        <h1 className="mb-4 text-3xl font-bold">
          Do you want to drink and relax, but do not know which cocktail to
          cook?
        </h1>
        <h2 className="mb-8 text-2xl">
          Just type what alcohol in the cocktail you prefer
        </h2>

        <div className="mb-8 flex items-center gap-6">
          <input
            type="text"
            className="block w-full grow rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:outline-0 focus:ring-blue-500"
            placeholder="Ingredient..."
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSubmit()
              }
            }}
          />
          <button
            type="button"
            className="shrink-0 rounded-lg border border-gray-300 bg-white px-5 py-2.5 font-bold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => handleSubmit()}
            disabled={isFetching}
          >
            Try!
          </button>
        </div>

        {isFetching && (
          <div className="py-5 text-center">
            <img
              src={logo}
              alt="logo"
              className="mx-auto block w-[100px] animate-spin"
            />
          </div>
        )}

        {isSuccess && !isFetching && (
          <div className="grid grid-cols-1 divide-y-2 divide-slate-400 rounded-lg bg-white p-6 text-[#203A43]">
            {cocktails.length ? (
              cocktails.map((cocktail, index) => {
                return (
                  <div key={index} className="py-4">
                    <h4 className="mb-4 text-xl font-bold first-letter:uppercase">
                      {cocktail.name}
                    </h4>
                    <p className="mb-2">ingredients:</p>
                    <div className="flex flex-wrap gap-3">
                      {cocktail.ingredients.map((ingredient, index) => {
                        return (
                          <span
                            className="rounded-full bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#203A43] px-2 py-1 text-sm font-bold text-white"
                            key={index}
                          >
                            {ingredient}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                )
              })
            ) : (
              <h4 className="text-xl font-bold">
                Please type correct alcohol type...
              </h4>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default App
