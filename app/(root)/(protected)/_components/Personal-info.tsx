import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PersonalInfoValidation } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";

export default function PersonalInfoForm(){
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    // Infer the form's data type from your Zod validation
    const form = useForm<z.infer<typeof PersonalInfoValidation>>({
        resolver: zodResolver(PersonalInfoValidation),
        defaultValues: {
            age: "",
            gender: "",
            pronouns: "",
            city: "",
            country: ""
        },
    });

    // Example form submission handler
    function onSubmit(data: z.infer<typeof PersonalInfoValidation>) {
      console.log("Form data:", data);
      startTransition(() => {
        // Simulate asynchronous save
        setSuccess("Information submitted!");
      });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Please fill in your personal information.</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col space-y-4">
                {/* Wrap your fields in the Form component and <form> element */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Age</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} placeholder="18" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="pronouns"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Pronouns</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} placeholder="He/Him" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Gender</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} placeholder="Optional" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} placeholder="e.g. New York" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} placeholder="e.g. USA" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* You can add submit/error messages here */}
                        {error && <p className="text-red-600">{error}</p>}
                        {success && <p className="text-green-600">{success}</p>}

                        <button
                            type="submit"
                            className="rounded bg-blue-600 px-4 py-2 text-white"
                            disabled={isPending}
                        >
                            Submit
                        </button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}