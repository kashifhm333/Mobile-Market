import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Send, MessageSquare, MessagesSquare, ShieldCheck } from 'lucide-react';
import api from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

const ConversationsPage = () => {
  const { id: paramConvId } = useParams();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [conversations, setConversations] = useState([]);
  const [selectedConvId, setSelectedConvId] = useState(paramConvId || null);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingThread, setLoadingThread] = useState(false);

  const messagesEndRef = useRef(null);

  const fetchConversations = useCallback(async () => {
    try {
      setLoadingList(true);
      const res = await api.get('/conversations');
      setConversations(res.data.data);
      if (!selectedConvId && res.data.data.length > 0) {
        setSelectedConvId(res.data.data[0]._id);
      }
    } catch (err) {
      console.error('Failed to load conversations', err);
    } finally {
      setLoadingList(false);
    }
  }, [selectedConvId]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const fetchActiveThread = useCallback(async (convId) => {
    if (!convId) return;
    try {
      setLoadingThread(true);
      const res = await api.get(`/conversations/${convId}`);
      setActiveConversation(res.data.data.conversation);
      setMessages(res.data.data.messages);
    } catch (err) {
      showToast(err.message || 'Failed to load conversation thread', 'error');
    } finally {
      setLoadingThread(false);
    }
  }, [showToast]);

  useEffect(() => {
    if (selectedConvId) {
      fetchActiveThread(selectedConvId);
    }
  }, [selectedConvId, fetchActiveThread]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConvId) return;

    try {
      setSending(true);
      const res = await api.post(`/conversations/${selectedConvId}/messages`, {
        body: newMessage.trim()
      });
      setMessages((prev) => [...prev, res.data.data]);
      setNewMessage('');
      fetchConversations();
    } catch (err) {
      showToast(err.message || 'Failed to send message', 'error');
    } finally {
      setSending(false);
    }
  };

  const handleUpdateDealStatus = async (newStatus) => {
    try {
      await api.patch(`/conversations/${selectedConvId}/deal`, { status: newStatus });
      showToast(`Deal status updated: ${newStatus}`, 'success');
      fetchActiveThread(selectedConvId);
    } catch (err) {
      showToast(err.message || 'Failed to update deal status', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-surface border border-surface-container rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px] h-[calc(100vh-200px)]">
        {/* Left Pane: Conversations List (4 cols) */}
        <div className="md:col-span-4 border-r border-surface-container flex flex-col h-full bg-surface-container-low/40">
          <div className="p-4 border-b border-surface-container">
            <h2 className="font-extrabold text-base text-on-surface">Messages & Inquiries</h2>
            <p className="text-[11px] text-on-surface-variant">Direct buyer and seller communications</p>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-surface-container">
            {loadingList ? (
              <div className="p-6 text-center text-xs text-on-surface-variant">Loading conversations...</div>
            ) : conversations.length === 0 ? (
              <div className="p-8 text-center text-xs text-on-surface-variant space-y-2">
                <MessagesSquare className="w-10 h-10 text-outline mx-auto" />
                <p>No active conversations yet.</p>
                <Link to="/browse" className="inline-block text-secondary font-bold hover:underline">
                  Browse phones to make an inquiry
                </Link>
              </div>
            ) : (
              conversations.map((c) => {
                const otherParty = String(c.buyerId?._id) === String(user?._id) ? c.sellerId : c.buyerId;
                const isSelected = selectedConvId === c._id;
                return (
                  <button
                    key={c._id}
                    type="button"
                    onClick={() => setSelectedConvId(c._id)}
                    className={`w-full text-left p-3.5 flex items-start gap-3 transition-colors ${
                      isSelected ? 'bg-surface-container-high border-l-4 border-secondary' : 'hover:bg-surface-container'
                    }`}
                  >
                    <img
                      src={
                        otherParty?.avatarUrl ||
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
                      }
                      alt={otherParty?.name || 'User'}
                      className="w-10 h-10 rounded-full object-cover shrink-0 border border-outline-variant"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-on-surface truncate">{otherParty?.name}</span>
                        <span className="text-[10px] text-on-surface-variant">
                          {new Date(c.lastMessageAt || c.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-[11px] font-semibold text-secondary truncate mt-0.5">
                        {c.listingId?.title}
                      </p>
                      <p className="text-xs text-on-surface-variant truncate mt-0.5">
                        {c.lastMessage || 'No messages yet'}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Pane: Active Chat Thread (8 cols) */}
        <div className="md:col-span-8 flex flex-col h-full bg-surface">
          {activeConversation ? (
            <>
              {/* Thread Header */}
              <div className="p-4 border-b border-surface-container flex items-center justify-between gap-4 bg-surface-container-low/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-container overflow-hidden p-1 shrink-0 border border-surface-container">
                    <img
                      src={activeConversation.listingId?.images?.[0] || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=100&q=80'}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <Link
                      to={`/listings/${activeConversation.listingId?._id}`}
                      className="font-bold text-xs text-on-surface hover:text-secondary transition-colors block truncate max-w-sm"
                    >
                      {activeConversation.listingId?.title}
                    </Link>
                    <div className="flex items-center gap-2 text-[11px] text-on-surface-variant">
                      <span>Listing Price: <strong className="text-on-surface">${activeConversation.listingId?.price?.toLocaleString()}</strong></span>
                      {activeConversation.proposedPrice && (
                        <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-bold text-[10px]">
                          Proposed Offer: ${activeConversation.proposedPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Deal Status Actions */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant">Status:</span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-surface-container text-on-surface border border-surface-container-high">
                    {activeConversation.status}
                  </span>
                  {activeConversation.status === 'OPEN' && (
                    <button
                      type="button"
                      onClick={() => handleUpdateDealStatus('RESERVED')}
                      className="px-2.5 py-1 rounded-xl bg-surface-container-high text-on-surface border border-outline text-xs font-bold hover:bg-surface-container transition-colors"
                    >
                      Agree & Reserve
                    </button>
                  )}
                </div>
              </div>

              {/* Safety notice strip inside chat */}
              <div className="bg-surface-container-low border-b border-surface-container px-4 py-2 text-[11px] text-on-surface-variant flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-secondary shrink-0" />
                  <strong>Safety reminder:</strong> Settle payment directly in person after hardware inspection. MobileMart does not hold funds.
                </span>
                <Link to="/safety-guidelines" className="text-secondary font-bold hover:underline shrink-0 ml-2">
                  Guidelines
                </Link>
              </div>

              {/* Message Thread Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {loadingThread ? (
                  <div className="text-center text-xs text-on-surface-variant py-8">Loading message history...</div>
                ) : (
                  messages.map((m) => {
                    const isMe = String(m.senderId?._id || m.senderId) === String(user?._id);
                    return (
                      <div
                        key={m._id}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-md rounded-2xl px-4 py-2.5 text-xs ${
                            isMe
                              ? 'bg-accent text-white rounded-br-none shadow-sm'
                              : 'bg-surface-container-high text-on-surface rounded-bl-none'
                          }`}
                        >
                          <p className="leading-relaxed whitespace-pre-wrap">{m.body}</p>
                        </div>
                        <span className="text-[9px] text-on-surface-variant mt-1 px-1">
                          {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Send Box */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-surface-container flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type your message, ask a question, or arrange a public meetup..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 bg-surface-container-low border border-surface-container rounded-xl px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-secondary"
                />
                <button
                  type="submit"
                  disabled={sending || !newMessage.trim()}
                  className="px-4 py-2.5 rounded-xl bg-accent text-white font-bold text-xs hover:opacity-90 disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-on-surface-variant space-y-2">
              <MessageSquare className="w-12 h-12 text-outline mx-auto" />
              <p className="font-bold text-sm text-on-surface">Select a conversation</p>
              <p className="text-xs">Choose an inquiry thread from the left pane to view messages.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationsPage;
