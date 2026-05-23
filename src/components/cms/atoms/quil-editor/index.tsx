'use client';

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import CSS ở đây

const ReactQuill = dynamic(() => import('react-quill'), {
	ssr: false,
});

interface Props {
	label: string;
	value: string;
	onChange: (value: string) => void;
}

export default function QuillEditor({ label, value, onChange }: Props) {
	return (
		<div className="w-full min-h-[180px]">
			<span> {label}</span>
			<ReactQuill
				value={value}
				onChange={onChange}
				style={{ minHeight: '180px' }}
				theme="snow"
				className="bg-white"
			/>
		</div>
	);
}
