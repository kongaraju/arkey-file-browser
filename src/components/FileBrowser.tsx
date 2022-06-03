import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import BarTreeView from './Tree';
import FileBrowserBreadcrumbs from './Breadcrumbs';
import FolderViewer from './FolderViewer';
import FileBrowserService from '../services/FileBrowserService';


interface RenderTree {
	id: string;
	label: string;
	type: string;
	parent?: string;
	children?: readonly RenderTree[];
}
interface DirsList {
	[index: string]: RenderTree;
}

export default function FileBrowser() {
	const fileBrowserService = new FileBrowserService;
	const homeNode = {
		"id": "-1",
		"label": "Home",
		"type": "home",
	};
	const [selectedFolder, setSelectedFolder] = useState(null);
	const [path, setPath] = useState<RenderTree[]>([]);
	const [selectDirList, setSelectDirList] = useState<RenderTree[]>([]);
	const [foldersTree, setFoldersTree] = useState(homeNode);
	const dirsList: DirsList = {};
	const updateDirsList = (tree: RenderTree) => {
		dirsList[tree.id] = tree;
		if (tree.children)
			for (const item of tree.children) {
				updateDirsList(item);
			}
	};

	const onSelect = (folderId: string) => {
		console.log(folderId);
		updateFilesTree(folderId);
	};

	useEffect(() => {
		const homeKey = "-1";
		dirsList[homeKey] = homeNode;
		updateFilesTree(homeKey);
	}, []);

	useEffect(() => {
		updateDirsList(foldersTree);
	}, [foldersTree, path]);

	const updateFilesTree = (folderId: string) => {
		fileBrowserService.getListByFolderId(folderId).then((items) => {
			dirsList[folderId].children = items;
			setFoldersTree({ ...foldersTree });
			setSelectDirList(items);
			return fileBrowserService.getPath(folderId);
		}).then(path => setPath(path));
	}

	return (<Grid container style={{ height: '100%', marginTop: '10px'}}>
		<Grid item xs={3} style={{borderRight:'1px solid #CCC'}}>
			<BarTreeView onSelect={onSelect} data={foldersTree} />
		</Grid>
		<Grid item xs={9}>
			<Stack>
				<div style={{borderBottom:'1px solid #CCC', paddingBottom: '5px', paddingLeft: '10px'}}>
					<FileBrowserBreadcrumbs path={path}/>
				</div>
				<FolderViewer items={selectDirList} />
			</Stack>
		</Grid>
	</Grid>);
}