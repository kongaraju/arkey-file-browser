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
	}, [foldersTree]);

	const updateFilesTree = (folderId: string) => {
		fileBrowserService.getListByFolderId(folderId).then((items) => {
			dirsList[folderId].children = items;
			setFoldersTree({ ...foldersTree });
			setSelectDirList(items);
		});
	}

	return (<Grid container spacing={2}>
		<Grid item xs={3}>
			<BarTreeView onSelect={onSelect} data={foldersTree} />
		</Grid>
		<Grid item xs={9}>
			<Stack>
				<FileBrowserBreadcrumbs />
				<FolderViewer items={selectDirList} />
			</Stack>
		</Grid>
	</Grid>);
}