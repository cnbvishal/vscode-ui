import {useState} from 'react';
import explorer from './data/folderData';
import Folder from "./components/Folder";
import "./style.css";
import useTraverseTree from './custom/use-traverse-tree';
function App() {

  const [explorerData, setExplorerData] = useState(explorer)
  const {insertNode}=useTraverseTree();
  const handleInsertNode=(folderId,item,isFolder)=>{
  const finalTree = insertNode(explorerData,folderId,item,isFolder);
  setExplorerData(finalTree)
  }

  return (
    <div className="App">
     <Folder handleInsertNode={handleInsertNode} explorer={explorerData}/>
 </div>
  );
}

export default App;
