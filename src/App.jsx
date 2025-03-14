import Notification from "./components/Notification"
import { DataProvider } from "./context/DataContext"
import RouterApp from "./Routes"

function App() {
  return (
    <DataProvider>
      <Notification/>
      <RouterApp/>
    </DataProvider>
    
  )
}

export default App
