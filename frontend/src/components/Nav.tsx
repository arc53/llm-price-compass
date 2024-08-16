import Compass from '@/assets/compass.svg'
import Sun from '@/assets/day-sunny.svg'
import Github from '@/assets/git.svg'
import Twitter from '@/assets/x.svg'

const Nav = () => {
  return (
    <div className='flex justify-between items-baseline'>
        <div className='flex gap-2'>
            <img src={Compass} className=''/>
            <span className='text-[#18181B] font-bold'>Compass</span>
            <span className='text-[#8B8989]'>by Arc53</span>
        </div>
        <div className='flex gap-4'>
            <a href='https://github.com/arc53/docsgpt'>
                <img src={Github}/>
            </a>
            <a href='https://x.com/docsgptai'>
                <img src={Twitter}/>
            </a>
            <button>
                <img src={Sun}/>
            </button>
        </div>
    </div>
  )
}

export default Nav