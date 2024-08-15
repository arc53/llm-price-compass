import LLMComparisonTable from './pages/LLMProviderComparison'
import LLMComparisonChart from './pages/LLMPriceCompass'
import './App.css'
import Nav from './components/Nav'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LLMComparisonChart />} />
          <Route path='/datagrid' element={<LLMComparisonTable />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
