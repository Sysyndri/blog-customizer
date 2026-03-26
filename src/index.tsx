import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const [styleState, setStyleState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleUpdateSettings = (newState: ArticleStateType) => {
		setFormState(newState);
	};

	const handleApplyStyles = () => {
		setStyleState(formState);
	};

	const handleResetStyles = () => {
		setFormState(defaultArticleState);
		setStyleState(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': styleState.fontFamilyOption.value,
					'--font-size': styleState.fontSizeOption.value,
					'--font-color': styleState.fontColor.value,
					'--container-width': styleState.contentWidth.value,
					'--bg-color': styleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				formState={formState}
				setFormState={handleUpdateSettings}
				onApply={handleApplyStyles}
				onReset={handleResetStyles}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
