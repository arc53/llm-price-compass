import Compass from '@/assets/compass.svg'
import Sun from '@/assets/day-sunny.svg'
import Moon from '@/assets/moon.svg'
import Github from '@/assets/git.svg'
import Twitter from '@/assets/x.svg'
import { useTheme } from '@/ThemeContext';

const Nav = () => {
    const { isDarkTheme, toggleTheme } = useTheme();

    return (
        <header className='fixed top-0 left-0 right-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-14 px-4 flex items-center justify-between'>
            <div className='flex gap-2 ml-4'>
                <img src={Compass} className='filter dark:invert' />
                <span className='text-[#18181B] font-bold dark:text-white'>Compass</span>
                <span className='text-[#8B8989]'>by Arc53</span>
            </div>
            <div className='flex gap-4 mr-4'>
                <a target='_blank' href='https://github.com/arc53/llm-price-compass'>
                    <img className='filter dark:invert' src={Github} />
                </a>
                <a target='_blank' href='https://x.com/docsgptai'>
                    <img className='filter dark:invert' src={Twitter} />
                </a>
                <button
                    id='theme'
                    onClick={toggleTheme}
                >
                    {isDarkTheme ? (
                        <img className='filter dark' src={Moon} />
                    ) : (
                        <img className='filter dark:invert' src={Sun} />
                    )}
                </button>
            </div>
        </header>
    )
}

export default Nav