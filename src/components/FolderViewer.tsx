import { useState, MouseEvent } from 'react';
import styled from '@emotion/styled';
import { InsertDriveFileOutlined, FolderOutlined } from '@mui/icons-material';

import ContextMenu from './DirItemContextMenu';

interface RenderTree {
	id: string;
	label: string;
	type: string;
	children?: readonly RenderTree[];
}

const ItemIcon = styled('div')`
color: hotpink;
`;

const ItemLabel = styled('div')`
font-size: 16px;
`;

const ExplorerContainer = styled('div')`
display: flex;
margin-top: 10px;
`;

const ItemBlock = styled('div')`
display: inline-flex;
flex-direction: column;
text-align: center;
width: 150px;
height: 150px;
&:hover{
	background-color: #EFEFEF;
}
`;

function FolderItem({ item }: { item: RenderTree }) {
	const [contextMenu, setContextMenu] = useState<{
		mouseX: number;
		mouseY: number;
	} | null>(null);

	const handleContextMenu = (event: MouseEvent) => {
		event.preventDefault();
		setContextMenu(
			contextMenu === null
				? {
					mouseX: event.clientX + 2,
					mouseY: event.clientY - 6,
				}
				: // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
				// Other native context menus might behave different.
				// With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
				null,
		);
	};

	const handleClose = () => {
		setContextMenu(null);
	};

	return (<ItemBlock onContextMenu={handleContextMenu}>
		<ItemIcon>{item.type === 'folder' ? <FolderOutlined color='primary' sx={{ fontSize: 110 }} /> : <InsertDriveFileOutlined color='primary' sx={{ fontSize: 110 }} />}</ItemIcon>
		<ItemLabel>{item.label}</ItemLabel>
		<ContextMenu contextMenu={contextMenu} onClose={handleClose} onItemClick={handleClose} />
	</ItemBlock>);
}


export default function FolderViewer(props: { items: RenderTree[] }) {
	const { items } = props;
	return (<ExplorerContainer>
		{items.map(item => (<FolderItem key={item.id} item={item} />))}
	</ExplorerContainer>)
}
