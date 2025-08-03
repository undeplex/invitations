// Nouvelle fonction de tracking (à mettre dans un fichier séparé lib/tracking.ts)
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://htotfyduudyoephuixzu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0b3RmeWR1dWR5b2VwaHVpeHp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NjQ4MzEsImV4cCI6MjA2NTM0MDgzMX0.YbdxwuXTiWwPNdQE_HERJp5hnz4P0hyS19M37CYwvXs'
);

export const trackLinkOpening = async (linkId: string) => {
  // Ne rien faire si on est côté serveur
  if (typeof window === 'undefined') return;

  try {
    // Vérifier si déjà tracké dans cette session
    const sessionKey = `tracked_${linkId}`;
    if (sessionStorage.getItem(sessionKey)) return;

    // Préparer les données
    const trackingData = {
      link_id: linkId,
      user_agent: navigator.userAgent,
      referrer: document.referrer || 'direct',
      page_url: window.location.href
    };

    // Deux méthodes de tracking pour plus de fiabilité
    // Méthode 1: Appel RPC
    await supabase.rpc('increment_link_opening', trackingData);

    // Méthode 2: Insertion directe
    await supabase
      .from('link_openings')
      .upsert({
        ...trackingData,
        open_count: 1,
        first_opened: new Date().toISOString(),
        last_opened: new Date().toISOString()
      }, {
        onConflict: 'link_id'
      });

    // Marquer comme tracké
    sessionStorage.setItem(sessionKey, 'true');
  } catch (error) {
    console.error('Tracking error:', error);
  }
};