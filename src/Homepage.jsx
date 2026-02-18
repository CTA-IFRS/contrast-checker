import { useState } from 'react';
import { CustomBtn } from './components/botoes';
import { useNavigate } from 'react-router-dom';

// icones
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCircleHalfStroke, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faInstagram, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';

// imagens
import logo from './assets/logo.png';
import smartmockup from './assets/smartmockup.png';
import about1 from './assets/about-1.png';
import about2 from './assets/about-2.png';
import imgContribute from './assets/contribute.png';
import bulletNoAds from './assets/bullet-no-ads.png';
import bulletContrast from './assets/bullet-contrast.png';
import bulletMulti from './assets/bullet-multi.png';
import logoCTA from './assets/logo-cta2.png';
import logoPROEN from './assets/logo-proen.png';
import logoIFRS from './assets/logo-ifrs2.png';
import logoAltoContraste from './assets/logoAltoContraste.png';

function Homepage() {
  
  const navigate = useNavigate();
  
  const goToAvaliador = () => {
    navigate('/000000/ffffff');
  };
  
  const [modo, setModo] = useState('contrasteNormal');
  
  const alternarContraste = () => {
    setModo(prevModo => prevModo === 'contrasteNormal' ? 'altoContraste' : 'contrasteNormal');
  };
  
  return (
    <>
      <div id='homepage' className={`body ${{ altoContraste: 'bg-black', }[modo] || 'bg-gray100'}`}>
        <nav className='py-2 px-4 bg-gray200 relative z-10' aria-label='Menu de acessibilidade'>
          {/* button menu */}
          <div className='flex flex-row justify-between'>
            <ul className='flex'>
              <li>
                <a className='nav-link px-2 text-gray800' href='#conteudo-principal'><small>Ir para o conteúdo
                  <span className='badge badge-dark'>1</span></small>
                </a>
              </li>
              <li>
                <a className='nav-link px-2 text-gray800' href='#menu-principal'><small>Ir para o menu
                  <span className='badge badge-dark'>2</span></small>
                </a>
              </li>
            </ul>
            <ul className='flex ml-auto'>
              <li>
                <button 
                  className='nav-link px-2 text-gray800 py-0 cursor-pointer'
                  id='high_contrast'
                  aria-pressed={modo === 'alto-contraste'}
                  onClick={alternarContraste}
                >
                  <small>
                    <FontAwesomeIcon icon={faCircleHalfStroke} /> Alto contraste
                  </small>
                </button>
              </li>
            </ul>
          </div>
        </nav>

        <a href='#menu-principal' id='menu-principal' className='sr-only'>Início do menu principal</a>
        
        <nav className='bg-light'>
          <div className='max-w-[1140px] mx-auto flex items-center py-8.5'>
            <div className='flex items-center gap-3 md:gap-4'>
              <img src={modo === 'altoContraste' ? logoAltoContraste : logo} alt='Logotipo Contrast Checker' className='w-16 md:w-20' />
              <h1 className={`font-atkinson h4 ${{ altoContraste: 'text-white', }[modo] || 'text-gray900'}`}>
                Contrast Checker
              </h1>
            </div>
            {/* button menu */}
            <div className='ml-auto'>
              <ul className='flex text-gray700'>
                <li>
                  <a className='nav-link px-6' href='#about'>Sobre</a>
                </li>
                <li>
                  <a className='nav-link px-6' href='#manuals'>Manuais</a>
                </li>
                <li>
                  <a className='nav-link px-6' href='#feedback'>Feedback</a>
                </li>
                <li>
                  <a className='nav-link px-6' href='#contribute'>Contribua</a>
                </li>
                <li>
                  <a className='nav-link pl-6' href='#contact'>Contato</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        
        <a href='#conteudo-principal' id='conteudo-principal' className='sr-only'>Início do conteúdo</a>

        <div className='max-w-[1140px] mx-auto px-[15px] pt-12 pb-40 border-b-1 border-gray300' id='main'>
          <div className='grid grid-cols-2 items-center'>
            <div>
              <h1 className='font-bold text-[3.5rem]/[4.2rem] text-gray900 mb-4'><strong>Avaliador de contraste</strong></h1>
              <p className='lead-text2 text-gray600 pr-6 mb-12'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam placeat dolore debitis vero necessitatibus quae sunt minima ad at, quisquam dolores</p>
              <CustomBtn onClick={() => { goToAvaliador(); }} estado={modo === 'altoContraste' ? 'fillWhite' : 'primary'}>
                ACESSAR O AVALIADOR
                <FontAwesomeIcon icon={faArrowRight} className='ml-2' />
              </CustomBtn>
            </div>
            <div className='px-[15px]'>
              <img className='max-w-[540px] ml-auto' src={smartmockup} alt='' />
            </div>
          </div>
        </div>

        <div className='max-w-[1140px] mx-auto py-12' id='about'>
          <h2 className='h1 text-gray900 text-center'>Conheça mais sobre o Contrast Checker</h2>
          <p className='text-center text-gray600 lead-text2 py-6'>Avaliador de Contraste</p>
          <div className='grid grid-cols-[1fr_475px]'>
            <div className='px-[15px]'>
              <p className='base-text2 text-gray700 mb-4'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia, quo cum aliquid minus inventore commodi consectetur fugit aut perferendis aspernatur, minima velit vel. Error at officiis debitis exercitationem eveniet illo</p>
              <p className='base-text2 text-gray700 mb-4'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia, quo cum aliquid minus inventore commodi consectetur fugit aut perferendis aspernatur, minima velit vel. Error at officiis debitis exercitationem eveniet illo</p>
              <p className='base-text2 text-gray700 mb-4'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia, quo cum aliquid minus inventore commodi consectetur fugit aut perferendis aspernatur, minima velit vel. Error at officiis debitis exercitationem eveniet illo</p>
            </div>
            <div className='px-[15px]'>
              <img src={about1} alt='Printscreen do avaliador de contraste com texto em cor preta e fundo em cor branca, resultando em 21.00 de relação de contraste' className='border-1 border-gray300 rounded-[0.25rem] mb-6 p-1' />
              <img src={about2} alt='Printscreen do histórico com duas cores avaliadas, a primeira com relação de contraste de 7.82 e a segunda 21.00' className='border-1 border-gray300 rounded-[0.25rem] mb-6 p-1' />
            </div>
          </div>
          <div className='mt-10 mb-14'>
            <h3 className='h3 text-gray900'>Principais características</h3>
          </div>
          <ul className='grid grid-cols-2 gap-x-7.5 gap-y-6 mb-10'>
            <li className='grid grid-cols-[95px_1fr] gap-4'>
              <img className='max-w-[95px] p-[5px] border-1 border-gray300 rounded-full' src={bulletNoAds} alt='' />
              <div>
                <h4 className='h6 text-gray900 uppercase mb-2'>Gratuito e sem propagandas</h4>
                <small className='font-tertiary text-gray900'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus impedit adipisci cumque fugiat nisi placeat ducimus maxime a quia, repellat praesentium consectetur.</small>
              </div>
            </li>
            <li className='grid grid-cols-[95px_1fr] gap-4'>
              <img className='max-w-[95px] p-[5px] border-1 border-gray300 rounded-full' src={bulletContrast} alt='' />
              <div>
                <h4 className='h6 text-gray900 uppercase mb-2'>Modo escuro</h4>
                <small className='font-tertiary text-gray900'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus impedit adipisci cumque fugiat nisi placeat ducimus maxime a quia, repellat praesentium consectetur.</small>
              </div>
            </li>
            <li className='grid grid-cols-[95px_1fr] gap-4'>
              <img className='max-w-[95px] p-[5px] border-1 border-gray300 rounded-full' src={bulletMulti} alt='' />
              <div>
                <h4 className='h6 text-gray900 uppercase mb-2'>Online ou instalado</h4>
                <small className='font-tertiary text-gray900'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus impedit adipisci cumque fugiat nisi placeat ducimus maxime a quia, repellat praesentium consectetur.</small>
              </div>
            </li>
          </ul>
        </div>

        <div className='bg-light' id='manuals'>
          <div className='max-w-[1140px] mx-auto py-12'>
            <h2 className='h1 text-gray900'>Aproveite ao máximo este App</h2>
            <p className='mt-6 lead-text3 text-gray700'>Disponibilizamos um tutorial para que você aprenda a usar todas as funcionalidades disponíveis no Contrast Checker.</p>
          </div>
        </div>

        <div className='py-36' id='feedback'>
          <div className='max-w-[730px] mx-auto'>
            <h2 className='h1 text-gray900 text-center'>Ajude-nos a melhorar</h2>
            <p className='text-center lead-text3 text-gray700 mt-6'>Seu feedback é muito importante. Envie um e-mail para nós contando sua experiência para identificarmos o que podemos melhorar, assim como, os pontos positivos.</p>
            <div className='flex justify-center mt-6'>
              <a href='mailto:cta@ifrs.edu.br' className={`${{ altoContraste: 'bg-white text-gray900 hover:bg-gray200 active:bg-gray200', }[modo] || 'bg-gray700 text-white hover:bg-gray800 active:bg-gray800'} text-sm px-5 py-2 min-h-9 md:text-base md:px-6 md:py-2.5 md:min-h-12 font-secondary font-bold uppercase rounded-full transition-colors duration-200 box-border`}>
                E-mail: cta@ifrs.edu.br
              </a>
            </div>
          </div>
        </div>

        <div className='py-12 bg-light' id='contribute'>
          <div className='max-w-[1140px] mx-auto'>
            <div className='grid grid-cols-[2fr_1fr]'>
              <div className='flex flex-col'>
                <h2 className='h1 text-gray900'>Contribua com o projeto</h2>
                <p className='lead-text3 text-gray700 mt-8 mb-7'>O projeto desse App está hospedado no GitHub para que você, desenvolvedor ou empresa, contribua com melhorias ou correções caso encontrem algum bug.</p>
                <a href='https://github.com/CTA-IFRS/contrast-checker/' className={`${{ altoContraste: 'bg-white text-gray900 hover:bg-gray200 active:bg-gray200', }[modo] || 'bg-gray700 text-white hover:bg-gray800 active:bg-gray800'} w-fit text-sm px-5 py-2 min-h-9 md:text-base md:px-6 md:py-2.5 md:min-h-12 font-secondary font-bold uppercase rounded-full transition-colors duration-200 box-border`}>
                  GitHub do projeto
                </a>
              </div>
              <div>
                <img src={imgContribute} className='w-100' />
              </div>
            </div>
          </div>
        </div>

        <div className='py-12' id='contact'>
          <div className='max-w-[1140px] mx-auto'>
            <div className='grid grid-cols-2'>
              <div className=''>
                <h2 className='h2 text-gray900 text-center sm:text-left'>Entre em contato</h2>
                <p className='lead-text3 text-gray700 mt-8'>Para conhecer mais sobre os trabalhos e projetos desenvolvidos pelo CTA acesse nosso site ou redes sociais disponíveis na lista abaixo.</p>
                <ul className='mt-4'>
                  <li>
                    <a href='mailto:cta@ifrs.edu.br'>
                        <small className='base-text2 text-gray700'>
                          <FontAwesomeIcon icon={faEnvelope} className='mr-1'/>cta@ifrs.edu.br
                        </small>
                      </a>
                  </li>
                  <li>
                    <a href='https://cta.ifrs.edu.br'>
                      <small className='base-text2 text-gray700'>
                        <FontAwesomeIcon icon={faPaperPlane} className='mr-1 text-[15px]'/>cta.ifrs.edu.br
                      </small>
                    </a>
                  </li>
                  <li>
                    <a href='https://instagram.com/ctaifrs'>
                      <small className='base-text2 text-gray700'>
                        <FontAwesomeIcon icon={faInstagram} className='mr-1'/>instagram.com/ctaifrs
                      </small>
                    </a>
                  </li>
                  <li>
                    <a href='https://youtube.com/cta-ifrs'>
                      <small className='base-text2 text-gray700'>
                        <FontAwesomeIcon icon={faYoutube} className='mr-1'/>youtube.com/cta-ifrs
                      </small>
                    </a>
                  </li>
                  <li>
                    <a href='https://facebook.com/cta-ifrs'>
                      <small className='base-text2 text-gray700'>
                        <FontAwesomeIcon icon={faFacebook} className='mr-1'/>facebook.com/cta-ifrs
                      </small>
                    </a>
                  </li>
                </ul>
              </div>
              
              <div className='grid grid-cols-[2fr_1fr] gap-7.5 mt-18'>
                <div>
                  <img className='w-100 rounded p-4 bg-white' src={logoCTA} />
                </div>
                <div>
                  <img className='w-100 rounded p-4 mb-6 bg-white' src={logoPROEN} />
                  <img className='w-100 rounded p-4 bg-white' src={logoIFRS} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-light px-[15px]' id='developed-by'>
          <div className='py-6 d-flex justify-content-center' id='footer'>
            <p className='lead-text3 text-center text-gray700'><small>Desenvolvido por CTA - IFRS. Aplicativo sob a licença GPLv3 e Creative Commons NonCommercial-ShareAlike 3.0 Unported (CC BY-NC-SA 3.0)</small></p>
          </div>
        </div>
        
        <div>
          <CustomBtn id='btn-back-to-top' tamanho='iconOnly' estado={modo === 'altoContraste' ? 'fillWhite' : 'primary'} 
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }>
            <span className='sr-only'>Voltar para o início do site</span>
            <FontAwesomeIcon icon={faArrowUp} className='text-[17px]'/>
          </CustomBtn>
        </div>
      </div>
    </>
  )
}

export default Homepage