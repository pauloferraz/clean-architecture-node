export interface AddCategory {
  add: (category: AddCategory.Params) => Promise<void>
}

export namespace AddCategory {
  export type Params = {
    name: string
    description: string
    image: string
    active: boolean
  }
}
