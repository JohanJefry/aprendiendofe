//Dependemcoes
import { ApolloProvider } from 'react-apollo-hooks'
import { string } from 'prop-types'
import { isBrowser } from '@is';

// Hooks
import useApolloClient from '@apollo-client'

// Contexts
import FormProvider from '@contexts/form'
import UserProvider from '@contexts/user'

// Components
import LoginLayout from '@users/components/Login/Layout'

console.log('isBrowser():  ', isBrowser());
const LoginPage = ({
  //Si es browser(pregunta si estamos en anvegador o estamos en window)
//next es server rendering en algunos render lo hace en el servidor ero otros lo hace en cliente osea wind
currentUrl = isBrowser() ? window.location.search.replace('?redirectTo=', '') : ''
}) => (
  <ApolloProvider client={useApolloClient()}>
    <UserProvider>
      <FormProvider initialValues={{ email: '', password: '' }}>
        <LoginLayout currentUrl={currentUrl} />
      </FormProvider>
    </UserProvider>
  </ApolloProvider>
)

LoginPage.propTypes = {
  currentUrl: string
}

export default LoginPage
