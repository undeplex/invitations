export async function generateMetadata({ searchParams }: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return {
    openGraph: {
      images: [
        {
          url: '/danz.webp', // Chemin relatif depuis public/
          width: 1200,
          height: 630,
          alt: 'Invitation mariage',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/danz.webp'],
    },
  };
}
