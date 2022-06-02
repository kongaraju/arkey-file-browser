
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import BarTreeView from './Tree';
import FileBrowserBreadcrumbs from './Breadcrumbs';
import FolderViewer from './FolderViewer';

export default function FileBrowser() {
	return (<Grid container spacing={2}>
		<Grid item xs={3}>
			<BarTreeView />
		</Grid>
		<Grid item xs={9}>
			<Stack>
				<FileBrowserBreadcrumbs />
				<FolderViewer items={[]} />
			</Stack>
		</Grid>
	</Grid>);
}