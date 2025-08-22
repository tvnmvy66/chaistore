import { Separator } from '@/components/ui/separator'
import Shop from './Shop.tsx'
import Slideshow from './ui/Slideshow.tsx'

function Herosection() {
    return (
        <div className=''>
            <Slideshow />
            <Separator className="my-4 shadow-2xl bg-[#4B2E2A]/10 hover:bg-[#FFF8F0]" />
            <Shop /> 
        </div>
    )
}

export default Herosection
