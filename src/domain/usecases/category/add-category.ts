export interface AddCategory {
  add: (category: AddCategory.Params) => Promise<void>
}

export namespace AddCategory {
  export type Params = {
    name: string
    parent: string
    category: string
    active: boolean
  }
}
