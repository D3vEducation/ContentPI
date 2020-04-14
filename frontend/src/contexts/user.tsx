// Dependencies
import React, {
  FC,
  createContext,
  ReactElement,
  useState,
  useEffect
} from 'react'
import { useApolloClient } from 'react-apollo-hooks'
import { useCookies } from 'react-cookie'
import { getGraphQlError } from 'fogg-utils'

// Util
import { getUserData } from '@shared/lib/middlewares/jwt'

// Mutations
import LOGIN_MUTATION from '@graphql/user/login.mutation'

interface iUserContext {
  login(input: any): any
  user: any
}

interface iProps {
  children: ReactElement
}

export const UserContext = createContext<iUserContext>({
  login: () => null,
  user: null
})

const UserProvider: FC<iProps> = ({ children }): ReactElement => {
  const { mutate } = useApolloClient()
  const [cookies, setCookie] = useCookies()
  const [user, setUser] = useState(null)

  // Effects
  useEffect(() => {
    if (!user) {
      getUserData(cookies.at).then((userData: any) => setUser(userData))
    }
  }, [user])

  async function login(input: {
    email: string
    password: string
  }): Promise<any> {
    try {
      const { data } = await mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          email: input.email,
          password: input.password
        }
      })

      if (data) {
        setCookie('at', data.login.token, { path: '/' })

        return data.login.token
      }
    } catch (err) {
      return getGraphQlError(err)
    }
  }

  const context = {
    login,
    user
  }

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}

export default UserProvider
