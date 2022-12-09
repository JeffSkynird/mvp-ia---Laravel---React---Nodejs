import Theme from './components/theme/Theme'
import { BrowserRouter } from "react-router-dom";
import Router from './components/router/Router'
import Notification from './components/notification/Notification';
import Store from './store/Store'
import {
  QueryClient,
  QueryClientProvider
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Drawer from './components/drawer/Drawer'
const queryClient = new QueryClient()

function App() {

  return (
    <BrowserRouter>
      <Store>
        <Theme>
          <QueryClientProvider client={queryClient}>
            <Notification />
            <Drawer>
              <Router />
            </Drawer>
           
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </QueryClientProvider>
        </Theme>
      </Store>
    </BrowserRouter>
  )
}

export default App
