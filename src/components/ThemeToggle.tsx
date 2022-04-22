import { useContext, useState } from 'react';
import { POKEBALL } from '../constants';
import { ThemeContext } from '../utils/ThemeContext';
import { Flex } from './Flex';
import { Img } from './Img';

export const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const trueBall = POKEBALL.findIndex((x) => x.theme === theme) ?? 0;
  const fallback = POKEBALL[0].path;

  const [ball, setBall] = useState(() => POKEBALL[trueBall].path);

  const switchTheme = () => {
    const nextIndex =
      (POKEBALL.findIndex((x) => x.theme === theme) + 1) %
      POKEBALL.length;
    setTheme(POKEBALL[nextIndex].theme);
    setBall(POKEBALL[nextIndex].path);
  };

  return (
    <Flex
      onClick={switchTheme}
      css={{
        borderRadius: '$5',
        flexShrink: 0,
      }}
    >
      <Img
        css={{ height: 'auto', width: 120 }}
        src={ball ?? fallback}
      />
    </Flex>
  );
};
