import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import useOnClickOutside from 'src/hooks/useOnClickOutside';

interface ArticleParamsFormProps {
	onApply: (formState: ArticleStateType) => void;
	onReset: () => void;
}

export const ArticleParamsForm = ({
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const [isFormOpen, setFormOpen] = useState(false);

	const formRef = useRef(null);

	const formToogle = () => {
		setFormOpen(!isFormOpen);
	};

	const selectValue = <K extends keyof ArticleStateType>(
		key: K,
		value: ArticleStateType[K]
	) => {
		setFormState({
			...formState,
			[key]: value,
		});
	};

	const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApply(formState);
		setFormOpen(false);
	};

	const formReset = () => {
		setFormState(defaultArticleState);
		onReset();
	};

	useOnClickOutside(formRef, () => setFormOpen(false), isFormOpen);

	useEffect(() => {
		if (!isFormOpen) {
			return;
		}

		const handleEscKey = (event: KeyboardEvent) => {
			if (isFormOpen && event.key === 'Escape') {
				setFormOpen(false);
			}
		};

		document.addEventListener('keydown', handleEscKey);

		return () => {
			document.removeEventListener('keydown', handleEscKey);
		};
	}, [isFormOpen]);

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={formToogle} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={formSubmit}
					onReset={formReset}
					ref={formRef}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>

					<Select
						title='шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value) =>
							selectValue('fontFamilyOption', value)
						}></Select>

					<RadioGroup
						title='размер шрифта'
						name='font-size'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(value) =>
							selectValue('fontSizeOption', value)
						}></RadioGroup>

					<Select
						title='цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(value) => selectValue('fontColor', value)}></Select>

					<Separator />

					<Select
						title='цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(value) =>
							selectValue('backgroundColor', value)
						}></Select>

					<Select
						title='ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(value) => selectValue('contentWidth', value)}></Select>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
