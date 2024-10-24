import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

export default function IconButton({
	icon,
	alt,
}: {
	icon: string | StaticImport;
	alt?: string;
}) {
	return (
		<button className=" p-2 w-10 h-10 border-none outline-none duration-200 rounded-lg background-white hover:bg-secondary-200 active:bg-secondary-300">
			<Image src={icon} width={24} height={24} alt={alt || "icon button"} />
		</button>
	);
}
