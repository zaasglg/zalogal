import { AdBanner } from '@/components/ad-banner';
import { CategoriesSection } from '@/components/categories-section';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { NewsSection } from '@/components/news-section';
import { NewsletterSection } from '@/components/newsletter-section';
import { OrganizationsSection } from '@/components/organizations-section';
import { ProductsSection } from '@/components/products-section';
import { Head } from '@inertiajs/react';

interface Listing {
    id: number;
    title: string;
    price: number;
    category: string;
    images: string[] | null;
    is_favorited?: boolean;
    description?: string;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    image: string | null;
}

interface Seller {
    id: number;
    name: string;
}

interface OrganizationStats {
    total: number;
    active: number;
}

interface ListingWithUser extends Listing {
    user?: {
        id: number;
        name: string;
        profile_photo_url?: string; // Assuming standard Jetstream/Fortify feature or accessor
    };
}

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

interface Props {
    listings: Listing[];
    categories: Category[];
    sellers: Seller[];
    organizationListings: ListingWithUser[];
    organizationStats: OrganizationStats;
    posts: Post[];
}

export default function Welcome({
    listings,
    categories,
    sellers,
    organizationListings,
    organizationStats,
    posts
}: Props) {
    return (
        <>
            <Head title="Добро пожаловать в портал заголовые имущества">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <Header />
            <HeroSection listings={listings} sellers={sellers} />
            <CategoriesSection categories={categories} />
            <ProductsSection listings={listings} />
            <AdBanner />
            <OrganizationsSection listings={organizationListings} stats={organizationStats} />
            <NewsSection posts={posts} />
            <NewsletterSection />
            <Footer />
        </>
    );
}
