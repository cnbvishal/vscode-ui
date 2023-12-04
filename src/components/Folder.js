import { useState } from "react";

function Folder({handleInsertNode, handleDeleteNode, explorer, parentId }) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const handleDeleteFolder = (e, parentId, id, isFolder) => {
    e.stopPropagation();
    handleDeleteNode(parentId, id, isFolder)
  };

  const onAddFolder=(e)=>{
    if(e.keyCode===13 && e.target.value){
      handleInsertNode(explorer.id,e.target.value,showInput.isFolder)
      setShowInput({...showInput,visible:false})
    }
  }

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span>📁 {explorer.name}</span>
          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
            <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
            {explorer.id !== "1" &&
              <button onClick={(e) => handleDeleteFolder(e, parentId, explorer.id, true)}><small>&#x2715;</small></button>
            }
          </div>
        </div>
        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {
            showInput.visible &&(
              <div className="inputContainer">
                <span>{showInput.isFolder?"📁":"📄"}</span>
                <input
                type="text"
                onKeyDown={onAddFolder}
                onBlur={()=>setShowInput({...showInput,visible:false})}
                className="inputContainer__input"
                autoFocus
                />
              </div>
            )
          }
          {explorer.items.map((exp) => {
            return <Folder
              key={exp.id}
              explorer={exp}
              parentId={explorer.id}
              handleDeleteNode={handleDeleteNode}
              handleInsertNode={handleInsertNode}
            />;
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="file">
        <span>📄{explorer.name} {" "}
          <button onClick={(e) => handleDeleteFolder(e, parentId, explorer.id, false)}><small> &#x2715;</small></button>
        </span>
      </div>
    );
  }
}
export default Folder;
