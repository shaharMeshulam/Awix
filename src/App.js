import './test-ori/assets/style.scss'
import { Editor } from './test-ori/pages/Editor';
import { HTML5Backend } from 'react-dnd-html5-backend'

import { DndProvider } from 'react-dnd'
import { Editor4 } from './test4/pages/Editor4';

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Editor />
      </DndProvider>
    </div>
  );
}

export default App;
