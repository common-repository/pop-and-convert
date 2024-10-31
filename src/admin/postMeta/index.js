import PostMeta from './postMeta'
import { createRoot } from 'react-dom/client';
import './index.scss'

const onDocumentLoaded = (cb) => {
	if (/comp|inter|loaded/.test(document.readyState)) {
		cb()
	} else {
		document.addEventListener('DOMContentLoaded', cb, false)
	}
}

onDocumentLoaded(() => {

	const a = document.createElement('a')
	document.body.appendChild(a)
	const root = createRoot(a);

	root.render(<PostMeta />)
})