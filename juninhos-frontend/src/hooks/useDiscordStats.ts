import { useEffect, useState } from 'react';

export interface DiscordStats {
  total: number | null;
  online: number | null;
  loading: boolean;
}

interface WidgetResponse {
  presence_count: number;
  instant_invite: string | null;
}

interface InviteResponse {
  approximate_member_count?: number;
  approximate_presence_count?: number;
}

const REFRESH_INTERVAL_MS = 10 * 60 * 1000; //10 min

export function useDiscordStats(guildId: string | undefined): DiscordStats {
  const [stats, setStats] = useState<DiscordStats>({
    total: null,
    online: null,
    loading: true,
  });

  useEffect(() => {
    if (!guildId) {
      setStats({ total: null, online: null, loading: false });
      return;
    }

    let cancelled = false;

    const load = async () => {
      try {
        const widgetRes = await fetch(`https://discord.com/api/guilds/${guildId}/widget.json`);
        if (!widgetRes.ok) throw new Error('Widget API failed (widget enabled?)');
        const widget = (await widgetRes.json()) as WidgetResponse;

        let total: number | null = null;
        if (widget.instant_invite) {
          const code = widget.instant_invite.split('/').pop();
          if (code) {
            const inviteRes = await fetch(
              `https://discord.com/api/v10/invites/${code}?with_counts=true`,
            );
            if (inviteRes.ok) {
              const invite = (await inviteRes.json()) as InviteResponse;
              total = invite.approximate_member_count ?? null;
            }
          }
        }

        if (!cancelled) {
          setStats({ total, online: widget.presence_count, loading: false });
        }
      } catch {
        if (!cancelled) {
          setStats({ total: null, online: null, loading: false });
        }
      }
    };

    load();
    const intervalId = window.setInterval(load, REFRESH_INTERVAL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [guildId]);

  return stats;
}
