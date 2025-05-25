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
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
  AlertCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { GrowthBlueprint } from "@/types/supabase";
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

export default function GrowthBlueprintsAdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  // Data states
  const [blueprints, setBlueprints] = useState<GrowthBlueprint[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  // Fetch data from Supabase
  useEffect(() => {
    async function fetchData() {
      if (!user || !isAdmin) return;
      
      setDataLoading(true);
      
      try {
        // Fetch all growth blueprints
        const { data: blueprintsData, error: blueprintsError } = await supabase
          .from('growth_blueprints')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (blueprintsError) throw blueprintsError;
        
        // Update state
        setBlueprints(blueprintsData as GrowthBlueprint[]);
      } catch (error) {
        console.error('Error fetching growth blueprints:', error);
        toast({
          title: "Error loading data",
          description: "There was a problem loading the growth blueprints. Please try again.",
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
  
  // Function to handle blueprint deletion
  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      const { error } = await supabase
        .from('growth_blueprints')
        .delete()
        .eq('id', deleteId);
        
      if (error) throw error;
      
      // Update local state
      setBlueprints(blueprints.filter(blueprint => blueprint.id !== deleteId));
      
      toast({
        title: "Growth blueprint deleted",
        description: "The growth blueprint has been successfully deleted.",
      });
    } catch (error) {
      console.error('Error deleting growth blueprint:', error);
      toast({
        title: "Error deleting growth blueprint",
        description: "There was a problem deleting the growth blueprint. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleteId(null);
    }
  };
  
  // Function to toggle blueprint published status
  const togglePublished = async (blueprint: GrowthBlueprint) => {
    try {
      const { error } = await supabase
        .from('growth_blueprints')
        .update({ published: !blueprint.published })
        .eq('id', blueprint.id);
        
      if (error) throw error;
      
      // Update local state
      setBlueprints(blueprints.map(b => 
        b.id === blueprint.id ? { ...b, published: !b.published } : b
      ));
      
      toast({
        title: blueprint.published ? "Blueprint unpublished" : "Blueprint published",
        description: `The growth blueprint has been ${blueprint.published ? 'unpublished' : 'published'}.`,
      });
    } catch (error) {
      console.error('Error updating growth blueprint:', error);
      toast({
        title: "Error updating growth blueprint",
        description: "There was a problem updating the growth blueprint. Please try again.",
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
        <h1 className="text-3xl font-bold font-opensauce">Growth Blueprints</h1>
        <Button asChild>
          <Link href="/admin/growth-blueprints/new">
            <Plus className="mr-2 h-4 w-4" />
            New Blueprint
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-opensauce">Manage Growth Blueprints</CardTitle>
        </CardHeader>
        <CardContent>
          {dataLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
            </div>
          ) : blueprints.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Growth Blueprints Found</h3>
              <p className="text-muted-foreground mb-6">
                You haven't created any growth blueprints yet. Get started by adding your first one.
              </p>
              <Button asChild>
                <Link href="/admin/growth-blueprints/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Growth Blueprint
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
                  {blueprints.map((blueprint) => (
                    <TableRow key={blueprint.id}>
                      <TableCell className="font-medium">{blueprint.title}</TableCell>
                      <TableCell>{blueprint.slug}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex h-2 w-2 rounded-full ${blueprint.published ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                          <span>{blueprint.published ? 'Published' : 'Draft'}</span>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(blueprint.created_at)}</TableCell>
                      <TableCell>{formatDate(blueprint.updated_at)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => togglePublished(blueprint)}
                            title={blueprint.published ? 'Unpublish' : 'Publish'}
                          >
                            {blueprint.published ? (
                              <AlertCircle className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link 
                              href={`/admin/growth-blueprints/${blueprint.id}`}
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => setDeleteId(blueprint.id)}
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
              This action cannot be undone. This will permanently delete the growth blueprint.
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