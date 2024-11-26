// App.jsx or pages/index.jsx
import { DailyContentProvider } from '../context/DailyContentContext';
import DigitalNomadDaily from '../components/DigitalNomadDaily';

const App = () => {
  return (
    <DailyContentProvider>
      <DigitalNomadDaily />
    </DailyContentProvider>
  );
};

export default App;
