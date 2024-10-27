'use client'

import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import Text from "./Typography/Text";
import { twMerge } from "tailwind-merge";

type CheckBoxProps = {
	title: string;
	name: string;
} & React.ComponentPropsWithRef<"div">;

type CheckBoxGroupProps = {
	children: ReactNode;
} & React.ComponentPropsWithRef<"div">;

const CheckBoxGroupContext = createContext<{
	selected?: string;
	setSelected: (value: string) => unknown;
}>({
	selected: "",
	setSelected: () => {},
});

export function CheckBox({ title, name, className }: CheckBoxProps) {
	const [isChecked, setIsChecked] = useState(false);

	const { selected, setSelected } = useContext(CheckBoxGroupContext);

	useEffect(() => {
		setIsChecked(selected === name);
	}, [selected, name]);

	useEffect(() => {
		if (isChecked) {
			setSelected(name);
		}
	}, [isChecked, name, setSelected]);

	return (
		<button
			className={twMerge(
				"px-4 py-3 rounded-lg border-[1px] border-black-500 hover:bg-secondary-200 duration-200",
				className
			)}
		>
			<Text className=" font-medium">{title}</Text>
		</button>
	);
}

export function CheckBoxGroup({
	children,
	className,
	...props
}: CheckBoxGroupProps) {
	const [selected, setSelected] = useState<string>();

	return (
		<CheckBoxGroupContext.Provider value={{ selected, setSelected }}>
			<div className={className} {...props}>
				{children}
			</div>
		</CheckBoxGroupContext.Provider>
	);
}
