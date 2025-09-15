import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faBars, faXmark, faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import logo from '.././assets/logo.png';
import logoCTA from '.././assets/logo-cta.png';
import logoIFRS from '.././assets/logo-ifrs.png';
import { useState, useEffect, useRef } from 'react';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const Header = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [modalSobre, setModalSobre] = useState(false);

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

  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        { element: '.cor-texto', popover: { title: 'Cor do texto', description: 'Neste campo deve ser inserida a cor do texto.' } },
        { element: '.cor-fundo', popover: { title: 'Cor do fundo', description: 'E neste, a cor do fundo.' } },
        { element: '.result', popover: { title: 'Resultado do cálculo', description: 'Aqui é exibido a relação de contraste entre as cores analisadas.' } },
        { element: '.exemplos', popover: { description: 'Neste bloco são exibidos exemplos em diferentes tamanhos e pesos de fonte.' } },
        { element: '.compartilhar', popover: { title: 'Botão de compartilhar', description: 'Aqui será gerado um link com as cores que estão sendo analisadas no momento.' } },
        { element: '.limpar', popover: { description: 'Retorna as cores para o padrão (preto para o texto e branco para o fundo).' } },
        { element: '.addHistorico', popover: { description: 'Adiciona as cores analisadas ao histórico abaixo.' } },
        { element: '.historico', popover: { title: 'Histórico', description: 'Aqui são exibidas as cores que foram salvas no histórico, separadas em abas por data.' } },
        { element: '.excluirHistorico', popover: { description: 'Este botão é para excluir todo o histórico.' } },
        //{selectedDate && groupedHistory[selectedDate] && groupedHistory[selectedDate].length > 0 && ()}
        { element: '.abaSelecionada', popover: { description: 'Este é o título da aba, que por padrão é a data em que foi salvo, mas pode ser alterado.' } },
        { element: '.editarTitulo', popover: { title: 'Botão de editar título', description: 'O título pode ser alterado clicando neste botão.' } },
        { element: '.excluirAba', popover: { title: 'Botão de excluir aba', description: 'Este botão é para excluir a aba inteira do histórico.' } },
        { element: '.copiarCorTexto', popover: { description: 'Este botão serve para copiar a cor do texto.' } },
        { element: '.copiarCorFundo', popover: { description: 'E este, para copiar a cor do fundo.' } },
        { element: '.reavaliar', popover: { description: 'Aqui é possível enviar as cores de volta para o avaliador.' } },
        { element: '.excluirAvaliacao', popover: { description: 'E aqui, excluir esta analise do histórico.' } },
        { element: '.imprimirRelatorio', popover: { description: 'Também é possível gerar um relatório para imprimir da aba que está selecionada, nele é possível alterar o título e adicionar uma descrição.' } },
      ],
    });

    driverObj.drive();
  };
  
  return (
    <header className='bg-white shadow-md print:hidden'>
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
                    <a href='#' onClick={() => setModalSobre(true)} className='text-gray800 py-2 -mx-4 px-4 border-l-2 border-transparent hover:bg-co1 hover:border-co4 focus:bg-co1 focus:border-co4'>
                      Sobre
                    </a>
                    {modalSobre && (
                      <div className='fixed inset-0 w-full h-full bg-fundo-modal z-999 flex items-center justify-center'>
                        <div className='bg-white w-[588px] p-6 rounded-xl'>
                          <div className='flex justify-between items-center pb-6'>
                            <h2 className='h4 text-gray800'>Sobre o Contrast Checker</h2>
                            <button type='button' aria-label='Fechar' onClick={() => setModalSobre(false)}>
                              <FontAwesomeIcon icon={faXmark} className='text-[19px] text-dark-color p-1 cursor-pointer' />
                            </button>
                          </div>
                          <div className='border-y border-gray400 py-4'>
                            <p className='lead-text text-gray700'>Esta ferramenta foi criada para que designers e desenvolvedores possam testar a conformidade do contraste de cores com base nas Diretrizes de acessibilidade de conteúdo da Web (WCAG), conforme estabelecido pelo World Wide Web Consortium (W3C). Esses cálculos são baseados nas fórmulas especificadas pelo W3C.</p>
                          </div>
                          <div className='flex justify-center gap-8 mt-6 pb-2'>
                            <a href='https://cta.ifrs.edu.br'>
                              <img src={logoCTA} className='h-[55px]' alt='Logo do CTA - Centro Tecnológico de Acessibilidade do IFRS'></img>
                            </a>
                            <a href='https://ifrs.edu.br'>
                              <img src={logoIFRS} className='h-[55px]' alt='Logo do CTA - Centro Tecnológico de Acessibilidade do IFRS'></img>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                    <a href='#' onClick={startTour} className='text-gray800 py-2 -mx-4 px-4 border-l-2 border-transparent hover:bg-co1 hover:border-co4 focus:bg-co1 focus:border-co4'>
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

{/* FALTA CONFIGURAR CONTRASTES */}