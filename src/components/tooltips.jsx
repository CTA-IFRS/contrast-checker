export const CustomTooltip = ({ children, orientacao = 'top' }) => {
    const orientacaoTooltip = {
        top: 'tooltip-top pb-[7px] left-1/2 transform -translate-x-1/2 bottom-[80%]',
        bottom: 'tooltip-bottom pt-[7px] left-1/2 transform -translate-x-1/2 top-[80%]',
        left: 'tooltip-left pr-[7px] right-[110%] top-1/2 transform -translate-y-1/2',
        right: 'tooltip-right pl-[7px] left-[110%] top-1/2 transform -translate-y-1/2',
    }

    return (
        <span aria-hidden="true" 
            className={`
                ${orientacaoTooltip[orientacao]}
                absolute hidden group-hover:inline group-focus:inline w-max z-50
            `}
        >
            <p className='bg-gray800 font-primary font-normal text-[15px] text-white px-3 py-1.5 rounded'>{children}</p>
        </span>
    );
};