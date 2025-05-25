"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Layers,
  Plus,
  Edit,
  Trash2,
  Eye,
  AlertCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { Service } from "@/types/supabase";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ServicesAdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  // Data states
  const [services, setServices] = useState<Service[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  // Fetch data from Supabase
  useEffect(() => {
    async function fetchData() {
      if (!user || !isAdmin) return;
      
      setDataLoading(true);
      
      try {
        // Fetch all services
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (servicesError) throw servicesError;
        
        // Update state
        setServices(servicesData as Service[]);
      } catch (error) {
        console.error('Error fetching services:', error);
        toast({
          title: "Error loading data",
          description: "There was a problem loading the services. Please try again.",
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
  
  // Function to handle service deletion
  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', deleteId);
        
      if (error) throw error;
      
      // Update local state
      setServices(services.filter(service => service.id !== deleteId));
      
      toast({
        title: "Service deleted",
        description: "The service has been successfully deleted.",
      });
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: "Error deleting service",
        description: "There was a problem deleting the service. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleteId(null);
    }
  };
  
  // Function to toggle service published status
  const togglePublished = async (service: Service) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ published: !service.published })
        .eq('id', service.id);
        
      if (error) throw error;
      
      // Update local state
      setServices(services.map(s => 
        s.id === service.id ? { ...s, published: !s.published } : s
      ));
      
      toast({
        title: service.published ? "Service unpublished" : "Service published",
        description: `The service has been ${service.published ? 'unpublished' : 'published'}.`,
      });
    } catch (error) {
      console.error('Error updating service:', error);
      toast({
        title: "Error updating service",
        description: "There was a problem updating the service. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent mb-4"></div>
          <p>Loading...</p>
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
        <h1 className="text-3xl font-bold font-opensauce">Services</h1>
        <Button asChild>
          <Link href="/admin/services/new">
            <Plus className="mr-2 h-4 w-4" />
            New Service
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-opensauce">Manage Services</CardTitle>
        </CardHeader>
        <CardContent>
          {dataLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-12">
              <Layers className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Services Found</h3>
              <p className="text-muted-foreground mb-6">
                You haven't created any services yet. Get started by adding your first one.
              </p>
              <Button asChild>
                <Link href="/admin/services/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Service
                </Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.title}</TableCell>
                      <TableCell>{service.slug}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex h-2 w-2 rounded-full ${service.published ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                          <span>{service.published ? 'Published' : 'Draft'}</span>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(service.created_at)}</TableCell>
                      <TableCell>{formatDate(service.updated_at)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => togglePublished(service)}
                            title={service.published ? 'Unpublish' : 'Publish'}
                          >
                            {service.published ? (
                              <AlertCircle className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link 
                              href={`/admin/services/${service.id}`}
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => setDeleteId(service.id)}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the service.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 