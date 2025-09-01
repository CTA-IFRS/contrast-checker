import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faBars, faXmark, faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import logo from '.././assets/logo.png';
import logoCTA from '.././assets/logo-cta.png';
import { useState, useEffect, useRef } from 'react';

const Header = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const menuRef = useRef(null);
  const configRef = useRef(null);
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (configRef.current && !configRef.current.contains(event.target)) {
        setIsConfigOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <header className='bg-white shadow-md'>
      <div className='px-6 py-3 flex items-center justify-between'>
        <div className='flex items-center gap-6'>
          <img src={logo} alt='Logotipo Contrast Checker' className='w-20' />
          <h1 className='text-gray-900 font-atkinson h4'>
            Contrast Checker
          </h1>
        </div>
        <div className='botoes flex gap-3'>
          <button onClick={() => setIsConfigOpen(!isConfigOpen)} type='button' aria-expanded={isConfigOpen} className='text-dark-color bg-white border border-gray-400 flex items-center justify-center w-[60px] h-[60px] rounded-md cursor-pointer'>
            <span className='sr-only'>Configurações</span>
            <FontAwesomeIcon icon={faGear} className='text-2xl text-dark-color'/>
          </button>
          {isConfigOpen && (
            <div ref={menuRef} className='bg-white shadow rounded-l-lg p-4 fixed top-0 right-0 h-screen max-w-[212px] w-full z-50 flex flex-col'>
              <div className='flex flex-col h-full'>
                  <div className='flex justify-between items-center mb-1'>
                    <h2 className='h5 text-gray800'>Configurações</h2>
                    <button type='button' aria-label='Fechar' onClick={() => setIsConfigOpen(false)}>
                      <FontAwesomeIcon icon={faXmark} className='text-base p-1 cursor-pointer' />
                    </button>
                  </div>
                  <div className='flex flex-col gap-3 mt-4.5'>
                    <button type='button' class='text-gray800 py-2 flex items-center gap-2 cursor-pointer'>
                      <FontAwesomeIcon icon={faCircleHalfStroke} className='bg-white rounded-full border-2 border-white m-w-[18.6px] text-[17px]' />
                      Contraste normal
                    </button>
                    <button type='button' class='text-gray800 py-2 flex items-center gap-2 cursor-pointer'>
                      <FontAwesomeIcon icon={faCircleHalfStroke} className='bg-white rounded-full border-2 border-white m-w-[18.6px] text-[17px] text-sepia'/>
                      Sépia
                    </button>
                    <button type='button' class='text-gray800 py-2 flex items-center gap-2 cursor-pointer'>
                      <FontAwesomeIcon icon={faCircleHalfStroke} className='bg-white rounded-full border-2 border-white m-w-[18.6px] text-[17px] text-gray900' />
                      Alto contraste
                    </button>
                  </div>
                </div>
            </div>
          )}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} type='button' aria-expanded={isMenuOpen} className='text-dark-color bg-white border border-gray-400 flex items-center justify-center w-[60px] h-[60px] rounded-md cursor-pointer'>
            <span className='sr-only'>Menu</span>
            <FontAwesomeIcon icon={faBars} className='text-2xl text-dark-color' />
          </button>
          <div>
            {isMenuOpen && (
              <div ref={menuRef} className='bg-white shadow rounded-l-lg p-4 fixed top-0 right-0 h-screen max-w-[212px] w-full z-50 flex flex-col'>
                <div className='flex flex-col h-full'>
                  <div className='flex justify-between items-center mb-1'>
                    <h2 className='h5 text-gray800'>Menu</h2>
                    <button type='button' aria-label='Fechar' onClick={() => setIsMenuOpen(false)}>
                      <FontAwesomeIcon icon={faXmark} className='text-base p-1 cursor-pointer' />
                    </button>
                  </div>
                  <div className='flex flex-col gap-3 mt-4.5'>
                    <a href='#' className='text-gray800 py-2 -mx-4 px-4 border-l-2 border-transparent hover:bg-co1 hover:border-co4 focus:bg-co1 focus:border-co4'>
                      Sobre
                    </a>
                    <a href='#' className='text-gray800 py-2 -mx-4 px-4 border-l-2 border-transparent hover:bg-co1 hover:border-co4 focus:bg-co1 focus:border-co4'>
                      Como usar
                    </a>
                  </div>
                  <a href='https://cta.ifrs.edu.br' className='mt-auto mx-auto mb-5'>
                    <img src={logoCTA} className='w-[124px]' alt='Logo do CTA - Centro Tecnológico de Acessibilidade do IFRS'></img>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

{/* FALTA CONFIGURAR CONTRASTES E MODALS */}