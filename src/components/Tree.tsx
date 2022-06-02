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
import {InsertDriveFileOutlined, FolderOutlined} from '@mui/icons-material';
import { SvgIconProps } from '@mui/material/SvgIcon';

const CustomContentRoot = styled('div')(({ theme }) => ({
	WebkitTapHighlightColor: 'transparent',
	'&:hover, &.Mui-disabled, &.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused, &.Mui-selected:hover':
	{
		backgroundColor: 'transparent',
	},
	[`& .MuiTreeItem-contentBar`]: {
		position: 'absolute',
		width: '100%',
		height: 24,
		left: 0,
		'&:hover &': {
			backgroundColor: theme.palette.action.hover,
			// Reset on touch devices, it doesn't add specificity
			'@media (hover: none)': {
				backgroundColor: 'transparent',
			},
		},
		'&.Mui-disabled &': {
			opacity: theme.palette.action.disabledOpacity,
			backgroundColor: 'transparent',
		},
		'&.Mui-focused &': {
			backgroundColor: theme.palette.action.focus,
		},
		'&.Mui-selected &': {
			backgroundColor: alpha(
				theme.palette.primary.main,
				theme.palette.action.selectedOpacity,
			),
		},
		'&.Mui-selected:hover &': {
			backgroundColor: alpha(
				theme.palette.primary.main,
				theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
			),
			// Reset on touch devices, it doesn't add specificity
			'@media (hover: none)': {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity,
				),
			},
		},
		'&.Mui-selected.Mui-focused &': {
			backgroundColor: alpha(
				theme.palette.primary.main,
				theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
			),
		},
	},
}));

const CustomContent = React.forwardRef(function CustomContent(
	props: TreeItemContentProps,
	ref,
) {
	const {
		className,
		classes,
		label,
		nodeId,
		icon: iconProp,
		expansionIcon,
		displayIcon,
	} = props;

	const {
		disabled,
		expanded,
		selected,
		focused,
		handleExpansion,
		handleSelection,
		preventSelection,
	} = useTreeItem(nodeId);

	const icon = iconProp || expansionIcon || displayIcon;

	const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		preventSelection(event);
	};

	const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		handleExpansion(event);
		handleSelection(event);
	};

	return (
		<CustomContentRoot
			className={clsx(className, classes.root, {
				'Mui-expanded': expanded,
				'Mui-selected': selected,
				'Mui-focused': focused,
				'Mui-disabled': disabled,
			})}
			onClick={handleClick}
			onMouseDown={handleMouseDown}
			ref={ref as React.Ref<HTMLDivElement>}
		>
			<div className="MuiTreeItem-contentBar" />
			<div className={classes.iconContainer}>{icon}</div>
			<Typography component="div" className={classes.label}>
				{label}
			</Typography>
		</CustomContentRoot>
	);
});

const CustomTreeItem = (props: TreeItemProps) => (
	<TreeItem ContentComponent={CustomContent} {...props} />
);

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
	color: theme.palette.text.secondary,
	[`& .${treeItemClasses.content}`]: {
	  color: theme.palette.text.secondary,
	  borderTopRightRadius: theme.spacing(2),
	  borderBottomRightRadius: theme.spacing(2),
	  paddingRight: theme.spacing(1),
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
	    paddingLeft: theme.spacing(2),
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

const data: RenderTree = { 
	id: "-1", 
label: "Home", 
type: "home",
children: [{
	label: "Applications",
	id: "1",
	type: "folder",
	children: [{
		label: "Calendar",
		id: "2",
		type: "file",
		children: []
	},
	{
		label: "Chrome",
		id: "3",
		type: "file",
		children: []
	},
	{
		label: "Webstorm",
		id: "4",
		type: "file",
		children: []
	}]
}, {
	label: "Documents",
	id: "5",
	type: "folder",
	children: [
		{
			label: "OSS",
			id: "10",
			type: "file",
			children: []
		},
		{
			label: "MUI",
			id: "6",
			type: "folder",
			children: [
				{
					label: "Src",
					id: "7",
					type: "folder",
					children: [
						{
							label: "index.js",
							id: "8",
							type: "file",
							children: []
						},
						{
							label: "tree-view.js",
							id: "9",
							type: "file",
							children: []
						}
					]
				}
			]
		}
	]
}]};

interface RenderTree {
	id: string;
	label: string;
	type: string;
	children?: readonly RenderTree[];
}

const renderTree = (nodes: RenderTree) => (
	<StyledTreeItem key={nodes.id} nodeId={nodes.id} labelText={nodes.label} labelIcon={nodes.type === 'folder' ? FolderOutlined : InsertDriveFileOutlined }>
		{Array.isArray(nodes.children)
			? nodes.children.map((node) => renderTree(node))
			: null}
	</StyledTreeItem>
);



export default function BarTreeView() {
	return (
		<TreeView
			aria-label="icon expansion"
			defaultCollapseIcon={<ExpandMoreIcon />}
			defaultExpandIcon={<ChevronRightIcon />}
			sx={{ height: 240, flexGrow: 1, maxWidth: 400, position: 'relative' }}
		>
			{renderTree(data)}
		</TreeView>
	);
}
