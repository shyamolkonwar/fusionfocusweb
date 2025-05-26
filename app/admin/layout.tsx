"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  FileText, 
  PenTool, 
  Settings, 
  LogOut,
  Menu,
  X,
  ChevronDown,
  Layers,
  Mail
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/auth-helpers-nextjs";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Check authentication on component mount
  useEffect(() => {
    async function checkAuth() {
      try {
        setIsMounted(true);
        
        // Get current session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !sessionData.session) {
          // No session, redirect to login if not on login page
          if (pathname !== "/admin/login") {
            console.log("Redirecting to login because user is not authenticated");
            router.push("/admin/login");
          }
          setLoading(false);
          return;
        }
        
        setUser(sessionData.session.user);
        
        // Check if user is admin
        const { data: adminData, error: adminError } = await supabase
          .from('admins')
          .select('*')
          .eq('email', sessionData.session.user.email)
          .single();
        
        if (adminError || !adminData) {
          // Not an admin, redirect if not on login page
          if (pathname !== "/admin/login") {
            console.log("Redirecting to unauthorized because user is not an admin");
            toast({
              title: "Unauthorized",
              description: "You don't have permission to access the admin area.",
              variant: "destructive",
            });
            router.push("/unauthorized");
          }
          setLoading(false);
          return;
        }
        
        setIsAdmin(true);
        setLoading(false);
      } catch (error) {
        console.error("Auth check error:", error);
        setLoading(false);
        if (pathname !== "/admin/login") {
          router.push("/admin/login");
        }
      }
    }
    
    checkAuth();
  }, [pathname, router, toast]);
  
  // Handle logout
  const handleLogout = async () => {
    try {
      // Sign out with Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Logged out successfully",
      });
      
      // Redirect to login page
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "An error occurred during logout. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Login page doesn't need the admin layout
  if (!isMounted || loading || pathname === "/admin/login" || !user || !isAdmin) {
    return <>{children}</>;
  }
  
  const navigationItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Growth Blueprints",
      href: "/admin/growth-blueprints",
      icon: FileText,
      children: [
        { name: "All Growth Blueprints", href: "/admin/growth-blueprints" },
        { name: "Add New", href: "/admin/growth-blueprints/new" },
      ],
    },
    {
      name: "Services",
      href: "/admin/services",
      icon: Layers,
      children: [
        { name: "All Services", href: "/admin/services" },
        { name: "Add New", href: "/admin/services/new" },
      ],
    },
    {
      name: "Contact Submissions",
      href: "/admin/contacts",
      icon: Mail,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];
  
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile Navigation */}
      <div className="lg:hidden sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <div className="flex h-16 items-center border-b px-2">
              <Link 
                href="/admin/dashboard" 
                className="text-xl font-bold text-primary flex items-center"
              >
                <span className="font-opensauce">Fusion</span>
                <span className="text-accent-foreground">Focus</span>
              </Link>
            </div>
            <nav className="mt-6 flex flex-col gap-2 px-2">
              {navigationItems.map((item) => (
                item.children ? (
                  <Collapsible key={item.name} className="w-full">
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 hover:bg-muted">
                      <div className="flex items-center gap-2">
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-9 pt-1">
                      <div className="flex flex-col gap-1">
                        {item.children.map((child) => (
                          <Link 
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "rounded-md px-3 py-2 text-sm hover:bg-muted",
                              pathname === child.href ? "bg-muted font-medium" : "text-muted-foreground"
                            )}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 hover:bg-muted",
                      pathname === item.href ? "bg-muted font-medium" : "text-muted-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              ))}
              <div className="mt-auto pt-4 border-t">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-muted-foreground"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Logout
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex-1">
          <Link 
            href="/admin/dashboard" 
            className="text-xl font-bold text-primary flex items-center"
          >
            <span className="font-opensauce">Fusion</span>
            <span className="text-accent-foreground">Focus</span>
          </Link>
        </div>
      </div>
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 border-r bg-card">
          <div className="flex h-16 items-center border-b px-6">
            <Link 
              href="/admin/dashboard" 
              className="text-xl font-bold text-primary flex items-center"
            >
              <span className="font-opensauce">Fusion</span>
              <span className="text-accent-foreground">Focus</span>
            </Link>
          </div>
          <nav className="flex-1 overflow-auto py-6 px-4">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                item.children ? (
                  <Collapsible key={item.name} className="w-full">
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 hover:bg-muted">
                      <div className="flex items-center gap-2">
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-9 pt-1">
                      <div className="flex flex-col gap-1">
                        {item.children.map((child) => (
                          <Link 
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "rounded-md px-3 py-2 text-sm hover:bg-muted",
                              pathname === child.href ? "bg-muted font-medium" : "text-muted-foreground"
                            )}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 hover:bg-muted",
                      pathname === item.href ? "bg-muted font-medium" : "text-muted-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              ))}
            </div>
            
            <div className="mt-auto pt-4 border-t absolute bottom-6 left-4 right-4">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-muted-foreground"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Button>
            </div>
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}