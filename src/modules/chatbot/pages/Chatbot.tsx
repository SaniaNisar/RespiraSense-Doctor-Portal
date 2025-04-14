import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

interface Message {
  sender: "user" | "bot";
  content: string;
}

const Chatbot = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const chatWindowRef = useRef<HTMLDivElement>(null);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInput(event.target.value);
	};

	const handleSendMessage = async () => {
		if (input.trim()) {
			const userMessage: Message = { sender: "user", content: input };
			setMessages((prevMessages) => [...prevMessages, userMessage]);
			setInput("");
			setLoading(true);

			try {
				const chatHistory = [...messages, userMessage].map((message) => ({
					role: message.sender === "user" ? "user" : "assistant",
					content: message.content,
				}));

				const response = await fetch("http://localhost:5000/api/chatbot", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ messages: chatHistory }),
				});

				if (!response.ok) throw new Error("Failed to fetch the bot response.");

				const data = await response.json();
				const botMessage: Message = { sender: "bot", content: data.response };
				setMessages((prevMessages) => [...prevMessages, botMessage]);
			} catch (error) {
				console.error("Error:", error);
				setMessages((prevMessages) => [
					...prevMessages,
					{ sender: "bot", content: "Error connecting to the chatbot service." },
				]);
			} finally {
				setLoading(false);
			}
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" && !loading) {
			handleSendMessage();
		}
	};

	useEffect(() => {
		if (chatWindowRef.current) {
			chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100vh", backgroundColor: "white" }}>
			{/* Chat Window */}
			<Box
				ref={chatWindowRef}
				sx={{
					flex: 1,
					overflowY: "auto",
					padding: "20px",
					backgroundColor: "#e8e8e8",
					borderTop: "1px solid #ddd",
					borderBottom: "1px solid #ddd",
					display: "flex",
					flexDirection: "column",
					maxWidth: "100%",
				}}
			>
				{messages.map((message, index) => (
					<Box
						key={index}
						sx={{
							maxWidth: "70%",
							padding: "10px",
							borderRadius: "10px",
							wordWrap: "break-word",
							fontSize: "14px",
							margin: "5px 0",
							alignSelf: message.sender === "user" ? "flex-end" : "flex-start",
							backgroundColor: message.sender === "user" ? "#b71c1c" : "#d4d4d4",
							color: message.sender === "user" ? "white" : "black",
							textAlign: message.sender === "user" ? "right" : "left",
							borderBottomRightRadius: message.sender === "user" ? 0 : "10px",
							borderBottomLeftRadius: message.sender === "bot" ? 0 : "10px",
						}}
					>
						<Typography>{message.content}</Typography>
					</Box>
				))}
				{loading && <Typography sx={{ textAlign: "center", color: "gray", fontSize: "14px", marginTop: "5px" }}>Bot is typing...</Typography>}
			</Box>

			{/* Input Section */}
			<Box sx={{ display: "flex", padding: "10px", backgroundColor: "#fff", borderTop: "1px solid #ddd", position: "sticky", bottom: 0, width: "100%", boxSizing: "border-box" }}>
				<TextField
					fullWidth
					value={input}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					placeholder="Type a message..."
					sx={{
						flex: 1,
						padding: "0px",
						fontSize: "16px",
						border: "1px solid #ccc",
						borderRadius: "5px",
						outline: "none",
					}}
				/>
				<Button
					onClick={handleSendMessage}
					disabled={loading}
					sx={{
						padding: "10px 15px",
						fontSize: "16px",
						marginLeft: "10px",
						backgroundColor: "#b71c1c",
						color: "white",
						borderRadius: "5px",
						cursor: "pointer",
						transition: "0.2s",
						"&:hover": { backgroundColor: "#9a1313" },
						"&:disabled": { backgroundColor: "#d4d4d4", cursor: "not-allowed" },
					}}
				>
          Send
				</Button>
			</Box>
		</Box>
	);
};

export default Chatbot;
