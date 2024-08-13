import React from 'react'

export default function MenuDropDown(props: {hidden: boolean, subtitles: string[]}) {

    return(
            <div 
            className={`absolute top-full mt-6
                bg-gray-200 
                shadow w-44 
                transition 
                duration-300 
                ease-in-out ${props.hidden ? 'opacity-100 max-h-full' : 'opacity-0 max-h-0'}`}
                >
                <ul className="" aria-labelledby="dropdownDefaultButton">
                {props.subtitles.map((subtitle, index) => (
                    <li key={index}>
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-green-600 dark:hover:text-white"
                        >
                            {subtitle}
                        </a>
                    </li>
                ))}
                </ul>
            </div>
    )
}