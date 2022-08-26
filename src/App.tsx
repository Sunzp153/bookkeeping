import { HashRouter } from 'react-router-dom';
import Bookkeeping from './Bookkeeping';
import './App.css';
import 'moment/locale/zh-cn';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
function App() {
  return (
    <div className="App">
      <ConfigProvider locale={zh_CN}>
        <HashRouter>
            <Bookkeeping />
        </HashRouter>
      </ConfigProvider>
    </div>
  );
}
export default App
