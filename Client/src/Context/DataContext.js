import { createContext, useReducer, useContext } from 'react';

const DataContext = createContext(null);
const DataDispatchContext = createContext(null);

/**
 * reducer 명령어
 * 1. fetching Data by page
 *    내부적으로 infinitypage
 * 2. update commentItem
 *    storedData 조작하구
 */

const DATA_ACTION_TYPE = {
  FETCH_BY_PAGE: 'Fetch by page',
  UPDATE_ITEM: 'Update the comment item',
};

const dataReducer = async (state, action) => {
  switch (action.type) {
    case DATA_ACTION_TYPE.FETCH_BY_PAGE:
      // 페이지별로 불러오기

      // getCommentsByPage();

      break;

    case DATA_ACTION_TYPE.UPDATE_ITEM:
      // 특정 아이템 바꾸기
      break;
    default:
  }
};

export default function DataContextProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, {});

  return (
    <DataContext.Provider value={state}>
      <DataDispatchContext.Provider value={dispatch}>{children}</DataDispatchContext.Provider>
    </DataContext.Provider>
  );
}

export const useDataState = () => useContext(DataContext);
export const useDataDispatch = () => useContext(DataDispatchContext);

/**
 * DataContext를 짜는 이유
 *
 * 1. 데이터 패칭을 관장하는 책임 머시깽이가 있어야 함
 * 2. 무한 스크롤도 같이 되야 함 << 책임을 분리하긴 해야 하는데 1번에 쓰는 느낌으로
 * 3. 넘겨주는 Data를 관리해주기 위해서 << 이것도 생각해보니 분리되어야 할 것 같기도
 */
