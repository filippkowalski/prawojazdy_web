'use client';

interface QuestionMediaThumbnailProps {
  media: string;
  size?: 'sm' | 'md' | 'lg';
}

export function QuestionMediaThumbnail({ media, size = 'md' }: QuestionMediaThumbnailProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
  };

  const thumbnailPath = `/thumbnails/${media.replace(/\.(mp4|wmv)$/, '.jpg')}`;

  return (
    <div className={`${sizeClasses[size]} flex-shrink-0 rounded overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center`}>
      <img
        src={thumbnailPath}
        alt="Question media"
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          // Fallback if thumbnail doesn't exist
          e.currentTarget.style.display = 'none';
          if (e.currentTarget.parentElement) {
            e.currentTarget.parentElement.innerHTML = '<div class="text-xs text-zinc-500">📷</div>';
          }
        }}
      />
    </div>
  );
}
