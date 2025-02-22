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
        },
    });

    function onSubmit(values: z.infer<typeof PersonalInfoValidation>) {
        console.log(values);
        setError("");
        setSuccess("");
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <CardContent className="flex flex-col space-y-4">
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
                </CardContent>
            </form>
        </Form>
    );
}