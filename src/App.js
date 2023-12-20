import {useState} from 'react';
import explorer from './data/folderData';
import Folder from "./components/Folder";
import "./style.css";
import useTraverseTree from './custom/use-traverse-tree';
function App() {

  const [explorerData, setExplorerData] = useState(explorer)
  const {insertNode, deleteNode}=useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree)
  }

  const handleDeleteNode = (parentId, folderId, isFolder) => {
    const finalTree = deleteNode(explorerData, parentId, folderId, isFolder);
    setExplorerData(finalTree)
  }

  return (
    <div className="App"style={{ margin: '30px' }}>
      <h1>
      Vscode-ui-Clone
      </h1>
      <p>
        Welcome to the Vscode-ui-Clone application! This is a demo application showcasing a UI similar to Visual Studio Code's file explorer.
      </p>
      <Folder
        explorer={explorerData}
        parentId={explorerData.id}
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
      />
    </div>
  );
}

export default App;
