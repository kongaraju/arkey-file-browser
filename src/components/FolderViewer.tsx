import * as React from 'react';
import styled from '@emotion/styled';
import { InsertDriveFileOutlined, FolderOutlined } from '@mui/icons-material';

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
height: 220px;
`;
export default function FolderViewer(props: { items: RenderTree[] }) {
	const { items } = props;
	return (<ExplorerContainer>
		{items.map(item => (<ItemBlock key={item.id}>
			<ItemIcon>{item.type === 'folder' ? <FolderOutlined color='primary' sx={{ fontSize: 110 }} /> : <InsertDriveFileOutlined color='primary' sx={{ fontSize: 110 }} />}</ItemIcon>
			<ItemLabel>{item.label}</ItemLabel>
		</ItemBlock>))}
	</ExplorerContainer>)
}
