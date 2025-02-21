import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils.js";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser,subscribeToMessages,unsubscribeToMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);

      subscribeToMessages();

      return()=> unsubscribeToMessages();
    }
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeToMessages]);

  // Scroll to the last message when messages update
  useEffect(() => {
    if (messagesEndRef.current && messages) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!selectedUser) {
    return <div className="flex-1 flex items-center justify-center">No chat selected</div>;
  }

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Fixed Header */}
      <div className="sticky top-0 z-10 bg-base-100 border-b border-base-300">
        <ChatHeader />
      </div>

      {/* Messages Container (Only this part scrolls) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id} 
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messagesEndRef} 
          >
            {/* User Avatar */}
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "avatar.svg"
                      : selectedUser.profilePic || "avatar.svg"
                  }
                  alt="profile pic"
                />
              </div>
            </div>

            {/* Message Content */}
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
        {/* Auto-scroll to the latest message */}
      </div>

      {/* Fixed Input Box */}
      <div className="sticky bottom-0 z-10 bg-base-100 border-t border-base-300">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
