declare namespace queryTestInfoUsingGET {
  interface Params {
    page?: number
  }

  interface Response {
    code: number
    status: boolean
    data: {
      info: string
    }
    results: Array<any>
  }
}

declare namespace UserRegisterInfo {
  interface Params {
    username?: string
    email?: string
    password1?: string
    password2?: string
    firstName?: string
    lastName?: string
  }

  interface Response {
    code: number
    status: boolean
    data: {
      info: string
    }
    results: Array<any>
  }
}

declare namespace UserLoginInfo {
  interface Params {
    username?: string
    email?: string
    password?: string
    remember?: boolean
  }

  interface Response {
    code: number
    status: boolean
    message: string
    profile?: any
    token?: string
    username: string
    Token: string
  }
}

declare namespace BookSectionInfo {
  interface Params {}

  interface Response {
    code: number
    status: boolean
    message: string
    profile?: any
    token?: string
    username: string
    Token: string
    results?: Array<any>
  }
}

declare namespace BookDetailInfo {
  interface Params {
    page?: number
  }

  interface Response {
    code: number
    status: boolean
    message: string
    profile?: any
    token?: string
    username: string
    Token: string
    results?: Array<any>
  }
}
