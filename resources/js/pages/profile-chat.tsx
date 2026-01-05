import { ProfileSidebar } from '@/components/profile-sidebar';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Head } from '@inertiajs/react';
import { Search, Phone, Video, MoreVertical, Mic, Paperclip, Send } from 'lucide-react';
import { useState } from 'react';

const contacts = [
    {
        id: 1,
        name: 'Grace Miller',
        avatar: 'https://i.pravatar.cc/150?img=1',
        lastMessage: 'That sounds like a great plan! Excited 😊',
        time: '10:30 AM',
        online: true,
        unread: 0,
    },
    {
        id: 2,
        name: 'Sophia Chen',
        avatar: 'https://i.pravatar.cc/150?img=5',
        lastMessage: 'Remember that concert ad y...',
        time: '07:23 PM',
        online: false,
        unread: 0,
    },
    {
        id: 3,
        name: 'Benjamin Knight',
        avatar: 'https://i.pravatar.cc/150?img=12',
        lastMessage: 'Just got back from a hiking trip!',
        time: '06:45 PM',
        online: false,
        unread: 1,
    },
    {
        id: 4,
        name: 'Olivia Foster',
        avatar: 'https://i.pravatar.cc/150?img=9',
        lastMessage: 'I\'m excited for the upcoming vac...',
        time: 'Yesterday',
        online: false,
        unread: 0,
    },
    {
        id: 5,
        name: 'Jackson Adams',
        avatar: 'https://i.pravatar.cc/150?img=13',
        lastMessage: 'Looking forward to the weekend...',
        time: 'Yesterday',
        online: false,
        unread: 0,
    },
    {
        id: 6,
        name: 'Ethan Sullivan',
        avatar: 'https://i.pravatar.cc/150?img=14',
        lastMessage: 'Finished reading a captivating no...',
        time: 'Yesterday',
        online: false,
        unread: 0,
    },
];

const messages = [
    {
        id: 1,
        sender: 'Jack Raymonds',
        text: 'Hey Grace, how\'s it going?',
        time: '10:45 AM',
        isMine: true,
    },
    {
        id: 2,
        sender: 'Grace Miller',
        text: 'Hi Jack! I\'m doing well, thanks. Can\'t wait for the weekend!',
        time: '10:28 AM',
        isMine: false,
    },
    {
        id: 3,
        sender: 'Jack Raymonds',
        text: 'I know, right? Weekend plans are the best. Any exciting plans on your end?',
        time: '10:30 AM',
        isMine: true,
    },
    {
        id: 4,
        sender: 'Grace Miller',
        text: 'Absolutely! I\'m thinking of going for a hike on Saturday. How about you?',
        time: '10:28 AM',
        isMine: false,
    },
    {
        id: 5,
        sender: 'Jack Raymonds',
        text: 'Hiking sounds amazing! I might catch up on some reading and also meet up with a few friends on Sunday.',
        time: '10:33 AM',
        isMine: true,
    },
    {
        id: 6,
        sender: 'Grace Miller',
        text: 'That sounds like a great plan! Excited 😊',
        time: '10:30 AM',
        isMine: false,
    },
    {
        id: 7,
        sender: 'Jack Raymonds',
        text: 'Can\'t wait for the weekend!',
        time: '10:48 AM',
        isMine: true,
    },
];

export default function ProfileChat() {
    const [selectedContact, setSelectedContact] = useState(contacts[0]);

    return (
        <>
            <Head title="Чат - Zalogal" />
            <Header />

            <div className="bg-[#F2F4F5] py-4">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Breadcrumbs
                        breadcrumbs={[
                            { title: 'Главная', href: '/' },
                            { title: 'User Account', href: '/profile' },
                            { title: 'Dashboard', href: '/dashboard' },
                            { title: 'Cards & Address', href: '' },
                        ]}
                    />
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-3 order-1 lg:order-1">
                        <ProfileSidebar />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9 order-2 lg:order-2">
                        <div className="flex flex-col md:grid md:grid-cols-12 gap-0 bg-white rounded-lg border border-gray-200 h-auto md:h-[700px] shadow-sm overflow-hidden">
                            {/* Contacts List */}
                            <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col h-[350px] md:h-full bg-gray-50 md:bg-white">
                                {/* Search */}
                                <div className="p-4 border-b border-gray-200">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Search messages, people"
                                            className="pl-10 h-11 rounded-sm border-gray-200"
                                        />
                                    </div>
                                </div>

                                {/* All Messages Header */}
                                <div className="px-4 py-3 border-b border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#FA8232] rounded-full"></div>
                                        <span className="text-sm font-medium text-gray-900">All Messages</span>
                                    </div>
                                </div>

                                {/* Contact List */}
                                <div className="flex-1 overflow-y-auto">
                                    {contacts.map((contact) => (
                                        <div
                                            key={contact.id}
                                            onClick={() => setSelectedContact(contact)}
                                            className={`flex items-start gap-3 p-4 cursor-pointer transition-colors ${selectedContact.id === contact.id
                                                ? 'bg-[#FA8232] text-white'
                                                : 'hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="relative flex-shrink-0">
                                                <img
                                                    src={contact.avatar}
                                                    alt={contact.name}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                                {contact.online && (
                                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h3
                                                        className={`text-sm font-semibold truncate ${selectedContact.id === contact.id
                                                            ? 'text-white'
                                                            : 'text-gray-900'
                                                            }`}
                                                    >
                                                        {contact.name}
                                                    </h3>
                                                    <span
                                                        className={`text-xs flex-shrink-0 ${selectedContact.id === contact.id
                                                            ? 'text-white/80'
                                                            : 'text-gray-500'
                                                            }`}
                                                    >
                                                        {contact.time}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <p
                                                        className={`text-sm truncate ${selectedContact.id === contact.id
                                                            ? 'text-white/90'
                                                            : 'text-gray-600'
                                                            }`}
                                                    >
                                                        {contact.lastMessage}
                                                    </p>
                                                    {contact.unread > 0 && (
                                                        <span className="flex-shrink-0 ml-2 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                                                            {contact.unread}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Chat Area */}
                            <div className="md:col-span-8 flex flex-col h-[500px] md:h-full">
                                {/* Chat Header */}
                                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <img
                                                src={selectedContact.avatar}
                                                alt={selectedContact.name}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            {selectedContact.online && (
                                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-900">
                                                {selectedContact.name}
                                            </h3>
                                            <p className="text-xs text-gray-500">
                                                {selectedContact.online ? 'Online' : 'Offline'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                                            <Phone className="h-5 w-5 text-gray-600" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                                            <Video className="h-5 w-5 text-gray-600" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                                            <MoreVertical className="h-5 w-5 text-gray-600" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex gap-3 ${message.isMine ? 'justify-end' : 'justify-start'}`}
                                        >
                                            {!message.isMine && (
                                                <img
                                                    src={selectedContact.avatar}
                                                    alt={message.sender}
                                                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                                />
                                            )}
                                            <div className={`flex flex-col ${message.isMine ? 'items-end' : 'items-start'}`}>
                                                <div
                                                    className={`max-w-md px-4 py-3 rounded-lg ${message.isMine
                                                        ? 'bg-[#2B6B8F] text-white'
                                                        : 'bg-gray-100 text-gray-900'
                                                        }`}
                                                >
                                                    <p className="text-sm">{message.text}</p>
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs text-gray-500">{message.time}</span>
                                                    <span className="text-xs text-gray-500">{message.sender}</span>
                                                </div>
                                            </div>
                                            {message.isMine && (
                                                <img
                                                    src="https://i.pravatar.cc/150?img=33"
                                                    alt={message.sender}
                                                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Message Input */}
                                <div className="p-4 border-t border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full flex-shrink-0">
                                            <Mic className="h-5 w-5 text-gray-600" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full flex-shrink-0">
                                            <Paperclip className="h-5 w-5 text-gray-600" />
                                        </Button>
                                        <Input
                                            placeholder="Введите сообщение..."
                                            className="flex-1 h-11 rounded-sm border-gray-200"
                                        />
                                        <Button className="bg-[#2B6B8F] hover:bg-[#235570] text-white h-11 px-6 rounded-sm flex items-center gap-2">
                                            Send
                                            <Send className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
