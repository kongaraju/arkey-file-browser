import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

interface RenderTree {
	id: string;
	label: string;
	type: string;
	parent?: string;
	children?: readonly RenderTree[];
}

interface FileBrowserBreadcrumbs {
  path: RenderTree[]
}

export default function FileBrowserBreadcrumbs(props: FileBrowserBreadcrumbs) {
  const { path } = props;
  const breadcrumbs = path.map(breadcrumb => (<Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
    {breadcrumb.label}
  </Link>))

  breadcrumbs.splice(breadcrumbs.length - 1, 1, <Typography key="3" color="text.primary">
    {path[path.length - 1]?.label}
  </Typography>);


  return (<Breadcrumbs
    separator={<NavigateNextIcon fontSize="small" />}
    aria-label="breadcrumb"
  >
    {breadcrumbs}
  </Breadcrumbs>
  );
}
