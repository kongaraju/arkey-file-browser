import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem, {
	TreeItemProps,
	useTreeItem,
	TreeItemContentProps,
	treeItemClasses
} from '@mui/lab/TreeItem';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import { InsertDriveFileOutlined, FolderOutlined } from '@mui/icons-material';
import { SvgIconProps } from '@mui/material/SvgIcon';

declare module 'react' {
	interface CSSProperties {
		'--tree-view-color'?: string;
		'--tree-view-bg-color'?: string;
	}
}

type StyledTreeItemProps = TreeItemProps & {
	bgColor?: string;
	color?: string;
	labelIcon: React.ElementType<SvgIconProps>;
	labelInfo?: string;
	labelText: string;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
	color: theme.palette.text.primary,
	[`& .${treeItemClasses.content}`]: {
		color: theme.palette.text.secondary,
		borderTopRightRadius: theme.spacing(2),
		borderBottomRightRadius: theme.spacing(2),
		// paddingRight: theme.spacing(1),
		padding: 0,
		fontWeight: theme.typography.fontWeightMedium,
		'&.Mui-expanded': {
			fontWeight: theme.typography.fontWeightRegular,
		},
		'&:hover': {
			backgroundColor: theme.palette.action.hover,
		},
		'&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
			backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
			color: 'var(--tree-view-color)',
		},
		[`& .${treeItemClasses.label}`]: {
			fontWeight: 'inherit',
			color: 'inherit',
		},
	},
	[`& .${treeItemClasses.group}`]: {
		//   marginLeft: 10,
		[`& .${treeItemClasses.content}`]: {
			// paddingLeft: theme.spacing(2),
		},
	},
}));

function StyledTreeItem(props: StyledTreeItemProps) {
	const {
		bgColor,
		color,
		labelIcon: LabelIcon,
		labelInfo,
		labelText,
		...other
	} = props;

	return (
		<StyledTreeItemRoot
			label={
				<Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
					<Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
					<Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
						{labelText}
					</Typography>
					<Typography variant="caption" color="inherit">
						{labelInfo}
					</Typography>
				</Box>
			}
			style={{
				'--tree-view-color': color,
				'--tree-view-bg-color': bgColor,
			}}
			{...other}
		/>
	);
}

interface RenderTree {
	id: string;
	label: string;
	type: string;
	children?: readonly RenderTree[];
}

const renderTree = (nodes: RenderTree) => (
	<StyledTreeItem key={nodes.id} nodeId={nodes.id} labelText={nodes.label} labelIcon={nodes.type === 'folder' ? FolderOutlined : InsertDriveFileOutlined}>
		{Array.isArray(nodes.children)
			? nodes.children.map((node) => renderTree(node))
			: null}
	</StyledTreeItem>
);

type BarTreeItemOnSelect = (folderId: string) => void;
interface BarTreeViewProps {
	onSelect: BarTreeItemOnSelect;
	data: RenderTree;
}

export default function BarTreeView(props: BarTreeViewProps) {
	const { onSelect, data } = props;
	return (
		<TreeView
			aria-label="icon expansion"
			defaultCollapseIcon={<ExpandMoreIcon />}
			defaultExpandIcon={<ChevronRightIcon />}
			onNodeSelect={(ev:any, nodeId: string) => onSelect(nodeId)}
			sx={{ height: '100%', flexGrow: 1, width: '100%', position: 'relative' }}
		>
			{renderTree(data)}
		</TreeView>
	);
}
