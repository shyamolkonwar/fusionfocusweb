"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  FileText,
  Users,
  Mail,
  PenTool,
  Plus,
  Layers,
  Calendar,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { GrowthBlueprint, Service, ContactSubmission } from "@/types/supabase";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboardPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  // Data states
  const [blueprints, setBlueprints] = useState<GrowthBlueprint[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  
  // Fetch data from API routes
  useEffect(() => {
    async function fetchData() {
      if (!user || !isAdmin) return;
      
      setDataLoading(true);
      
      try {
        // Fetch growth blueprints from API
        const blueprintsRes = await fetch('/api/admin/growth-blueprints');
        if (!blueprintsRes.ok) throw new Error('Failed to fetch blueprints');
        const blueprintsData = await blueprintsRes.json();
        
        // Fetch services from API
        const servicesRes = await fetch('/api/admin/services');
        if (!servicesRes.ok) throw new Error('Failed to fetch services');
        const servicesData = await servicesRes.json();
        
        // Fetch contact submissions from API
        const contactsRes = await fetch('/api/admin/contacts');
        if (!contactsRes.ok) throw new Error('Failed to fetch contacts');
        const contactsData = await contactsRes.json();
        
        // Update state
        setBlueprints(blueprintsData);
        setServices(servicesData);
        setContacts(contactsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: "Error loading data",
          description: "There was a problem loading the dashboard data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setDataLoading(false);
      }
    }
    
    fetchData();
  }, [user, isAdmin, toast]);
  
  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Calculate summary stats
  const totalBlueprints = blueprints.length;
  const publishedBlueprints = blueprints.filter(b => b.published).length;
  const totalServices = services.length;
  const publishedServices = services.filter(s => s.published).length;
  const newContactsCount = contacts.filter(c => c.status === 'new').length;
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }
  
  if (!user || !isAdmin) {
    router.push("/admin/login");
    return null;
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-opensauce">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric' 
            })}
          </Button>
        </div>
      </div>
      
      {/* Dashboard Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Growth Blueprints</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBlueprints}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {publishedBlueprints} published
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Services</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalServices}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {publishedServices} published
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New Contacts</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newContactsCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              From {contacts.length} total submissions
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Button asChild variant="outline" size="sm" className="justify-start">
                <Link href="/admin/growth-blueprints/new">
                  <FileText className="mr-2 h-3.5 w-3.5" />
                  Add Blueprint
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="justify-start">
                <Link href="/admin/services/new">
                  <Layers className="mr-2 h-3.5 w-3.5" />
                  Add Service
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="content">
        <TabsList className="mb-6">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="contacts">Contact Submissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Growth Blueprints */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-opensauce">Recent Growth Blueprints</CardTitle>
              </CardHeader>
              <CardContent>
                {dataLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
                  </div>
                ) : blueprints.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No growth blueprints found</p>
                ) : (
                  <div className="space-y-4">
                    {blueprints.map((blueprint) => (
                      <div 
                        key={blueprint.id} 
                        className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                      >
                        <div>
                          <Link 
                            href={`/admin/growth-blueprints/${blueprint.id}`}
                            className="font-medium hover:underline"
                          >
                            {blueprint.title}
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`inline-flex h-2 w-2 rounded-full ${blueprint.published ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                            <span className="text-xs text-muted-foreground">
                              {blueprint.published ? 'Published' : 'Draft'} • {formatDate(blueprint.created_at)}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/growth-blueprints/${blueprint.id}`}>
                            Edit
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-4 pt-4 border-t">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/admin/growth-blueprints">
                      View All Growth Blueprints
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Services */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-opensauce">Recent Services</CardTitle>
              </CardHeader>
              <CardContent>
                {dataLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
                  </div>
                ) : services.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No services found</p>
                ) : (
                  <div className="space-y-4">
                    {services.map((service) => (
                      <div 
                        key={service.id} 
                        className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                      >
                        <div>
                          <Link 
                            href={`/admin/services/${service.id}`}
                            className="font-medium hover:underline"
                          >
                            {service.title}
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`inline-flex h-2 w-2 rounded-full ${service.published ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                            <span className="text-xs text-muted-foreground">
                              {service.published ? 'Published' : 'Draft'} • {formatDate(service.created_at)}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/services/${service.id}`}>
                            Edit
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-4 pt-4 border-t">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/admin/services">
                      View All Services
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="contacts">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-opensauce">Recent Contact Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              {dataLoading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
                </div>
              ) : contacts.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No contact submissions found</p>
              ) : (
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div 
                      key={contact.id} 
                      className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm text-muted-foreground">{contact.email}</div>
                        <div className="text-sm mt-1">{contact.company}</div>
                        <div className="text-sm text-muted-foreground mt-2 line-clamp-2">{contact.message}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`inline-flex h-2 w-2 rounded-full ${
                            contact.status === 'new' ? 'bg-blue-500' : 
                            contact.status === 'in-progress' ? 'bg-amber-500' : 
                            'bg-green-500'
                          }`}></span>
                          <span className="text-xs text-muted-foreground">
                            {contact.status === 'new' ? 'New' : 
                             contact.status === 'in-progress' ? 'In Progress' : 
                             'Completed'} • {formatDate(contact.created_at)}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Mark as Read
                        </Button>
                        <Button variant="ghost" size="sm">
                          Reply
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t">
                <Button asChild variant="outline" size="sm">
                  <Link href="/admin/contacts">
                    View All Contact Submissions
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}