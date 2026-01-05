import { Breadcrumbs } from '@/components/breadcrumbs';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Input } from '@/components/ui/input';
import { Head, Link, router } from '@inertiajs/react';
import { Calendar, User, MessageCircle, ArrowRight, Search, FileText } from 'lucide-react';
import { useState } from 'react';

// Removed dummy data arrays

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  image: string | null;
  published_at: string | null;
  user: {
    name: string;
  };
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PostsData {
  data: Post[];
  current_page: number;
  last_page: number;
  links: PaginationLink[];
  per_page: number;
  total: number;
}

interface BlogProps {
  posts: PostsData;
  latestPosts: Post[];
  filters: {
    search?: string;
  };
}

export default function Blog({ posts, latestPosts, filters }: BlogProps) {
  const [searchTerm, setSearchTerm] = useState(filters?.search || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get('/blog', { search: searchTerm }, { preserveState: true });
  };

  return (
    <>
      <Head title="Новости и Блог - Zalogal" />
      <Header />
      <div className="bg-[#F2F4F5] py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            breadcrumbs={[
              { title: 'Главная', href: '/' },
              { title: 'Блог', href: '' },
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
                {latestPosts.map((post) => (
                  <Link href={`/blog/${post.id}`} key={post.id} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                      {post.image ? (
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50">
                          <FileText className="h-6 w-6 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-[#FA8232] transition-colors">{post.title}</h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.published_at
                          ? new Date(post.published_at).toLocaleDateString('ru-RU', {
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

          {/* Blog Posts - Order 1 on mobile, Order 2 on large screens */}
          <div className="lg:col-span-9 order-1 lg:order-2">
            {posts.data.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {posts.data.map((post) => (
                    <div key={post.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
                      <div className="h-64 w-full bg-gray-100 relative overflow-hidden">
                        {post.image ? (
                          <div
                            className="w-full h-full bg-center bg-cover transform group-hover:scale-105 transition-transform duration-500"
                            style={{ backgroundImage: `url('${post.image}')` }}
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-gray-400">
                            <FileText className="w-12 h-12 opacity-20" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="bg-[#FA8232] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            Блог
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-4 mb-4 text-xs font-medium text-gray-500 border-b border-gray-100 pb-4">
                          <div className="flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5 text-[#FA8232]" />
                            <span className="truncate max-w-[100px]">{post.user.name}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-[#FA8232]" />
                            <span>
                              {post.published_at
                                ? new Date(post.published_at).toLocaleDateString('ru-RU', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric'
                                })
                                : ''}
                            </span>
                          </div>
                          {/* Comments placeholder -- Optional, keeping to match functionality from before if needed */}
                          {/* <div className="flex items-center gap-1.5 ml-auto">
                            <MessageCircle className="h-3.5 w-3.5 text-[#FA8232]" />
                            <span>0</span>
                          </div> */}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#FA8232] transition-colors">{post.title}</h3>
                        <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">{post.excerpt}</p>
                        <Link href={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-[#FA8232] font-bold text-sm hover:gap-3 transition-all mt-auto group/link">
                          ЧИТАТЬ ПОЛНОСТЬЮ
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {posts.last_page > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    {posts.links.map((link, i) => (
                      link.url ? (
                        <Link
                          key={i}
                          href={link.url}
                          preserveScroll
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${link.active
                            ? 'bg-[#FA8232] text-white shadow-md shadow-orange-200'
                            : 'bg-white border border-gray-200 text-gray-600 hover:border-[#FA8232] hover:text-[#FA8232]'
                            }`}
                          dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                      ) : (
                        <span
                          key={i}
                          className="w-10 h-10 rounded-full border border-gray-100 bg-gray-50 flex items-center justify-center text-gray-400 cursor-not-allowed opacity-60"
                          dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                      )
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 bg-white rounded-lg border border-dashed border-gray-300">
                <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <FileText className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Новостей пока нет</h3>
                <p className="text-gray-500 text-center max-w-sm">Мы работаем над интересными материалами. Загляните к нам позже!</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* footer removed from here to match structure, will be closed by } */}
      <Footer />
    </>
  );
}
