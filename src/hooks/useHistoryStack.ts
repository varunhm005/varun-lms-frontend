import { useEffect, useState } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// listen history change and store it
export function useHistoryStack() {
  const getValuesFromStorage = () => {
    const values = sessionStorage.getItem('historyStack');
    if (values) {
      return JSON.parse(values) as string[];
    }
    return [] as string[];
  };

  const [stack, setStack] = useState<Array<string>>(getValuesFromStorage());
  const { pathname } = useLocation();
  const type = useNavigationType();
  useEffect(() => {
    if (type === 'POP') {
      setStack(stack.slice(0, stack.length - 1));
    } else if (type === 'PUSH') {
      setStack([...stack, pathname]);
    } else {
      setStack([...stack.slice(0, stack.length - 1), pathname]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, type]);

  useEffect(() => {
    sessionStorage.setItem('historyStack', JSON.stringify(stack));
  }, [stack]);

  return stack;
}
