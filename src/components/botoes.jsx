export const CustomBtn = ({ children, onClick, disabled, estado = 'primary', tamanho = 'md', type = 'button', title, className }) => {
    const estadoBotao = {
        primary: 'bg-co4 text-white hover:bg-co5 active:bg-co5',
        secondary: 'bg-co1 text-co6 hover:bg-co4 hover:text-white active:bg-co4 active:text-white',
        outline: 'bg-transparent text-co4 border-2 border-co4 hover:bg-co4 hover:text-white hover:border-co4 active:bg-co4 active:text-white active:border-0',
        outlineDanger: 'bg-transparent text-danger border-2 border-danger hover:bg-danger hover:text-white hover:border-danger active:bg-danger active:text-white active:border-0',
        primaryGray: 'bg-gray700 text-white hover:bg-gray800 active:bg-gray800',
        secondaryGray: 'bg-gray200 text-gray900 hover:bg-gray800 hover:text-white active:bg-gray800 active:text-white',
        outlineGray: 'bg-transparent text-gray800 border-2 border-gray800 hover:bg-gray800 hover:text-white hover:border-gray800 active:bg-gray800 active:text-white active:border-0',
    }

    const tamanhoBotao = {
        sm: 'text-sm px-5 py-1.5 min-h-9',
        md: 'text-base px-6 py-2.5 min-h-12',
        lg: 'text-base px-7.5 py-3 min-h-15',
        iconOnly: 'text-base px-0.5 py-0.5 min-w-8.5 min-h-8.5'
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            title={title}
            className={`
                ${className}
                ${tamanhoBotao[tamanho]} 
                ${estadoBotao[estado]} 
                font-secondary font-bold rounded-full transition-colors duration-200 disabled:opacity-65 disabled:cursor-not-allowed disabled:pointer-events-none cursor-pointer relative box-border group
            `}
            >
                {children}
        </button>
    );
};