import type { Metadata } from 'next';

export const siteConfig = {
  name: '원동휘',
  description: '원동휘의 개인 블로그',
  defaultOgImage: '/images/profile.webp',
} as const;

const buildMetadataTitle = (title: string) => {
  return title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
};

interface BaseMetadataParams {
  title: string;
  description?: string;
  images?: string[];
  absoluteTitle?: boolean;
}

interface ArticleMetadataParams extends BaseMetadataParams {
  authors?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

export const createPageMetadata = ({
  title,
  description = siteConfig.description,
  images = [siteConfig.defaultOgImage],
  absoluteTitle = false,
}: BaseMetadataParams): Metadata => {
  const resolvedTitle = absoluteTitle ? title : buildMetadataTitle(title);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    openGraph: {
      type: 'website',
      title: resolvedTitle,
      description,
      siteName: siteConfig.name,
      locale: 'ko_KR',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description,
      images,
    },
  };
};

export const createArticleMetadata = ({
  title,
  description = siteConfig.description,
  images = [siteConfig.defaultOgImage],
  absoluteTitle = false,
  authors,
  publishedTime,
  modifiedTime,
  tags,
}: ArticleMetadataParams): Metadata => {
  const resolvedTitle = absoluteTitle ? title : buildMetadataTitle(title);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    openGraph: {
      type: 'article',
      title: resolvedTitle,
      description,
      siteName: siteConfig.name,
      locale: 'ko_KR',
      images,
      authors,
      publishedTime,
      modifiedTime,
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description,
      images,
    },
  };
};
