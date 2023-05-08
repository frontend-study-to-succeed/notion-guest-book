import { createContext, useState } from 'react';
import { useUserInfo } from '../Hooks/useUserInfo';

const CommentContext = createContext(null);

export default function CommentProvider({ children }) {
  const [userInfo, setUserInfo] = useUserInfo();

  const [commentInfo, setCommentInfo] = useState({
    userName: userInfo.userName,
    userPassword: userInfo.userPassword,
    userProfile: userInfo.userProfile,
    commentDate: '',
    commentType: '',
    commentContent: '',
    commentReaction: '',
    commentReply: '',
  });

  const mutateCommentInfo = (stateName, stateValue) =>
    setCommentInfo((prevState) => ({ ...prevState, [stateName]: stateValue }));

  const value = { commentInfo, mutateCommentInfo };

  return <CommentContext.Provider value={value}>{children}</CommentContext.Provider>;
}

export { CommentContext };
