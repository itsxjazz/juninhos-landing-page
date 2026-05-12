const cardClass =
  'bg-surface rounded-xl p-6 border-2 border-surface-alt h-full';
const shimmerBg =
  'bg-[linear-gradient(90deg,var(--color-surface)_25%,var(--color-surface-alt)_50%,var(--color-surface)_75%)] bg-[length:200%_100%] [animation:var(--animate-skeleton)]';

export function SkeletonCards({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={cardClass}>
          <div className={`w-full h-[200px] rounded-md mb-4 ${shimmerBg}`} />
          <div className={`w-[60%] h-6 rounded mb-4 ${shimmerBg}`} />
          <div className={`w-full h-16 rounded ${shimmerBg}`} />
        </div>
      ))}
    </>
  );
}
