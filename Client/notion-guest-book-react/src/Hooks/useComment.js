import { useContext } from 'react';
import { CommentContext } from '../Context/CommentContext';

export const useComment = () => {
  return useContext(CommentContext);
};
