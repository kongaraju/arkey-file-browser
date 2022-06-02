import * as React from 'react';
import {InsertDriveFileOutlined, FolderOutlined} from '@mui/icons-material';

interface RenderTree {
	id: string;
	label: string;
	type: string;
	children?: readonly RenderTree[];
}
export default function FolderViewer(props: {items:RenderTree[]}){
	const {items} = props;
	return (<div>
		{items.map(item => (<div>
			<div>{item.type === 'folder' ? <FolderOutlined /> : <InsertDriveFileOutlined />}</div>
			<h3>{item.label}</h3>
		</div>))}
	</div>)
}
