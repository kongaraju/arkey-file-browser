import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import FileBrowser from './FileBrowser';

function PaperComponent(props: PaperProps) {
	return (
		<Draggable
			handle="#draggable-dialog-title"
			cancel={'[class*="MuiDialogContent-root"]'}
		>
			<Paper {...props} />
		</Draggable>
	);
}

interface FileBrowserDialogProps {
	name: string;
}

export default function FileBrowserDialog(props: FileBrowserDialogProps) {

	const { name } = props;
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (ev: any, reason?: string) => {
		if (!reason) setOpen(false);
	};

	return (
		<div style={{ height: '150px', width: '150px', display: 'inline-flex' }}>
			<div style={{ height: '150px', width: '150px', border: '1px solid #CCC', borderRadius: '3px', textAlign: 'center', alignItems: 'center', display: 'inline-flex', flexDirection: 'column' }} onClick={handleClickOpen}>
				<StorageOutlinedIcon color='primary' sx={{ fontSize: 110 }} />
				<div><span>{name}</span></div>
			</div>
			<Dialog
				open={open}
				hideBackdrop
				disableEscapeKeyDown
				fullWidth
				maxWidth={'sm'}
				onClose={handleClose}
				PaperComponent={PaperComponent}
				aria-labelledby="draggable-dialog-title"
				disableEnforceFocus
				style={{ pointerEvents: 'none' }}
				PaperProps={{ style: { pointerEvents: 'auto' } }}
			>
				<DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
					{name}
				</DialogTitle>
				<DialogContent>
					<FileBrowser />
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose}>
						Cancel
					</Button>
					<Button onClick={handleClose}>Subscribe</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
