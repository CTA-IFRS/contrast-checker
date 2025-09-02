import { useState, useEffect } from 'react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSquareCheck, faSquareXmark, faTrashCan, faRotate, faLink, faPrint, faPencil } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import Header from './components/Header';
import { CustomBtn } from './components/botoes';

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
      <div className='flex flex-col gap-1.5'>
        <span className={`font-secondary font-bold text-[10px] text-white px-2.5 py-1 rounded-sm w-full flex justify-between ${getStatusClass(contrastRatio, CONTRAST_THRESHOLD_AA)}`}>
          <p>AA</p> {getStatusIcon(contrastRatio, CONTRAST_THRESHOLD_AA)}
        </span>
        <span className={`font-secondary font-bold text-[10px] text-white px-2.5 py-1 rounded-sm w-full flex justify-between ${getStatusClass(contrastRatio, CONTRAST_THRESHOLD_AAA)}`}>
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

  return (
    <>
      <div className='bg-gray100 min-h-[100vh]'>
        <Header />
        <main>
          <div className='max-w-[930px] mx-auto'>
            <section className='bg-white my-6 rounded-xl shadow-md p-6 pb-8'>
              <div className='flex justify-between pb-6'>
                <h2 className='h4 text-gray900'>Verificar Contraste</h2>
                <button title='Compartilhar'
                  onClick={() => { }}
                  className='cursor-pointer p-1 text-gray900 text-lg'>
                  <span className='sr-only'>Compartilhar avaliação de contraste</span>
                  <FontAwesomeIcon icon={faLink} />
                </button> {/* falta função */}
              </div>
              <form>
                <div className='flex gap-9 border-y border-gray-400 py-5'>
                  <div>
                    <div className='flex gap-3'>
                      <div className='flex flex-col relative gap-3'>
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
                      <div className='flex flex-col relative gap-3'>
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
                      <div className='result'>
                        {/* ajustar gauge */}
                        <div className='gauge bg-gray400 h-5 w-[200px] rounded-full'>
                          <div style={{ width: `${calculoGauge(contrastRatio).toFixed(2)}%` }} className='flex h-5 rounded-full overflow-hidden'>
                            <span className='flex bgGauge h-5 rounded-full min-w-[200px]'></span>
                          </div>
                        </div>
                        <p id='contrast-ratio' className='h6 text-gray900 flex flex-col-reverse items-center'>Relação de contraste <span className='font-primary font-bold text-[40px]/[34px]'>{contrastRatio}</span></p>
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
                  <div className='rounded-lg border border-gray500 overflow-hidden'>
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
                  <CustomBtn onClick={limpar} estado='outline'>LIMPAR</CustomBtn>
                  <CustomBtn onClick={addToHistory}>ADICIONAR AO HISTÓRICO<FontAwesomeIcon icon={faPlus} className='ml-2' /></CustomBtn>
                </div>
              </form>
            </section>
            <section className='bg-white my-6 rounded-xl shadow-md px-6 py-8'>
              <div className='flex justify-between'>
                <h2 className='h4 text-gray900'>Histórico</h2>
                <CustomBtn onClick={() => { if (window.confirm("Tem certeza de que deseja excluir todo o histórico? Esta ação é irreversível.")) { setHistory([]); } }} tamanho='sm' estado='outlineDanger'>Excluir tudo<FontAwesomeIcon icon={faTrashCan} className='ml-2' /></CustomBtn>
              </div>
              <div id='historico'>
                <ul className='flex items-end border-b border-gray500 mt-6 mb-3'>
                  {Object.keys(groupedHistory).map((date) => (
                    <li key={date} className={`flex h-fit font-semibold -mb-[1px] border-gray500 border rounded-t-sm -mr-[1px]  ${ selectedDate === date ? 'text-gray900 border-b-white' : 'text-gray700'}`}>
                      {editingDate === date ? (
                        <form className='bg-white -mr-12 z-5 flex items-center gap-2'
                          onSubmit={(e) => e.preventDefault()}
                          onBlur={(e) => {
                            if (!e.currentTarget.contains(e.relatedTarget)) {
                              setEditingDate(null);
                            }
                          }}
                        >
                          <input type="text" value={editedTitle} className="px-4.5 pb-2.5 pt-2.5 border rounded-l"
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
                        className={`px-4.5 pb-2.5 ${ selectedDate === date ? 'pt-2.5' : 'pt-1.5'}`}>
                        {dateTitles[date] || date}
                      </a>
                      )}
                      <div className={`${selectedDate === date ? 'flex gap-2 pr-3 -ml-1' : 'hidden'}`}>
                        <button
                          onClick={() => {
                            setEditedTitle(dateTitles[date] || date);
                            setEditingDate(date);
                          }}
                          title='Editar título'
                          className='cursor-pointer'
                        >
                          <span className="sr-only">Editar título</span>
                          <FontAwesomeIcon icon={faPencil} />
                        </button>
                        <button onClick={() => removeDateFromHistory(date)} title='Excluir aba do histórico' className='cursor-pointer'>
                          <span className="sr-only">Excluir aba do histórico</span>
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className='font-primary font-bold text-base text-gray800 px-6 grid grid-cols-[100px_105px_1fr_90px_90px_80px] items-center gap-8 mb-1.5'>
                  <div>Cor do Texto</div>
                  <div>Cor de Fundo</div>
                  <div>Amostra</div>
                  <div>Relação de contraste</div>
                  <div>Status</div>
                  <div></div>
                </div>
                <div className='rounded-2xl overflow-hidden'>
                {selectedDate && groupedHistory[selectedDate] && groupedHistory[selectedDate].length > 0 ? (
                  groupedHistory[selectedDate].map((item, index) => (
                    <div key={index} className='odd:bg-gray100 border-b border-gray500 last:border-0 grid grid-cols-[100px_105px_1fr_90px_90px_80px] items-center px-6 gap-8'>
                      <div>{item.textColor}
                        <button title='Copiar cor do texto'
                          onClick={() => {
                            navigator.clipboard.writeText(item.textColor)
                          }}
                          className='cursor-pointer p-1'>
                          <span className='sr-only'>Copiar cor do texto</span>
                          <FontAwesomeIcon icon={faCopy} />
                        </button>
                      </div>
                      <div>{item.backgroundColor}
                        <button title='Copiar cor do fundo'
                          onClick={() => {
                            navigator.clipboard.writeText(item.backgroundColor)
                          }}
                          className='cursor-pointer p-1'>
                          <span className='sr-only'>Copiar cor do fundo</span>
                          <FontAwesomeIcon icon={faCopy} />
                        </button>
                      </div>
                      <div className='flex flex-col gap-2 py-3'>
                        <div className='font-primary text-xs/4.5 w-fit rounded-lg border px-3 pt-1 pb-2 border-gray600' style={{ background: `${item.backgroundColor}`, color: `${item.textColor}` }}>
                          <p>exemplo de texto</p>
                          <p>EXEMPLO DE TEXTO</p>
                        </div>
                        <div className='font-primary text-lg/6.5 w-fit rounded-lg border px-3 pt-1 pb-2 border-gray600' style={{ background: `${item.backgroundColor}`, color: `${item.textColor}` }}>
                          <p>exemplo de texto</p>
                          <p>EXEMPLO DE TEXTO</p>
                        </div>
                      </div>
                      <div>{item.contrastRatio}</div>
                      <div>
                        <p className='sr-only'>{item.status}</p>
                        {item.badges}
                      </div>
                      <div>
                        <div className='flex gap-3'>
                          <CustomBtn title='Reavaliar'
                            onClick={() => {
                              setBackgroundColor(item.backgroundColor);
                              setTextColor(item.textColor);
                            }}
                            estado='outlineGray' tamanho='iconOnly'>
                            <span className='sr-only'>Reavaliar</span>
                            <FontAwesomeIcon icon={faRotate} />
                          </CustomBtn>
                          <CustomBtn title='Excluir' onClick={() => removeFromHistory(item.id)} estado='outlineDanger' tamanho='iconOnly'>
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
              <div className='border-t border-gray500 mt-6 pt-6 flex justify-end'>
                <CustomBtn estado='outlineGray'>IMPRIMIR RELATÓRIO<FontAwesomeIcon icon={faPrint} className='ml-2' /></CustomBtn>
                {/* fazer modal e função */}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}

export default App