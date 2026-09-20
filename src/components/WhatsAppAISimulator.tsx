import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Camera, CheckCheck, Phone, Video, MoreVertical, MessageCircle, ArrowLeft, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { ServiceRequestState, WorkshopConfig } from '../types';
import { DAMAGE_PARTS, SERVICE_OPTIONS } from '../data/carData';
import { formatWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';

interface WhatsAppAISimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  request: ServiceRequestState;
  workshopConfig: WorkshopConfig;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  image?: string;
}

export const WhatsAppAISimulator: React.FC<WhatsAppAISimulatorProps> = ({
  isOpen,
  onClose,
  request,
  workshopConfig
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [photosSentCount, setPhotosSentCount] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const brandName = request.brand === 'other' ? (request.customBrand || 'Other Brand') : request.brand || 'Tata';
  const modelName = request.model === 'Other' ? (request.customModel || 'Other Model') : request.model || 'Nexon';
  const yearText = request.year ? ` (${request.year})` : '';
  const carText = `${brandName} ${modelName}${yearText}`.trim();

  const partNames = request.damagedParts.length > 0
    ? request.damagedParts.map(id => {
        const found = DAMAGE_PARTS.find(p => p.id === id);
        return found ? found.name : id;
      })
    : ['Front Bumper', 'Left Fender'];

  const serviceLabels = request.services.length > 0
    ? request.services.map(s => {
        const found = SERVICE_OPTIONS.find(opt => opt.id === s);
        return found ? found.title : s;
      })
    : ['Denting + Painting'];

  const customerName = request.customer.fullName.trim() || 'there';

  // Initialize conversation when opened
  useEffect(() => {
    if (isOpen) {
      setPhotosSentCount(0);
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // 1. Initial message from user (the prefilled WhatsApp text from the website)
      const userInitialText = formatWhatsAppMessage(request, workshopConfig);

      const initialMsgs: ChatMessage[] = [
        {
          id: 'msg-1',
          sender: 'user',
          text: userInitialText,
          timestamp: currentTime
        }
      ];
      setMessages(initialMsgs);

      // AI response sequence
      setIsTyping(true);
      const timer1 = setTimeout(() => {
        setIsTyping(false);
        const aiWelcome = `Hi ${customerName}! 👋 Thanks for contacting ${workshopConfig.name}. We've received your service request for your *${carText}*.\n\n🔧 *Damaged parts noted:* ${partNames.join(', ')}\n🛠 *Services requested:* ${serviceLabels.join(', ')}`;
        
        setMessages(prev => [
          ...prev,
          {
            id: 'msg-2',
            sender: 'ai',
            text: aiWelcome,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);

        // Second AI message: Pickup acknowledgment if requested
        setTimeout(() => {
          if (request.pickupDrop.needed) {
            setMessages(prev => [
              ...prev,
              {
                id: 'msg-pickup',
                sender: 'ai',
                text: `Sure! We've received your request for *pickup & drop* 🚗. Before we arrange the driver schedule, please send clear photos of the damaged areas so our team can inspect the vehicle and understand the required work.`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]);
          }

          // Third AI message: photo guidelines
          setTimeout(() => {
            const photoGuide = `To help our workshop team understand the damage and provide an accurate estimate, please send clear photos of the damaged area.\n\n📸 *Please send:*\n1. One photo from a little distance showing the complete damaged area.\n2. One close-up photo of the damage.\n3. One photo from another angle if possible.\n\nOnce we receive the photos, our team will inspect them and get back to you with an estimate!`;
            setMessages(prev => [
              ...prev,
              {
                id: 'msg-3',
                sender: 'ai',
                text: photoGuide,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]);
          }, 800);

        }, 600);
      }, 1000);

      return () => clearTimeout(timer1);
    }
  }, [isOpen, carText, customerName, request, workshopConfig]);

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  // Handle user send
  const handleSend = async (customText?: string) => {
    const textToSend = customText || inputVal;
    if (!textToSend.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: time
    };

    setMessages(prev => [...prev, newMsg]);
    if (!customText) setInputVal('');

    // Generate intelligent AI response according to User Prompt sections 10 & 11
    setIsTyping(true);
    setIsTyping(true);

    setIsTyping(false);
    const lower = textToSend.toLowerCase();
    let reply = '';

    if (lower.includes('how much') || lower.includes('cost') || lower.includes('price') || lower.includes('rate')) {
      reply = "The final estimate depends on the extent of the damage, paint requirements (primer, clear coat, pearl/metallic match), and whether dent pulling requires panel disassembly. Please send us the damage photos first so our team can review them.";
    } else if (lower.includes('pickup') || lower.includes('pick up') || lower.includes('tomorrow') || lower.includes('time')) {
      reply = "Thank you! Our workshop coordinator has noted your timing preference. The final pickup schedule will be confirmed by our team right after we review your photos and ensure the required repair bay is ready.";
    } else if (lower.includes('human') || lower.includes('call') || lower.includes('speak') || lower.includes('technician')) {
      reply = `Connecting you with Master Technician Rajesh at ${workshopConfig.name}. He can also be reached directly at ${workshopConfig.displayPhone}.`;
    } else {
      reply = "Got it! Our body shop team will review this note along with your vehicle specifications. Please share the damage photos when ready!";
    }

    setMessages(prev => [
      ...prev,
      {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Simulate user sending damage photographs
  const handleSendSamplePhoto = (type: 'overview' | 'closeup' | 'angle') => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let caption = '';
    let imgUrl = '';

    if (type === 'overview') {
      caption = '📸 Photo 1: Full damaged area overview';
      imgUrl = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80';
    } else if (type === 'closeup') {
      caption = '📸 Photo 2: Close-up of scratch and dent depth';
      imgUrl = 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=600&q=80';
    } else {
      caption = '📸 Photo 3: Side angle reflection view';
      imgUrl = 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80';
    }

    const newPhotoMsg: ChatMessage = {
      id: `photo-${Date.now()}`,
      sender: 'user',
      text: caption,
      image: imgUrl,
      timestamp: time
    };

    setMessages(prev => [...prev, newPhotoMsg]);
    const nextCount = photosSentCount + 1;
    setPhotosSentCount(nextCount);

    // AI acknowledges photos
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let replyText = '';
      if (nextCount === 1) {
        replyText = "Received the first photo! 👍 It gives a good overview. Could you also share a close-up photo showing the dent depth or scratch severity?";
      } else {
        replyText = `Thank you ${customerName}! We've received the damage photos. 📋\n\nOur body shop supervisor and paint specialist are currently inspecting the panels. We will contact you shortly with the itemized repair estimate and coordinate pickup details!`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: `ai-photo-ack-${Date.now()}`,
          sender: 'ai',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1100);
  };

  const handleOpenRealWhatsApp = () => {
    const formattedMsg = formatWhatsAppMessage(request, workshopConfig);
    openWhatsApp(workshopConfig.whatsappNumber, formattedMsg);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0b141a] rounded-3xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col h-[650px] max-h-[92vh]">
        
        {/* WhatsApp Header */}
        <div className="bg-[#1f2c34] text-white px-4 py-3 flex items-center justify-between border-b border-slate-700/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="text-slate-300 hover:text-white p-1 -ml-1 rounded-full cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center border border-slate-700">
                <img
                  src="/pd-works-logo.jpg"
                  alt="P\D WORKS"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="font-black text-xs text-slate-900 absolute [img:not([style*='display: none'])+&]:hidden">
                  P\D
                </span>
              </div>
              <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#1f2c34] absolute bottom-0 right-0"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-sm text-white">{workshopConfig.name}</h4>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded-sm font-semibold">
                  AI Agent
                </span>
              </div>
              <p className="text-[11px] text-emerald-400 font-medium">Online • Verified Workshop</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-300">
            <button
              onClick={handleOpenRealWhatsApp}
              className="text-xs bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
              title="Open Real WhatsApp"
            >
              <span>Open Real App</span>
              <ExternalLink className="w-3 h-3" />
            </button>
            <button onClick={onClose} className="text-slate-300 hover:text-white cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* WhatsApp Chat Background & Messages */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-3 custom-scroll"
          style={{
            backgroundColor: '#0b141a',
            backgroundImage: `radial-gradient(#1f2c34 1px, transparent 1px)`,
            backgroundSize: '16px 16px'
          }}
        >
          {/* Encryption Note */}
          <div className="text-center my-1">
            <span className="bg-[#182229] text-amber-200/90 text-[10px] px-3 py-1 rounded-lg inline-block border border-amber-500/20 shadow-xs">
              🔒 End-to-end encrypted • WhatsApp AI Simulation
            </span>
          </div>

          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed shadow-sm relative ${
                    isUser
                      ? 'bg-[#005c4b] text-[#e9edef] rounded-tr-none'
                      : 'bg-[#202c33] text-[#d1d7db] rounded-tl-none border border-slate-700/40'
                  }`}
                >
                  {/* Photo if present */}
                  {msg.image && (
                    <div className="mb-2 rounded-lg overflow-hidden border border-black/20">
                      <img
                        src={msg.image}
                        alt="Damage Photo"
                        className="w-full h-32 object-cover"
                      />
                    </div>
                  )}

                  <p className="whitespace-pre-wrap font-sans">{msg.text}</p>

                  <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-slate-400">
                    <span>{msg.timestamp}</span>
                    {isUser && <CheckCheck className="w-3.5 h-3.5 text-blue-400" />}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-start">
              <div className="bg-[#202c33] text-slate-400 rounded-2xl rounded-tl-none px-4 py-2.5 text-xs flex items-center gap-1.5 border border-slate-700/40">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[11px] ml-1 text-slate-400 font-medium">Workshop AI is replying...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Simulation Actions Tray */}
        <div className="bg-[#182229] border-t border-slate-800 p-2.5 space-y-2 shrink-0">
          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span>Test Common Customer Responses:</span>
            <span className="text-emerald-400 font-medium">Interactive Demo</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => handleSendSamplePhoto('overview')}
              className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1 cursor-pointer"
            >
              <Camera className="w-3 h-3 text-emerald-400" />
              <span>Send Photo 1: Overview</span>
            </button>

            <button
              onClick={() => handleSendSamplePhoto('closeup')}
              className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1 cursor-pointer"
            >
              <ImageIcon className="w-3 h-3 text-blue-400" />
              <span>Send Photo 2: Close-up</span>
            </button>

            <button
              onClick={() => handleSend("How much will this cost?")}
              className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700 cursor-pointer"
            >
              Ask: "How much will this cost?"
            </button>

            <button
              onClick={() => handleSend("Can you pick up tomorrow at 10 AM?")}
              className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700 cursor-pointer"
            >
              Ask about pickup slot
            </button>
          </div>

          {/* Text Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 pt-1"
          >
            <input
              type="text"
              placeholder="Type message to AI agent..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 bg-[#2a3942] text-white placeholder-slate-400 px-3.5 py-2 rounded-xl text-xs focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-xl cursor-pointer transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
