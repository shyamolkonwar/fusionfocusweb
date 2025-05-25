"use client";

import { useEffect, useState } from "react";
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
  Mail,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Filter,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { ContactSubmission } from "@/types/supabase";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ContactsAdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  // Data states
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewContact, setViewContact] = useState<ContactSubmission | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Fetch data from Supabase
  useEffect(() => {
    async function fetchData() {
      if (!user || !isAdmin) return;
      
      setDataLoading(true);
      
      try {
        // Build query
        let query = supabase
          .from('contact_submissions')
          .select('*')
          .order('created_at', { ascending: false });
          
        // Apply filter if set
        if (statusFilter) {
          query = query.eq('status', statusFilter);
        }
        
        const { data, error } = await query;
          
        if (error) throw error;
        
        // Update state
        setContacts(data as ContactSubmission[]);
      } catch (error) {
        console.error('Error fetching contact submissions:', error);
        toast({
          title: "Error loading data",
          description: "There was a problem loading the contact submissions. Please try again.",
          variant: "destructive",
        });
      } finally {
        setDataLoading(false);
      }
    }
    
    fetchData();
  }, [user, isAdmin, toast, statusFilter]);
  
  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Function to handle contact deletion
  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', deleteId);
        
      if (error) throw error;
      
      // Update local state
      setContacts(contacts.filter(contact => contact.id !== deleteId));
      
      toast({
        title: "Contact submission deleted",
        description: "The contact submission has been successfully deleted.",
      });
    } catch (error) {
      console.error('Error deleting contact submission:', error);
      toast({
        title: "Error deleting contact submission",
        description: "There was a problem deleting the contact submission. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleteId(null);
    }
  };
  
  // Function to update contact status
  const updateStatus = async (contactId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString() 
        })
        .eq('id', contactId);
        
      if (error) throw error;
      
      // Update local state
      setContacts(contacts.map(contact => 
        contact.id === contactId ? { ...contact, status: newStatus, updated_at: new Date().toISOString() } : contact
      ));
      
      toast({
        title: "Status updated",
        description: `Contact submission marked as ${newStatus}.`,
      });
    } catch (error) {
      console.error('Error updating contact status:', error);
      toast({
        title: "Error updating status",
        description: "There was a problem updating the status. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500';
      case 'in-progress':
        return 'bg-amber-500';
      case 'completed':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <Clock className="h-4 w-4" />;
      case 'in-progress':
        return <AlertCircle className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return null;
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
        <h1 className="text-3xl font-bold font-opensauce">Contact Submissions</h1>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                {statusFilter ? `Filter: ${statusFilter}` : "Filter by Status"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('new')}>
                  <Clock className="mr-2 h-4 w-4 text-blue-500" />
                  New
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('in-progress')}>
                  <AlertCircle className="mr-2 h-4 w-4 text-amber-500" />
                  In Progress
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('completed')}>
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Completed
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-opensauce">Manage Contact Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          {dataLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
            </div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Contact Submissions Found</h3>
              <p className="text-muted-foreground mb-6">
                {statusFilter 
                  ? `No contact submissions with status "${statusFilter}" found.` 
                  : "No contact submissions have been received yet."}
              </p>
              {statusFilter && (
                <Button variant="outline" onClick={() => setStatusFilter(null)}>
                  Clear Filter
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Received</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>
                        <a 
                          href={`mailto:${contact.email}`} 
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          {contact.email}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </TableCell>
                      <TableCell>{contact.company || "-"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex h-2 w-2 rounded-full ${getStatusBadge(contact.status)}`}></span>
                          <span className="capitalize">{contact.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(contact.created_at)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setViewContact(contact)}
                          >
                            View
                          </Button>
                          <Select
                            value={contact.status}
                            onValueChange={(value) => updateStatus(contact.id, value)}
                          >
                            <SelectTrigger className="w-[130px] h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-blue-500" />
                                  <span>New</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="in-progress">
                                <div className="flex items-center gap-2">
                                  <AlertCircle className="h-4 w-4 text-amber-500" />
                                  <span>In Progress</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="completed">
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  <span>Completed</span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => setDeleteId(contact.id)}
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
              This action cannot be undone. This will permanently delete the contact submission.
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
      
      {/* View Contact Dialog */}
      <Dialog open={!!viewContact} onOpenChange={(open) => !open && setViewContact(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Contact Submission</DialogTitle>
            <DialogDescription>
              Received {viewContact && formatDate(viewContact.created_at)}
            </DialogDescription>
          </DialogHeader>
          
          {viewContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Name</h3>
                  <p className="text-base">{viewContact.name}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                  <p className="text-base">
                    <a 
                      href={`mailto:${viewContact.email}`} 
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      {viewContact.email}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Company</h3>
                  <p className="text-base">{viewContact.company || "-"}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex h-2 w-2 rounded-full ${getStatusBadge(viewContact.status)}`}></span>
                    <span className="capitalize">{viewContact.status}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Message</h3>
                <div className="border rounded-md p-3 bg-muted/30 whitespace-pre-wrap text-base">
                  {viewContact.message}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex justify-between items-center">
            <div className="flex gap-2">
              {viewContact && (
                <Select
                  value={viewContact.status}
                  onValueChange={(value) => {
                    updateStatus(viewContact.id, value);
                    setViewContact({...viewContact, status: value});
                  }}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Change status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span>New</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="in-progress">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                        <span>In Progress</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="completed">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Completed</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
              
              {viewContact && (
                <Button 
                  variant="outline"
                  asChild
                >
                  <a href={`mailto:${viewContact.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Reply
                  </a>
                </Button>
              )}
            </div>
            
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 