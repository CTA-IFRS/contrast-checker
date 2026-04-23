import { useState } from 'react';
import { CustomBtn } from './components/botoes';
import { useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

// icones
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCircleHalfStroke, faArrowUp, faBars } from '@fortawesome/free-solid-svg-icons';
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
import bulletShare from './assets/bullet-share.png';
import bulletHistory from './assets/bullet-history.png';
import bulletDownload from './assets/bullet-download.png';
import bulletCheck from './assets/bullet-check.png';
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
  
  const [openAcessibility, setOpenAcessibility] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const MenuAcessibilidade = () => {
    return (
      <>
        <ul className='flex flex-col md:flex-row'>
          <li>
            <HashLink to="#conteudo-principal" className={`nav-link px-2 ${{ altoContraste: 'text-white', }[modo] || 'text-gray800'}`}>
              <small>Ir para o conteúdo
                <span className='badge badge-dark'>1</span>
              </small>
            </HashLink>
          </li>
          <li>
            <HashLink to="#menu-principal" className={`nav-link px-2 ${{ altoContraste: 'text-white', }[modo] || 'text-gray800'}`}>
              <small>Ir para o menu
                <span className='badge badge-dark'>2</span>
              </small>
            </HashLink>
          </li>
        </ul>
        <ul className='flex md:ml-auto mt-2 md:mt-0'>
          <li>
            <button
              className={`nav-link px-2 py-0 cursor-pointer ${{ altoContraste: 'text-white', }[modo] || 'text-gray800'}`}
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
      </>
    )
  }

  const MenuPrincipal = () => {
    return (
      <ul className={`flex flex-col lg:flex-row gap-y-[15px] ${{ altoContraste: 'text-white', }[modo] || 'text-gray700'}`}>
        <li>
          <HashLink to="#about" className='nav-link px-6'>Sobre</HashLink>
        </li>
        {/*<li>
          <HashLink to="#manuals" className='nav-link px-6'>Manuais</HashLink>
        </li>*/}
        <li>
          <HashLink to="#feedback" className='nav-link px-6'>Feedback</HashLink>
        </li>
        <li>
          <HashLink to="#contribute" className='nav-link px-6'>Contribua</HashLink>
        </li>
        <li>
          <HashLink to="#contact" className='nav-link px-6'>Contato</HashLink>
        </li>
      </ul>
    )
  }

  return (
    <>
      <div id='homepage' className={`body ${{ altoContraste: 'bg-black altoContraste', }[modo] || 'bg-gray100'}`}>
        <nav className={`py-2 px-4 relative z-10 ${{ altoContraste: 'bg-black', }[modo] || 'bg-gray200'}`} aria-label='Menu de acessibilidade'>
          <button
            onClick={() => setOpenAcessibility(!openAcessibility)}
            className={`md:hidden cursor-pointer text-[22px] border border-gray400 rounded w-[44px] h-[44px] ${{ altoContraste: 'text-white', }[modo] || 'text-dark-color'}`}
          >
            <FontAwesomeIcon icon={faBars} />
            <span className='sr-only'>Abrir menu de acessibilidade</span>
          </button>
          <div className='hidden md:flex flex-row justify-between'>
            <MenuAcessibilidade />
          </div>
          {openAcessibility && (
            <div className='md:hidden flex flex-col'>
              <MenuAcessibilidade />
            </div>
          )}
        </nav>
        
        <HashLink to="#menu-principal" id='menu-principal' className='sr-only'>Início do menu principal</HashLink>
        
        <nav className={`${{ altoContraste: 'bg-black border-t border-b border-white', }[modo] || 'bg-light'}`}>
          <div className='max-w-[1140px] mx-auto lg:flex items-center py-8.5 grid grid-cols-[1fr_52px] p-4'>
            <div className='flex items-center gap-3 md:gap-4'>
              <img src={modo === 'altoContraste' ? logoAltoContraste : logo} alt='Logotipo Contrast Checker' className='w-16 md:w-20' />
              <h1 className={`font-atkinson h4 ${{ altoContraste: 'text-white', }[modo] || 'text-gray900'}`}>
                Contrast Checker
              </h1>
            </div>
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className={`lg:hidden cursor-pointer text-[22px] border border-gray400 rounded w-[44px] h-[44px] ml-auto ${{ altoContraste: 'text-white', }[modo] || 'text-dark-color'}`}
            >
              <FontAwesomeIcon icon={faBars} />
              <span className='sr-only'>Abrir menu</span>
            </button>
            <div className='lg:flex hidden ml-auto'>
              <MenuPrincipal />
            </div>
            {openMenu && (
              <div className='lg:hidden flex w-full mt-[18px]'>
                <MenuPrincipal />
              </div>
            )}
          </div>
        </nav>
        
        <HashLink to="#conteudo-principal" id='conteudo-principal' className='sr-only'>Início do conteúdo</HashLink>

        <div className='max-w-[1140px] mx-auto px-[15px] pt-12 pb-20 sm:pb-40 border-b-1 border-gray300' id='main'>
          <div className='grid md:grid-cols-2 items-center'>
            <div>
              <h2 className={`font-bold text-[2.5rem]/[3rem] sm:text-[3.5rem]/[4.2rem] mb-4 text-center sm:text-left ${{ altoContraste: 'text-white', }[modo] || 'text-gray900'}`}><strong>Avaliador de contraste</strong></h2>
              <p className={`lead-text2 sm:pr-6 mb-12 text-justify sm:text-left ${{ altoContraste: 'text-white', }[modo] || 'text-gray700'}`}>Teste o contraste de cores e verifique a conformidade com as diretrizes da WCAG, garantindo combinações acessíveis nos seus projetos de forma simples e rápida.</p>
              <CustomBtn onClick={() => { goToAvaliador(); }} estado={modo === 'altoContraste' ? 'fillWhite' : 'primary'} className='w-full sm:w-fit'>
                ACESSAR O AVALIADOR
                <FontAwesomeIcon icon={faArrowRight} className='ml-2' />
              </CustomBtn>
            </div>
            <div className='px-[15px]'>
              <img className='w-full max-w-[540px] ml-auto' src={smartmockup} alt='Mockup do aplicativo Contrast Checker exibido em smartphone, tablet e desktop' />
            </div>
          </div>
        </div>

        <div className='max-w-[1140px] mx-auto py-12 px-[15px]' id='about'>
          <h2 className={`h1 text-center ${{ altoContraste: 'text-white', }[modo] || 'text-gray900'}`}>Conheça mais sobre o Contrast Checker</h2>
          <p className={`text-center lead-text2 py-6 ${{ altoContraste: 'text-white', }[modo] || 'text-gray700'}`}>Avaliador de Contraste</p>
          <div className='grid md:grid-cols-[1fr_475px]'>
            <div className={`text-justify sm:text-left px-[15px] ${{ altoContraste: 'text-white', }[modo] || 'text-gray700'}`}>
              <p className='base-text2 mb-4'>O Contrast Checker é uma ferramenta online e gratuita desenvolvida para ajudar designers e desenvolvedores a verificar se combinações de cores atendem às Diretrizes de Acessibilidade para Conteúdo Web (WCAG), definidas pelo W3C.</p>
              <p className='base-text2 mb-4'>Com a ferramenta, é possível selecionar a cor do texto e a cor de fundo e visualizar imediatamente a relação de contraste entre elas. O resultado é apresentado de forma clara, incluindo o valor numérico do contraste e a indicação de conformidade com os níveis de acessibilidade.</p>
              <p className='base-text2 mb-4'>Além do cálculo, o Contrast Checker exibe exemplos práticos de como o contraste se comporta em diferentes tamanhos de texto, facilitando a análise em contextos reais de uso.</p>
              <p className='base-text2 mb-4'>Também é possível salvar combinações testadas, compartilhar links com os resultados e gerar relatórios com o histórico de verificações realizadas.</p>
            </div>
            <div className='px-[15px]'>
              <img src={about1} alt='Printscreen do avaliador de contraste com texto em cor preta e fundo em cor branca, resultando em 21.00 de relação de contraste' className='border-1 border-gray300 rounded-[0.25rem] mb-6 p-1' />
              <img src={about2} alt='Printscreen do histórico com duas cores avaliadas, a primeira com relação de contraste de 7.82 e a segunda 21.00' className='border-1 border-gray300 rounded-[0.25rem] mb-6 p-1' />
            </div>
          </div>
          <div className='mt-10 mb-14'>
            <h3 className={`h3 ${{ altoContraste: 'text-white', }[modo] || 'text-gray900'}`}>Principais características</h3>
          </div>
          <ul className={`grid sm:grid-cols-2 gap-x-7.5 gap-y-6 mb-10 text-justify sm:text-left ${{ altoContraste: 'text-white', }[modo] || 'text-gray900'}`}>
            <li className='grid grid-cols-[95px_1fr] gap-4'>
              <div className='min-w-[95px] h-[95px] border-1 border-gray300 rounded-full flex items-center justify-center'>
                <span style={{ backgroundImage: `url(${bulletCheck})` }} className='flex min-w-[90px] h-[90px] bg-contain bg-no-repeat rounded-full border-5 border-transparent'></span>
              </div>
              <div>
                <h4 className='h6 uppercase mb-2 text-left'>Conformidade com WCAG (AA e AAA)</h4>
                <small className='font-tertiary'>Verifique se as combinações de cores atendem aos níveis de acessibilidade.</small>
              </div>
            </li>
            <li className='grid grid-cols-[95px_1fr] gap-4'>
              <div className='min-w-[95px] h-[95px] border-1 border-gray300 rounded-full flex items-center justify-center'>
                <span style={{ backgroundImage: `url(${bulletHistory})` }} className='flex min-w-[90px] h-[90px] bg-contain bg-no-repeat rounded-full border-5 border-transparent'></span>
              </div>
              <div>
                <h4 className='h6 uppercase mb-2 text-left'>Histórico de avaliações</h4>
                <small className='font-tertiary'>Salve e gerencie todas as relações de contraste testadas.</small>
              </div>
            </li>
            <li className='grid grid-cols-[95px_1fr] gap-4'>
              <div className='min-w-[95px] h-[95px] border-1 border-gray300 rounded-full flex items-center justify-center'>
                <span style={{ backgroundImage: `url(${bulletDownload})` }} className='flex min-w-[90px] h-[90px] bg-contain bg-no-repeat rounded-full border-5 border-transparent'></span>
              </div>
              <div>
                <h4 className='h6 uppercase mb-2 text-left'>Geração de relatório</h4>
                <small className='font-tertiary'>Exporte o histórico em formato de relatório, com título personalizado.</small>
              </div>
            </li>
            <li className='grid grid-cols-[95px_1fr] gap-4'>
              <div className='min-w-[95px] h-[95px] border-1 border-gray300 rounded-full flex items-center justify-center'>
                <span style={{ backgroundImage: `url(${bulletShare})` }} className='flex min-w-[90px] h-[90px] bg-contain bg-no-repeat rounded-full border-5 border-transparent'></span>
              </div>
              <div>
                <h4 className='h6 uppercase mb-2 text-left'>Link compartilhável</h4>
                <small className='font-tertiary'>Compartilhe resultados facilmente por link, sem precisar de capturas de tela.</small>
              </div>
            </li>
            <li className='grid grid-cols-[95px_1fr] gap-4'>
              <div className='min-w-[95px] h-[95px] border-1 border-gray300 rounded-full flex items-center justify-center'>
                <span style={{ backgroundImage: `url(${bulletNoAds})` }} className='flex min-w-[90px] h-[90px] bg-contain bg-no-repeat rounded-full border-5 border-transparent'></span>
              </div>
              <div>
                <h4 className='h6 uppercase mb-2 text-left'>Gratuito e sem anúncios</h4>
                <small className='font-tertiary'>Utilize a ferramenta sem custos e sem distrações.</small>
              </div>
            </li>
            <li className='grid grid-cols-[95px_1fr] gap-4'>
              <div className='min-w-[95px] h-[95px] border-1 border-gray300 rounded-full flex items-center justify-center'>
                <span style={{ backgroundImage: `url(${bulletMulti})` }} className='flex min-w-[90px] h-[90px] bg-contain bg-no-repeat rounded-full border-5 border-transparent'></span>
              </div>
              <div>
                <h4 className='h6 uppercase mb-2 text-left'>Uso direto no navegador</h4>
                <small className='font-tertiary'>Acesse de qualquer dispositivo, sem necessidade de instalação.</small>
              </div>
            </li>
            <li className='grid grid-cols-[95px_1fr] gap-4'>
              <div className='min-w-[95px] h-[95px] border-1 border-gray300 rounded-full flex items-center justify-center'>
                <span style={{ backgroundImage: `url(${bulletContrast})` }} className='flex min-w-[90px] h-[90px] bg-contain bg-no-repeat rounded-full border-5 border-transparent'></span>
              </div>
              <div>
                <h4 className='h6 uppercase mb-2 text-left'>Modo de visualização</h4>
                <small className='font-tertiary'>Alterne entre modos como padrão, sépia e alto contraste.</small>
              </div>
            </li>
          </ul>
        </div>

        <div className='bg-light' id='manuals'>
          <div className='max-w-[1140px] mx-auto py-12 px-[15px]'>
            <h2 className={`h1 text-center sm:text-left ${{ altoContraste: 'text-white', }[modo] || 'text-gray900'}`}>Aproveite ao máximo este App</h2>
            <p className={`mt-6 lead-text3 text-justify sm:text-left ${{ altoContraste: 'text-white', }[modo] || 'text-gray700'}`}>Disponibilizamos um tutorial para que você aprenda a usar todas as funcionalidades disponíveis no Contrast Checker.</p>
          </div>
        </div>

        <div className='py-36' id='feedback'>
          <div className='max-w-[730px] mx-auto px-[15px]'>
            <h2 className={`h1 text-center ${{ altoContraste: 'text-white', }[modo] || 'text-gray900'}`}>Ajude-nos a melhorar</h2>
            <p className={`text-center lead-text3 mt-6 ${{ altoContraste: 'text-white', }[modo] || 'text-gray700'}`}>Seu feedback é muito importante. Envie um e-mail para nós contando sua experiência para identificarmos o que podemos melhorar, assim como, os pontos positivos.</p>
            <div className='flex justify-center mt-6'>
              <a href='mailto:cta@ifrs.edu.br' className={`${{ altoContraste: 'bg-white text-gray900 hover:bg-gray200 active:bg-gray200', }[modo] || 'bg-gray700 text-white hover:bg-gray800 active:bg-gray800'} text-sm px-5 py-2 min-h-9 md:text-base md:px-6 md:py-2.5 md:min-h-12 font-secondary font-bold uppercase rounded-full transition-colors duration-200 box-border w-full sm:w-fit text-center`}>
                E-mail: cta@ifrs.edu.br
              </a>
            </div>
          </div>
        </div>

        <div className='py-12 bg-light' id='contribute'>
          <div className='max-w-[1140px] mx-auto px-[15px]'>
            <div className='grid sm:grid-cols-[2fr_1fr]'>
              <div className='flex flex-col'>
                <h2 className={`h1 text-center sm:text-left ${{ altoContraste: 'text-white', }[modo] || 'text-gray900'}`}>Contribua com o projeto</h2>
                <p className={`lead-text3 mt-8 mb-7 text-justify sm:text-left ${{ altoContraste: 'text-white', }[modo] || 'text-gray700'}`}>O projeto desse App está hospedado no GitHub para que você, desenvolvedor ou empresa, contribua com melhorias ou correções caso encontrem algum bug.</p>
                <a href='https://github.com/CTA-IFRS/contrast-checker/' className={`${{ altoContraste: 'bg-white text-gray900 hover:bg-gray200 active:bg-gray200', }[modo] || 'bg-gray700 text-white hover:bg-gray800 active:bg-gray800'} w-fit text-sm px-5 py-2 min-h-9 md:text-base md:px-6 md:py-2.5 md:min-h-12 font-secondary font-bold uppercase rounded-full transition-colors duration-200 box-border`}>
                  GitHub do projeto
                </a>
              </div>
              <div>
                <img src={imgContribute} className='w-100' alt=''/>
              </div>
            </div>
          </div>
        </div>

        <div className='py-12' id='contact'>
          <div className='max-w-[1140px] mx-auto px-[15px]'>
            <div className='grid sm:grid-cols-2'>
              <div className=''>
                <h2 className={`h2 text-center sm:text-left ${{ altoContraste: 'text-white', }[modo] || 'text-gray900'}`}>Entre em contato</h2>
                <p className={`lead-text3 mt-8 text-justify sm:text-left ${{ altoContraste: 'text-white', }[modo] || 'text-gray700'}`}>Para conhecer mais sobre os trabalhos e projetos desenvolvidos pelo CTA acesse nosso site ou redes sociais disponíveis na lista abaixo.</p>
                <ul className={`mt-4 ${{ altoContraste: 'text-white', }[modo] || 'text-gray700'}`}>
                  <li>
                    <a href='mailto:cta@ifrs.edu.br'>
                      <small className='base-text2'>
                        <FontAwesomeIcon icon={faEnvelope} className='mr-1'/>cta@ifrs.edu.br
                      </small>
                    </a>
                  </li>
                  <li>
                    <a href='https://cta.ifrs.edu.br'>
                      <small className='base-text2'>
                        <FontAwesomeIcon icon={faPaperPlane} className='mr-1 text-[15px]'/>cta.ifrs.edu.br
                      </small>
                    </a>
                  </li>
                  <li>
                    <a href='https://instagram.com/ctaifrs'>
                      <small className='base-text2'>
                        <FontAwesomeIcon icon={faInstagram} className='mr-1'/>instagram.com/ctaifrs
                      </small>
                    </a>
                  </li>
                  <li>
                    <a href='https://youtube.com/cta-ifrs'>
                      <small className='base-text2'>
                        <FontAwesomeIcon icon={faYoutube} className='mr-1'/>youtube.com/cta-ifrs
                      </small>
                    </a>
                  </li>
                  <li>
                    <a href='https://facebook.com/cta-ifrs'>
                      <small className='base-text2'>
                        <FontAwesomeIcon icon={faFacebook} className='mr-1'/>facebook.com/cta-ifrs
                      </small>
                    </a>
                  </li>
                </ul>
              </div>
              
              <div className='grid grid-cols-[2fr_1fr] gap-7.5 mt-18'>
                <div>
                  <img className='w-100 rounded p-4 bg-white' src={logoCTA} alt='Logotipo do CTA' />
                </div>
                <div>
                  <img className='w-100 rounded p-4 mb-6 bg-white' src={logoPROEN} alt='Logotipo do PROEN' />
                  <img className='w-100 rounded p-4 bg-white' src={logoIFRS} alt='Logotipo do IFRS' />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-light px-[15px]' id='developed-by'>
          <div className='py-6 d-flex justify-content-center' id='footer'>
            <p className={`lead-text3 text-center ${{ altoContraste: 'text-white', }[modo] || 'text-gray700'}`}><small>Desenvolvido por CTA - IFRS. Aplicativo sob a licença GPLv3 e Creative Commons NonCommercial-ShareAlike 3.0 Unported (CC BY-NC-SA 3.0).</small></p>
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