import { CSSProperties, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { ArticleParamsForm } from './article-params-form';
import { Article } from './article';

import '../styles/index.scss';
import styles from '../styles/index.module.scss';

export const App = () => {
	const [styleState, setStyleState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleApplyStyles = (formState: ArticleStateType) => {
		setStyleState(formState);
	};

	const handleResetStyles = () => {
		setStyleState(defaultArticleState);
	};

	return (
		<main
			className={styles.main}
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
				onApply={handleApplyStyles}
				onReset={handleResetStyles}
			/>
			<Article />
		</main>
	);
};
