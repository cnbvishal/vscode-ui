const useTraverseTree=()=>{
function insertNode(tree,folderId,item,isFolder){
    if(tree.id===folderId && tree.isFolder){
        tree.items.unshift({
            id:new Date().getTime(),
            name:item,
            isFolder,
            items:[]
        });
        return tree;
    }
    let latestNode=[]
    latestNode=tree.items.map((ob)=>{
        return insertNode(ob,folderId,item,isFolder)
    });
    return {...tree,items:latestNode}
}

function deleteNode(tree, parentId, folderId, isFolder) {
    if (tree.id === parentId) {
        const treeItems = tree.items.filter((data) => data.id !== folderId);
        return { ...tree, items: treeItems };
    }

    let latestNode = []
    latestNode = tree.items.map((ob) => {
        return deleteNode(ob, parentId, folderId, isFolder)
    });
    return { ...tree, items: latestNode }
}

return {insertNode, deleteNode};
}
export default useTraverseTree;