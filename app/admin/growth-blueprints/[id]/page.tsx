"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";
import { ArrowLeft, Save, Trash2, Eye } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { GrowthBlueprint } from "@/types/supabase";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
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

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  description: z.string().optional(),
  content: z.string().optional(),
  image_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  categories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  published: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface PageProps {
  params: {
    id: string;
  };
}

export default function GrowthBlueprintEditPage({ params }: PageProps) {
  const isNew = params.id === "new";
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  // State for managing categories and tags
  const [newCategory, setNewCategory] = useState("");
  const [newTag, setNewTag] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [blueprint, setBlueprint] = useState<GrowthBlueprint | null>(null);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      content: "",
      image_url: "",
      categories: [],
      tags: [],
      published: false,
    },
  });
  
  // Fetch existing blueprint data if editing
  useEffect(() => {
    async function fetchBlueprint() {
      if (isNew) return;
      
      try {
        const { data, error } = await supabase
          .from('growth_blueprints')
          .select('*')
          .eq('id', params.id)
          .single();
          
        if (error) throw error;
        
        setBlueprint(data as GrowthBlueprint);
        
        // Set form values
        form.reset({
          title: data.title,
          slug: data.slug,
          description: data.description || "",
          content: data.content || "",
          image_url: data.image_url || "",
          categories: data.categories || [],
          tags: data.tags || [],
          published: data.published,
        });
      } catch (error) {
        console.error('Error fetching growth blueprint:', error);
        toast({
          title: "Error loading data",
          description: "There was a problem loading the growth blueprint. Please try again.",
          variant: "destructive",
        });
        router.push("/admin/growth-blueprints");
      } finally {
        setIsLoading(false);
      }
    }
    
    if (!isNew && !loading && user && isAdmin) {
      fetchBlueprint();
    }
  }, [params.id, isNew, form, loading, user, isAdmin, router, toast]);
  
  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };
  
  // Handle title change to auto-generate slug for new blueprints
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    form.setValue("title", title);
    
    if (isNew || !blueprint?.slug) {
      const slug = generateSlug(title);
      form.setValue("slug", slug);
    }
  };
  
  // Add a category
  const addCategory = () => {
    if (newCategory.trim() === "") return;
    
    const currentCategories = form.getValues("categories") || [];
    if (!currentCategories.includes(newCategory)) {
      form.setValue("categories", [...currentCategories, newCategory]);
    }
    setNewCategory("");
  };
  
  // Remove a category
  const removeCategory = (category: string) => {
    const currentCategories = form.getValues("categories") || [];
    form.setValue("categories", currentCategories.filter(c => c !== category));
  };
  
  // Add a tag
  const addTag = () => {
    if (newTag.trim() === "") return;
    
    const currentTags = form.getValues("tags") || [];
    if (!currentTags.includes(newTag)) {
      form.setValue("tags", [...currentTags, newTag]);
    }
    setNewTag("");
  };
  
  // Remove a tag
  const removeTag = (tag: string) => {
    const currentTags = form.getValues("tags") || [];
    form.setValue("tags", currentTags.filter(t => t !== tag));
  };
  
  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    setIsSaving(true);
    
    try {
      if (isNew) {
        // Create new blueprint
        const { data, error } = await supabase
          .from('growth_blueprints')
          .insert({
            id: uuidv4(),
            ...values,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select()
          .single();
          
        if (error) throw error;
        
        toast({
          title: "Growth blueprint created",
          description: "Your growth blueprint has been created successfully.",
        });
        
        router.push(`/admin/growth-blueprints/${data.id}`);
      } else {
        // Update existing blueprint
        const { error } = await supabase
          .from('growth_blueprints')
          .update({
            ...values,
            updated_at: new Date().toISOString(),
          })
          .eq('id', params.id);
          
        if (error) throw error;
        
        toast({
          title: "Growth blueprint updated",
          description: "Your growth blueprint has been updated successfully.",
        });
      }
    } catch (error) {
      console.error('Error saving growth blueprint:', error);
      toast({
        title: "Error saving growth blueprint",
        description: "There was a problem saving the growth blueprint. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Handle blueprint deletion
  const handleDelete = async () => {
    if (isNew) return;
    
    try {
      const { error } = await supabase
        .from('growth_blueprints')
        .delete()
        .eq('id', params.id);
        
      if (error) throw error;
      
      toast({
        title: "Growth blueprint deleted",
        description: "The growth blueprint has been successfully deleted.",
      });
      
      router.push("/admin/growth-blueprints");
    } catch (error) {
      console.error('Error deleting growth blueprint:', error);
      toast({
        title: "Error deleting growth blueprint",
        description: "There was a problem deleting the growth blueprint. Please try again.",
        variant: "destructive",
      });
    } finally {
      setShowDeleteDialog(false);
    }
  };
  
  // Preview the blueprint on the front end
  const previewBlueprint = () => {
    if (isNew) {
      toast({
        title: "Cannot preview",
        description: "You need to save the blueprint first before previewing.",
      });
      return;
    }
    
    window.open(`/growth-blueprints/${blueprint?.slug}`, '_blank');
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
  
  if (!isNew && isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent mb-4"></div>
          <p>Loading blueprint data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
            <Link href="/admin/growth-blueprints">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Growth Blueprints
            </Link>
          </Button>
          <h1 className="text-3xl font-bold font-opensauce">
            {isNew ? "Create Growth Blueprint" : "Edit Growth Blueprint"}
          </h1>
        </div>
        <div className="flex gap-2">
          {!isNew && (
            <>
              <Button 
                variant="outline" 
                onClick={previewBlueprint}
                disabled={isSaving}
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => setShowDeleteDialog(true)}
                disabled={isSaving}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </>
          )}
          <Button 
            type="button" 
            onClick={form.handleSubmit(onSubmit)} 
            disabled={isSaving}
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-opensauce">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the title"
                          {...field}
                          onChange={handleTitleChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="enter-the-slug"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Used in the URL: /growth-blueprints/{"{slug}"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter a brief description"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A short summary of the blueprint shown in listings.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Featured Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      URL for the main image shown in listings and at the top of the blueprint page.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Published</FormLabel>
                      <FormDescription>
                        When checked, this blueprint will be visible on the public website.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-opensauce">Content</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blueprint Content (HTML)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter the HTML content"
                        rows={15}
                        className="font-mono text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the full HTML content of the blueprint. This supports all HTML formatting.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-opensauce">Categories & Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <FormLabel>Categories</FormLabel>
                <div className="flex flex-wrap gap-2 mt-2 mb-4">
                  {form.getValues("categories")?.map((category, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {category}
                      <button
                        type="button"
                        onClick={() => removeCategory(category)}
                        className="text-primary ml-1 hover:text-primary/80"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCategory();
                      }
                    }}
                  />
                  <Button type="button" onClick={addCategory} variant="outline">
                    Add
                  </Button>
                </div>
              </div>
              
              <div>
                <FormLabel>Tags</FormLabel>
                <div className="flex flex-wrap gap-2 mt-2 mb-4">
                  {form.getValues("tags")?.map((tag, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-1 bg-muted px-3 py-1 rounded-md text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-muted-foreground ml-1 hover:text-foreground"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
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