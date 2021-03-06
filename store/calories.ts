import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import CaloriesClient from '~/api/calories'
import { CaloryParams } from "types/calories"

import { format } from 'date-fns'

@Module({ stateFactory: true, namespaced: true, name: 'calories' })
export default class CaloriesModule extends VuexModule {
  calories: CaloryParams[] = []
  calory: CaloryParams | null = null

  @Mutation
  setCalories(calories: CaloryParams[]) {
    this.calories = calories
  }

  @Mutation
  setCalory(calory: CaloryParams | null) {
    if (calory) {
      this.calory = calory
    } else {
      this.calory = null
    }
  }

  @Action({ rawError: true })
  async fetchCalories(date: string = format(new Date(), 'yyyy-MM-dd')) {
    const client = new CaloriesClient()
    const calories = await client.fetchCalories(date)
    this.setCalories(calories)
  }

  @Action({ rawError: true })
  async fetchCalory(id: string) {
    const client = new CaloriesClient()
    const calory = await client.fetchCalory(id)
    this.setCalory(calory)
  }

  @Action({ rawError: true })
  async createCalory(params: CaloryParams) {
    const client = new CaloriesClient()
    const calory = await client.createCalory(params)
    return calory
  }

  @Action({ rawError: true })
  async updateCalory(params: CaloryParams) {
    const client = new CaloriesClient()
    const calory = await client.updateCalory(params)
    return calory
  }

  @Action({ rawError: true })
  async deleteCalory(id: string) {
    const client = new CaloriesClient()
    const calory = await client.deleteCalory(id)
    return calory
  }
}