import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  company: z.string().optional(),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().optional(),
  product: z.string().optional(),
  message: z.string().min(10, { message: 'Message should be at least 10 characters' }),
  privacyPolicy: z.boolean().refine(val => val === true, { message: 'You must agree to the privacy policy' }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      product: '',
      message: '',
      privacyPolicy: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest('POST', '/api/contact', data);
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible!",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6" style={{ position: 'relative' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem style={{ position: 'relative' }}>
                <FormLabel className="text-sm sm:text-base">Full Name *</FormLabel>
                <FormControl>
                  <Input {...field} className="h-9 sm:h-10 text-sm sm:text-base" />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem style={{ position: 'relative' }}>
                <FormLabel className="text-sm sm:text-base">Company</FormLabel>
                <FormControl>
                  <Input {...field} className="h-9 sm:h-10 text-sm sm:text-base" />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem style={{ position: 'relative' }}>
                <FormLabel className="text-sm sm:text-base">Email Address *</FormLabel>
                <FormControl>
                  <Input type="email" {...field} className="h-9 sm:h-10 text-sm sm:text-base" />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem style={{ position: 'relative' }}>
                <FormLabel className="text-sm sm:text-base">Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} className="h-9 sm:h-10 text-sm sm:text-base" />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="product"
          render={({ field }) => (
            <FormItem style={{ position: 'relative' }}>
              <FormLabel className="text-sm sm:text-base">Product Interest</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-9 sm:h-10 text-sm sm:text-base">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="text-sm sm:text-base">
                  <SelectItem value="none">Select a product</SelectItem>
                  <SelectItem value="spray-foam">Spray Foam Insulation</SelectItem>
                  <SelectItem value="rigid-foam">Rigid Polyurethane Foam</SelectItem>
                  <SelectItem value="waterproofing">Waterproofing Solutions</SelectItem>
                  <SelectItem value="prepolymers">Pre-Polymers & CASE</SelectItem>
                  <SelectItem value="other">Other/Not Sure</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem style={{ position: 'relative' }}>
              <FormLabel className="text-sm sm:text-base">Your Message *</FormLabel>
              <FormControl>
                <Textarea 
                  rows={3} 
                  className="min-h-[80px] sm:min-h-[100px] text-sm sm:text-base" 
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="privacyPolicy"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-2 sm:space-x-3 space-y-0" style={{ position: 'relative' }}>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-1 h-3 w-3 sm:h-4 sm:w-4"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-xs sm:text-sm text-gray-600">
                  I agree to the processing of my data as outlined in Danny's Chemicals' privacy policy. *
                </FormLabel>
                <FormMessage className="text-xs" />
              </div>
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 sm:py-3 text-sm sm:text-base mt-2 sm:mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
