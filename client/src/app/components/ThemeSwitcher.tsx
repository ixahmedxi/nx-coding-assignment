import { useTheme } from 'next-themes';
import { FiMoon, FiSun } from 'react-icons/fi';

const size = 24;

export const ThemeSwitcher = () => {
  const { resolvedTheme, setTheme } = useTheme();

  if (!resolvedTheme) return null;

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="dark:text-zinc-400 text-zinc-600 transition-colors dark:hover:text-white hover:text-black flex items-center"
    >
      {resolvedTheme === 'dark' ? (
        <FiMoon title="dark-mode" size={size} />
      ) : (
        <FiSun title="light-mode" size={size} />
      )}
    </button>
  );
};
