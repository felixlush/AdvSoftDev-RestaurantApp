import React from 'react'
import MenuDropDown from './MenuDropDown'
import { useRouter } from "next/navigation";

export default function NavLink(props: {title: string, subtitles: string[], isOpen: boolean, onClick: () => void,  href: string}) {
    const router = useRouter()

    const handleClick = () => {
        router.push(props.href);
        props.onClick()
    }

    return (
        <div className='relative flex flex-col items-center self-center'>
            <button className='flex self-center gap-2 font-medium' onClick={handleClick}>
                <h2 className='hover:text-green-500 tracking-widest'> {props.title}</h2>
                {/* <div className="w-0 h-0 
                    border-l-[6px] border-l-transparent
                    border-t-[10px] border-t-green-500
                    border-r-[6px] border-r-transparent
                    self-center">
                </div> */}
            </button>
            <MenuDropDown hidden={false} subtitles={props.subtitles}/>
        </div>

    )
}