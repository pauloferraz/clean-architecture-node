export interface AddCategory {
  add: (category: AddCategory.Params) => Promise<AddCategory.Result>
}

export namespace AddCategory {
  export type Params = {
    name: string
    description: string
    image: string
    active: boolean
  }
  export type Result = boolean
}
