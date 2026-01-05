import { Breadcrumbs } from '@/components/breadcrumbs';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Calendar, User, MessageCircle, ArrowRight, Search, FileText } from 'lucide-react';
import { useState } from 'react';

interface Comment {
  id: number;
  author_name: string;
  content: string;
  created_at: string;
  user?: {
    name: string;
  };
}

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image: string | null;
  published_at: string | null;
  user: {
    name: string;
  };
  comments: Comment[];
}

interface BlogDetailProps {
  post: Post;
  latestPosts: Post[];
}

export default function BlogDetail({ post, latestPosts }: BlogDetailProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [commentForm, setCommentForm] = useState({
    author_name: '',
    author_email: '',
    content: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get('/blog', { search: searchTerm });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    router.post(`/blog/${post.id}/comments`, commentForm, {
      onSuccess: () => {
        setCommentForm({ author_name: '', author_email: '', content: '' });
        setIsSubmitting(false);
      },
      onError: () => {
        setIsSubmitting(false);
      }
    });
  };

  const user = usePage().props.auth.user;

  return (
    <>
      <Head title={`${post.title} - Zalogal`} />
      <Header />
      <div className="bg-[#F2F4F5] py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            breadcrumbs={[
              { title: 'Главная', href: '/' },
              { title: 'Блог', href: '/blog' },
              { title: 'Детали блога', href: '' },
            ]}
          />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar - Order 2 on mobile, Order 1 on large screens */}
          <div className="lg:col-span-3 space-y-8 order-2 lg:order-1">
            {/* Search */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold mb-4 text-gray-900">ПОИСК</h3>
              <form onSubmit={handleSearch} className="relative">
                <Input
                  placeholder="Поиск..."
                  className="pr-10 h-11"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="absolute right-3 top-3 text-gray-400 hover:text-[#FA8232] transition-colors">
                  <Search className="h-5 w-5" />
                </button>
              </form>
            </div>

            {/* Latest Blog */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold mb-4 text-gray-900">ПОСЛЕДНИЕ НОВОСТИ</h3>
              <div className="space-y-4">
                {latestPosts.map((latestPost) => (
                  <Link href={`/blog/${latestPost.id}`} key={latestPost.id} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                      {latestPost.image ? (
                        <img src={latestPost.image} alt={latestPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50">
                          <FileText className="h-6 w-6 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-[#FA8232] transition-colors">{latestPost.title}</h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {latestPost.published_at
                          ? new Date(latestPost.published_at).toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })
                          : ''}
                      </p>
                    </div>
                  </Link>
                ))}
                {latestPosts.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">Нет последних новостей</p>
                )}
              </div>
            </div>
          </div>

          {/* Blog Content - Order 1 on mobile, Order 2 on large screens */}
          <div className="lg:col-span-9 order-1 lg:order-2">
            {/* Featured Image */}
            {post.image ? (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-[250px] md:h-[400px] object-cover rounded-xl mb-6 shadow-sm"
              />
            ) : (
              <div className="w-full h-[250px] md:h-[400px] bg-gray-100 rounded-xl mb-6 flex items-center justify-center border border-gray-200">
                <FileText className="h-20 w-20 text-gray-300" />
              </div>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
              <Badge variant="outline" className="bg-orange-50 text-[#FA8232] border-[#FA8232]/20 hover:bg-orange-100 px-3 py-1">
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                Новости
              </Badge>
              <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 px-3 py-1">
                <User className="h-3.5 w-3.5 mr-1.5" />
                {post.user.name}
              </Badge>
              <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 px-3 py-1">
                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                {post.published_at
                  ? new Date(post.published_at).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })
                  : ''}
              </Badge>
              <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 px-3 py-1">
                <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
                {post.comments.length} коммент.
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Content */}
            <div className="prose prose-lg max-w-none text-gray-700 mb-12 prose-headings:text-gray-900 prose-a:text-[#FA8232] prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg" dangerouslySetInnerHTML={{ __html: post.content }} />

            {/* Comments Section */}
            <div className="border-t border-gray-200 pt-10 mt-10">
              <h3 className="text-2xl font-bold mb-8 text-gray-900">Комментарии ({post.comments.length})</h3>

              <div className="space-y-6 mb-10">
                {post.comments.length > 0 ? (
                  post.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4 p-6 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <User className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                          <h4 className="font-bold text-gray-900 text-lg">
                            {comment.user ? comment.user.name : comment.author_name}
                          </h4>
                          <span className="text-sm text-gray-500">
                            {new Date(comment.created_at).toLocaleDateString('ru-RU', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <MessageCircle className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">Пока нет комментариев. Будьте первыми!</p>
                  </div>
                )}
              </div>

              {/* Leave a Comment Form */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Оставить комментарий</h3>
                <form onSubmit={handleCommentSubmit} className="space-y-5">
                  {!user && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label htmlFor="author_name" className="text-sm font-medium text-gray-700">Ваше имя <span className="text-red-500">*</span></label>
                        <Input
                          id="author_name"
                          placeholder="Введите ваше имя"
                          value={commentForm.author_name}
                          onChange={(e) => setCommentForm({ ...commentForm, author_name: e.target.value })}
                          required
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="author_email" className="text-sm font-medium text-gray-700">Email адрес <span className="text-red-500">*</span></label>
                        <Input
                          id="author_email"
                          placeholder="example@mail.com"
                          type="email"
                          value={commentForm.author_email}
                          onChange={(e) => setCommentForm({ ...commentForm, author_email: e.target.value })}
                          required
                          className="h-11"
                        />
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <label htmlFor="content" className="text-sm font-medium text-gray-700">Комментарий <span className="text-red-500">*</span></label>
                    <textarea
                      id="content"
                      placeholder="Напишите ваш комментарий здесь..."
                      rows={5}
                      className="flex w-full rounded-md border border-input bg-background px-3 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y min-h-[120px]"
                      value={commentForm.content}
                      onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-[#FA8232] text-white hover:bg-[#E97527] h-12 px-8 text-base font-semibold w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'ОТПРАВКА...' : 'ОПУБЛИКОВАТЬ КОММЕНТАРИЙ'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
