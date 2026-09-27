import { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock, Newspaper, Search } from 'lucide-react';
import { blogCategories } from '@shared/content.js';
import { formatDate } from '@/lib/format';
import { useSeo } from '@/hooks/useSeo';
import { usePost, usePosts } from '@/hooks/useContent';
import { PageHero } from '@/components/layout/SiteLayout';
import Button from '@/components/ui/Button';
import Cover from '@/components/ui/Cover';
import Reveal from '@/components/ui/Reveal';
import { Avatar, Badge } from '@/components/ui/Misc';
import { CardSkeletons, EmptyState, ErrorState, PageLoader } from '@/components/ui/States';
import { PostCard } from '@/components/cards';
import { CategoryFilter } from './Projects';

export default function Blog() {
  useSeo('Blog', 'Technology insights on AI, software development, education, careers and digital transformation.');
  const { data: posts = [], loading, error, reload } = usePosts();
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState('');
  const category = params.get('category') || 'All';

  const filtered = useMemo(
    () =>
      posts.filter(
        (p) =>
          (category === 'All' || p.category === category) &&
          (!q || `${p.title} ${p.excerpt}`.toLowerCase().includes(q.toLowerCase()))
      ),
    [posts, category, q]
  );
  const [featured, ...rest] = filtered;

  return (
    <>
      <PageHero eyebrow="Technology Insights" title="The HornaAI Blog" text="Guides, perspectives and updates on technology, learning and building in Africa.">
        <label className="relative mx-auto mt-8 block max-w-md">
          <span className="sr-only">Search articles</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} className="input h-12 rounded-full pl-11" placeholder="Search articles…" />
        </label>
        <div className="mt-6">
          <CategoryFilter categories={blogCategories} active={category} onChange={(c) => setParams(c === 'All' ? {} : { category: c }, { replace: true })} />
        </div>
      </PageHero>

      <section className="pb-24">
        <div className="container">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-3">
              <CardSkeletons count={3} className="h-96" />
            </div>
          ) : error ? (
            <ErrorState message={error.message} onRetry={reload} />
          ) : !filtered.length ? (
            <EmptyState icon={Newspaper} title="No articles found" text="Try another category or search term." />
          ) : (
            <>
              <Reveal>
                <Link to={`/blog/${featured.slug}`} className="card card-hover group grid overflow-hidden md:grid-cols-2">
                  <Cover image={featured.image} seed={featured.slug} icon="Sparkles" className="aspect-[16/10] md:aspect-auto md:h-full" iconClassName="h-16 w-16" />
                  <div className="flex flex-col justify-center p-8 lg:p-12">
                    <div className="flex items-center gap-3 text-sm text-navy-500">
                      <Badge>{featured.category}</Badge>
                      <span>{formatDate(featured.publishedAt)}</span>
                    </div>
                    <h2 className="mt-4 text-2xl font-bold group-hover:text-brand-700 lg:text-3xl">{featured.title}</h2>
                    <p className="mt-3 text-navy-600">{featured.excerpt}</p>
                    <span className="link-arrow mt-6">
                      Read Article <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((p, i) => (
                  <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                    <PostCard post={p} />
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const { data: post, loading, error } = usePost(slug);
  const { data: all = [] } = usePosts();
  useSeo(post?.title || 'Article', post?.excerpt);

  if (loading) return <div className="pt-32"><PageLoader /></div>;
  if (error || !post)
    return (
      <div className="container pb-24 pt-36">
        <ErrorState title="Article not found" message="This article may have been moved or unpublished." />
        <div className="mt-6 text-center">
          <Link to="/blog" className="link-arrow">
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>
        </div>
      </div>
    );

  const related = all.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article>
      <header className="pb-10 pt-32 sm:pt-36">
        <div className="container max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-navy-500 hover:text-navy-900">
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>
          <Badge className="mt-6">{post.category}</Badge>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">{post.title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-navy-500">
            <span className="flex items-center gap-2">
              <Avatar name={post.author} className="h-8 w-8 text-xs" /> {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {formatDate(post.publishedAt)}
            </span>
            {post.readTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {post.readTime}
              </span>
            )}
          </div>
        </div>
      </header>
      <div className="container max-w-4xl">
        <Cover image={post.image} seed={post.slug} icon="Sparkles" className="aspect-[16/8] rounded-3xl" iconClassName="h-16 w-16" />
      </div>
      <div className="container prose-body max-w-3xl py-14 text-lg">
        {(post.content || post.excerpt).split('\n\n').map((para) => (
          <p key={para}>{para}</p>
        ))}
      </div>
      {related.length > 0 && (
        <section className="border-t border-navy-100 bg-navy-50/60 py-20">
          <div className="container">
            <div className="flex items-end justify-between">
              <h2 className="text-2xl font-bold">More insights</h2>
              <Button to="/blog" variant="secondary" size="sm" iconRight={ArrowRight}>
                Explore All Articles
              </Button>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
