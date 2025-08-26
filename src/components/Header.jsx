import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faBars } from '@fortawesome/free-solid-svg-icons';
import logo from '.././assets/logo.png';

const Header = () => {
  return (
    <header className='bg-white shadow-md'>
      <div className='px-6 py-3 flex items-center justify-between'>
        <div className="flex items-center gap-6">
          <img src={logo} alt="Logotipo Contrast Checker" className="w-20" />
          <h1 className="text-gray-900 font-atkinson h4">
            Contrast Checker
          </h1>
        </div>
        <div className="botoes flex gap-3">
          <button type="button" id="btn-configuracoes" aria-expanded="true" className="text-dark-color bg-white border border-gray-400 flex items-center justify-center w-[60px] h-[60px] rounded-md cursor-pointer">
            <span className='sr-only'>Configurações</span>
            <FontAwesomeIcon icon={faGear} className='text-2xl text-dark-color'/>
          </button>
          {/* fazer menu de configurações */}
          <button type="button" id="btn-menu" aria-expanded="true" className="text-dark-color bg-white border border-gray-400 flex items-center justify-center w-[60px] h-[60px] rounded-md cursor-pointer">
            <span className='sr-only'>Menu</span>
            <FontAwesomeIcon icon={faBars} className='text-2xl text-dark-color'/>
          </button>
          {/* fazer menu de geral */}
        </div>
      </div>
    </header>
  );
}

export default Header;