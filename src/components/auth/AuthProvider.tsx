"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import LoginDialog from "./LoginDialog";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isConfigured: boolean;
  supabase: SupabaseClient | null;
  /**
   * Yêu cầu đăng nhập để chạy một hành động.
   * - Đã đăng nhập → chạy `action` ngay.
   * - Chưa đăng nhập → mở pop-up đăng nhập, chạy `action` sau khi đăng nhập xong.
   */
  requireAuth: (action?: () => void) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth phải dùng bên trong <AuthProvider>");
  return ctx;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const supabaseRef = useRef<SupabaseClient | null>(
    isSupabaseConfigured ? createClient() : null,
  );
  const supabase = supabaseRef.current;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const pendingRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  const requireAuth = useCallback(
    (action?: () => void) => {
      if (user) {
        action?.();
        return;
      }
      pendingRef.current = action ?? null;
      setDialogOpen(true);
    },
    [user],
  );

  const handleAuthed = useCallback(() => {
    setDialogOpen(false);
    const action = pendingRef.current;
    pendingRef.current = null;
    action?.();
  }, []);

  const signOut = useCallback(async () => {
    await supabase?.auth.signOut();
    setUser(null);
  }, [supabase]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      isConfigured: Boolean(supabase),
      supabase,
      requireAuth,
      signOut,
    }),
    [user, loading, supabase, requireAuth, signOut],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      <LoginDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onAuthed={handleAuthed}
        supabase={supabase}
      />
    </AuthContext.Provider>
  );
}
