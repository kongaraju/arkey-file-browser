import axios from "axios";
import JSONdata from "../components/flatdata.json";

interface RenderTree {
  id: string;
  label: string;
  type: string;
  parent?: string;
  children?: readonly RenderTree[];
}

interface DirsList {
  [index: string]: readonly RenderTree[];
}

export default class FileBrowserService {
  dirsList: DirsList;
  constructor() {
    this.dirsList = {};
    //     const data: RenderTree = JSONdata;
    //     if(data.children) this.dirsList[data.id] = data.children;
    //     this.parseDirs(data);
  }
  private parseDirs(data: RenderTree) {
    if (data.children) {
      for (const item of data.children) {
        if (item.type === "folder" && item.children) {
          this.dirsList[item.id] = item.children;
          this.parseDirs(item);
        }
      }
    }
  }
  getListByFolderId(folderId: string): Promise<RenderTree[]> {
    return new Promise((resolve, reject) => {
      const data: RenderTree[] = JSONdata;
      resolve(data.filter((item) => item.parent === folderId) ?? []);
    });
  }
  getPath(folderId: string): Promise<RenderTree[]> {
    return new Promise((resolve, reject) => {
      const data: RenderTree[] = JSONdata;
      const currentNode = data.find((item) => item.id === folderId);
      const path = currentNode ? this.constructPath(currentNode) : [];
      resolve(path);
    });
  }
  private constructPath(currentNode: RenderTree, path: RenderTree[] = []){
	const currentPath = path;
	currentPath.unshift(currentNode);
	if(currentNode.parent){
		const data: RenderTree[] = JSONdata;
		const newNode = data.find((item) => item.id === currentNode.parent);
		newNode && this.constructPath(newNode, currentPath);
	}
	return currentPath;
  }
}
