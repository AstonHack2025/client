// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { FormWrapper, Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { AcademicsValidation } from "@/lib/validations/auth";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import { z } from "zod";
// import { useState, useTransition } from "react";


// export default function AcademicsForm(){

//     const [error, setError] = useState<string | undefined>("");
//     const [success, setSuccess] = useState<string | undefined>("");
//     const [isPending, startTransition] = useTransition();

//     const form = useForm<z.infer<typeof AcademicsValidation>>({
//             resolver: zodResolver(AcademicsValidation),
//             defaultValues: {
//                 degree: "",
//                 university: "",
//                 year: "",
//                 course: "",
//             },
//         });
        
//     return (
//             // <Card>
//             //     <CardHeader>
//             //         <CardTitle>Academics</CardTitle>
//             //         <CardDescription>Tell us more about your academic information</CardDescription>
//             //     </CardHeader>
//             //     <CardContent className="flex flex-col space-y-4">
//             //         <FormField
//             //             control={form.control}
//             //             name="degree"
//             //             render={({ field }) => (
//             //                 <FormItem className="space-y-2">
//             //                     <FormLabel>Degree</FormLabel>
//             //                     <FormControl>
//             //                         <Input disabled={isPending} placeholder="your degree" {...field} />
//             //                     </FormControl>
//             //                     <FormMessage />
//             //                 </FormItem>
//             //             )}
//             //         />
//             //     </CardContent>
//             // </Card>

//         <FormWrapper headerLabel="Create an account" backButtonLabel="Already have an account?" backButtonHref="/signin" showSocial>
//         <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
//                 <div className="space-y-4">
//                     <FormField
//                         control={form.control}
//                         name="name"
//                         render={({ field }) => (
//                             <FormItem className="space-y-2">
//                                 <FormLabel>Full Name</FormLabel>
//                                 <FormControl>
//                                     <Input disabled={isPending} placeholder="your full name" {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                     <FormField
//                         control={form.control}
//                         name="email"
//                         render={({ field }) => (
//                             <FormItem className="space-y-2">
//                                 <FormLabel>Email</FormLabel>
//                                 <FormControl>
//                                     <Input disabled={isPending} placeholder="mail@example.com" {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                     <FormField
//                         control={form.control}
//                         name="password"
//                         render={({ field }) => (
//                             <FormItem className="space-y-2">
//                                 <FormLabel>Password</FormLabel>
//                                 <FormControl>
//                                     <Input disabled={isPending} type="password" placeholder="your password" {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                     <FormField
//                         control={form.control}
//                         name="confirmPassword"
//                         render={({ field }) => (
//                             <FormItem className="space-y-2">
//                                 <FormLabel>Confirm Password</FormLabel>
//                                 <FormControl>
//                                     <Input disabled={isPending} type="password" placeholder="confirm your password" {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                 </div>
//                 <FormError message={error} />
//                 <FormSuccess message={success} />
//                 <Button size="lg" className="w-full mt-6" type="submit" disabled={isPending}>
//                     {isPending ? "Submitting..." : "Sign Up"}
//                 </Button>
//             </form>
//         </Form>
//         </FormWrapper>
//     )
// }
