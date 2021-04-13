export interface LoadCategoryByName {
  load: (name: string) => Promise<LoadCategoryByName.Result>
}

export namespace LoadCategoryByName {
  export type Result = {
    name: string
    parent: string
    category: string
    active: boolean
  }
}
