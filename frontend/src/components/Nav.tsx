import Compass from '@/assets/compass.svg'
import Sun from '@/assets/day-sunny.svg'
import Moon from '@/assets/moon.svg'
import Github from '@/assets/git.svg'
import Twitter from '@/assets/x.svg'
import { useTheme } from '@/ThemeContext';

const Nav = () => {

    const { isDarkTheme, toggleTheme } = useTheme();

    return (
        <div className='flex justify-between items-baseline'>
            <div className='flex gap-2'>
                <img src={Compass} className='filter dark:invert' />
                <span className='text-[#18181B] font-bold dark:text-white'>Compass</span>
                <span className='text-[#8B8989]'>by Arc53</span>
            </div>
            <div className='flex gap-4'>
                <a target='_blank' href='https://github.com/arc53/docsgpt'>
                    <img className='filter dark:invert' src={Github} />
                </a>
                <a target='_blank' href='https://x.com/docsgptai'>
                    <img className='filter dark:invert' src={Twitter} />
                </a>
                <button
                    id='theme'
                    onClick={toggleTheme}>{
                        isDarkTheme ?
                            <img className='filter dark' src={Moon} />
                            :
                            <img className='filter dark:invert' src={Sun} />
                    }
                </button>
            </div>
        </div>
    )
}

export default Nav