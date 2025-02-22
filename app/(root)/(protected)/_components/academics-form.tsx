import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AcademicsValidation } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useState, useTransition } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormWrapper } from "@/components/shared/form-wrapper";
import { FormError } from "@/components/shared/form-error";
import { FormSuccess } from "@/components/shared/form-success";
import { Button } from "@/components/ui/button";

export default function AcademicsForm() {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof AcademicsValidation>>({
        resolver: zodResolver(AcademicsValidation),
        defaultValues: {
            degree: "",
            university: "",
            year: "",
            course: "",
        },
    });

    function onSubmit(values: z.infer<typeof AcademicsValidation>) {
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
                        name="course"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel>Current Course</FormLabel>
                                <FormControl>
                                    <Input disabled={isPending} placeholder="Current Course" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="degree"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel>Currnet Degree</FormLabel>
                                <FormControl>
                                    <Input disabled={isPending} placeholder="Current Degree" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="university"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel>Your university</FormLabel>
                                <FormControl>
                                    <Input disabled={isPending} type="text" placeholder="Your university" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                            <FormItem className="space-y-2">
                                <FormLabel>Your current year</FormLabel>
                                <FormControl>
                                    <Input disabled={isPending} type="text" placeholder="Your current year" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
                <FormError message={error} />
                <FormSuccess message={success} />
            </form>
        </Form>
    );
}
