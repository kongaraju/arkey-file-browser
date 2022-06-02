import React from 'react';
import {Folder} from './Folder';
import './FileBrowser.css';

const FileBrowser = ({ data }) => {
	return (<Folder name="Home" items={data} />);
};

export default FileBrowser;