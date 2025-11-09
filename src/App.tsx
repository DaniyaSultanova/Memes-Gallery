import '@/App.css'
import MemesPage from '@/components/MemesPage'
import MemeDetailsPage from '@/components/MemeDetailsPage';
import CreateMeme from '@/components/CreateMemeForm';
import { Routes,Route, Navigate } from 'react-router-dom'

function App() {
   return (
     <Routes>
       <Route path="/" element={<Navigate to="/products" replace />} />
       <Route path="/products" element={<MemesPage />} />
       <Route path="/products/:id" element={<MemeDetailsPage />} />
       <Route path="/products/create-product" element={<CreateMeme />} />
     </Routes>
   );
}

export default App
