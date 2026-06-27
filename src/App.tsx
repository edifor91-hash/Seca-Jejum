/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';

type QuizStep = 'landing' | 'q1' | 'q3' | 'q4' | 'q5' | 'q6' | 'q7' | 'q8' | 'q9' | 'q10' | 'q11' | 'q12' | 'q13' | 'q14' | 'q15' | 'q16' | 'q17' | 'q17_exclude' | 'q18' | 'q19' | 'q20' | 'q21' | 'q22' | 'q23' | 'q24' | 'q25' | 'q26' | 'q27' | 'q28' | 'q29' | 'q30' | 'q31' | 'q32' | 'q33' | 'q34' | 'q35' | 'q36' | 'q37' | 'q38' | 'calculating' | 'result';

export default function App() {
  const [step, setStep] = useState<QuizStep>('landing');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<string[]>(['Pimentão', 'Quinoa', 'Ovo', 'Salmão', 'Requeijão', 'Maçã']);
  const [selectedProblems, setSelectedProblems] = useState<string[]>(['Nenhuma das acima']);
  const [selectedHabits, setSelectedHabits] = useState<string[]>(['Eu amo refrigerantes']);
  const [selectedAcontecimentos, setSelectedAcontecimentos] = useState<string[]>([]);
  const [heightVal, setHeightVal] = useState(180);
  const [heightUnit, setHeightUnit] = useState<'cm' | 'pol'>('cm');
  const [weightVal, setWeightVal] = useState(70);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg');
  const [targetWeightVal, setTargetWeightVal] = useState(70);
  const [targetWeightUnit, setTargetWeightUnit] = useState<'kg' | 'lb'>('kg');
  const [ageVal, setAgeVal] = useState('');
  const [showAgeError, setShowAgeError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(967); // 16 minutes and 07 seconds

  useEffect(() => {
    if (step === 'result') {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) return 967; // loop back
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (step === 'calculating') {
      const timer = setTimeout(() => {
        setStep('result');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const nextStep = (currentStep: QuizStep) => {
    const steps: QuizStep[] = ['landing', 'q1', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13', 'q14', 'q15', 'q16', 'q17', 'q17_exclude', 'q18', 'q19', 'q20', 'q21', 'q22', 'q23', 'q24', 'q25', 'q26', 'q27', 'q28', 'q29', 'q30', 'q31', 'q32', 'q33', 'q34', 'q35', 'q36', 'q37', 'q38', 'calculating', 'result'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    if (step === 'result') {
      setStep('q38');
      return;
    }
    const steps: QuizStep[] = ['landing', 'q1', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13', 'q14', 'q15', 'q16', 'q17', 'q17_exclude', 'q18', 'q19', 'q20', 'q21', 'q22', 'q23', 'q24', 'q25', 'q26', 'q27', 'q28', 'q29', 'q30', 'q31', 'q32', 'q33', 'q34', 'q35', 'q36', 'q37', 'q38', 'calculating', 'result'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  const handleAcontecimentosToggle = (label: string) => {
    if (label === 'Nenhuma das acima') {
      setSelectedAcontecimentos(['Nenhuma das acima']);
    } else {
      let updated = selectedAcontecimentos.filter(p => p !== 'Nenhuma das acima');
      if (updated.includes(label)) {
        updated = updated.filter(p => p !== label);
      } else {
        updated.push(label);
      }
      setSelectedAcontecimentos(updated);
    }
  };

  const handleProblemToggle = (label: string) => {
    if (label === 'Nenhuma das acima') {
      setSelectedProblems(['Nenhuma das acima']);
    } else {
      let updated = selectedProblems.filter(p => p !== 'Nenhuma das acima');
      if (updated.includes(label)) {
        updated = updated.filter(p => p !== label);
      } else {
        updated.push(label);
      }
      if (updated.length === 0) {
        updated = ['Nenhuma das acima'];
      }
      setSelectedProblems(updated);
    }
  };

  const handleHabitToggle = (label: string) => {
    if (label === 'Nenhuma das acima') {
      setSelectedHabits(['Nenhuma das acima']);
    } else {
      let updated = selectedHabits.filter(h => h !== 'Nenhuma das acima');
      if (updated.includes(label)) {
        updated = updated.filter(h => h !== label);
      } else {
        updated.push(label);
      }
      if (updated.length === 0) {
        updated = ['Nenhuma das acima'];
      }
      setSelectedHabits(updated);
    }
  };

  const selectAnswer = (question: string, answer: string) => {
    setAnswers({ ...answers, [question]: answer });
    // Auto-advance for multiple choice
    if (step === 'q1') nextStep('q1');
    else if (step === 'q3') nextStep('q3');
    else if (step === 'q5') nextStep('q5');
    else if (step === 'q6') nextStep('q6');
    else if (step === 'q8') nextStep('q8');
    else if (step === 'q9') nextStep('q9');
    else if (step === 'q10') nextStep('q10');
    else if (step === 'q11') nextStep('q11');
    else if (step === 'q12') nextStep('q12');
    else if (step === 'q13') nextStep('q13');
    else if (step === 'q14') nextStep('q14');
    else if (step === 'q15') nextStep('q15');
    else if (step === 'q16') nextStep('q16');
    else if (step === 'q17') {
      nextStep('q17');
    }
    else if (step === 'q18') {
      setTimeout(() => {
        nextStep('q18');
      }, 400);
    }
    else if (step === 'q19') {
      setTimeout(() => {
        nextStep('q19');
      }, 400);
    }
    else if (step === 'q20') {
      setTimeout(() => {
        nextStep('q20');
      }, 400);
    }
    else if (step === 'q21') {
      setTimeout(() => {
        nextStep('q21');
      }, 400);
    }
    else if (step === 'q22') {
      setTimeout(() => {
        nextStep('q22');
      }, 400);
    }
    else if (step === 'q23') {
      setTimeout(() => {
        nextStep('q23');
      }, 400);
    }
    else if (step === 'q24') {
      setTimeout(() => {
        nextStep('q24');
      }, 400);
    }
    else if (step === 'q25') {
      setTimeout(() => {
        nextStep('q25');
      }, 400);
    }
    else if (step === 'q26') {
      setTimeout(() => {
        nextStep('q26');
      }, 400);
    }
    else if (step === 'q37') {
      setTimeout(() => {
        nextStep('q37');
      }, 400);
    }
    else if (step === 'q4') {
      setStep('q5');
    }
  };

  const getProgress = () => {
    switch (step) {
      case 'landing': return 5;
      case 'q1': return 15;
      case 'q3': return 28;
      case 'q4': return 42;
      case 'q5': return 56;
      case 'q6': return 50;
      case 'q7': return 60;
      case 'q8': return 70;
      case 'q9': return 80;
      case 'q10': return 85;
      case 'q11': return 88;
      case 'q12': return 90;
      case 'q13': return 92;
      case 'q14': return 94;
      case 'q15': return 95;
      case 'q16': return 96;
      case 'q17': return 96.4;
      case 'q17_exclude': return 96.8;
      case 'q18': return 97.5;
      case 'q19': return 98.2;
      case 'q20': return 98.5;
      case 'q21': return 98.8;
      case 'q22': return 99.0;
      case 'q23': return 99.2;
      case 'q24': return 99.4;
      case 'q25': return 99.5;
      case 'q26': return 99.7;
      case 'q27': return 99.6;
      case 'q28': return 99.7;
      case 'q29': return 99.7;
      case 'q30': return 99.7;
      case 'q31': return 99.7;
      case 'q32': return 99.8;
      case 'q33': return 99.85;
      case 'q34': return 99.9;
      case 'q35': return 99.91;
      case 'q36': return 99.93;
      case 'q37': return 99.95;
      case 'q38': return 99.97;
      case 'calculating': return 99.98;
      case 'result': return 97.5;
      default: return 0;
    }
  };

  const getContainerMaxWidth = () => {
    if (step === 'landing') return 'max-w-md';
    if (step === 'result') return 'max-w-[854px]';
    if (step === 'q17_exclude') return 'max-w-[540px]';
    if (step === 'q12' || step === 'q13' || step === 'q14' || step === 'q15' || step === 'q16' || step === 'q17') return 'max-w-[500px]';
    if (step === 'q18' || step === 'q19' || step === 'q29' || step === 'q37') return 'max-w-[550px]';
    if (step === 'q20' || step === 'q21' || step === 'q25' || step === 'q26') return 'max-w-[620px]';
    if (step === 'q22' || step === 'q23' || step === 'q24' || step === 'q27' || step === 'q28' || step === 'q30' || step === 'q31' || step === 'q32' || step === 'q33' || step === 'q34' || step === 'q35' || step === 'q36' || step === 'q38') return 'max-w-[480px]';
    return 'max-w-md';
  };

  return (
    <div className="min-h-screen bg-white w-full relative flex flex-col items-center">
      {/* Back Button positioned at the extreme left of the screen, matching browser back button spacing */}
      {step !== 'landing' && step !== 'calculating' && (
        <button 
          onClick={prevStep}
          className="absolute left-4 sm:left-6 md:left-8 lg:left-10 top-6 sm:top-8 p-2 text-black hover:opacity-70 rounded-full cursor-pointer active:scale-90 transition-all z-50 flex items-center justify-center"
          id="back-button"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.5px]" />
        </button>
      )}

      {/* Main layout container with customized step widths */}
      <div className={`flex-1 flex flex-col items-center relative px-4 pt-4 sm:pt-10 pb-6 sm:pb-12 transition-all duration-300 w-full ${getContainerMaxWidth()}`}>
        {/* Header */}
        <header className="w-full flex flex-col items-center mb-6 sm:mb-10 relative">
          <div className="flex items-center gap-2 mb-3 sm:mb-5">
            <span className="text-3xl">🔥</span>
            <h1 className="font-black text-[24px] tracking-tighter uppercase text-black">SECA JEJUM</h1>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-[5px] bg-[#15B8A6]/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${getProgress()}%` }}
              className="h-full bg-[#15B8A6] rounded-full"
              transition={{ duration: 0.5 }}
            />
          </div>
        </header>

        <main className="w-full flex-1 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {step === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center text-center w-full"
            >
              <h2 className="text-[24px] font-black leading-[1.15] mb-6 px-1 text-black tracking-tight">
                Esse <span className="text-[#12B3A6]">Método de Jejum Adaptado</span><br />
                está ajudando Homens e Mulheres a<br />
                <span className="text-[#EF4444]">eliminar até 10kg em 21 dias</span> sem<br />
                passar fome
              </h2>
              
              <p className="text-[17px] font-bold mb-6 leading-[1.3] text-black">
                Responda esse teste gratuito de apenas 2 <br />
                minutos e aprenda 👇
              </p>

              {/* Layout de Imagem Única da Referência */}
              <div className="relative w-full max-w-[380px] mb-4 flex flex-col items-center">
                <img 
                  src="https://i.postimg.cc/Hnv4v14Z/1.png" 
                  alt="Transformação Seca Jejum" 
                  className="w-full h-auto max-h-[420px] object-contain"
                />
              </div>

              <motion.button 
                id="btn-quiz-start"
                onClick={() => setStep('q1')}
                animate={{ 
                  scale: [1, 1.04, 1],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-[98%] bg-[#12B3A6] border-b-[6px] border-[#0D8E83] text-white font-extrabold py-5 rounded-2xl shadow-[0_10px_25px_rgba(18,179,166,0.3)] hover:brightness-110 active:translate-y-[3px] active:border-b-[2px] transition-all text-[18px] uppercase flex items-center justify-center gap-2 relative z-30 overflow-hidden"
              >
                {/* Shine effect overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 translate-x-[-200%]"
                  animate={{ translateX: ["-200%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
                />
                <span className="relative z-10">QUERO APRENDER TAMBÉM 🔥</span>
              </motion.button>
            </motion.div>
          )}

          {step === 'q1' && (
             <motion.div
              key="q1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center justify-center py-6"
            >
              <h3 className="text-[24px] font-black mb-10 text-center text-black leading-tight tracking-tight px-4">
                Jejum Intermitente para:
              </h3>
              
              <div className="grid grid-cols-2 gap-3 w-full px-2 max-w-[420px]">
                {/* Home Card */}
                <button 
                  onClick={() => selectAnswer('gender', 'Masculino')}
                  className="w-full bg-white rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 active:scale-95 transition-all flex flex-col group"
                >
                  <div className="h-[180px] bg-[#6B8E7E] relative overflow-hidden shrink-0">
                    <img 
                      src="https://i.postimg.cc/zG45ZLGf/1-2.png" 
                      alt="Homem" 
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className={`p-4 flex items-center justify-between flex-1 transition-colors duration-300 ${answers.gender === 'Masculino' ? 'bg-[#15B8A6] text-white' : 'bg-white text-gray-800 group-hover:bg-[#15B8A6] group-hover:text-white'}`}>
                    <span className="text-[14px] font-bold">Homem</span>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${answers.gender === 'Masculino' ? 'bg-white/20 border-transparent' : 'border border-gray-100 group-hover:bg-white/20 group-hover:border-transparent'}`}>
                      <ChevronRight className={`w-4 h-4 transition-colors ${answers.gender === 'Masculino' ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                    </div>
                  </div>
                </button>

                {/* Mulher Card */}
                <button 
                  onClick={() => selectAnswer('gender', 'Feminino')}
                  className="w-full bg-white rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 active:scale-95 transition-all flex flex-col group"
                >
                  <div className="h-[180px] bg-[#E2D1C3] relative overflow-hidden shrink-0">
                    <img 
                      src="https://i.postimg.cc/bv05CdDq/1-3.png" 
                      alt="Mulher" 
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className={`p-4 flex items-center justify-between flex-1 transition-colors duration-300 ${answers.gender === 'Feminino' ? 'bg-[#15B8A6] text-white' : 'bg-white text-gray-800 group-hover:bg-[#15B8A6] group-hover:text-white'}`}>
                    <span className="text-[14px] font-bold">Mulher</span>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${answers.gender === 'Feminino' ? 'bg-white/20 border-transparent' : 'border border-gray-100 group-hover:bg-white/20 group-hover:border-transparent'}`}>
                      <ChevronRight className={`w-4 h-4 transition-colors ${answers.gender === 'Feminino' ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                    </div>
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {step === 'q3' && (
            <motion.div
              key="q3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center justify-center py-6"
            >
              <h3 className="text-[20px] font-black mb-8 text-center text-black leading-tight tracking-tight px-8">
                Ajuste o seu plano de acordo com a sua idade
              </h3>
              <div className="space-y-4 w-full px-4 max-w-[420px]">
                {[
                  { label: '18 a 25 anos', img: 'https://i.postimg.cc/pr7wz74b/3.png' },
                  { label: '26 a 35 anos', img: 'https://i.postimg.cc/kXR3qJ6W/4.png' },
                  { label: '36 a 45 anos', img: 'https://i.postimg.cc/rFRXMV0h/5.png' },
                  { label: '+46 anos', img: 'https://i.postimg.cc/L6gK29gH/6.png' }
                ].map(opt => (
                  <button 
                    key={opt.label}
                    onClick={() => selectAnswer('age', opt.label)}
                    className={`w-full h-[90px] border-2 rounded-[24px] overflow-hidden flex items-center justify-between shadow-[0_4px_15px_rgba(0,0,0,0.05)] active:scale-[0.98] transition-all group ${
                      answers.age === opt.label 
                      ? 'border-[#15B8A6] bg-[#15B8A6] text-white' 
                      : 'bg-white border-gray-100 text-gray-700 hover:border-[#15B8A6] hover:bg-[#15B8A6]/5'
                    }`}
                  >
                    <span className={`pl-8 font-bold text-[17px] transition-colors ${
                      answers.age === opt.label ? 'text-white' : 'text-gray-700 group-hover:text-[#15B8A6]'
                    }`}>
                      {opt.label}
                    </span>
                    <div className="h-[74px] w-[74px] mr-2 rounded-[18px] overflow-hidden bg-gray-100 flex-shrink-0">
                      <img 
                        src={opt.img} 
                        alt={opt.label} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'q4' && (
             <motion.div
              key="q4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center py-4"
            >
              <div className="text-center mb-8">
                <h2 className="text-[32px] font-black text-black leading-tight mb-1">
                  +45 mil pessoas
                </h2>
                <p className="text-[17px] font-bold text-gray-800">
                  escolheram o <span className="text-[#15B8A6]">Seca Jejum Turbo</span>
                </p>
              </div>

              {/* Image Visualization */}
              <div className="w-full max-w-[380px] mb-8">
                <img 
                  src="https://i.postimg.cc/dtG7DKgr/7.webp" 
                  alt="Mais de 45 mil pessoas" 
                  className="w-full h-auto object-contain"
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                animate={{ 
                  boxShadow: [
                    "0 10px 30px rgba(21,184,166,0.3)",
                    "0 15px 45px rgba(21,184,166,0.5)",
                    "0 10px 30px rgba(21,184,166,0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                onClick={() => nextStep('q4')}
                className="w-full bg-[#15B8A6] text-white font-black py-6 rounded-[24px] mt-auto text-[20px] uppercase ring-8 ring-[#15B8A6]/5 flex items-center justify-center gap-3 active:scale-[0.98] transition-colors hover:bg-[#0D9488] animate-heartbeat"
              >
                Continuar
              </motion.button>
            </motion.div>
          )}

          {step === 'q5' && (
            <motion.div
              key="q5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center justify-center py-6"
            >
              <h3 className="text-[20px] font-black mb-10 text-center text-black leading-tight tracking-tight px-8">
                Qual é o seu objetivo principal?
              </h3>
              <div className="space-y-4 w-full px-4 max-w-[420px]">
                {[
                  { label: 'Perder peso', img: 'https://i.postimg.cc/7PW1SDBs/8.png' },
                  { label: 'Ficar em forma', img: 'https://i.postimg.cc/dQxRGvHF/9.png' },
                  { label: 'Melhorar a saúde do coração', img: 'https://i.postimg.cc/MKf7D4ND/10.png' },
                  { label: 'Aliviar o estresse', img: 'https://i.postimg.cc/T38rH0vk/11.png' }
                ].map(opt => (
                  <button 
                    key={opt.label}
                    onClick={() => selectAnswer('goal', opt.label)}
                    className={`w-full h-[90px] border-2 rounded-[24px] overflow-hidden flex items-center justify-between shadow-[0_4px_15px_rgba(0,0,0,0.05)] active:scale-[0.98] transition-all group ${
                      answers.goal === opt.label 
                      ? 'border-[#15B8A6] bg-[#15B8A6] text-white' 
                      : 'bg-white border-gray-100 text-gray-700 hover:border-[#15B8A6] hover:bg-[#15B8A6]/5'
                    }`}
                  >
                    <span className={`pl-8 font-bold text-[17px] transition-colors ${
                      answers.goal === opt.label ? 'text-white' : 'text-gray-700 group-hover:text-[#15B8A6]'
                    }`}>
                      {opt.label}
                    </span>
                    <div className="h-[74px] w-[74px] mr-2 rounded-[18px] overflow-hidden bg-gray-100 flex-shrink-0">
                      <img 
                        src={opt.img} 
                        alt={opt.label} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'q6' && (
            <motion.div
              key="q6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center justify-center py-6"
            >
              <h3 className="text-[20px] font-black mb-10 text-center text-black leading-tight tracking-tight px-8">
                Como você descreveria seu físico?
              </h3>
              <div className="space-y-4 w-full px-4 max-w-[420px]">
                {[
                  { label: 'Magra', img: 'https://i.postimg.cc/KjSLj7DF/12.png' },
                  { label: 'Falsa magra', img: 'https://i.postimg.cc/C5G8qZch/13.png' },
                  { label: 'Sobrepeso', img: 'https://i.postimg.cc/8kMM33NK/14.png' },
                  { label: 'Obesa', img: 'https://i.postimg.cc/sf7788sk/15.png' }
                ].map(opt => (
                  <button 
                    key={opt.label}
                    onClick={() => selectAnswer('physique', opt.label)}
                    className={`w-full h-[90px] border-2 rounded-[24px] overflow-hidden flex items-center justify-between shadow-[0_4px_15px_rgba(0,0,0,0.05)] active:scale-[0.98] transition-all group ${
                      answers.physique === opt.label 
                      ? 'border-[#15B8A6] bg-[#15B8A6] text-white' 
                      : 'bg-white border-gray-100 text-gray-700 hover:border-[#15B8A6] hover:bg-[#15B8A6]/5'
                    }`}
                  >
                    <span className={`pl-8 font-bold text-[17px] transition-colors ${
                      answers.physique === opt.label ? 'text-white' : 'text-gray-700 group-hover:text-[#15B8A6]'
                    }`}>
                      {opt.label}
                    </span>
                    <div className="h-[74px] w-[74px] mr-2 rounded-[18px] overflow-hidden bg-gray-100 flex-shrink-0">
                      <img 
                        src={opt.img} 
                        alt={opt.label} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'q7' && (
             <motion.div
              key="q7"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center py-4"
            >
              <div className="text-center mb-8">
                <h2 className="text-[24px] font-black text-black leading-tight mb-2 px-6">
                  Sabemos como mantê-la em forma e saudável a longo prazo
                </h2>
              </div>

              {/* Informographic image */}
              <div className="w-full max-w-[420px] mb-8">
                <img 
                  src="https://i.postimg.cc/xjXn1DXf/1.webp" 
                  alt="Infográfico Resultados" 
                  className="w-full h-auto object-contain"
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => nextStep('q7')}
                className="w-full bg-[#15B8A6] text-white font-black py-5 rounded-[20px] shadow-lg hover:bg-[#0D9488] transition-all text-[18px] uppercase flex items-center justify-center gap-2 animate-heartbeat"
              >
                Continuar
              </motion.button>
            </motion.div>
          )}

          {step === 'q8' && (
            <motion.div
              key="q8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center justify-center py-6"
            >
              <h3 className="text-[20px] font-black mb-10 text-center text-black leading-tight tracking-tight px-8">
                Qual corpo você deseja alcançar?
              </h3>
              <div className="space-y-4 w-full px-4 max-w-[420px]">
                {[
                  { label: 'Curvilínea', img: 'https://i.postimg.cc/28TwcJxv/16.png' },
                  { label: 'Magra', img: 'https://i.postimg.cc/kgpy9bZw/17.png' },
                  { label: 'Normal', img: 'https://i.postimg.cc/0yBCxw3B/18.png' },
                  { label: 'Em forma', img: 'https://i.postimg.cc/dQxRGvHF/9.png' },
                  { label: 'Cheia', img: 'https://i.postimg.cc/VN0WNNPP/20.png' }
                ].map(opt => (
                  <button 
                    key={opt.label}
                    onClick={() => selectAnswer('goal_body', opt.label)}
                    className={`w-full h-[84px] border-2 rounded-[24px] overflow-hidden flex items-center justify-between shadow-[0_4px_15px_rgba(0,0,0,0.05)] active:scale-[0.98] transition-all group ${
                      answers.goal_body === opt.label 
                      ? 'border-[#15B8A6] bg-[#15B8A6] text-white' 
                      : 'bg-white border-gray-100 text-gray-700 hover:border-[#15B8A6] hover:bg-[#15B8A6]/5'
                    }`}
                  >
                    <span className={`pl-8 font-bold text-[17px] transition-colors ${
                      answers.goal_body === opt.label ? 'text-white' : 'text-gray-700 group-hover:text-[#15B8A6]'
                    }`}>
                      {opt.label}
                    </span>
                    <div className="h-[68px] w-[68px] mr-2 rounded-[18px] overflow-hidden bg-gray-100 flex-shrink-0">
                      <img 
                        src={opt.img} 
                        alt={opt.label} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'q9' && (
            <motion.div
              key="q9"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center py-6"
            >
              <h3 className="text-[22px] font-black mb-10 text-center text-black leading-tight tracking-tight px-8">
                Quais áreas do corpo você quer focar?
              </h3>
              <div className="space-y-3 w-full px-4 max-w-[420px] mb-8">
                {[
                  { label: 'Barriga', img: 'https://i.postimg.cc/CK6McFRz/21.png' },
                  { label: 'Bunda', img: 'https://i.postimg.cc/vmS80Q40/22.png' },
                  { label: 'Peito', img: 'https://i.postimg.cc/xCJf7Wm4/23.png' },
                  { label: 'Pernas', img: 'https://i.postimg.cc/DZJvDtsn/24.png' }
                ].map(opt => (
                  <button 
                    key={opt.label}
                    onClick={() => {
                      if (selectedAreas.includes(opt.label)) {
                        setSelectedAreas(selectedAreas.filter(a => a !== opt.label));
                      } else {
                        setSelectedAreas([...selectedAreas, opt.label]);
                      }
                    }}
                    className={`w-full h-[84px] border-2 rounded-[24px] overflow-hidden flex items-center justify-between shadow-[0_4px_15px_rgba(0,0,0,0.05)] active:scale-[0.98] transition-all group ${
                      selectedAreas.includes(opt.label)
                      ? 'border-[#15B8A6] bg-[#15B8A6]' 
                      : 'bg-white border-gray-100 text-gray-700 hover:border-[#15B8A6]/30'
                    }`}
                  >
                    <div className="flex items-center h-full">
                      <div className="h-full w-[84px] overflow-hidden bg-gray-100 flex-shrink-0">
                        <img 
                          src={opt.img} 
                          alt={opt.label} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <span className={`pl-6 font-bold text-[17px] transition-colors ${
                        selectedAreas.includes(opt.label) ? 'text-white' : 'text-gray-700'
                      }`}>
                        {opt.label}
                      </span>
                    </div>
                    <div className={`mr-6 w-7 h-7 rounded-[8px] border-2 flex items-center justify-center transition-all ${
                        selectedAreas.includes(opt.label) ? 'bg-white border-white' : 'border-gray-200 bg-white shadow-inner'
                    }`}>
                        {selectedAreas.includes(opt.label) && (
                            <svg className="w-5 h-5 text-[#15B8A6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </div>
                  </button>
                ))}
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={selectedAreas.length === 0}
                onClick={() => {
                  setAnswers({ ...answers, focusAreas: selectedAreas.join(', ') });
                  nextStep('q9');
                }}
                className={`w-full font-black py-5 rounded-[24px] shadow-lg transition-all text-[18px] uppercase flex items-center justify-center gap-2 ${
                    selectedAreas.length > 0 
                    ? 'bg-[#15B8A6] text-white hover:bg-[#0D9488] animate-heartbeat' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                }`}
              >
                Continuar
              </motion.button>
            </motion.div>
          )}

          {step === 'q10' && (
            <motion.div
              key="q10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center py-6"
            >
              <h3 className="text-[22px] font-black mb-10 text-center text-black leading-tight tracking-tight px-8">
                Faz quanto tempo que você se sentiu na sua melhor forma?
              </h3>
              
              <div className="flex w-full gap-4 px-2 max-w-[420px] mb-8">
                {/* Left side: Image */}
                <div className="w-[45%] flex-shrink-0">
                  <div className="rounded-[24px] overflow-hidden bg-pink-50 h-[380px]">
                    <img 
                      src="https://i.postimg.cc/1X0FhGrp/25.png" 
                      alt="Transformação" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Right side: Options */}
                <div className="flex-1 space-y-3 pb-8">
                  {[
                    '0 a 6 meses atrás',
                    '7 a 12 meses atrás',
                    '1 a 3 anos atrás',
                    'Mais de 3 anos atrás'
                  ].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => {
                        setAnswers({ ...answers, best_shape_time: opt });
                        setTimeout(() => {
                           nextStep('q10');
                        }, 400);
                      }}
                      className={`w-full h-[84px] border-2 rounded-[24px] px-4 shadow-[0_4px_15px_rgba(0,0,0,0.05)] active:scale-[0.98] transition-all flex items-center justify-center text-center group ${
                        answers.best_shape_time === opt 
                        ? 'border-[#15B8A6] bg-[#15B8A6] text-white' 
                        : 'bg-white border-gray-100 text-gray-700 hover:border-[#15B8A6] hover:bg-[#15B8A6]/5'
                      }`}
                    >
                      <span className="font-bold text-[15px] leading-tight">
                        {opt}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 'q11' && (
            <motion.div
              key="q11"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center pt-0 pb-4"
            >
              <div className="text-center mb-2">
                <h2 className="text-[22px] font-black text-black leading-[1.2] mb-3 px-2">
                  68% das mudanças de peso são <br />
                  influenciadas pelo seu metabolismo
                </h2>
                <p className="text-[13px] sm:text-[14px] text-gray-500 leading-relaxed px-1 mb-4 font-medium">
                  Mas boas notícias, você está no controle! <br />
                  Ao gerenciar sua ingestão calórica diária, gastos e atividade,<br />
                  você pode atingir suas metas e estamos aqui para te ajudar
                </p>
              </div>

              {/* Metabolism Chart image */}
              <div className="w-full max-w-[420px] mb-6 px-2">
                <img 
                  src="https://i.postimg.cc/L5y18HGf/26.webp" 
                  alt="Metabolismo e Peso Graph" 
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => nextStep('q11')}
                className="w-full bg-[#15B8A6] text-white font-black py-5 rounded-[24px] shadow-[0_10px_25px_rgba(21,184,166,0.25)] hover:bg-[#0D9488] transition-all text-[18px] uppercase flex items-center justify-center gap-2 mt-2 border-b-4 border-[#0D8E83] animate-heartbeat"
              >
                Continuar
              </motion.button>
            </motion.div>
          )}

          {step === 'q12' && (
            <motion.div
              key="q12"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center justify-center py-6"
            >
              <h3 className="text-[22px] font-black mb-10 text-center text-black leading-tight tracking-tight px-8">
                O que mais te descreve?
              </h3>
              
              <div className="space-y-4 w-full px-4 max-w-[500px]">
                {[
                  { label: 'Tenho dificuldade em ganhar músculos', emoji: '🙄' },
                  { label: 'Eu ganho e perco sem esforço', emoji: '💪' },
                  { label: 'Eu ganho peso facilmente, mas tenho dificuldade para perder', emoji: '😳' }
                ].map(opt => (
                  <button 
                    key={opt.label}
                    onClick={() => {
                      setAnswers({ ...answers, most_descriptive: opt.label });
                      setTimeout(() => {
                        nextStep('q12');
                      }, 400);
                    }}
                    className={`w-full min-h-[84px] py-3.5 border-2 rounded-[24px] px-5 sm:px-6 shadow-[0_4px_15px_rgba(0,0,0,0.05)] active:scale-[0.98] transition-all flex items-center justify-between text-left group ${
                      answers.most_descriptive === opt.label 
                      ? 'border-[#15B8A6] bg-[#15B8A6] text-white' 
                      : 'bg-white border-gray-100 text-gray-700 hover:border-[#15B8A6] hover:bg-[#15B8A6]/5'
                    }`}
                  >
                    <span className="font-bold text-[15px] sm:text-[16px] leading-snug pr-3">
                      {opt.label}
                    </span>
                    <span className="text-3xl flex-shrink-0">
                      {opt.emoji}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'q13' && (
            <motion.div
              key="q13"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center justify-center py-6"
            >
              <h3 className="text-[22px] font-black mb-10 text-center text-black leading-tight tracking-tight px-8">
                O que você sabe sobre o jejum intermitente?
              </h3>
              
              <div className="space-y-4 w-full px-4 max-w-[500px]">
                {[
                  { label: 'Não sei nada', emoji: '🤔' },
                  { label: 'Já ouvi falar um pouco', emoji: '🤷' },
                  { label: 'Entendo bastante', emoji: '😎' }
                ].map(opt => (
                  <button 
                    key={opt.label}
                    onClick={() => {
                      setAnswers({ ...answers, fasting_knowledge: opt.label });
                      setTimeout(() => {
                        nextStep('q13');
                      }, 400);
                    }}
                    className={`w-full min-h-[84px] py-3.5 border-2 rounded-[24px] px-5 sm:px-6 shadow-[0_4px_15px_rgba(0,0,0,0.05)] active:scale-[0.98] transition-all flex items-center justify-between text-left group ${
                      answers.fasting_knowledge === opt.label 
                      ? 'border-[#15B8A6] bg-[#15B8A6] text-white' 
                      : 'bg-white border-gray-100 text-gray-700 hover:border-[#15B8A6] hover:bg-[#15B8A6]/5'
                    }`}
                  >
                    <span className="font-bold text-[15px] sm:text-[16px] leading-snug pr-3">
                      {opt.label}
                    </span>
                    <span className="text-3xl flex-shrink-0">
                      {opt.emoji}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'q14' && (
            <motion.div
              key="q14"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center justify-center py-6"
            >
              <h3 className="text-[22px] font-black mb-10 text-center text-black leading-tight tracking-tight px-8">
                Quando você costuma tomar seu café da manhã?
              </h3>
              
              <div className="space-y-4 w-full px-4 max-w-[500px]">
                {[
                  { label: 'Entre 6 e 8 da manhã', img: 'https://i.postimg.cc/506nw2M0/26.png' },
                  { label: 'Entre 8 e 10 da manhã', img: 'https://i.postimg.cc/mDJVVWb9/27.png' },
                  { label: 'Entre 10h e meio-dia', img: 'https://i.postimg.cc/x8m54pCL/28.png' },
                  { label: 'Eu costumo pular o café da manhã', img: 'https://i.postimg.cc/0jSnBXjR/29.png' }
                ].map(opt => (
                  <button 
                    key={opt.label}
                    onClick={() => {
                      setAnswers({ ...answers, breakfast_time: opt.label });
                      setTimeout(() => {
                        nextStep('q14');
                      }, 400);
                    }}
                    className={`w-full min-h-[84px] py-3.5 border-2 rounded-[24px] px-5 sm:px-6 shadow-[0_4px_15px_rgba(0,0,0,0.05)] active:scale-[0.98] transition-all flex items-center justify-between text-left group ${
                      answers.breakfast_time === opt.label 
                      ? 'border-[#15B8A6] bg-[#15B8A6] text-white' 
                      : 'bg-white border-gray-100 text-gray-700 hover:border-[#15B8A6] hover:bg-[#15B8A6]/5'
                    }`}
                  >
                    <span className="font-bold text-[13px] min-[370px]:text-[14px] min-[410px]:text-[15px] sm:text-[16px] whitespace-nowrap leading-snug pr-3">
                      {opt.label}
                    </span>
                    <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-white relative shadow-sm bg-white">
                      <img 
                        src={opt.img} 
                        alt={opt.label} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'q15' && (
            <motion.div
              key="q15"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center justify-center py-6"
            >
              <h3 className="text-[22px] font-black mb-10 text-center text-black leading-tight tracking-tight px-8">
                Quando você costuma almoçar?
              </h3>
              
              <div className="space-y-4 w-full px-4 max-w-[500px]">
                {[
                  { label: 'Entre 10h e 12h', img: 'https://i.postimg.cc/MHssRfvs/30.png' },
                  { label: 'Entre 12h e 14h', img: 'https://i.postimg.cc/wMWWJR11/31.png' },
                  { label: 'Entre 14h e 16h', img: 'https://i.postimg.cc/zXB2N7Qm/32.png' },
                  { label: 'Eu costumo pular o almoço', img: 'https://i.postimg.cc/X7J1WLPr/33.png' }
                ].map(opt => (
                  <button 
                    key={opt.label}
                    onClick={() => {
                      setAnswers({ ...answers, lunch_time: opt.label });
                      setTimeout(() => {
                        nextStep('q15');
                      }, 400);
                    }}
                    className={`w-full min-h-[84px] py-3.5 border-2 rounded-[24px] px-5 sm:px-6 shadow-[0_4px_15px_rgba(0,0,0,0.05)] active:scale-[0.98] transition-all flex items-center justify-between text-left group ${
                      answers.lunch_time === opt.label 
                      ? 'border-[#15B8A6] bg-[#15B8A6] text-white' 
                      : 'bg-white border-gray-100 text-gray-700 hover:border-[#15B8A6] hover:bg-[#15B8A6]/5'
                    }`}
                  >
                    <span className="font-bold text-[13px] min-[370px]:text-[14px] min-[410px]:text-[15px] sm:text-[16px] whitespace-nowrap leading-snug pr-3">
                      {opt.label}
                    </span>
                    <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-white relative shadow-sm bg-white">
                      <img 
                        src={opt.img} 
                        alt={opt.label} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'q16' && (
            <motion.div
              key="q16"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center justify-center py-6"
            >
              <h3 className="text-[22px] font-black mb-10 text-center text-black leading-tight tracking-tight px-8">
                Quando você janta?
              </h3>
              
              <div className="space-y-4 w-full px-4 max-w-[500px]">
                {[
                  { label: 'Entre 16h e 18h', img: 'https://i.postimg.cc/RF21z1J0/34.png' },
                  { label: 'Entre 18h e 20h', img: 'https://i.postimg.cc/4yt64Kph/35.png' },
                  { label: 'Entre 20h e 22h', img: 'https://i.postimg.cc/8krBmYxL/36.png' },
                  { label: 'Eu costumo pular o jantar', img: 'https://i.postimg.cc/X7J1WLPr/33.png' }
                ].map(opt => (
                  <button 
                    key={opt.label}
                    onClick={() => {
                      setAnswers({ ...answers, dinner_time: opt.label });
                      setTimeout(() => {
                        nextStep('q16');
                      }, 400);
                    }}
                    className={`w-full min-h-[84px] py-3.5 border-2 rounded-[24px] px-5 sm:px-6 shadow-[0_4px_15px_rgba(0,0,0,0.05)] active:scale-[0.98] transition-all flex items-center justify-between text-left group ${
                      answers.dinner_time === opt.label 
                      ? 'border-[#15B8A6] bg-[#15B8A6] text-white' 
                      : 'bg-white border-gray-100 text-gray-700 hover:border-[#15B8A6] hover:bg-[#15B8A6]/5'
                    }`}
                  >
                    <span className="font-bold text-[13px] min-[370px]:text-[14px] min-[410px]:text-[15px] sm:text-[16px] whitespace-nowrap leading-snug pr-3">
                      {opt.label}
                    </span>
                    <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2 border-white relative shadow-sm bg-white">
                      <img 
                        src={opt.img} 
                        alt={opt.label} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'q17' && (
            <motion.div
              key="q17"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center justify-center py-6"
            >
              <h3 className="text-[22px] font-black mb-8 text-center text-black leading-tight tracking-tight px-8">
                Você tem alguma restrição alimentar?
              </h3>
              
              <div className="space-y-3 w-full px-4 max-w-[500px]">
                {[
                  { label: 'Sem lactose', subtitle: 'Eu não consumo alimentos com lactose', emoji: '🍼' },
                  { label: 'Sem glúten', subtitle: 'Eu evito grãos com glúten', emoji: '🍩' },
                  { label: 'Vegetariano', subtitle: 'Eu não como carne', emoji: '🥦' },
                  { label: 'Vegano', subtitle: 'Eu não consumo produto de origem animal', emoji: '🌱' },
                  { label: 'Nenhum peixe', subtitle: 'Não como nenhum tipo de peixe', emoji: '🐟' },
                  { label: 'Nenhuma das acima', subtitle: 'Eu como quase tudo', emoji: '❌' }
                ].map(opt => (
                  <button 
                    key={opt.label}
                    onClick={() => {
                      if (opt.label === 'Nenhuma das acima') {
                        if (selectedRestrictions.includes(opt.label)) {
                          setSelectedRestrictions([]);
                        } else {
                          setSelectedRestrictions(['Nenhuma das acima']);
                        }
                      } else {
                        let updated = [];
                        if (selectedRestrictions.includes(opt.label)) {
                          updated = selectedRestrictions.filter(r => r !== opt.label);
                        } else {
                          updated = [...selectedRestrictions.filter(r => r !== 'Nenhuma das acima'), opt.label];
                        }
                        setSelectedRestrictions(updated);
                      }
                    }}
                    className={`w-full min-h-[84px] py-4 border-2 rounded-[24px] px-5 sm:px-6 shadow-[0_4px_15px_rgba(0,0,0,0.05)] active:scale-[0.98] transition-all flex items-center justify-between text-left group cursor-pointer ${
                      selectedRestrictions.includes(opt.label) 
                      ? 'border-[#15B8A6] bg-[#15B8A6] text-white' 
                      : 'bg-white border-gray-100 text-gray-700 hover:border-[#15B8A6]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl select-none flex-shrink-0">
                        {opt.emoji}
                      </span>
                      <div className="flex flex-col">
                        <span className={`font-black text-[15px] sm:text-[17px] leading-tight ${
                          selectedRestrictions.includes(opt.label) ? 'text-white' : 'text-black'
                        }`}>
                          {opt.label}
                        </span>
                        <span className={`text-[12px] sm:text-[13px] whitespace-normal sm:whitespace-nowrap leading-snug mt-1 ${
                          selectedRestrictions.includes(opt.label) ? 'text-white/80' : 'text-gray-500 font-medium'
                        }`}>
                          {opt.subtitle}
                        </span>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-[6px] border-2 flex items-center justify-center transition-all flex-shrink-0 ml-3 ${
                      selectedRestrictions.includes(opt.label) ? 'bg-white border-white' : 'border-gray-200 bg-white'
                    }`}>
                      {selectedRestrictions.includes(opt.label) && (
                        <svg className="w-4 h-4 text-[#15B8A6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 w-full px-4 max-w-[500px] text-center">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={selectedRestrictions.length === 0}
                  onClick={() => {
                    setAnswers({ ...answers, restrictions: selectedRestrictions.join(', ') });
                    nextStep('q17');
                  }}
                  className={`w-full font-black py-4.5 rounded-[24px] shadow-lg transition-all text-[18px] uppercase flex items-center justify-center gap-2 cursor-pointer ${
                      selectedRestrictions.length > 0 
                      ? 'bg-[#15B8A6] text-white hover:bg-[#0D9488] animate-heartbeat' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  Continuar
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 'q17_exclude' && (() => {
            const foodCategories = [
              {
                category: '🥦 Vegetais',
                foods: ['Tomate', 'Pepino', 'Cebola', 'Pimentão', 'Cenoura', 'Alface', 'Espinafre', 'Cogumelos', 'Abobrinha']
              },
              {
                category: '🍞 Grãos e Pães',
                foods: ['Arroz', 'Espaguete', 'Pão integral', 'Cuscuz', 'Aveia', 'Quinoa']
              },
              {
                category: '🥩 Carnes e ovos',
                foods: ['Ovo', 'Frango', 'Presunto', 'Peito de peru', 'Carne de boi', 'Carne de porco']
              },
              {
                category: '🐟 Peixe',
                foods: ['Salmão', 'Atum', 'Tilápia', 'Camarão', 'Truta']
              },
              {
                category: '🥛 Lacticínio',
                foods: ['Leite', 'Muçarela', 'Iogurte', 'Queijo', 'Tofu', 'Requeijão', 'Parmesão']
              },
              {
                category: '🍎 Frutas',
                foods: ['Abacate', 'Maçã', 'Pera', 'Banana', 'Manga', 'Laranja', 'Morango']
              }
            ];

            const isEveryCategorySelected = foodCategories.every(cat => 
              cat.foods.some(food => selectedFoods.includes(food))
            );

            return (
              <motion.div
                key="q17_exclude"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full flex-1 flex flex-col items-center pt-2 pb-6 px-4"
              >
                <h3 className="text-[26px] sm:text-[28px] font-black mb-8 text-center text-black leading-tight tracking-tight max-w-[500px] mt-[10px]">
                  Escolha as comidas<br />que você gosta
                </h3>
                
                <div className="w-full space-y-6 max-w-[480px]">
                  {foodCategories.map(cat => {
                    const hasSelected = cat.foods.some(food => selectedFoods.includes(food));
                    return (
                      <div key={cat.category} className="w-full">
                        <h4 className="font-bold text-gray-800 text-[15px] sm:text-[16px] mb-3 flex items-center justify-between">
                          <span className="flex items-center gap-2">{cat.category}</span>
                          {!hasSelected && (
                            <span className="text-[12px] font-bold text-red-500 animate-pulse bg-red-50 px-2 py-0.5 rounded-full">
                              Escolha pelo menos 1
                            </span>
                          )}
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {cat.foods.map(food => {
                            const isSelected = selectedFoods.includes(food);
                            return (
                              <button
                                key={food}
                                onClick={() => {
                                  if (isSelected) {
                                    setSelectedFoods(selectedFoods.filter(f => f !== food));
                                  } else {
                                    setSelectedFoods([...selectedFoods.filter(f => f !== 'Nenhum'), food]);
                                  }
                                }}
                                className={`w-full h-[58px] border rounded-[20px] px-5 sm:px-6 shadow-[0_3px_10px_rgba(0,0,0,0.02)] active:scale-[0.98] transition-all flex items-center justify-start text-left cursor-pointer ${
                                  isSelected
                                  ? 'border-[#15B8A6] ring-2 ring-[#15B8A6]/10 text-white bg-[#15B8A6]' 
                                  : 'border-gray-200 bg-white text-[#374151] hover:border-[#15B8A6]'
                                }`}
                              >
                                <span className={`font-bold text-[14px] sm:text-[15px] transition-colors ${
                                  isSelected ? 'text-white' : 'text-[#374151]'
                                }`}>
                                  {food}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 w-full px-4 max-w-[480px] text-center">
                  {!isEveryCategorySelected && (
                    <p className="text-red-500 text-sm font-black mb-4 animate-pulse">
                      ⚠️ Selecione pelo menos 1 item de cada grupo acima para continuar.
                    </p>
                  )}
                  <motion.button 
                    whileHover={isEveryCategorySelected ? { scale: 1.02 } : {}}
                    whileTap={isEveryCategorySelected ? { scale: 0.98 } : {}}
                    disabled={!isEveryCategorySelected}
                    onClick={() => {
                      setAnswers({ ...answers, preferred_foods: selectedFoods.join(', ') });
                      nextStep('q17_exclude');
                    }}
                    className={`w-full font-black py-4.5 rounded-[24px] shadow-lg transition-all text-[18px] uppercase flex items-center justify-center gap-2 cursor-pointer ${
                      isEveryCategorySelected 
                        ? 'bg-[#15B8A6] text-white hover:bg-[#0D9488] animate-heartbeat' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                    }`}
                  >
                    Continuar
                  </motion.button>
                </div>
              </motion.div>
            );
          })()}

          {step === 'q18' && (
            <motion.div
              key="q18"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center pt-2 pb-6 px-4"
            >
              <h3 className="text-[22px] font-black mb-10 text-center text-black leading-tight tracking-tight max-w-[460px] mt-[10px]">
                Você prefere cozinhar, comer fora ou pedir comida?
              </h3>
              
              <div className="space-y-3.5 w-full max-w-[510px]">
                {[
                  { label: 'Cozinhar em casa', emoji: '🍲', value: 'Cozinhar em casa' },
                  { label: 'Eu prefiro ir a um restaurante', emoji: '🍽️', value: 'Eu prefiro ir a um restaurante' },
                  { label: 'Gosto de pedir comida', emoji: '🍟', value: 'Gosto de pedir comida' },
                  { label: 'Eu faço um pouco de tudo', emoji: '😋', value: 'Eu faço um pouco de tudo' }
                ].map(opt => (
                  <button 
                    key={opt.label}
                    onClick={() => selectAnswer('cooking_preference', opt.value)}
                    className={`w-full h-[76px] sm:h-[84px] border rounded-[20px] px-6 shadow-[0_3px_10px_rgba(0,0,0,0.03)] active:scale-[0.98] transition-all flex items-center justify-between text-left group cursor-pointer ${
                      answers.cooking_preference === opt.value 
                      ? 'border-[#15B8A6] ring-2 ring-[#15B8A6]/20 text-white bg-[#15B8A6]' 
                      : 'border-gray-150 bg-white text-[#2D3748] hover:border-[#15B8A6]'
                    }`}
                  >
                    <span className={`font-bold text-[15px] sm:text-[16px] transition-colors ${
                      answers.cooking_preference === opt.value ? 'text-white' : 'text-[#374151]'
                    }`}>
                      {opt.label}
                    </span>
                    <span className="text-3xl select-none flex-shrink-0">
                      {opt.emoji}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'q19' && (
            <motion.div
              key="q19"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center pt-2 pb-6 px-4"
            >
              <h3 className="text-[22px] font-black mb-10 text-center text-black leading-tight tracking-tight max-w-[460px] mt-[10px]">
                Você precisa de uma pausa no Jejum<br />para o final de semana?
              </h3>
              
              <div className="space-y-3.5 w-full max-w-[510px]">
                {[
                  { label: 'Claro que sim, final de semana é para curtir!', emoji: '👌', value: 'Claro que sim, final de semana é para curtir!' },
                  { label: 'Não paro nem no fim de semana!', emoji: '💪', value: 'Não paro nem no fim de semana!' }
                ].map(opt => (
                  <button 
                    key={opt.label}
                    onClick={() => selectAnswer('weekend_break', opt.value)}
                    className={`w-full h-[76px] sm:h-[84px] border rounded-[20px] px-6 shadow-[0_3px_10px_rgba(0,0,0,0.03)] active:scale-[0.98] transition-all flex items-center justify-between text-left group cursor-pointer ${
                      answers.weekend_break === opt.value 
                      ? 'border-[#15B8A6] ring-2 ring-[#15B8A6]/20 text-white bg-[#15B8A6]' 
                      : 'border-gray-150 bg-white text-[#2D3748] hover:border-[#15B8A6]'
                    }`}
                  >
                    <span className={`font-bold text-[15px] sm:text-[16px] transition-colors ${
                      answers.weekend_break === opt.value ? 'text-white' : 'text-[#374151]'
                    }`}>
                      {opt.label}
                    </span>
                    <span className="text-3xl select-none flex-shrink-0">
                      {opt.emoji}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'q20' && (
            <motion.div
              key="q20"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center pt-2 pb-6 px-4"
            >
              <h3 className="text-[22px] font-black mb-10 text-center text-black leading-tight tracking-tight max-w-[500px] mt-[10px]">
                Com que frequência você se exercita?
              </h3>
              
              <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-3 items-stretch mb-6">
                {/* Left side: Image */}
                <div className="w-full sm:w-[43%] flex-shrink-0 flex items-center justify-center sm:justify-end">
                  <img 
                    src="https://i.postimg.cc/mrgw0SpH/38.png" 
                    alt="Frequência Exercício" 
                    className="w-full h-auto max-h-[290px] sm:max-h-[390px] object-contain object-center sm:object-right rounded-[24px]"
                  />
                </div>

                {/* Right side: Options */}
                <div className="flex-1 flex flex-col justify-center space-y-3 mt-0">
                  {[
                    { label: 'Quase todos os dias', value: 'Quase todos os dias' },
                    { label: 'Várias vezes por semana', value: 'Várias vezes por semana' },
                    { label: 'Várias vezes por mês', value: 'Várias vezes por mês' },
                    { label: 'Nunca', value: 'Nunca' }
                  ].map(opt => (
                    <button 
                      key={opt.label}
                      onClick={() => selectAnswer('exercise_frequency', opt.value)}
                      className={`w-full h-[64px] sm:h-[72px] border rounded-[20px] px-6 shadow-[0_3px_10px_rgba(0,0,0,0.03)] active:scale-[0.98] transition-all flex items-center text-left cursor-pointer ${
                        answers.exercise_frequency === opt.value 
                        ? 'border-[#15B8A6] ring-2 ring-[#15B8A6]/20 text-white bg-[#15B8A6]' 
                        : 'border-gray-200 bg-white text-[#2D3748] hover:border-[#15B8A6]'
                      }`}
                    >
                      <span className={`font-bold text-[15px] sm:text-[16px] transition-colors ${
                        answers.exercise_frequency === opt.value ? 'text-white' : 'text-[#374151]'
                      }`}>
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 'q21' && (
            <motion.div
              key="q21"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center pt-2 pb-6 px-4"
            >
              <h3 className="text-[22px] font-black mb-10 text-center text-black leading-tight tracking-tight max-w-[500px] mt-[10px]">
                Como é a sua rotina de trabalho?
              </h3>
              
              <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-3 items-stretch mb-6">
                {/* Left side: Image */}
                <div className="w-full sm:w-[43%] flex-shrink-0 flex items-center justify-center sm:justify-end">
                  <img 
                    src="https://i.postimg.cc/hPQNYKQX/39.png" 
                    alt="Rotina de Trabalho" 
                    className="w-full h-auto max-h-[290px] sm:max-h-[390px] object-contain object-center sm:object-right rounded-[24px]"
                  />
                </div>

                {/* Right side: Options */}
                <div className="flex-1 flex flex-col justify-center space-y-3 mt-0">
                  {[
                    { label: 'das 09:00 às 18:00', value: 'das 09:00 às 18:00' },
                    { label: 'Turnos noturnos', value: 'Turnos noturnos' },
                    { label: 'Meu horário é flexível', value: 'Meu horário é flexível' },
                    { label: 'Estou aposentada', value: 'Estou aposentada' }
                  ].map(opt => (
                    <button 
                      key={opt.label}
                      onClick={() => selectAnswer('work_routine', opt.value)}
                      className={`w-full h-[64px] sm:h-[72px] border rounded-[20px] px-6 shadow-[0_3px_10px_rgba(0,0,0,0.03)] active:scale-[0.98] transition-all flex items-center text-left cursor-pointer ${
                        answers.work_routine === opt.value 
                        ? 'border-[#15B8A6] ring-2 ring-[#15B8A6]/20 text-white bg-[#15B8A6]' 
                        : 'border-gray-200 bg-white text-[#2D3748] hover:border-[#15B8A6]'
                      }`}
                    >
                      <span className={`font-bold text-[15px] sm:text-[16px] transition-colors ${
                        answers.work_routine === opt.value ? 'text-white' : 'text-[#374151]'
                      }`}>
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 'q22' && (
            <motion.div
              key="q22"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center pt-2 pb-6 px-4"
            >
              <h3 className="text-[22px] font-black mb-10 text-center text-black leading-tight tracking-tight max-w-[500px] mt-[10px]">
                Como você descreve<br />o seu dia a dia?
              </h3>
              
              <div className="space-y-3.5 w-full max-w-[510px]">
                {[
                  { label: 'Eu passo a maior parte do dia sentado', emoji: '💻', value: 'Eu passo a maior parte do dia sentado' },
                  { label: 'Um pouco sentado e um pouco caminhando', emoji: '🪑', value: 'Um pouco sentado e um pouco caminhando' },
                  { label: 'Fico em pé o dia todo', emoji: '🚶', value: 'Fico em pé o dia todo' }
                ].map(opt => (
                  <button 
                    key={opt.label}
                    onClick={() => selectAnswer('daily_activity', opt.value)}
                    className={`w-full h-[76px] sm:h-[84px] border rounded-[20px] px-6 shadow-[0_3px_10px_rgba(0,0,0,0.03)] active:scale-[0.98] transition-all flex items-center justify-between text-left group cursor-pointer ${
                      answers.daily_activity === opt.value 
                      ? 'border-[#15B8A6] ring-2 ring-[#15B8A6]/20 text-white bg-[#15B8A6]' 
                      : 'border-gray-200 bg-white text-[#2D3748] hover:border-[#15B8A6]'
                    }`}
                  >
                    <span className={`font-bold text-[15px] sm:text-[16px] transition-colors ${
                      answers.daily_activity === opt.value ? 'text-white' : 'text-[#374151]'
                    }`}>
                      {opt.label}
                    </span>
                    <span className="text-3xl select-none flex-shrink-0 transition-all">
                      {opt.emoji}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'q23' && (
            <motion.div
              key="q23"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center pt-2 pb-6 px-4"
            >
              <h3 className="text-[22px] font-black mb-10 text-center text-black leading-tight tracking-tight max-w-[500px] mt-[10px]">
                Você fica sem fôlego depois de subir um lance de escadas?
              </h3>
              
              <div className="space-y-3.5 w-full max-w-[510px]">
                {[
                  { label: 'Fico tão sem fôlego que não consigo falar', emoji: '🥵', value: 'Fico tão sem fôlego que não consigo falar' },
                  { label: 'Fico um pouco sem fôlego, mas consigo falar', emoji: '💨', value: 'Fico um pouco sem fôlego, mas consigo falar' },
                  { label: 'Fico bem depois de um lance de escadas', emoji: '😊', value: 'Fico bem depois de um lance de escadas' },
                  { label: 'Eu consigo subir alguns lances de escada facilmente', emoji: '🚀', value: 'Eu consigo subir alguns lances de escada facilmente' }
                ].map(opt => (
                  <button 
                    key={opt.label}
                    onClick={() => selectAnswer('stamina', opt.value)}
                    className={`w-full min-h-[76px] py-4 border rounded-[20px] px-6 shadow-[0_3px_10px_rgba(0,0,0,0.03)] active:scale-[0.98] transition-all flex items-center justify-between text-left group cursor-pointer ${
                      answers.stamina === opt.value 
                      ? 'border-[#15B8A6] ring-2 ring-[#15B8A6]/20 text-white bg-[#15B8A6]' 
                      : 'border-gray-200 bg-white text-[#2D3748] hover:border-[#15B8A6]'
                    }`}
                  >
                    <span className={`font-bold text-[15px] sm:text-[16px] pr-2 transition-colors ${
                      answers.stamina === opt.value ? 'text-white' : 'text-[#374151]'
                    }`}>
                      {opt.label}
                    </span>
                    <span className="text-3xl select-none flex-shrink-0 transition-all">
                      {opt.emoji}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'q24' && (
            <motion.div
              key="q24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center pt-2 pb-6 px-4"
            >
              <h3 className="text-[22px] font-black mb-10 text-center text-black leading-tight tracking-tight max-w-[500px] mt-[10px]">
                Com que frequência você sai para caminhar?
              </h3>
              
              <div className="space-y-3.5 w-full max-w-[510px]">
                {[
                  { label: 'Quase todos os dias', emoji: '😎', value: 'Quase todos os dias' },
                  { label: '3 a 4 vezes por semana', emoji: '💪', value: '3 a 4 vezes por semana' },
                  { label: '1 a 2 vezes por semana', emoji: '😊', value: '1 a 2 vezes por semana' },
                  { label: 'Mais de uma vez por mês', emoji: '👍', value: 'Mais de uma vez por mês' }
                ].map(opt => (
                  <button 
                    key={opt.label}
                    onClick={() => selectAnswer('walking_frequency', opt.value)}
                    className={`w-full min-h-[76px] py-4 border rounded-[20px] px-6 shadow-[0_3px_10px_rgba(0,0,0,0.03)] active:scale-[0.98] transition-all flex items-center justify-between text-left group cursor-pointer ${
                      answers.walking_frequency === opt.value 
                      ? 'border-[#15B8A6] ring-2 ring-[#15B8A6]/20 text-white bg-[#15B8A6]' 
                      : 'border-gray-200 bg-white text-[#2D3748] hover:border-[#15B8A6]'
                    }`}
                  >
                    <span className={`font-bold text-[15px] sm:text-[16px] pr-2 transition-colors ${
                      answers.walking_frequency === opt.value ? 'text-white' : 'text-[#374151]'
                    }`}>
                      {opt.label}
                    </span>
                    <span className="text-3xl select-none flex-shrink-0 transition-all">
                      {opt.emoji}
                </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'q25' && (
            <motion.div
              key="q25"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center pt-2 pb-6 px-4"
            >
              <h3 className="text-[22px] font-black mb-10 text-center text-black leading-tight tracking-tight max-w-[500px] mt-[10px]">
                Quantas horas você<br />costuma dormir?
              </h3>
              
              <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-3 items-stretch mb-6">
                {/* Left side: Image */}
                <div className="w-full sm:w-[43%] flex-shrink-0 flex items-center justify-center sm:justify-end">
                  <img 
                    src="https://i.postimg.cc/bwRnJVGh/40.png" 
                    alt="Horas de Sono" 
                    className="w-full h-auto max-h-[290px] sm:max-h-[390px] object-contain object-center sm:object-right rounded-[24px]"
                  />
                </div>

                {/* Right side: Options */}
                <div className="flex-1 flex flex-col justify-center space-y-3 mt-0">
                  {[
                    { label: 'Durmo pouco (menos de 5 horas)', value: 'Durmo pouco (menos de 5 horas)' },
                    { label: 'Eu consigo dormir um pouco (5-6 horas)', value: 'Eu consigo dormir um pouco (5-6 horas)' },
                    { label: 'Eu durmo muito e bem (7-8 horas)', value: 'Eu durmo muito e bem (7-8 horas)' },
                    { label: 'Gosto de dormir até mais tarde (mais de 8 horas)', value: 'Gosto de dormir até mais tarde (mais de 8 horas)' }
                  ].map(opt => (
                    <button 
                      key={opt.label}
                      onClick={() => selectAnswer('sleep_hours', opt.value)}
                      className={`w-full min-h-[64px] py-4 border rounded-[20px] px-6 shadow-[0_3px_10px_rgba(0,0,0,0.03)] active:scale-[0.98] transition-all flex items-center text-left cursor-pointer ${
                        answers.sleep_hours === opt.value 
                        ? 'border-[#15B8A6] ring-2 ring-[#15B8A6]/20 text-white bg-[#15B8A6]' 
                        : 'border-gray-200 bg-white text-[#2D3748] hover:border-[#15B8A6]'
                      }`}
                    >
                      <span className={`font-bold text-[14px] sm:text-[15px]  leading-[1.3] transition-colors ${
                        answers.sleep_hours === opt.value ? 'text-white' : 'text-[#374151]'
                      }`}>
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 'q26' && (
            <motion.div
              key="q26"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center pt-2 pb-6 px-4"
            >
              <h3 className="text-[22px] font-black mb-10 text-center text-black leading-tight tracking-tight max-w-[500px] mt-[10px]">
                Qual é a sua ingestão<br />diária de água?
              </h3>
              
              <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-3 items-stretch mb-6">
                {/* Left side: Image */}
                <div className="w-full sm:w-[43%] flex-shrink-0 flex items-center justify-center sm:justify-end">
                  <img 
                    src="https://i.postimg.cc/0jgjZ7Mq/41.png" 
                    alt="Ingestão de Água" 
                    className="w-full h-auto max-h-[290px] sm:max-h-[390px] object-contain object-center sm:object-right rounded-[24px]"
                  />
                </div>

                {/* Right side: Options */}
                <div className="flex-1 flex flex-col justify-center space-y-3 mt-0">
                  {[
                    { label: 'Eu só tomo café ou chá', value: 'Eu só tomo café ou chá' },
                    { label: 'Cerca de 2 copos', value: 'Cerca de 2 copos' },
                    { label: '2 a 6 copos', value: '2 a 6 copos' },
                    { label: 'Mais de 6 copos', value: 'Mais de 6 copos' }
                  ].map(opt => (
                    <button 
                      key={opt.label}
                      onClick={() => selectAnswer('water_intake', opt.value)}
                      className={`w-full h-[64px] sm:h-[72px] border rounded-[20px] px-6 shadow-[0_3px_10px_rgba(0,0,0,0.03)] active:scale-[0.98] transition-all flex items-center text-left cursor-pointer ${
                        answers.water_intake === opt.value 
                        ? 'border-[#15B8A6] ring-2 ring-[#15B8A6]/20 text-white bg-[#15B8A6]' 
                        : 'border-gray-200 bg-white text-[#2D3748] hover:border-[#15B8A6]'
                      }`}
                    >
                      <span className={`font-bold text-[15px] sm:text-[16px] transition-colors ${
                        answers.water_intake === opt.value ? 'text-white' : 'text-[#374151]'
                      }`}>
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 'q27' && (
            <motion.div
              key="q27"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center pt-2 pb-6 px-4"
            >
              <h3 className="text-[22px] min-[370px]:text-[24px] sm:text-[26px] font-black mb-8 text-center text-black leading-tight tracking-tight max-w-[500px] mt-[10px]">
                Você tem algum desses problemas?
              </h3>
              
              <div className="space-y-3.5 w-full max-w-[480px] mb-8">
                {[
                  { 
                    label: 'Joelhos sensíveis', 
                    img: 'https://i.postimg.cc/vHWWCtsZ/42.png',
                    value: 'Joelhos sensíveis' 
                  },
                  { 
                    label: 'Costas sensíveis', 
                    img: 'https://i.postimg.cc/y8sFK31p/43.png',
                    value: 'Costas sensíveis' 
                  },
                  { 
                    label: 'Nenhuma das acima', 
                    img: 'https://i.postimg.cc/mgj7gZkK/44.png',
                    value: 'Nenhuma das acima' 
                  }
                ].map(opt => {
                  const isSelected = selectedProblems.includes(opt.value);
                  return (
                    <button 
                      key={opt.value}
                      onClick={() => handleProblemToggle(opt.value)}
                      className={`w-full h-[84px] border rounded-[20px] p-1.5 pr-5 shadow-[0_3px_11px_rgba(0,0,0,0.03)] active:scale-[0.98] transition-all flex items-center text-left cursor-pointer ${
                        isSelected 
                        ? 'border-[#15B8A6] bg-[#15B8A6] text-white' 
                        : 'border-gray-200 bg-white text-[#2D3748] hover:border-[#15B8A6]'
                      }`}
                    >
                      {/* Image on the left */}
                      <div className="w-[72px] h-[72px] rounded-[16px] overflow-hidden bg-orange-50/50 flex-shrink-0">
                        <img 
                          src={opt.img} 
                          alt={opt.label} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Label in the center */}
                      <span className={`font-bold text-[15px] sm:text-[16px] ml-4 transition-colors ${
                        isSelected ? 'text-white' : 'text-[#374151]'
                      }`}>
                        {opt.label}
                      </span>
                      
                      {/* Checkbox on the right */}
                      <div className={`ml-auto w-6 h-6 rounded-[8px] border-2 flex items-center justify-center transition-all ${
                        isSelected ? 'bg-white border-white' : 'border-gray-200 bg-white'
                      }`}>
                        {isSelected && (
                          <svg className="w-4 h-4 text-[#15B8A6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="w-full max-w-[480px]">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setAnswers({ ...answers, physical_problems: selectedProblems.join(', ') });
                    nextStep('q27');
                  }}
                  className="w-full bg-[#15B8A6] text-white font-black py-4.5 rounded-[24px] shadow-lg hover:bg-[#0D9488] transition-all text-[18px] uppercase flex items-center justify-center gap-2 cursor-pointer animate-heartbeat"
                >
                  Continuar
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 'q28' && (
            <motion.div
              key="q28"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center pt-2 pb-6 px-4"
            >
              <h3 className="text-[22px] min-[370px]:text-[24px] sm:text-[26px] font-black mb-8 text-center text-black leading-tight tracking-tight max-w-[500px] mt-[10px]">
                Você tem algum desses hábitos que podem estar atrapalhando sua vida?
              </h3>
              
              <div className="space-y-3.5 w-full max-w-[480px] mb-8">
                {[
                  { 
                    label: 'Eu como tarde da noite', 
                    emoji: '💤',
                    value: 'Eu como tarde da noite' 
                  },
                  { 
                    label: 'Não consigo parar de comer doces', 
                    emoji: '🍫',
                    value: 'Não consigo parar de comer doces' 
                  },
                  { 
                    label: 'Eu amo refrigerantes', 
                    emoji: '🥤',
                    value: 'Eu amo refrigerantes' 
                  },
                  { 
                    label: 'Eu adoro alimentos gordurosos ou salgados', 
                    emoji: '🧂',
                    value: 'Eu adoro alimentos gordurosos ou salgados' 
                  },
                  { 
                    label: 'Nenhuma das acima', 
                    emoji: '❌',
                    value: 'Nenhuma das acima' 
                  }
                ].map(opt => {
                  const isSelected = selectedHabits.includes(opt.value);
                  return (
                    <button 
                      key={opt.value}
                      onClick={() => handleHabitToggle(opt.value)}
                      className={`w-full h-[84px] border rounded-[20px] p-1.5 pr-5 shadow-[0_3px_11px_rgba(0,0,0,0.03)] active:scale-[0.98] transition-all flex items-center text-left cursor-pointer ${
                        isSelected 
                        ? 'border-[#15B8A6] bg-[#15B8A6] text-white' 
                        : 'border-gray-200 bg-white text-[#2D3748] hover:border-[#15B8A6]'
                      }`}
                    >
                      {/* Emoji on the left */}
                      <div className="w-[72px] h-[72px] rounded-[16px] flex items-center justify-center flex-shrink-0 text-[32px] sm:text-[36px]">
                        {opt.emoji}
                      </div>
                      
                      {/* Label in the center */}
                      <span className={`font-bold text-[14px] min-[370px]:text-[15px] sm:text-[16px] ml-4 transition-colors ${
                        isSelected ? 'text-white' : 'text-[#374151]'
                      }`}>
                        {opt.label}
                      </span>
                      
                      {/* Checkbox on the right */}
                      <div className={`ml-auto w-6 h-6 rounded-[8px] border-2 flex items-center justify-center transition-all ${
                        isSelected ? 'bg-white border-white' : 'border-gray-200 bg-white'
                      }`}>
                        {isSelected && (
                          <svg className="w-4 h-4 text-[#15B8A6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="w-full max-w-[480px]">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setAnswers({ ...answers, bad_habits: selectedHabits.join(', ') });
                    nextStep('q28');
                  }}
                  className="w-full bg-[#15B8A6] text-white font-black py-4.5 rounded-[24px] shadow-lg hover:bg-[#0D9488] transition-all text-[18px] uppercase flex items-center justify-center gap-2 cursor-pointer animate-heartbeat"
                >
                  Continuar
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 'q29' && (
            <motion.div
              key="q29"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center pt-2 pb-6 px-4"
            >
              <h3 className="text-[22px] min-[370px]:text-[24px] sm:text-[26px] font-black mb-6 text-center text-black leading-tight tracking-tight max-w-[500px] mt-[10px]">
                Não é só o seu corpo! Veja como o Jejum pode mudar o seu rosto!
              </h3>
              
              {/* Face transformation image */}
              <div className="w-full max-w-[480px] mb-6 rounded-[24px] overflow-hidden border border-gray-100 bg-gray-50 shadow-sm">
                <img 
                  src="https://i.postimg.cc/XJ7HYDnG/45.png" 
                  alt="Transformação facial com Jejum" 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>

              <p className="text-[14px] sm:text-[15px] font-medium text-gray-500 leading-relaxed text-center max-w-[480px] mb-8">
                Perder peso através do jejum ajuda a reduzir gordura e inchaço no rosto, principalmente ao redor dos olhos, queixo e mandíbula, deixando sua pele com aparência mais jovem e saudável.
              </p>

              <div className="w-full max-w-[480px]">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    nextStep('q29');
                  }}
                  className="w-full bg-[#15B8A6] text-white font-black py-4.5 rounded-[24px] shadow-lg hover:bg-[#0D9488] transition-all text-[18px] uppercase flex items-center justify-center gap-2 cursor-pointer animate-heartbeat"
                >
                  Continuar
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 'q30' && (
            <motion.div
              key="q30"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center pt-2 pb-6 px-4"
            >
              <h3 className="text-[22px] min-[370px]:text-[24px] sm:text-[26px] font-bold mb-8 text-center text-gray-800 leading-tight tracking-tight max-w-[500px] mt-[10px]">
                Algum desses acontecimentos<br />
                fez você ganhar peso nos<br />
                <span className="font-extrabold text-black">últimos anos?</span>
              </h3>
              
              <div className="space-y-3 w-full max-w-[480px] mb-8">
                {[
                  { 
                    label: 'Casamento ou relacionamento', 
                    emoji: '👰',
                    value: 'Casamento ou relacionamento' 
                  },
                  { 
                    label: 'Rotina corrida com trabalho ou família', 
                    emoji: '🥵',
                    value: 'Rotina corrida com trabalho ou família' 
                  },
                  { 
                    label: 'Dificuldades financeiras', 
                    emoji: '💰',
                    value: 'Dificuldades financeiras' 
                  },
                  { 
                    label: 'Lesão ou incapacidade', 
                    emoji: '🏥',
                    value: 'Lesão ou incapacidade' 
                  },
                  { 
                    label: 'Estresse ou problemas de saúde mental', 
                    emoji: '😖',
                    value: 'Estresse ou problemas de saúde mental' 
                  },
                  { 
                    label: 'Metabolismo mais lento devido a idade', 
                    emoji: '👵',
                    value: 'Metabolismo mais lento devido a idade' 
                  },
                  { 
                    label: 'Complicações pós-tratamentos', 
                    emoji: '🩺',
                    value: 'Complicações pós-tratamentos' 
                  },
                  { 
                    label: 'Nenhuma das acima', 
                    emoji: '❌',
                    value: 'Nenhuma das acima' 
                  }
                ].map(opt => {
                  const isSelected = selectedAcontecimentos.includes(opt.value);
                  return (
                    <button 
                      key={opt.value}
                      onClick={() => handleAcontecimentosToggle(opt.value)}
                      className={`w-full h-[64px] sm:h-[68px] border rounded-[20px] p-1.5 pr-5 shadow-[0_3px_11px_rgba(0,0,0,0.03)] active:scale-[0.98] transition-all flex items-center text-left cursor-pointer ${
                        isSelected 
                        ? 'border-[#15B8A6] bg-[#15B8A6] text-white' 
                        : 'border-gray-200 bg-white text-[#2D3748] hover:border-[#15B8A6]'
                      }`}
                    >
                      {/* Emoji on the left */}
                      <div className="w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] bg-gray-50/50 rounded-[14px] flex items-center justify-center flex-shrink-0 text-[26px] sm:text-[30px]">
                        {opt.emoji}
                      </div>
                      
                      {/* Label in the center */}
                      <span className={`font-bold text-[14px] sm:text-[15px] ml-4 transition-colors leading-snug ${
                        isSelected ? 'text-white' : 'text-[#374151]'
                      }`}>
                        {opt.label}
                      </span>
                      
                      {/* Checkbox on the right */}
                      <div className={`ml-auto w-6 h-6 rounded-[8px] border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                        isSelected ? 'bg-white border-white' : 'border-gray-200 bg-white'
                      }`}>
                        {isSelected && (
                          <svg className="w-4 h-4 text-[#12B8A6] sm:text-[#15B8A6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="w-full max-w-[480px]">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setAnswers({ ...answers, weight_gain_factors: selectedAcontecimentos.join(', ') });
                    nextStep('q30');
                  }}
                  className="w-full bg-[#15B8A6] text-white font-black py-4.5 rounded-[24px] shadow-lg hover:bg-[#0D9488] transition-all text-[18px] uppercase flex items-center justify-center gap-2 cursor-pointer animate-heartbeat"
                >
                  Continuar
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 'q31' && (
            <motion.div
              key="q31"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center pt-2 pb-6 px-4"
            >
              <h3 className="text-[22px] min-[370px]:text-[24px] sm:text-[26px] font-black mb-8 text-center text-black leading-tight tracking-tight max-w-[500px] mt-[10px]">
                Quão motivado você está para<br />
                perder peso?
              </h3>
              
              <div className="space-y-4 w-full max-w-[480px]">
                {[
                  { 
                    label: 'Estou tentando fazer o jejum apenas por curiosidade', 
                    emoji: '🤔',
                    bg: 'bg-amber-100/40',
                    value: 'curiosidade'
                  },
                  { 
                    label: 'Estou determinado a diminuir um ou dois tamanhos', 
                    emoji: '🤟',
                    bg: 'bg-amber-100/70',
                    value: 'determinacao_moderada'
                  },
                  { 
                    label: 'Eu não vou parar até atingir meu peso ideal', 
                    emoji: '🔥',
                    bg: 'bg-orange-100/50',
                    value: 'determinacao_total'
                  }
                ].map(opt => {
                  const isSelected = answers.motivation === opt.value;
                  return (
                    <button 
                      key={opt.value}
                      onClick={() => {
                        setAnswers({ ...answers, motivation: opt.value });
                        setTimeout(() => {
                          nextStep('q31');
                        }, 350);
                      }}
                      className={`w-full min-h-[76px] sm:min-h-[82px] border rounded-[20px] p-2 pr-5 shadow-[0_3px_11px_rgba(0,0,0,0.03)] active:scale-[0.98] transition-all flex items-center text-left cursor-pointer ${
                        isSelected 
                        ? 'border-[#15B8A6] bg-[#15B8A6] text-white' 
                        : 'border-gray-200 bg-white text-[#2D3748] hover:border-[#15B8A6]'
                      }`}
                    >
                      {/* Emoji on the left with colorful round circle */}
                      <div className={`w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-full flex items-center justify-center flex-shrink-0 text-[26px] sm:text-[30px] ${
                        isSelected ? 'bg-white/20' : opt.bg
                      }`}>
                        {opt.emoji}
                      </div>
                      
                      {/* Label in the center */}
                      <span className={`font-bold text-[14px] min-[370px]:text-[15px] sm:text-[16px] ml-4 transition-colors leading-snug flex-1 ${
                        isSelected ? 'text-white' : 'text-[#374151]'
                      }`}>
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 'q32' && (
            <motion.div
              key="q32"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center pt-2 pb-6 px-4"
            >
              <h3 className="text-[26px] sm:text-[28px] font-black mb-8 text-center text-black leading-tight tracking-tight max-w-[500px] mt-[10px]">
                Qual é a sua altura?
              </h3>
              
              {/* Pill units switcher selector */}
              <div className="bg-gray-100 rounded-full flex p-1 w-[130px] mx-auto mb-8">
                <button
                  onClick={() => setHeightUnit('cm')}
                  className={`flex-1 text-center py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                    heightUnit === 'cm'
                      ? 'bg-[#15B8A6] text-white shadow-sm'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  cm
                </button>
                <button
                  onClick={() => setHeightUnit('pol')}
                  className={`flex-1 text-center py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                    heightUnit === 'pol'
                      ? 'bg-[#15B8A6] text-white shadow-sm'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  pol
                </button>
              </div>

              {/* Value display */}
              <div className="flex items-baseline justify-center mb-6">
                <span className="text-[52px] font-black text-black leading-none tracking-tight">
                  {heightUnit === 'cm' ? heightVal : Math.round(heightVal * 0.393701)}
                </span>
                <span className="text-[18px] font-bold text-black ml-1">
                  {heightUnit === 'cm' ? 'cm' : 'pol'}
                </span>
              </div>

              {/* The tape-measure ruler slider component */}
              <div className="relative w-full max-w-[420px] mx-auto h-[100px] mb-2 select-none">
                {/* Horizontal Baseline thin divider */}
                <div className="absolute bottom-[36px] left-0 w-full h-[1px] bg-gray-200 z-0" />

                {/* Vertical centering cursor for teal indicator line */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[36px] w-[3px] h-[48px] bg-[#15B8A6] z-10 rounded-full" />
                
                {/* UP-pointing triangle */}
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="absolute left-1/2 -translate-x-1/2 bottom-[26px] z-10">
                  <path d="M7 0L14 10H0L7 0Z" fill="#15B8A6"/>
                </svg>

                {/* Ruler ticks container */}
                <div className="absolute inset-x-0 bottom-0 h-full overflow-hidden">
                  <div
                    className="absolute bottom-0 left-1/2 flex items-end h-[85px] transition-transform duration-100 ease-out"
                    style={{
                      transform: `translateX(calc(-${(heightVal - 100) * 10}px - 5px))`
                    }}
                  >
                    {/* Loop from 100 to 220 representing available heights in cm */}
                    {Array.from({ length: 121 }, (_, index) => {
                      const tickValue = 100 + index;
                      const isMajor = tickValue % 10 === 0;
                      const isMedium = tickValue % 5 === 0;
                      
                      return (
                        <div
                          key={tickValue}
                          className="w-[10px] shrink-0 flex flex-col justify-end items-center h-[85px] relative"
                        >
                          {/* Tick vertical tick line item inside flex block */}
                          <div className="flex flex-col justify-end items-center h-[34px] mb-[36px]">
                            {isMajor ? (
                              <div className="w-[2px] h-[34px] bg-[#D1D5DB] rounded-full" />
                            ) : isMedium ? (
                              <div className="w-[1.5px] h-[22px] bg-[#E5E7EB] rounded-full" />
                            ) : (
                              <div className="w-[1px] h-[14px] bg-[#F3F4F6] rounded-full" />
                            )}
                          </div>

                          {/* Major tick labels */}
                          {isMajor && (
                            <span className="absolute bottom-0 text-gray-400 font-bold text-[13px] tracking-tight">
                              {heightUnit === 'cm' ? tickValue : Math.round(tickValue * 0.393701)}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Invisible input range slider overlaid for drag interactions */}
                <input
                  type="range"
                  min="100"
                  max="220"
                  value={heightVal}
                  onChange={(e) => setHeightVal(Number(e.target.value))}
                  className="absolute inset-[10px] bottom-0 w-full h-[55px] opacity-0 cursor-pointer z-20"
                  style={{ touchAction: 'none' }}
                />
              </div>

              {/* Sub-label text under the slide tape */}
              <p className="text-[12px] font-bold text-gray-400 mb-10 select-none">
                Arraste para ajustar
              </p>

              {/* Continue button */}
              <div className="w-full max-w-[480px]">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setAnswers({ 
                      ...answers, 
                      height: heightUnit === 'cm' ? `${heightVal} cm` : `${Math.round(heightVal * 0.393701)} pol` 
                    });
                    nextStep('q32');
                  }}
                  className="w-full bg-[#15B8A6] text-white font-black py-4.5 rounded-[24px] shadow-lg hover:bg-[#0D9488] transition-all text-[18px] uppercase flex items-center justify-center gap-2 cursor-pointer animate-heartbeat"
                >
                  Continuar
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 'q33' && (
            <motion.div
              key="q33"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center pt-2 pb-6 px-4"
            >
              <h3 className="text-[26px] sm:text-[28px] font-black mb-8 text-center text-black leading-tight tracking-tight max-w-[500px] mt-[10px]">
                Qual é o seu peso atual?
              </h3>
              
              {/* Pill units switcher selector */}
              <div className="bg-gray-100 rounded-full flex p-1 w-[130px] mx-auto mb-8">
                <button
                  type="button"
                  onClick={() => setWeightUnit('kg')}
                  className={`flex-1 text-center py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                    weightUnit === 'kg'
                      ? 'bg-[#15B8A6] text-white shadow-sm'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  kg
                </button>
                <button
                  type="button"
                  onClick={() => setWeightUnit('lb')}
                  className={`flex-1 text-center py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                    weightUnit === 'lb'
                      ? 'bg-[#15B8A6] text-white shadow-sm'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  lb
                </button>
              </div>

              {/* Value display */}
              <div className="flex items-baseline justify-center mb-6">
                <span className="text-[52px] font-black text-black leading-none tracking-tight animate-none">
                  {weightUnit === 'kg' ? weightVal : Math.round(weightVal * 2.20462)}
                </span>
                <span className="text-[18px] font-bold text-black ml-1">
                  {weightUnit === 'kg' ? 'kg' : 'lb'}
                </span>
              </div>

              {/* The tape-measure ruler slider component */}
              <div className="relative w-full max-w-[420px] mx-auto h-[100px] mb-2 select-none">
                {/* Horizontal Baseline thin divider */}
                <div className="absolute bottom-[36px] left-0 w-full h-[1px] bg-gray-200 z-0" />

                {/* Vertical centering cursor for teal indicator line */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[36px] w-[3px] h-[48px] bg-[#15B8A6] z-10 rounded-full" />
                
                {/* UP-pointing triangle */}
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="absolute left-1/2 -translate-x-1/2 bottom-[26px] z-10">
                  <path d="M7 0L14 10H0L7 0Z" fill="#15B8A6"/>
                </svg>

                {/* Ruler ticks container */}
                <div className="absolute inset-x-0 bottom-0 h-full overflow-hidden">
                  <div
                    className="absolute bottom-0 left-1/2 flex items-end h-[85px] transition-transform duration-100 ease-out"
                    style={{
                      transform: `translateX(calc(-${(weightVal - 30) * 10}px - 5px))`
                    }}
                  >
                    {/* Loop from 30 to 180 representing available weights in kg */}
                    {Array.from({ length: 151 }, (_, index) => {
                      const tickValue = 30 + index;
                      const isMajor = tickValue % 10 === 0;
                      const isMedium = tickValue % 5 === 0;
                      
                      return (
                        <div
                          key={tickValue}
                          className="w-[10px] shrink-0 flex flex-col justify-end items-center h-[85px] relative"
                        >
                          {/* Tick vertical tick line item inside flex block */}
                          <div className="flex flex-col justify-end items-center h-[34px] mb-[36px]">
                            {isMajor ? (
                              <div className="w-[2px] h-[34px] bg-[#D1D5DB] rounded-full" />
                            ) : isMedium ? (
                              <div className="w-[1.5px] h-[22px] bg-[#E5E7EB] rounded-full" />
                            ) : (
                              <div className="w-[1px] h-[14px] bg-[#F3F4F6] rounded-full" />
                            )}
                          </div>

                          {/* Major tick labels */}
                          {isMajor && (
                            <span className="absolute bottom-0 text-gray-400 font-bold text-[13px] tracking-tight">
                              {weightUnit === 'kg' ? tickValue : Math.round(tickValue * 2.20462)}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Invisible input range slider overlaid for drag interactions */}
                <input
                  type="range"
                  min="30"
                  max="180"
                  value={weightVal}
                  onChange={(e) => setWeightVal(Number(e.target.value))}
                  className="absolute inset-[10px] bottom-0 w-full h-[55px] opacity-0 cursor-pointer z-20"
                  style={{ touchAction: 'none' }}
                />
              </div>

              {/* Sub-label text under the slide tape */}
              <p className="text-[12px] font-bold text-gray-400 mb-10 select-none">
                Arraste para ajustar
              </p>

              {/* Continue button */}
              <div className="w-full max-w-[480px]">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setAnswers({ 
                      ...answers, 
                      weight: weightUnit === 'kg' ? `${weightVal} kg` : `${Math.round(weightVal * 2.20462)} lb` 
                    });
                    nextStep('q33');
                  }}
                  className="w-full bg-[#15B8A6] text-white font-black py-4.5 rounded-[24px] shadow-lg hover:bg-[#0D9488] transition-all text-[18px] uppercase flex items-center justify-center gap-2 cursor-pointer animate-heartbeat"
                >
                  Continuar
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 'q34' && (
            <motion.div
              key="q34"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center pt-2 pb-6 px-4"
            >
              <h3 className="text-[26px] sm:text-[28px] font-black mb-8 text-center text-black leading-tight tracking-tight max-w-[500px] mt-[10px]">
                Qual é o seu peso desejado?
              </h3>
              
              {/* Pill units switcher selector */}
              <div className="bg-gray-100 rounded-full flex p-1 w-[130px] mx-auto mb-8">
                <button
                  type="button"
                  onClick={() => setTargetWeightUnit('kg')}
                  className={`flex-1 text-center py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                    targetWeightUnit === 'kg'
                      ? 'bg-[#15B8A6] text-white shadow-sm'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  kg
                </button>
                <button
                  type="button"
                  onClick={() => setTargetWeightUnit('lb')}
                  className={`flex-1 text-center py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                    targetWeightUnit === 'lb'
                      ? 'bg-[#15B8A6] text-white shadow-sm'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  lb
                </button>
              </div>

              {/* Value display */}
              <div className="flex items-baseline justify-center mb-6">
                <span className="text-[52px] font-black text-black leading-none tracking-tight animate-none">
                  {targetWeightUnit === 'kg' ? targetWeightVal : Math.round(targetWeightVal * 2.20462)}
                </span>
                <span className="text-[18px] font-bold text-black ml-1">
                  {targetWeightUnit === 'kg' ? 'kg' : 'lb'}
                </span>
              </div>

              {/* The tape-measure ruler slider component */}
              <div className="relative w-full max-w-[420px] mx-auto h-[100px] mb-2 select-none">
                {/* Horizontal Baseline thin divider */}
                <div className="absolute bottom-[36px] left-0 w-full h-[1px] bg-gray-200 z-0" />

                {/* Vertical centering cursor for teal indicator line */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[36px] w-[3px] h-[48px] bg-[#15B8A6] z-10 rounded-full" />
                
                {/* UP-pointing triangle */}
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="absolute left-1/2 -translate-x-1/2 bottom-[26px] z-10">
                  <path d="M7 0L14 10H0L7 0Z" fill="#15B8A6"/>
                </svg>

                {/* Ruler ticks container */}
                <div className="absolute inset-x-0 bottom-0 h-full overflow-hidden">
                  <div
                    className="absolute bottom-0 left-1/2 flex items-end h-[85px] transition-transform duration-100 ease-out"
                    style={{
                      transform: `translateX(calc(-${(targetWeightVal - 30) * 10}px - 5px))`
                    }}
                  >
                    {/* Loop from 30 to 180 representing available weights in kg */}
                    {Array.from({ length: 151 }, (_, index) => {
                      const tickValue = 30 + index;
                      const isMajor = tickValue % 10 === 0;
                      const isMedium = tickValue % 5 === 0;
                      
                      return (
                        <div
                          key={tickValue}
                          className="w-[10px] shrink-0 flex flex-col justify-end items-center h-[85px] relative"
                        >
                          {/* Tick vertical tick line item inside flex block */}
                          <div className="flex flex-col justify-end items-center h-[34px] mb-[36px]">
                            {isMajor ? (
                              <div className="w-[2px] h-[34px] bg-[#D1D5DB] rounded-full" />
                            ) : isMedium ? (
                              <div className="w-[1.5px] h-[22px] bg-[#E5E7EB] rounded-full" />
                            ) : (
                              <div className="w-[1px] h-[14px] bg-[#F3F4F6] rounded-full" />
                            )}
                          </div>

                          {/* Major tick labels */}
                          {isMajor && (
                            <span className="absolute bottom-0 text-gray-400 font-bold text-[13px] tracking-tight">
                              {targetWeightUnit === 'kg' ? tickValue : Math.round(tickValue * 2.20462)}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Invisible input range slider overlaid for drag interactions */}
                <input
                  type="range"
                  min="30"
                  max="180"
                  value={targetWeightVal}
                  onChange={(e) => setTargetWeightVal(Number(e.target.value))}
                  className="absolute inset-[10px] bottom-0 w-full h-[55px] opacity-0 cursor-pointer z-20"
                  style={{ touchAction: 'none' }}
                />
              </div>

              {/* Sub-label text under the slide tape */}
              <p className="text-[12px] font-bold text-gray-400 mb-6 select-none leading-none">
                Arraste para ajustar
              </p>

              {/* Info custom container matching Brazilian standard target description text block */}
              <div className="bg-[#EFF6FF] rounded-[24px] p-6 text-center w-full max-w-[440px] mb-8 border-2 border-[#BFDBFE] shadow-md shadow-blue-50/50 select-none">
                <h4 className="font-extrabold text-[19px] sm:text-[20px] text-[#1E40AF] mb-2 tracking-tight">
                  O seu IMC está fora do ideal!
                </h4>
                <p className="text-[15px] sm:text-[16px] font-semibold leading-relaxed text-[#2563EB]">
                  É hora de cuidar do seu peso! Vamos usar suas informações para criar um plano personalizado para você, que acelera o metabolismo, ajuda na perda de peso, fortalece e melhora a saúde do coração.
                </p>
              </div>

              {/* Continue button */}
              <div className="w-full max-w-[480px]">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setAnswers({ 
                      ...answers, 
                      target_weight: targetWeightUnit === 'kg' ? `${targetWeightVal} kg` : `${Math.round(targetWeightVal * 2.20462)} lb` 
                    });
                    nextStep('q34');
                  }}
                  className="w-full bg-[#15B8A6] text-white font-black py-4.5 rounded-[24px] shadow-lg hover:bg-[#0D9488] transition-all text-[18px] uppercase flex items-center justify-center gap-2 cursor-pointer animate-heartbeat"
                >
                  Continuar
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 'q35' && (
            <motion.div
              key="q35"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center pt-2 pb-6 px-4 text-center"
            >
              <h3 className="text-[26px] sm:text-[28px] font-black mb-8 text-center text-black leading-tight tracking-tight max-w-[500px] mt-[10px] select-none">
                Qual é a sua idade exata?
              </h3>
              
              {/* Centered age text/number input matching input style from the mockup */}
              <input
                type="number"
                placeholder="Digite sua idade..."
                value={ageVal}
                onChange={(e) => {
                  setAgeVal(e.target.value);
                  if (e.target.value.trim() !== '') {
                    setShowAgeError(false);
                  }
                }}
                className={`border ${showAgeError ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-gray-200 focus:border-[#15B8A6]'} rounded-[20px] p-5 w-full max-w-[420px] ${showAgeError ? 'mb-2' : 'mb-8'} bg-white text-center text-lg font-bold placeholder:italic placeholder:text-gray-400 placeholder:font-normal focus:outline-none shadow-sm transition-all`}
              />

              {showAgeError && (
                <div className="text-rose-500 text-[14px] font-extrabold mb-6 select-none animate-pulse">
                  ⚠️ Por favor, digite sua idade para continuar.
                </div>
              )}

              {/* Informational block matching age custom color blueprint description text block */}
              <div className="bg-[#EFF6FF] rounded-[24px] p-6 text-center w-full max-w-[440px] mb-8 border-2 border-[#BFDBFE] shadow-md shadow-blue-50/50 select-none">
                <h4 className="font-extrabold text-[19px] sm:text-[20px] text-[#1E40AF] mb-2 tracking-tight">
                  Vamos usar essa informação para criar seu plano personalizado!
                </h4>
                <p className="text-[15px] sm:text-[16px] font-semibold leading-relaxed text-[#2563EB]">
                  Pessoas mais velhas tendem a ter mais gordura corporal do que pessoas mais jovens com o mesmo IMC, por isso vamos personalizar para você.
                </p>
              </div>

              {/* Continue button */}
              <div className="w-full max-w-[480px]">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (ageVal.trim() === '') {
                      setShowAgeError(true);
                      return;
                    }
                    setShowAgeError(false);
                    setAnswers({ 
                      ...answers, 
                      age: `${ageVal} anos` 
                    });
                    nextStep('q35');
                  }}
                  className="w-full bg-[#15B8A6] text-white font-black py-4.5 rounded-[24px] shadow-lg hover:bg-[#0D9488] transition-all text-[18px] uppercase flex items-center justify-center gap-2 cursor-pointer animate-heartbeat"
                >
                  Continuar
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 'q36' && (
            <motion.div
              key="q36"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center pt-2 pb-6 px-4"
            >
              <h3 className="text-[26px] sm:text-[28px] font-black mb-8 text-center text-black leading-tight tracking-tight max-w-[500px] mt-[10px] select-none">
                Resumo do seu nível de condicionamento físico
              </h3>

              {/* IMC Panel Section */}
              <BMIMeter />

              {/* Illustration of the woman */}
              <div className="w-full max-w-[280px] flex justify-center mb-6">
                <img 
                  src="https://i.postimg.cc/JznJD7mq/46.png" 
                  alt="Nível de condicionamento físico" 
                  className="w-full h-auto max-h-[290px] object-contain"
                />
              </div>

              {/* Custom Warning/Info Callout container in beautiful warm amber style matching page 38 anexo */}
              <div className="bg-[#FFFDF5] rounded-[24px] p-6 text-center w-full max-w-[440px] mb-8 border border-[#FEF3C7] shadow-sm select-none">
                <h4 className="font-extrabold text-[17px] text-[#B45309] mb-1.5 tracking-tight">
                  Sua situação é preocupante!
                </h4>
                <p className="text-[14px] font-semibold leading-relaxed text-[#D97706]">
                  Parabéns por dar o primeiro passo. Vamos criar um plano personalizado para acelerar seu metabolismo, aumentar sua força e melhorar sua saúde.
                </p>
              </div>

              {/* Continue button */}
              <div className="w-full max-w-[480px]">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    nextStep('q36');
                  }}
                  className="w-full bg-[#15B8A6] text-white font-black py-4.5 rounded-[24px] shadow-lg hover:bg-[#0D9488] transition-all text-[18px] uppercase flex items-center justify-center gap-2 cursor-pointer animate-heartbeat"
                >
                  Continuar
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 'q37' && (
            <motion.div
              key="q37"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center pt-2 pb-6 px-4"
            >
              <h3 className="text-[26px] sm:text-[28px] font-black mb-2 text-center text-black leading-tight tracking-tight max-w-[500px] mt-[10px] select-none">
                Você tem algum evento importante chegando?
              </h3>
              
              <p className="text-[14px] sm:text-[15px] font-medium text-gray-400 text-center max-w-[460px] leading-relaxed mb-8 select-none">
                Ter algo para esperar pode ser uma grande motivação para alcançar o seu objetivo!
              </p>

              <div className="space-y-3 w-full max-w-[480px]">
                {[
                  { label: 'Férias', value: 'Férias', emoji: '✈️', bg: 'bg-[#EEF2FF]' },
                  { label: 'Casamento', value: 'Casamento', emoji: '👰', bg: 'bg-[#FEF3C7]' },
                  { label: 'Feriado', value: 'Feriado', emoji: '🏖️', bg: 'bg-[#E0F2FE]' },
                  { label: 'Evento esportivo', value: 'Evento esportivo', emoji: '🏆', bg: 'bg-[#F5F3FF]' },
                  { label: 'Encontro de amigos', value: 'Encontro de amigos', emoji: '🎂', bg: 'bg-[#FFFBEB]' },
                  { label: 'Aniversário', value: 'Aniversário', emoji: '🥳', bg: 'bg-[#FDF2F8]' },
                  { label: 'Outro', value: 'Outro', emoji: '🤷', bg: 'bg-[#FFEDD5]' },
                  { label: 'Não tenho nenhum evento', value: 'Não tenho nenhum evento', emoji: '❌', bg: 'bg-[#FFE4E6]' }
                ].map(opt => (
                  <button
                    key={opt.label}
                    onClick={() => selectAnswer('important_event', opt.value)}
                    className={`w-full h-18 px-5 border rounded-[20px] active:scale-[0.99] transition-all flex items-center text-left group cursor-pointer ${
                      answers.important_event === opt.value
                      ? 'border-[#15B8A6] ring-2 ring-[#15B8A6]/20 bg-[#15B8A6] text-white'
                      : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50/20 text-[#374151]'
                    }`}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div className={`w-11 h-11 rounded-[14px] flex items-center justify-center ${
                        answers.important_event === opt.value ? 'bg-white/25' : opt.bg
                      } flex-shrink-0 text-2xl select-none`}>
                        {opt.emoji}
                      </div>
                      <span className={`text-[15px] sm:text-[16px] font-bold tracking-tight ${
                        answers.important_event === opt.value ? 'text-white' : 'text-slate-800'
                      }`}>
                        {opt.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'q38' && (
            <motion.div
              key="q38"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex-1 flex flex-col items-center pt-2 pb-6 px-4"
            >
              <h3 className="text-[26px] sm:text-[28px] font-black mb-2 text-center text-black leading-tight tracking-tight max-w-[500px] mt-[10px] select-none">
                O único plano que você precisa para entrar em forma
              </h3>
              
              <p className="text-[14px] sm:text-[15px] font-medium text-gray-400 text-center max-w-[460px] leading-relaxed mb-1 select-none">
                De acordo com as informações que você forneceu, você pode atingir o seu peso ideal:
              </p>
              
              <p className="text-[16px] sm:text-[17px] font-black text-center text-slate-800 mb-8 select-none">
                <span className="underline decoration-2 underline-offset-4 font-black">
                  {targetWeightVal} {targetWeightUnit === 'kg' ? 'kg' : 'lb'} em 21 dias
                </span>
              </p>

              {/* Dynamic Curve Graph Panel */}
              <div className="w-full max-w-[420px] mb-8 flex flex-col items-center select-none bg-white p-2">
                <div className="relative w-full h-[180px]">
                  <svg viewBox="0 0 400 180" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="curve-fill-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#EF4444" stopOpacity="0.32" />
                        <stop offset="35%" stopColor="#FBBF24" stopOpacity="0.25" />
                        <stop offset="70%" stopColor="#10B981" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.08" />
                      </linearGradient>
                      <linearGradient id="stroke-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#EF4444" />
                        <stop offset="35%" stopColor="#FBBF24" />
                        <stop offset="70%" stopColor="#22C55E" />
                        <stop offset="100%" stopColor="#10B981" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Grid Dashed Lines */}
                    <line x1="30" y1="40" x2="370" y2="40" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4,4" />
                    <line x1="30" y1="80" x2="370" y2="80" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4,4" />
                    <line x1="30" y1="120" x2="370" y2="120" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4,4" />
                    <line x1="30" y1="160" x2="370" y2="160" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4,4" />

                    {/* Vertical Grid Dashed Lines */}
                    <line x1="30" y1="40" x2="30" y2="160" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4,4" />
                    <line x1="115" y1="40" x2="115" y2="160" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4,4" />
                    <line x1="200" y1="40" x2="200" y2="160" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4,4" />
                    <line x1="285" y1="40" x2="285" y2="160" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4,4" />
                    <line x1="370" y1="40" x2="370" y2="160" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4,4" />

                    {/* Gradient area under curve */}
                    <path
                      d="M 30 40 C 115 45, 170 55, 200 70 C 240 90, 275 115, 285 120 C 315 135, 345 145, 370 155 L 370 160 L 30 160 Z"
                      fill="url(#curve-fill-gradient)"
                    />

                    {/* Colored projection curve line */}
                    <path
                      d="M 30 40 C 115 45, 170 55, 200 70 C 240 90, 275 115, 285 120 C 315 135, 345 145, 370 155"
                      fill="none"
                      stroke="url(#stroke-gradient)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />

                    {/* Points along graph path with subtle shadows and borders */}
                    <circle cx="115" cy="46" r="6" fill="#EF4444" stroke="white" strokeWidth="2.5" />
                    <circle cx="200" cy="70" r="6" fill="#FBBF24" stroke="white" strokeWidth="2.5" />
                    <circle cx="285" cy="120" r="6" fill="#EAB308" stroke="white" strokeWidth="2.5" />
                    <circle cx="335" cy="142" r="6" fill="#84CC16" stroke="white" strokeWidth="2.5" />
                    
                    {/* First point (Você) */}
                    <circle cx="30" cy="40" r="7" fill="#EF4444" stroke="white" strokeWidth="2.5" />
                    
                    {/* End target weight point */}
                    <circle cx="370" cy="155" r="8" fill="#10B981" stroke="white" strokeWidth="2.5" />

                    {/* "Você" helper label directly over P1 */}
                    <g transform="translate(14, 10)">
                      <rect width="32" height="18" rx="4" fill="white" stroke="#E2E8F0" strokeWidth="1" />
                      <text x="16" y="12" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1E293B">Você</text>
                    </g>

                    {/* Green weight bubble badge above the last dot (x=370, y=155) */}
                    <g transform="translate(346, 122)">
                      <rect width="48" height="20" rx="6" fill="#10B981" />
                      <text x="24" y="14" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">
                        {targetWeightVal}{targetWeightUnit}
                      </text>
                    </g>
                  </svg>
                </div>

                {/* X-Axis labels matching grid */}
                <div className="w-full flex justify-between px-2 text-[12px] font-bold text-gray-400 mt-2 select-none">
                  <span>Hoje</span>
                  <span>21d</span>
                </div>
              </div>

              {/* Action Continue button */}
              <div className="w-full max-w-[480px]">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    nextStep('q38');
                  }}
                  className="w-full bg-[#15B8A6] text-white font-black py-4.5 rounded-[24px] shadow-lg hover:bg-[#0D9488] transition-all text-[18px] flex items-center justify-center gap-2 cursor-pointer animate-heartbeat"
                >
                  Continuar
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 'calculating' && (
            <motion.div
              key="calculating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-16 h-16 border-4 border-[#14B8A6] border-t-transparent rounded-full animate-spin mb-6" />
              <h3 className="text-xl font-bold mb-2">Analisando suas respostas...</h3>
              <p className="text-gray-500">Estamos preparando um plano personalizado baseado no seu perfil.</p>
              
              <div className="mt-8 space-y-4 w-full">
                {[
                  'Verificando metabolismo...',
                  'Calculando déficit calórico ideal...',
                  'Selecionando janelas de jejum...',
                ].map((text, i) => (
                  <motion.div 
                    key={text}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.8 }}
                    className="flex items-center gap-2 text-sm text-gray-400"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#14B8A6]" />
                    {text}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex-1 flex flex-col items-center pt-2 pb-12 px-2"
            >
              {/* Main Heading Title */}
              <h2 className="text-[26px] sm:text-[32px] font-black leading-tight tracking-tight text-slate-900 mt-2 mb-8 max-w-[650px] text-center select-none">
                O seu Plano Personalizado de Jejum está pronto!
              </h2>

              {/* Image comparison card matching the uploaded screenshot */}
              <div className="w-full max-w-[480px] mx-auto mb-8 bg-[#EFECE5] rounded-[24px] overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.03)] animate-fade-in select-none">
                {/* Header banner */}
                <div className="grid grid-cols-2 relative py-4.5 px-6 border-b border-[#E1DBD1]/60">
                  <div className="text-center">
                    <span className="text-[17px] sm:text-[18px] font-black text-slate-900 tracking-tight">Agora</span>
                  </div>
                  {/* Subtle dividing line in the middle */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-5 bg-[#C9C4B7]" />
                  <div className="text-center">
                    <span className="text-[17px] sm:text-[18px] font-black text-slate-900 tracking-tight">Seu objetivo</span>
                  </div>
                </div>

                {/* Card Body containing images and transition chevrons */}
                <div className="relative p-6 flex items-center justify-between min-h-[220px] sm:min-h-[260px] bg-[#EFECE5]">
                  {/* Left Silhouette Image */}
                  <div className="w-[45%] flex justify-center z-10">
                    <img 
                      src="https://i.postimg.cc/JznJD7mq/46.png" 
                      alt="Agora" 
                      className="w-auto h-auto max-h-[180px] sm:max-h-[215px] object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Faint chevron transition arrows in the middle, matching the image */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex gap-[2px] sm:gap-1 select-none z-0">
                    <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 text-[#E1DBD0] stroke-[2.5px]" />
                    <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 text-[#D5CEBF] stroke-[2.5px]" />
                    <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 text-[#C2BBAF] stroke-[2.5px]" />
                  </div>

                  {/* Right Silhouette Image */}
                  <div className="w-[45%] flex justify-center z-10">
                    <img 
                      src="https://i.postimg.cc/bNhyp6JF/47.png" 
                      alt="Seu objetivo" 
                      className="w-auto h-auto max-h-[180px] sm:max-h-[215px] object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>

              {/* Slider Metrics comparing state section (Hoje vs Em 21 dias) */}
              <div className="grid grid-cols-2 gap-6 w-full max-w-[480px] mx-auto mb-10 select-none">
                {/* Left side: Hoje */}
                <div className="flex flex-col">
                  <h4 className="text-[24px] sm:text-[28px] font-black text-slate-900 mb-6 select-none leading-none">
                    Hoje
                  </h4>
                  
                  <SliderGroup 
                    title="Seu Nível de gordura" 
                    value="Alto" 
                    type="today" 
                  />
                  <SliderGroup 
                    title="Seu Nível de energia" 
                    value="Baixo" 
                    type="today" 
                  />
                  <SliderGroup 
                    title="Seu Metabolismo" 
                    value="Baixo" 
                    type="today" 
                  />
                </div>

                {/* Right side: Em 21 dias */}
                <div className="flex flex-col">
                  <h4 className="text-[24px] sm:text-[28px] font-black text-slate-900 mb-6 select-none leading-none">
                    Em 21 dias
                  </h4>
                  
                  <SliderGroup 
                    title="Seu Nível de gordura" 
                    value="Baixo" 
                    type="target" 
                  />
                  <SliderGroup 
                    title="Seu Nível de energia" 
                    value="Alto" 
                    type="target" 
                  />
                  <SliderGroup 
                    title="Seu Metabolismo" 
                    value="Alto" 
                    type="target" 
                  />
                </div>
              </div>

              {/* Como Funciona o Plano panel section */}
              <div className="w-full max-w-[440px] bg-[#DCFCE7]/60 border border-[#86EFAC] rounded-[28px] p-6.5 sm:p-8 text-center mb-10 select-none mx-auto">
                <h3 className="text-[21px] sm:text-[23px] font-black text-slate-900 mb-4 tracking-tight">
                  Como funciona o Plano?
                </h3>
                <p className="text-[13.5px] sm:text-[14px] font-medium text-[#115E59] leading-relaxed text-center mx-auto">
                  Com base nas suas informações pessoais e objetivos, criamos um plano de jejum 100% personalizado para você. Nossa abordagem estratégica foi feita para que você consiga potencializar sua perda de peso em 21 dias, respeitando seu estilo de vida, sua rotina e o que você gosta de comer.
                </p>
              </div>

              {/* Seu plano inclui components sections */}
              <div className="w-full max-w-[440px] mx-auto text-left mb-10 select-none">
                <h3 className="text-[22px] sm:text-[24px] font-black text-slate-800 mb-6 text-center">
                  Seu plano inclui:
                </h3>
                
                <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
                  {[
                    {
                      emoji: '🍽️',
                      title: 'Como fazer o Jejum do Jeito Certo',
                      description: (
                        <>
                          Baseado nas pesquisas mais recentes de universidades famosas como <span className="font-extrabold text-slate-950">Havard</span>, desenvolvemos o <span className="font-extrabold text-slate-950">Protocolo Seca Jejum</span>, a forma mais eficaz e segura de fazer o Jejum intermitente para perder peso sem que você perca músculos ou sinta muita fome.
                        </>
                      )
                    },
                    {
                      emoji: '🔥',
                      title: 'Potencialize a Queima de Gordura',
                      description: (
                        <>
                          Saiba exatamente o que comer para acelerar a queima de gordura e te manter com saciedade por mais tempo.
                        </>
                      )
                    },
                    {
                      emoji: '🪞',
                      title: 'Como Parecer outra Pessoa na Frente do Espelho em 7 Dias',
                      description: (
                        <>
                          Aprenda o jeito mais fácil de desinchar e ver grandes resultados no espelho em menos de 7 dias.
                        </>
                      )
                    },
                    {
                      emoji: '🪗',
                      title: 'Protocolo Anti-Efeito Sanfona',
                      description: (
                        <>
                          Descubra como manter o peso perdido e nunca mais voltar a engordar, mesmo depois de atingir seu objetivo.
                        </>
                      )
                    },
                    {
                      emoji: '⚡',
                      title: 'Como acelerar o seu metabolismo e perder peso sem fazer nada',
                      description: (
                        <>
                          Aprenda as principais estratégias para acelerar o seu metabolismo e queimar gordura mesmo que você não faça nada.
                        </>
                      )
                    },
                    {
                      emoji: '🎯',
                      title: 'Definição de metas diárias',
                      description: (
                        <>
                          Como definir metas diárias para você se manter no caminho certo
                        </>
                      )
                    },
                    {
                      emoji: '⏳',
                      title: 'Protocolo Anti-procrastinação',
                      description: (
                        <>
                          Descubra o segredo dos maiores líderes para se manter sempre motivado
                        </>
                      )
                    },
                    {
                      emoji: '📝',
                      title: 'Planilha de acompanhamento',
                      description: (
                        <>
                          Saiba exatamente quanto você está evoluindo
                        </>
                      )
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200/80 rounded-[24px] p-4.5 sm:p-5 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-md transition-all">
                      <div className="text-[44px] sm:text-[48px] mb-4 select-none leading-none flex-shrink-0">
                        {item.emoji}
                      </div>
                      <h4 className="text-[15px] sm:text-[16.5px] font-black text-slate-900 mb-3 leading-snug tracking-tight">
                        {item.title}
                      </h4>
                      <p className="text-[11.5px] sm:text-[12.5px] text-slate-500 font-medium leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkout Block 1 */}
              <PricingCard timeLeft={timeLeft} formatTime={formatTime} />

              {/* Visual Transformation Gallery */}
              <div className="w-full max-w-[440px] mx-auto text-center mb-14 select-none">
                <h3 className="text-[20px] sm:text-[22px] font-black text-slate-900 mb-6 px-4">
                  Veja mudanças visíveis após uma semana
                </h3>
                
                <div className="space-y-5">
                  {[
                    'https://i.postimg.cc/PxnXJK40/48.jpg',
                    'https://i.postimg.cc/8kHpkR6V/49.jpg',
                    'https://i.postimg.cc/mg0RpV0B/50.jpg',
                    'https://i.postimg.cc/nzxxprF6/51.png',
                    'https://i.postimg.cc/rm9kmTz1/52.png'
                  ].map((url, idx) => (
                    <div key={idx} className="bg-white border border-slate-200/80 rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.015)]">
                      <img 
                        src={url} 
                        alt={`Transformação ${idx + 1}`} 
                        referrerPolicy="no-referrer"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Student Testimonials Stories */}
              <div className="w-full max-w-[440px] mx-auto text-left mb-12 select-none">
                <h3 className="text-[20px] sm:text-[22px] font-black text-slate-900 mb-6 text-center">
                  Veja as histórias de sucesso dos nossos alunos
                </h3>
                
                <div className="space-y-5">
                  {[
                    'https://i.postimg.cc/K8ghTBRc/53.png',
                    'https://i.postimg.cc/pdfNGvf6/54.png',
                    'https://i.postimg.cc/GpF07RPh/55.png',
                    'https://i.postimg.cc/8542Gbn7/56.png'
                  ].map((url, idx) => (
                    <div key={idx} className="bg-white border border-slate-200/80 rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.015)]">
                      <img 
                        src={url} 
                        alt={`História de sucesso ${idx + 1}`} 
                        referrerPolicy="no-referrer"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkout Block 2 */}
              <PricingCard timeLeft={timeLeft} formatTime={formatTime} />

              {/* 30-Day Money Back Guarantee section */}
              <div className="w-full max-w-[440px] mx-auto flex flex-col items-center text-center select-none mb-12">
                {/* Gold Seal image badge */}
                <img 
                  src="https://i.postimg.cc/Z5PjX5Qq/58.png" 
                  alt="Garantia de 30 Dias Reembolso" 
                  className="w-28 h-28 sm:w-32 sm:h-32 mb-5 object-contain"
                  referrerPolicy="no-referrer"
                />
                
                <h4 className="text-[20px] sm:text-[22px] font-black text-slate-900 mb-4 leading-tight">
                  Garantia de reembolso
                </h4>
                <p className="text-[13.5px] sm:text-[14.5px] text-slate-500 font-medium leading-relaxed mb-3">
                  A compra deste material é totalmente sem risco para você.
                </p>
                <p className="text-[13.5px] sm:text-[14.5px] text-slate-500 font-medium leading-relaxed mb-5">
                  Se ele não atender às suas expectativas nos primeiros 30 dias após a compra, nós reembolsaremos todo o valor que você pagou, sem fazer perguntas.
                </p>
                <div className="flex flex-col items-center gap-1.5 text-[13.5px] sm:text-[14px] text-slate-500 font-semibold leading-relaxed">
                  <span>Basta enviar um e-mail para o suporte em</span>
                  <span className="bg-[#F3F4F6] px-3.5 py-1 rounded-[6px] text-slate-800 font-bold border border-slate-200">
                    secaturbojejum@outlook.com
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      </div>
    </div>
  );
}

const BodySilhouetteBefore = () => (
  <svg viewBox="0 0 100 150" className="w-[85px] h-[130px] opacity-90 filter drop-shadow">
    <defs>
      <linearGradient id="body-grad-before" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FCA5A5" />
        <stop offset="100%" stopColor="#EF4444" />
      </linearGradient>
    </defs>
    {/* Body profile path representing a typical natural shape profile of female */}
    <path 
      d="M50,15 C54,15 56,18 56,22 C56,26 53,29 50,29 C47,29 44,26 44,22 C44,18 46,15 50,15 Z M45,30 L55,30 C58,30 60,32 60,35 L58,55 C62,60 63,65 63,72 C63,80 59,92 57,110 L59,145 L41,145 L43,110 C41,92 37,80 37,72 C37,65 38,60 42,55 L40,35 C40,32 42,30 45,30 Z" 
      fill="url(#body-grad-before)" 
    />
    {/* Warning red target circle around waist to show higher fat ratio */}
    <circle cx="50" cy="72" r="10" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="3,1" className="animate-pulse" />
    <circle cx="50" cy="72" r="3" fill="#EF4444" />
  </svg>
);

const BodySilhouetteAfter = () => (
  <svg viewBox="0 0 100 150" className="w-[85px] h-[130px] opacity-95 filter drop-shadow">
    <defs>
      <linearGradient id="body-grad-after" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A7F3D0" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
    </defs>
    {/* Body profile path (slimmer waist, more athletic fit athletic silhouette) */}
    <path 
      d="M50,15 C53,15 55,17 55,21 C55,25 53,28 50,28 C47,28 45,25 45,21 C45,17 47,15 50,15 Z M46,29 L54,29 C56,29 58,31 58,34 L56,53 C58,58 59,63 59,70 C59,77 56,90 55,110 L57,145 L43,145 L45,110 C44,90 41,77 41,70 C41,63 42,58 44,53 L42,34 C42,31 44,29 46,29 Z" 
      fill="url(#body-grad-after)" 
    />
    {/* Success green tracker near waist */}
    <path d="M50,71 C49,69 46,69 46,71 C46,73 50,76 50,76 C50,76 54,73 54,71 C54,69 51,69 50,71 Z" fill="#10B981" className="scale-125 transform-origin-center animate-bounce" />
  </svg>
);

const SliderGroup = ({ title, value, type }: { title: string; value: string; type: 'today' | 'target' }) => {
  let percentage = 50;
  if (type === 'today') {
    if (title.toLowerCase().includes('gordura')) percentage = 70;
    else if (title.toLowerCase().includes('energia')) percentage = 20;
    else if (title.toLowerCase().includes('metabolismo')) percentage = 25;
  } else {
    if (title.toLowerCase().includes('gordura')) percentage = 6;
    else if (title.toLowerCase().includes('energia')) percentage = 92;
    else if (title.toLowerCase().includes('metabolismo')) percentage = 88;
  }

  return (
    <div className="flex flex-col mb-4.5 w-full text-left select-none">
      <span className="text-[13px] sm:text-[14px] font-bold text-slate-800 leading-tight">{title}</span>
      <span className="text-[11.5px] sm:text-[12.5px] font-semibold text-gray-400 mt-0.5 mb-1.5">{value}</span>
      <div className="relative w-full h-[6px] bg-slate-100 rounded-full">
        {/* Fill colored track section */}
        <div 
          className="absolute h-full rounded-full" 
          style={{ 
            left: '0', 
            width: `${percentage}%`, 
            backgroundColor: type === 'target' ? '#10B981' : '#EF4444' 
          }} 
        />
        {/* Dot handler */}
        <div 
          className="absolute w-3.5 h-3.5 rounded-full border border-slate-300 shadow-sm -top-[4px] bg-white" 
          style={{ 
            left: `${percentage}%`,
            transform: 'translateX(-50%)'
          }} 
        />
      </div>
    </div>
  );
};

const PricingCard = ({ timeLeft }: { timeLeft: number; formatTime?: (seconds: number) => string }) => {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  return (
    <div className="w-full max-w-[440px] mx-auto mb-10 select-none flex flex-col items-center">
      {/* 1. Main Pricing Box with Teal Border */}
      <div className="w-full bg-white border-2 border-[#15B8A6] rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden mb-6">
        {/* Top promotional turquoise ribbon */}
        <div className="bg-[#15B8A6] text-white py-3.5 px-4 text-center font-black text-[14px] sm:text-[15px] uppercase tracking-wide flex items-center justify-center gap-1">
          De R$ 197,90 por apenas 👇
        </div>
        
        {/* Body grid */}
        <div className="p-5.5 sm:p-6 flex items-center justify-between gap-4">
          <div className="text-left flex-1">
            <h4 className="text-[19px] sm:text-[21px] font-black text-slate-900 leading-[1.2] tracking-tight">
              Plano de Jejum<br />Personalizado
            </h4>
          </div>
          
          {/* Light-gray badge card on the right */}
          <div className="bg-[#F3F4F6] rounded-[20px] px-4.5 py-3.5 text-center flex flex-col items-center justify-center min-w-[155px] sm:min-w-[165px]">
            <span className="text-[12px] sm:text-[13px] font-bold text-gray-400 leading-none mb-1">
              6x de
            </span>
            <div className="flex items-baseline justify-center gap-0.5 mb-1">
              <span className="text-[14px] sm:text-[15px] font-black text-slate-900">R$</span>
              <span className="text-[26px] sm:text-[30px] font-black text-slate-900 leading-none">
                5,32
              </span>
            </div>
            <span className="text-[10px] sm:text-[10.5px] font-bold text-gray-400 leading-none">
              Ou R$27,00 à vista
            </span>
          </div>
        </div>
      </div>

      {/* 2. Capsule-styled Countdown Timer */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {/* Minutes Capsule */}
        <div className="bg-[#FFE4E6] border border-[#FECDD3] rounded-[18px] px-3.5 py-2 flex flex-col items-center justify-center min-w-[54px] shadow-sm">
          <span className="text-[22px] font-black text-[#E11D48] leading-none mb-0.5">{minutes}</span>
          <span className="text-[9.5px] font-extrabold text-[#F43F5E]/70 lowercase leading-none">min</span>
        </div>
        
        {/* Separator Colon */}
        <span className="text-[#E11D48] font-black text-[18px] -mt-3">:</span>
        
        {/* Seconds Capsule */}
        <div className="bg-[#FFE4E6] border border-[#FECDD3] rounded-[18px] px-3.5 py-2 flex flex-col items-center justify-center min-w-[54px] shadow-sm">
          <span className="text-[22px] font-black text-[#E11D48] leading-none mb-0.5">{seconds}</span>
          <span className="text-[9.5px] font-extrabold text-[#F43F5E]/70 lowercase leading-none">seg</span>
        </div>
      </div>

      {/* 3. CTA Action Button */}
      <button
        onClick={() => window.open('https://pay.cakto.com.br/maepwvz_868183')}
        className="w-full bg-[#15B8A6] hover:bg-[#0D9488] active:scale-[0.99] text-white font-black py-4.5 rounded-[24px] shadow-lg hover:shadow-xl transition-all text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer uppercase mb-5 border-b-[4px] border-b-[#0D9488] animate-heartbeat"
      >
        RECEBER O MEU PLANO
      </button>

      {/* 4. High-resolution Security Badge Image below button */}
      <img 
        src="https://i.postimg.cc/SNfMhYyy/57.webp" 
        alt="Segurança" 
        className="w-full max-w-[340px] h-auto object-contain mx-auto"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

const BMIMeter = () => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = 83;
    const duration = 1500; // 1.5 seconds
    const startTime = performance.now();
    let animationFrameId: number;

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress); // easeOutQuad
      const current = Math.floor(easeProgress * (end - start) + start);
      setPercent(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setPercent(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="w-full max-w-[420px] mb-8 select-none">
      <div className="flex justify-between items-end mb-1">
        <div className="flex flex-col">
          <span className="text-[13px] font-bold text-gray-800 tracking-tight">
            Índice de massa corporal (IMC)
          </span>
          <span className="text-[11px] font-bold text-gray-400 mt-0.5">
            Normal - entre 18,4 e 25
          </span>
        </div>
        <span className="text-[14px] font-black text-gray-800 font-mono">
          {percent}%
        </span>
      </div>

      {/* Meter Gradient Bar */}
      <div className="relative w-full h-2.5 rounded-full mt-3 mb-3 bg-gradient-to-r from-[#10B981] via-[#FBBF24] to-[#EF4444] shadow-inner">
        {/* Cyan circle pin on the bar */}
        <motion.div 
          initial={{ left: '0%' }}
          animate={{ left: '83%' }}
          transition={{ 
            type: 'spring',
            stiffness: 45,
            damping: 10,
            mass: 0.8,
            delay: 0.2
          }}
          className="absolute w-5.5 h-5.5 rounded-full border-[3px] border-[#15B8A6] bg-white shadow-md z-20 flex items-center justify-center"
          style={{ top: '50%', transform: 'translate(-50%, -50%)' }}
        >
          {/* Inner pulse */}
          <div className="w-1.5 h-1.5 rounded-full bg-[#15B8A6] animate-ping opacity-75 absolute" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#15B8A6]" />
        </motion.div>
      </div>

      {/* Labels below the bar */}
      <div className="flex justify-between text-[13px] font-bold text-gray-400 mt-2 select-none">
        <span className="text-gray-400">Anormal</span>
        <span className="text-gray-400">Normal</span>
        <span className="text-slate-700 font-extrabold flex items-center gap-1">
          Obesa
          <span className="inline-block w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
        </span>
      </div>
    </div>
  );
};

