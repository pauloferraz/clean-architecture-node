export interface AccountModel {
  id: string
  name: string
  email: string
  role?: string
  active: boolean
  password?: string
  advertiser?: Advertiser
}

export interface Advertiser {
  name?: string
  email?: string
  image?: string
  whatsapp?: string
  phone?: string
  postalCode?: string
  address?: string
  number?: string
  neighborhood?: string
  complement?: string
  city?: string
  state?: string
}
