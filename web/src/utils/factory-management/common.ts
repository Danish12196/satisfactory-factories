import { Factory } from '@/interfaces/planner/FactoryInterface'
import { DataInterface } from '@/interfaces/DataInterface'
import { Recipe } from '@/interfaces/Recipe'

export const createNewPart = (factory: Factory, part: string) => {
  if (!factory.parts[part]) {
    factory.parts[part] = {
      amountRequired: 0,
      amountSupplied: 0,
      amountSuppliedViaInput: 0,
      amountSuppliedViaProduction: 0,
      amountRemaining: 0,
      satisfied: true,
      isRaw: false,
    }
  }
}

export const getRecipe = (partId: any, gameData: DataInterface): Recipe | undefined => {
  const recipe = gameData.recipes.find(r => r.id === partId)

  if (!recipe) {
    console.error(`Recipe with ID ${partId} not found.`)
    return
  }

  return recipe
}

export const calculatePartMetrics = (factory: Factory, part: string) => {
  const partData = factory.parts[part]

  // If supplied from raw, we always assure that it is fully supplied and satisfied
  if (partData.isRaw) {
    partData.amountSupplied = partData.amountRequired
  } else {
    partData.amountSupplied = partData.amountSuppliedViaInput + partData.amountSuppliedViaProduction
  }

  partData.amountRemaining = partData.amountRequired - partData.amountSupplied
  partData.satisfied = partData.amountRemaining <= 0
}