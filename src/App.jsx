import { useState, useEffect } from 'react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSquareCheck, faSquareXmark, faTrashCan, faRotate, faLink, faPrint, faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import Header from './components/Header';
import { CustomBtn } from './components/botoes';
import { CustomTooltip } from './components/tooltips';
import logo from './assets/logo.png';

const CONTRAST_THRESHOLD_AA = 4.5;
const CONTRAST_THRESHOLD_AAA = 7;
const CONTRAST_THRESHOLD_AA_18PT = 3;
const CONTRAST_THRESHOLD_AAA_18PT = 4.5;

function normalizeHexValue(hex) {
  hex = hex.trim();
  if (hex.startsWith('#')) {
    hex = hex.substring(1);
  }
  hex = hex.toLowerCase();
  return hex;
}

function hexToRgb(hex) {
  hex = normalizeHexValue(hex);
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function luminance(r, g, b) {
  const a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ?
      v / 12.92 :
      Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function calculateContrastRatio(background, text) {
  const bgLuminance = luminance(background.r, background.g, background.b);
  const textLuminance = luminance(text.r, text.g, text.b);
  const contrastRatio = (Math.max(bgLuminance, textLuminance) + 0.05) / (Math.min(bgLuminance, textLuminance) + 0.05);
  return contrastRatio.toFixed(2);
}

function saveHistoryToCookies(history) {
  const historyJSON = JSON.stringify(history);
  localStorage.setItem('history', historyJSON);
}

function retrieveHistoryFromCookies() {
  const historyJSON = localStorage.getItem('history');
  return historyJSON ? JSON.parse(historyJSON) : [];
}

function App() {

  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [contrastRatio, setContrastRatio] = useState('0');
  const [history, setHistory] = useState([]);
  const [dateTitles, setDateTitles] = useState({});
  const [editingDate, setEditingDate] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [modalImprimir, setModalImprimir] = useState(false);

  useEffect(() => {
    const bg = hexToRgb(backgroundColor);
    const txt = hexToRgb(textColor);
    if (bg && txt) {
      setContrastRatio(calculateContrastRatio(bg, txt));
    }
  }, [backgroundColor, textColor]);

  useEffect(() => {
    const saved = localStorage.getItem('history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    setHistory(retrieveHistoryFromCookies());
  }, []);

  useEffect(() => {
    saveHistoryToCookies(history);
  }, [history]);

  const addToHistory = () => {
    const status = contrastRatio >= 4.5 ? 'Aprovado' : 'Reprovado';
    const data = new Date().toLocaleDateString('pt-BR');

    const badges = (
      <div className='flex flex-col gap-1.5 print:gap-1'>
        <span className={`font-secondary font-bold text-[10px] print:text-[8px] text-white px-2.5 py-1 rounded-sm w-full flex justify-between ${getStatusClass(contrastRatio, CONTRAST_THRESHOLD_AA)}`}>
          <p>AA</p> {getStatusIcon(contrastRatio, CONTRAST_THRESHOLD_AA)}
        </span>
        <span className={`font-secondary font-bold text-[10px] print:text-[8px] text-white px-2.5 py-1 rounded-sm w-full flex justify-between ${getStatusClass(contrastRatio, CONTRAST_THRESHOLD_AAA)}`}>
          <p>AAA</p> {getStatusIcon(contrastRatio, CONTRAST_THRESHOLD_AAA)}
        </span>
      </div>
    );

    const newItem = {
      id: crypto.randomUUID?.() ?? String(Date.now()) + Math.random(),
      status,
      contrastRatio,
      backgroundColor,
      textColor,
      badges,
      date: data,
    };
    setHistory((prev) => [...prev, newItem]);
  };

  const groupedHistory = history.reduce((groups, item) => {
    if (!groups[item.date]) groups[item.date] = [];
    groups[item.date].push(item);
    return groups;
  }, {});

  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (!selectedDate && Object.keys(groupedHistory).length > 0) {
      setSelectedDate(Object.keys(groupedHistory)[0]);
    }
  }, [groupedHistory, selectedDate]);
  
  const removeFromHistory = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const removeDateFromHistory = (date) => {
    setHistory((prev) => prev.filter((item) => item.date !== date));

    if (selectedDate === date) {
      setSelectedDate(null);
    }
  };

  const limpar = () => {
    setBackgroundColor('#ffffff');
    setTextColor('#000000');
  }

  const getStatusClass = (value, threshold) =>
    value >= threshold ? 'bg-success' : 'bg-danger';

  const getStatusIcon = (value, threshold) =>
    value >= threshold ? '✓' : '✕';

  const getIndicador = (value, threshold) =>
    value >= threshold ? <FontAwesomeIcon icon={faSquareCheck} className='text-xl text-success bg-white' /> : <FontAwesomeIcon icon={faSquareXmark} className='text-xl text-danger bg-white' />;

  const calculoGauge = (contrastRatio) => {
    return ((contrastRatio - 1) * 100) / 20;
  };

  const percent = calculoGauge(contrastRatio).toFixed(2);
  
  const turn = (1 - percent / 100) / 2;

  const [tituloRelatorio, setTituloRelatorio] = React.useState(dateTitles[selectedDate] || selectedDate || '');
  
  const [observacoesRelatorio, setObservacoesRelatorio] = React.useState('');

  return (
    <>
      <div className='bg-gray100 min-h-[100vh] body print:bg-white'>
        <Header />
        <main>
          <div className='max-w-[930px] mx-auto'>
            <section className='bg-white my-6 rounded-xl shadow-md p-6 pb-8 print:hidden'>
              <div className='flex justify-between pb-6'>
                <h2 className='h4 text-gray900'>Verificar Contraste</h2>
                <button 
                  onClick={() => { }}
                  className='compartilhar cursor-pointer p-1 text-gray900 text-lg relative group'>
                  <CustomTooltip orientacao='left'>Compartilhar</CustomTooltip>
                  <span className='sr-only'>Compartilhar avaliação de contraste</span>
                  <FontAwesomeIcon icon={faLink} />
                </button> {/* falta função */}
              </div>
              <form>
                <div className='flex gap-9 border-y border-gray-400 py-5'>
                  <div>
                    <div className='flex gap-3'>
                      <div className='flex flex-col relative gap-3 cor-texto'>
                        <label htmlFor='text-color' className='h5 text-gray800'>Cor do Texto</label>
                        <input id='text-color' type='color' value={textColor} onChange={(e) => setTextColor(e.target.value)} className='absolute left-[6px] bottom-[6px] w-8 h-8 border border-gray500 rounded-sm'></input>
                        <div>
                          <input type='text' value={textColor}
                            onChange={(e) => {
                              let value = e.target.value;
                              if (!value.startsWith('#')) value = '#' + value;
                              setTextColor(value);
                            }}
                            className='bg-gray100 border border-gray500 w-[154px] rounded-lg p-[9px] font-primary text-gray700 pl-11' placeholder='#'>
                          </input>
                        </div>
                      </div>
                      <div className='flex flex-col relative gap-3 cor-fundo'>
                        <label htmlFor='background-color' className='h5 text-gray800'>Cor do Fundo</label>
                        <input id='background-color' type='color' value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className='absolute left-[6px] bottom-[6px] w-8 h-8 border border-gray500 rounded-sm'></input>
                        <div>
                          <input type='text'
                            value={backgroundColor}
                            onChange={(e) => {
                              let value = e.target.value;
                              if (!value.startsWith('#')) value = '#' + value;
                              setBackgroundColor(value);
                            }}
                            className='bg-gray100 border border-gray500 w-[154px] rounded-lg p-[9px] font-primary text-gray700 pl-11' placeholder='#'></input>
                        </div>
                      </div>
                    </div>
                    <div className='grid grid-cols-[1fr_90px] gap-3 mt-4.5 items-end'>
                      <div className='result pb-4'>
                        <div className='w-full max-w-[250px] relative'>
                          <div className='bgGauge w-full h-0 pb-[50.98%] relative overflow-hidden '>
                            <span className="formato"></span>
                            <div className='bg-gray400 absolute top-full right-0 w-[inherit] h-full origin-top transition-transform duration-200 ease-out overflow-hidden' style={{ transform: `rotate(-${turn}turn)` }}></div>
                          </div>
                          <div className='absolute z-20 w-[81%] h-[50%] -bottom-[15%] left-[50%] -translate-x-[50%] flex items-center justify-center'>
                            <p id='contrast-ratio' className='h6 text-gray900 flex flex-col-reverse items-center gap-2'>Relação de contraste <span className='font-primary font-bold text-[40px]/[34px]'>{contrastRatio}</span></p>
                          </div>
                        </div>
                      </div>
                      <div className='flex flex-col gap-1.5'>
                        <span className={`font-secondary font-bold text-[10px] text-white px-2.5 py-1 rounded-sm w-full flex justify-between ${getStatusClass(contrastRatio, CONTRAST_THRESHOLD_AA)}`}>
                          <p>AA</p> {getStatusIcon(contrastRatio, CONTRAST_THRESHOLD_AA)}
                        </span>
                        <span className={`font-secondary font-bold text-[10px] text-white px-2.5 py-1 rounded-sm w-full flex justify-between ${getStatusClass(contrastRatio, CONTRAST_THRESHOLD_AAA)}`}>
                          <p>AAA</p> {getStatusIcon(contrastRatio, CONTRAST_THRESHOLD_AAA)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='rounded-lg border border-gray500 overflow-hidden exemplos'>
                    <ul style={{ backgroundColor, color: textColor }} className='p-4'>
                      {/* ver se indicadores de contraste estão certos */}
                      <li className='flex justify-between items-center gap-4 border-b border-gray500 pb-2.5'>
                        <p className='font-primary font-normal text-xs/5'>Essa é uma frase de exemplo utilizando fonte tamanho 12 px.</p>
                        <div className='rounded-sm p-1 bg-white'>
                          <span className='indicador'>
                            {getIndicador(contrastRatio, CONTRAST_THRESHOLD_AAA)}
                          </span>
                        </div>
                      </li>
                      <li className='flex justify-between items-center gap-4 border-b border-gray500 py-2.5'>
                        <p className='font-primary font-bold text-[14pt]/7'>Essa é uma frase de exemplo em negrito utilizando fonte tamanho 14 pt.</p>
                        <div className='rounded-sm p-1 bg-white'>
                          <span className='indicador'>
                            {getIndicador(contrastRatio, CONTRAST_THRESHOLD_AA_18PT)}
                          </span>
                        </div>
                      </li>
                      <li className='flex justify-between items-center gap-4 pt-2.5'>
                        <p className='font-primary font-normal text-[18pt]/7'>Essa é uma frase de exemplo utilizando fonte tamanho 18 pt.</p>
                        <div className='rounded-sm p-1 bg-white'>
                          <span className='indicador'>
                            {getIndicador(contrastRatio, CONTRAST_THRESHOLD_AA_18PT)}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='flex justify-end gap-3 pt-6'>
                  <CustomBtn className='limpar' onClick={limpar} estado='outline'>LIMPAR</CustomBtn>
                  <CustomBtn className='addHistorico' onClick={addToHistory}>ADICIONAR AO HISTÓRICO<FontAwesomeIcon icon={faPlus} className='ml-2' /></CustomBtn>
                </div>
              </form>
            </section>
            <section className='bg-white my-6 rounded-xl shadow-md px-6 py-8 historico print:shadow-none print:w-[755px] print:mx-auto'>
              <div className='flex justify-between print:hidden'>
                <h2 className='h4 text-gray900'>Histórico</h2>
                <CustomBtn className='excluirHistorico' onClick={() => { if (window.confirm("Tem certeza de que deseja excluir todo o histórico? Esta ação é irreversível.")) { setHistory([]); } }} tamanho='sm' estado='outlineDanger'>Excluir tudo<FontAwesomeIcon icon={faTrashCan} className='ml-2' /></CustomBtn>
              </div>
              <div className='print:flex justify-center gap-4 pt-9 hidden'>
                <img src={logo} alt='Logotipo Contrast Checker' className='w-16' />
                <h1 className='text-gray-900 font-atkinson h5'>
                  Contrast Checker
                </h1>
              </div>
              <div id='historico'>
                <ul className='flex items-end border-b border-gray500 mt-6 mb-3 print:flex-col print:items-start print:border-t print:mt-7.5 print:pt-1 print:pb-5'>
                  {Object.keys(groupedHistory).map((date) => (
                    <li key={date} className={`flex h-fit font-semibold -mb-[1px] border-gray500 border rounded-t-sm -mr-[1px]  ${ selectedDate === date ? 'text-gray900 border-b-white' : 'text-gray700'} print:border-none`}>
                      {editingDate === date ? (
                        <form className='bg-white -mr-12 z-5 flex items-center gap-2 print:hidden'
                          onSubmit={(e) => e.preventDefault()}
                          onBlur={(e) => {
                            if (!e.currentTarget.contains(e.relatedTarget)) {
                              setEditingDate(null);
                            }
                          }}
                        >
                          <input autoFocus type="text" value={editedTitle} className="px-4.5 pb-2.5 pt-2.5 border rounded-l"
                            onChange={(e) => setEditedTitle(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                setDateTitles((prev) => ({ ...prev, [date]: editedTitle }));
                                setEditingDate(null);
                              }
                            }}
                          />
                          <CustomBtn onClick={() => {
                            setDateTitles((prev) => ({ ...prev, [date]: editedTitle }));
                            setEditingDate(null);
                          }} estado='primaryGray' tamanho='sm'>
                            Ok
                          </CustomBtn>
                          <CustomBtn onClick={() => { setEditingDate(null); }} estado='outlineGray' tamanho='sm'>Cancelar</CustomBtn>
                        </form>
                      ) : (
                      <a href='#'
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedDate(date);
                        }}
                        className={`px-4.5 pb-2.5 print:hidden ${ selectedDate === date ? 'pt-2.5 abaSelecionada' : 'pt-1.5'}`}>
                        {dateTitles[date] || date}
                      </a>
                      )}
                      <div className={`${selectedDate === date ? 'flex gap-2 pr-3 -ml-1' : 'hidden'}`}>
                        <button
                          onClick={() => {
                            setEditedTitle(dateTitles[date] || date);
                            setEditingDate(date);
                          }}
                          className='cursor-pointer group relative editarTitulo print:hidden'
                        >
                          <CustomTooltip orientacao='bottom'>Editar título</CustomTooltip>
                          <span className="sr-only">Editar título</span>
                          <FontAwesomeIcon icon={faPencil} />
                        </button>
                        <button onClick={() => removeDateFromHistory(date)} className='cursor-pointer group relative excluirAba print:hidden'>
                          <CustomTooltip orientacao='bottom'>Excluir aba do histórico</CustomTooltip>
                          <span className="sr-only">Excluir aba do histórico</span>
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </div>
                    </li>
                  ))}
                  <h2 className='hidden print:block h5 pt-2.5 pb-1.5'>{tituloRelatorio}</h2>
                  <p className='hidden print:block font-secondary font-normal text-[13px]'>{observacoesRelatorio}</p>
                </ul>
                <div className='font-primary font-bold text-base text-gray800 px-6 grid grid-cols-[100px_105px_1fr_90px_90px_80px] items-center gap-8 mb-1.5 print:grid-cols-[84px_88px_1fr_140px_68px] print:text-[13px] print:pt-4'>
                  <div>Cor do Texto</div>
                  <div>Cor de Fundo</div>
                  <div>Amostra</div>
                  <div>Relação de contraste</div>
                  <div>Status</div>
                  <div className='print:hidden'></div>
                </div>
                <div className='rounded-2xl overflow-hidden print:mt-[13px]'>
                {selectedDate && groupedHistory[selectedDate] && groupedHistory[selectedDate].length > 0 ? (
                  groupedHistory[selectedDate].map((item, index) => (
                    <div key={index} className='odd:bg-gray100 border-b border-gray500 last:border-0 grid grid-cols-[100px_105px_1fr_90px_90px_80px] items-center px-6 gap-8 print:grid-cols-[84px_88px_1fr_140px_68px]'>
                      <div className='print:font-secondary print:font-normal print:text-[13px]'>{item.textColor}
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(item.textColor)
                          }}
                          className='cursor-pointer p-1 relative group copiarCorTexto print:hidden'>
                          <CustomTooltip orientacao='bottom'>Copiar cor do texto</CustomTooltip>
                          <span className='sr-only'>Copiar cor do texto</span>
                          <FontAwesomeIcon icon={faCopy} />
                        </button>
                      </div>
                      <div className='print:font-secondary print:font-normal print:text-[13px]'>{item.backgroundColor}
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(item.backgroundColor)
                          }}
                          className='cursor-pointer p-1 relative group copiarCorFundo print:hidden'>
                          <CustomTooltip orientacao='bottom'>Copiar cor do fundo</CustomTooltip>
                          <span className='sr-only'>Copiar cor do fundo</span>
                          <FontAwesomeIcon icon={faCopy} />
                        </button>
                      </div>
                      <div className='flex flex-col gap-2 py-3'>
                        <div className='font-primary text-xs/4.5 w-fit rounded-lg border px-3 pt-1 pb-2 border-gray600 print:px-[7px] print:text-[10px]/3.5 print:pb-1' style={{ background: `${item.backgroundColor}`, color: `${item.textColor}` }}>
                          <p>exemplo de texto</p>
                          <p>EXEMPLO DE TEXTO</p>
                        </div>
                        <div className='font-primary text-lg/6.5 w-fit rounded-lg border px-3 pt-1 pb-2 border-gray600 print:px-[7px] print:text-[13px]/5 print:pt-0.5 print:pb-1' style={{ background: `${item.backgroundColor}`, color: `${item.textColor}` }}>
                          <p>exemplo de texto</p>
                          <p>EXEMPLO DE TEXTO</p>
                        </div>
                      </div>
                      <div className='font-secondary font-normal text-[13px]'>{item.contrastRatio}</div>
                      <div>
                        <p className='sr-only'>{item.status}</p>
                        {item.badges}
                      </div>
                      <div className='print:hidden'>
                        <div className='flex gap-3'>
                          <CustomBtn 
                            onClick={() => {
                              setBackgroundColor(item.backgroundColor);
                              setTextColor(item.textColor);
                            }}
                            className='reavaliar'
                            estado='outlineGray' tamanho='iconOnly'>
                            <CustomTooltip orientacao='left'>Reavaliar</CustomTooltip>
                            <span className='sr-only'>Reavaliar</span>
                            <FontAwesomeIcon icon={faRotate} />
                          </CustomBtn>
                          <CustomBtn onClick={() => removeFromHistory(item.id)} className='excluirAvaliacao' estado='outlineDanger' tamanho='iconOnly'>
                            <CustomTooltip orientacao='left'>Excluir</CustomTooltip>
                            <span className='sr-only'>Excluir</span>
                            <FontAwesomeIcon icon={faTrashCan} />
                          </CustomBtn>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className='text-gray-500 px-6 py-3'>Nenhum item salvo neste dia.</p>
                )}
                </div>
              </div>
              <div className='border-t border-gray500 mt-6 pt-6 flex justify-end print:hidden'>
                <CustomBtn onClick={() => setModalImprimir(true)} estado='outlineGray' className='imprimirRelatorio'>IMPRIMIR RELATÓRIO<FontAwesomeIcon icon={faPrint} className='ml-2' /></CustomBtn>
                  {modalImprimir && (
                    <div className='fixed inset-0 w-full h-full bg-fundo-modal z-999 flex items-center justify-center'>
                      <div className='bg-white w-[588px] p-6 rounded-xl'>
                        <div className='flex justify-between items-center pb-6'>
                          <h2 className='h4 text-gray800'>Imprimir relatório</h2>
                          <button type='button' aria-label='Fechar' onClick={() => setModalImprimir(false)}>
                            <FontAwesomeIcon icon={faXmark} className='text-[19px] text-dark-color p-1 cursor-pointer' />
                          </button>
                        </div>
                        <form onSubmit={(e) => e.preventDefault()}>
                          <div className='border-y border-gray400 py-4 flex flex-col gap-5'>
                            <div className='flex flex-col gap-1.5'>
                              <label htmlFor='tituloRelatorio' className='h6 text-gray800'>Título:</label>
                              <input type='text' id='tituloRelatorio' className='border-1 border-gray500 rounded-lg bg-gray100 px-4 h-[48px] input-text text-gray700 placeholder:text-gray700'
                                defaultValue={dateTitles[selectedDate] || selectedDate || ''}
                                onChange={(e) => setTituloRelatorio(e.target.value)}
                              >
                              </input>
                            </div>
                            <div className='flex flex-col gap-1.5'>
                              <label htmlFor='observacoesRelatorio' className='h6 text-gray800'>Observações:</label>
                              <textarea id='observacoesRelatorio' onChange={(e) => setObservacoesRelatorio(e.target.value)} className='border-1 border-gray500 rounded-lg bg-gray100 px-4 h-[114px] pt-3 input-text text-gray700'></textarea>
                            </div>
                          </div>
                          <div className='flex justify-end gap-3 mt-6'>
                            <CustomBtn onClick={() => setModalImprimir(false)} estado='outlineGray' tamanho='md'>CANCELAR</CustomBtn>
                            <CustomBtn type='submit' onClick={() => {window.print()}} estado='primary' tamanho='md'>
                              IMPRIMIR
                              <FontAwesomeIcon icon={faPrint} className='ml-2'/>
                            </CustomBtn>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}

export default App

{/* Falta configurar botão de compartilhar */}