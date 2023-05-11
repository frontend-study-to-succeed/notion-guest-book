import { createContext, useContext, useEffect, useState } from 'react';
import { useUserInfo } from './UserInfoContext';

const CommentContext = createContext(null);

export default function CommentProvider({ children }) {
  const { userInfo } = useUserInfo();

  useEffect(() => {
    mutateCommentInfo('userName', userInfo.userName);
    mutateCommentInfo('userPassword', userInfo.userPassword);
    mutateCommentInfo('userProfile', userInfo.userProfile);
  }, [userInfo]);

  const [commentInfo, setCommentInfo] = useState({
    userName: userInfo.userName,
    userPassword: userInfo.userPassword,
    userProfile: userInfo.userProfile,
    commentDate: '',
    commentType: 3,
    commentContent: '',
    commentReaction: '',
    commentReply: '',
  });

  const mutateCommentInfo = (stateName, stateValue) =>
    setCommentInfo((prevState) => ({ ...prevState, [stateName]: stateValue }));

  const value = { commentInfo, mutateCommentInfo };

  return <CommentContext.Provider value={value}>{children}</CommentContext.Provider>;
}

export const useComment = () => useContext(CommentContext);
