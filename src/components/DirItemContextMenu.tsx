import {useState, MouseEvent} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

interface FolderItemContextMenuProps {
	contextMenu: any;
	onClose(): void;
	onItemClick():void;
}

export default function ContextMenu({contextMenu, onClose, onItemClick}:FolderItemContextMenuProps) {
 

  return (
      <Menu
        open={contextMenu !== null}
        onClose={onClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={onItemClick}>Copy</MenuItem>
        <MenuItem onClick={onItemClick}>Move</MenuItem>
        <MenuItem onClick={onItemClick}>Download</MenuItem>
        <MenuItem onClick={onItemClick}>Share</MenuItem>
      </Menu>
  );
}
