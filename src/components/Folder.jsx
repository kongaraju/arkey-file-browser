import { Fragment, useState } from "react";

export function File({ name }) {
	return (<span>{name}</span>);
}

export function Folder({ name, items }) {
	const [expand, setExpand] = useState(false);
	const toggleExpand = () => {
		setExpand(!expand);
	}
	return (<Fragment>
		<p onClick={toggleExpand} className="folder-name">
			<span className={expand ? `folder-open` : ``}>{`>`}</span>
			<a href="#">{name}</a>
		</p>
		{expand && <ul className="folder-list">{items.map((item, idx) => {
			return (<li key={item.name + '_' + idx} className={item.type}>
				{
					item.type === 'file'
						? <File name={item.name} />
						: <Folder name={item.name} items={item.children} />
				}
			</li>)
		})}
		</ul>
		}</Fragment>)
};