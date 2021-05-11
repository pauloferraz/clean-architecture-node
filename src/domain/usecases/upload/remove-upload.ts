export interface RemoveFile {
  remove: (data: RemoveFile.Params) => Promise<void>
}

export namespace RemoveFile {
  export type Params = {
    file: string
    productId: string
  }
}
