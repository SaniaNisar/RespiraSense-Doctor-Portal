import { toast } from "react-toastify";

export const notify = (message: any) =>
	toast(message, {
		position: "top-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "dark",
	});

export const getInitials = (name: string) => {
	const nameArray = name?.split(" ")?.splice(0, 2);
	const initials = nameArray
		?.map((word: string) => word[0])
		?.join("")
		?.toUpperCase();
	return initials;
};
